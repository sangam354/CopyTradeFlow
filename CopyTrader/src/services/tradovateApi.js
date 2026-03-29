// src/services/tradovateApi.js
// Tradovate API integration - REST + WebSocket

const DEMO_URL = 'https://demo.tradovateapi.com/v1';
const LIVE_URL = 'https://live.tradovateapi.com/v1';
const DEMO_MD_URL = 'wss://md.tradovateapi.com/v1/websocket';
const LIVE_WS_URL = 'wss://live.tradovateapi.com/v1/websocket';

export class TradovateClient {
  constructor(account, isDemo = false) {
    this.account = account;
    this.isDemo = isDemo;
    this.baseUrl = isDemo ? DEMO_URL : LIVE_URL;
    this.wsUrl = isDemo ? DEMO_MD_URL : LIVE_WS_URL;
    this.accessToken = null;
    this.socket = null;
    this.msgId = 1;
    this.pendingRequests = {};
    this.listeners = {};
  }

  // ─── Authentication ───────────────────────────────────────────────

  async authenticate() {
    try {
      const res = await fetch(`${this.baseUrl}/auth/accesstokenrequest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.account.username,
          password: this.account.password,
          appId: this.account.appId || 'MyApp',
          appVersion: '1.0',
          cid: this.account.cid || '',
          sec: this.account.sec || '',
          deviceId: this.account.deviceId || 'device-001',
        }),
      });

      const data = await res.json();

      if (data.errorText) throw new Error(data.errorText);
      if (!data.accessToken) throw new Error('No access token returned');

      this.accessToken = data.accessToken;
      this.userId = data.userId;
      return { success: true, token: data.accessToken };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // ─── REST helpers ─────────────────────────────────────────────────

  async get(endpoint) {
    if (!this.accessToken) throw new Error('Not authenticated');
    const res = await fetch(`${this.baseUrl}/${endpoint}`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });
    return res.json();
  }

  async post(endpoint, body) {
    if (!this.accessToken) throw new Error('Not authenticated');
    const res = await fetch(`${this.baseUrl}/${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return res.json();
  }

  // ─── Account info ─────────────────────────────────────────────────

  async getAccounts() {
    return this.get('account/list');
  }

  async getPositions() {
    return this.get('position/list');
  }

  async getOrders() {
    return this.get('order/list');
  }

  async getCashBalance() {
    return this.get('cashbalance/getcashbalancesnapshot');
  }

  // ─── Place order ──────────────────────────────────────────────────

  async placeOrder({
    accountId,
    symbol,
    action,       // 'Buy' or 'Sell'
    orderQty,
    orderType = 'Market',
    price = null,
  }) {
    const body = {
      accountSpec: this.account.username,
      accountId,
      action,
      symbol,
      orderQty,
      orderType,
      isAutomated: true,
    };
    if (price) body.price = price;
    return this.post('order/placeorder', body);
  }

  // ─── WebSocket ────────────────────────────────────────────────────

  connectWebSocket(onOpen, onMessage, onError) {
    this.socket = new WebSocket(this.wsUrl);

    this.socket.onopen = () => {
      // Authenticate on connect
      this.socket.send(`authorize\n1\n\n${this.accessToken}`);
      if (onOpen) onOpen();
    };

    this.socket.onmessage = (event) => {
      const raw = event.data;
      if (raw === 'o') return; // open frame
      if (raw === 'h') return; // heartbeat

      try {
        const frames = JSON.parse(raw.slice(1)); // strip frame type char
        frames.forEach((frame) => {
          if (onMessage) onMessage(frame);
          // Resolve pending requests
          if (frame.i && this.pendingRequests[frame.i]) {
            this.pendingRequests[frame.i](frame);
            delete this.pendingRequests[frame.i];
          }
          // Fire named listeners
          if (frame.e && this.listeners[frame.e]) {
            this.listeners[frame.e](frame.d);
          }
        });
      } catch (e) {
        // ignore parse errors on heartbeat frames
      }
    };

    this.socket.onerror = (e) => {
      if (onError) onError(e);
    };

    this.socket.onclose = () => {
      this.socket = null;
    };
  }

  subscribeOrders(callback) {
    this.listeners['order'] = callback;
    this.sendWS('order/subscribeorders', {});
  }

  subscribePositions(callback) {
    this.listeners['position'] = callback;
    this.sendWS('position/subscribepositions', {});
  }

  sendWS(url, body) {
    if (!this.socket) return;
    const id = this.msgId++;
    const msg = `${url}\n${id}\n\n${JSON.stringify(body)}`;
    this.socket.send(msg);
    return new Promise((resolve) => {
      this.pendingRequests[id] = resolve;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// ─── Copy trade engine ─────────────────────────────────────────────

export class CopyTradeEngine {
  constructor(masterClient, followerClients) {
    this.master = masterClient;
    this.followers = followerClients; // array of { client, config }
    this.isRunning = false;
    this.onTradeCallback = null;
    this.lastOrders = new Set();
  }

  setTradeListener(callback) {
    this.onTradeCallback = callback;
  }

  start() {
    if (!this.master.socket) {
      this.master.connectWebSocket(
        () => console.log('Master WS connected'),
        null,
        (e) => console.error('Master WS error', e)
      );
    }

    this.master.subscribeOrders((orderData) => {
      this.handleMasterOrder(orderData);
    });

    this.isRunning = true;
  }

  stop() {
    this.master.disconnect();
    this.isRunning = false;
  }

  async handleMasterOrder(orderData) {
    // Only act on filled orders we haven't seen
    if (!orderData || orderData.ordStatus !== 'Filled') return;
    if (this.lastOrders.has(orderData.id)) return;
    this.lastOrders.add(orderData.id);

    const enabledFollowers = this.followers.filter((f) => f.config.enabled);

    const results = await Promise.allSettled(
      enabledFollowers.map(async (follower) => {
        const qty = Math.max(
          1,
          Math.round(orderData.filledQty * follower.config.multiplier)
        );

        const accounts = await follower.client.getAccounts();
        const accountId = accounts[0]?.id;
        if (!accountId) throw new Error('No account found');

        return follower.client.placeOrder({
          accountId,
          symbol: orderData.contractId,
          action: orderData.action,
          orderQty: qty,
        });
      })
    );

    const copied = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.filter((r) => r.status === 'rejected').length;

    if (this.onTradeCallback) {
      this.onTradeCallback({
        symbol: orderData.contractId,
        action: orderData.action,
        qty: orderData.filledQty,
        copiedTo: copied,
        failed,
        time: new Date(),
      });
    }
  }
}
