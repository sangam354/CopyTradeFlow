// src/context/AppContext.js
import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { loadAccounts, saveAccounts, loadMasterId, saveMasterId, loadSettings, saveSettings, appendTradeLog, loadTradeLog } from '../services/storage';
import { TradovateClient, CopyTradeEngine } from '../services/tradovateApi';
import { requestNotificationPermission, sendTradeCopiedNotification } from '../services/notifications';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [masterId, setMasterId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [tradeLog, setTradeLog] = useState([]);
  const [settings, setSettings] = useState({ notificationsEnabled: true });
  const [loading, setLoading] = useState(true);
  const engineRef = useRef(null);
  const clientsRef = useRef({});

  // ─── Load persisted data on boot ──────────────────────────────

  useEffect(() => {
    (async () => {
      await requestNotificationPermission();
      const [accs, mid, setts, log] = await Promise.all([
        loadAccounts(),
        loadMasterId(),
        loadSettings(),
        loadTradeLog(),
      ]);
      setAccounts(accs);
      setMasterId(mid);
      setSettings(setts);
      setTradeLog(log);
      setLoading(false);
    })();
  }, []);

  // ─── Account management ────────────────────────────────────────

  const addAccount = useCallback(async (account) => {
    const newAcc = {
      ...account,
      id: `acc_${Date.now()}`,
      enabled: true,
      multiplier: 1.0,
      status: 'disconnected',
      pnlToday: 0,
      pnlAllTime: 0,
    };
    const updated = [...accounts, newAcc];
    setAccounts(updated);
    await saveAccounts(updated);
    return newAcc;
  }, [accounts]);

  const updateAccount = useCallback(async (id, changes) => {
    const updated = accounts.map((a) => a.id === id ? { ...a, ...changes } : a);
    setAccounts(updated);
    await saveAccounts(updated);
  }, [accounts]);

  const removeAccount = useCallback(async (id) => {
    const { deleteAccount } = await import('../services/storage');
    await deleteAccount(id);
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    if (masterId === id) {
      setMasterId(null);
      await saveMasterId(null);
    }
  }, [accounts, masterId]);

  const setMasterAccount = useCallback(async (id) => {
    setMasterId(id);
    await saveMasterId(id);
  }, []);

  // ─── Test connection ───────────────────────────────────────────

  const testConnection = useCallback(async (account) => {
    const client = new TradovateClient(account, account.isDemo);
    const result = await client.authenticate();
    if (result.success) {
      clientsRef.current[account.id] = client;
      await updateAccount(account.id, { status: 'connected' });
    } else {
      await updateAccount(account.id, { status: 'error' });
    }
    return result;
  }, [updateAccount]);

  // ─── Start / Stop copy engine ─────────────────────────────────

  const startCopying = useCallback(async () => {
    if (!masterId) return { success: false, error: 'No master account selected' };

    const masterAcc = accounts.find((a) => a.id === masterId);
    if (!masterAcc) return { success: false, error: 'Master account not found' };

    // Ensure master client is authenticated
    if (!clientsRef.current[masterId]) {
      const c = new TradovateClient(masterAcc, masterAcc.isDemo);
      const auth = await c.authenticate();
      if (!auth.success) return { success: false, error: `Master auth failed: ${auth.error}` };
      clientsRef.current[masterId] = c;
    }

    // Authenticate all enabled followers
    const followers = [];
    for (const acc of accounts) {
      if (acc.id === masterId || !acc.enabled) continue;
      if (!clientsRef.current[acc.id]) {
        const c = new TradovateClient(acc, acc.isDemo);
        const auth = await c.authenticate();
        if (auth.success) {
          clientsRef.current[acc.id] = c;
          await updateAccount(acc.id, { status: 'connected' });
        } else {
          await updateAccount(acc.id, { status: 'error' });
          continue;
        }
      }
      followers.push({
        client: clientsRef.current[acc.id],
        config: { enabled: acc.enabled, multiplier: acc.multiplier },
      });
    }

    const engine = new CopyTradeEngine(clientsRef.current[masterId], followers);

    engine.setTradeListener(async (tradeEvent) => {
      const entry = { ...tradeEvent, time: tradeEvent.time.toISOString() };
      setTradeLog((prev) => [entry, ...prev].slice(0, 100));
      await appendTradeLog(entry);
      if (settings.notificationsEnabled) {
        await sendTradeCopiedNotification(tradeEvent);
      }
    });

    engine.start();
    engineRef.current = engine;
    setIsRunning(true);
    return { success: true };
  }, [accounts, masterId, settings, updateAccount]);

  const stopCopying = useCallback(() => {
    if (engineRef.current) {
      engineRef.current.stop();
      engineRef.current = null;
    }
    setIsRunning(false);
  }, []);

  // ─── Settings ─────────────────────────────────────────────────

  const updateSettings = useCallback(async (changes) => {
    const updated = { ...settings, ...changes };
    setSettings(updated);
    await saveSettings(updated);
  }, [settings]);

  return (
    <AppContext.Provider value={{
      accounts,
      masterId,
      isRunning,
      tradeLog,
      settings,
      loading,
      addAccount,
      updateAccount,
      removeAccount,
      setMasterAccount,
      testConnection,
      startCopying,
      stopCopying,
      updateSettings,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
