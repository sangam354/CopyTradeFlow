// src/services/storage.js
// Secure storage for account credentials using expo-secure-store

import * as SecureStore from 'expo-secure-store';

const ACCOUNTS_KEY = 'ct_accounts';
const MASTER_KEY = 'ct_master_id';
const SETTINGS_KEY = 'ct_settings';

// ─── Account CRUD ──────────────────────────────────────────────────

export async function saveAccounts(accounts) {
  // Strip passwords before saving to regular storage
  const safe = accounts.map(({ id, name, username, propFirm, isDemo, enabled, multiplier }) => ({
    id, name, username, propFirm, isDemo, enabled, multiplier,
  }));
  await SecureStore.setItemAsync(ACCOUNTS_KEY, JSON.stringify(safe));

  // Save credentials separately per account
  for (const acc of accounts) {
    if (acc.password) {
      await SecureStore.setItemAsync(`ct_pw_${acc.id}`, acc.password);
    }
    if (acc.appId) {
      await SecureStore.setItemAsync(`ct_appid_${acc.id}`, acc.appId);
    }
    if (acc.cid) {
      await SecureStore.setItemAsync(`ct_cid_${acc.id}`, acc.cid);
    }
    if (acc.sec) {
      await SecureStore.setItemAsync(`ct_sec_${acc.id}`, acc.sec);
    }
  }
}

export async function loadAccounts() {
  try {
    const raw = await SecureStore.getItemAsync(ACCOUNTS_KEY);
    if (!raw) return [];
    const accounts = JSON.parse(raw);

    // Re-attach credentials
    for (const acc of accounts) {
      acc.password = await SecureStore.getItemAsync(`ct_pw_${acc.id}`) || '';
      acc.appId = await SecureStore.getItemAsync(`ct_appid_${acc.id}`) || '';
      acc.cid = await SecureStore.getItemAsync(`ct_cid_${acc.id}`) || '';
      acc.sec = await SecureStore.getItemAsync(`ct_sec_${acc.id}`) || '';
    }

    return accounts;
  } catch {
    return [];
  }
}

export async function deleteAccount(id) {
  const accounts = await loadAccounts();
  const updated = accounts.filter((a) => a.id !== id);
  await saveAccounts(updated);
  await SecureStore.deleteItemAsync(`ct_pw_${id}`);
  await SecureStore.deleteItemAsync(`ct_appid_${id}`);
  await SecureStore.deleteItemAsync(`ct_cid_${id}`);
  await SecureStore.deleteItemAsync(`ct_sec_${id}`);
}

// ─── Master account selection ──────────────────────────────────────

export async function saveMasterId(id) {
  await SecureStore.setItemAsync(MASTER_KEY, String(id));
}

export async function loadMasterId() {
  return SecureStore.getItemAsync(MASTER_KEY);
}

// ─── App settings ──────────────────────────────────────────────────

export async function saveSettings(settings) {
  await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify(settings));
}

export async function loadSettings() {
  try {
    const raw = await SecureStore.getItemAsync(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : { notificationsEnabled: true };
  } catch {
    return { notificationsEnabled: true };
  }
}

// ─── Trade log (in-memory + persisted) ────────────────────────────

const TRADE_LOG_KEY = 'ct_trade_log';

export async function appendTradeLog(entry) {
  try {
    const raw = await SecureStore.getItemAsync(TRADE_LOG_KEY);
    const log = raw ? JSON.parse(raw) : [];
    log.unshift({ ...entry, id: Date.now() });
    // Keep last 100 entries
    await SecureStore.setItemAsync(TRADE_LOG_KEY, JSON.stringify(log.slice(0, 100)));
  } catch {}
}

export async function loadTradeLog() {
  try {
    const raw = await SecureStore.getItemAsync(TRADE_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function clearTradeLog() {
  await SecureStore.deleteItemAsync(TRADE_LOG_KEY);
}
