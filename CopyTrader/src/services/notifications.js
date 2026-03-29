// src/services/notifications.js
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function requestNotificationPermission() {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function sendTradeCopiedNotification({ symbol, action, copiedTo, failed }) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Trade copied — ${symbol} ${action.toUpperCase()}`,
      body: `Sent to ${copiedTo} account${copiedTo !== 1 ? 's' : ''}${failed > 0 ? `, ${failed} failed` : ''}`,
      sound: true,
    },
    trigger: null, // immediate
  });
}

export async function sendTradeClosedNotification({ symbol, pnl }) {
  const sign = pnl >= 0 ? '+' : '';
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Position closed — ${symbol}`,
      body: `PnL: ${sign}$${pnl.toFixed(2)} across all accounts`,
      sound: true,
    },
    trigger: null,
  });
}

export async function sendAccountAlertNotification(accountName, message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Account alert — ${accountName}`,
      body: message,
      sound: false,
    },
    trigger: null,
  });
}
