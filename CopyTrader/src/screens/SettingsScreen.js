// src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors } from '../utils/theme';

export default function SettingsScreen() {
  const { settings, updateSettings, accounts, masterId } = useApp();

  function SettingRow({ label, sub, value, onValueChange }) {
    return (
      <View style={s.settingRow}>
        <View style={s.settingInfo}>
          <Text style={s.settingLabel}>{label}</Text>
          {sub && <Text style={s.settingSub}>{sub}</Text>}
        </View>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.textPrimary}
        />
      </View>
    );
  }

  function LinkRow({ label, sub, onPress }) {
    return (
      <TouchableOpacity style={s.settingRow} onPress={onPress}>
        <View style={s.settingInfo}>
          <Text style={s.settingLabel}>{label}</Text>
          {sub && <Text style={s.settingSub}>{sub}</Text>}
        </View>
        <Text style={s.chevron}>›</Text>
      </TouchableOpacity>
    );
  }

  const masterAcc = accounts.find((a) => a.id === masterId);

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <Text style={s.headerTitle}>Settings</Text>

        {/* Status summary */}
        <View style={s.statusCard}>
          <View style={s.statusRow}>
            <Text style={s.statusLabel}>Master account</Text>
            <Text style={s.statusVal}>{masterAcc?.name || 'Not set'}</Text>
          </View>
          <View style={s.statusRow}>
            <Text style={s.statusLabel}>Follower accounts</Text>
            <Text style={s.statusVal}>{accounts.filter((a) => a.id !== masterId).length}</Text>
          </View>
          <View style={s.statusRow}>
            <Text style={s.statusLabel}>Active followers</Text>
            <Text style={s.statusVal}>{accounts.filter((a) => a.id !== masterId && a.enabled).length}</Text>
          </View>
        </View>

        {/* Notifications */}
        <Text style={s.sectionLabel}>Notifications</Text>
        <View style={s.section}>
          <SettingRow
            label="Push notifications"
            sub="Get alerts when trades are copied"
            value={settings.notificationsEnabled}
            onValueChange={(v) => updateSettings({ notificationsEnabled: v })}
          />
        </View>

        {/* Info */}
        <Text style={s.sectionLabel}>About</Text>
        <View style={s.section}>
          <LinkRow
            label="Tradovate API docs"
            sub="Learn about the Tradovate API"
            onPress={() => Linking.openURL('https://api.tradovate.com')}
          />
          <LinkRow
            label="How copy trading works"
            sub="Master → follower order flow"
            onPress={() => Alert.alert(
              'How it works',
              '1. CopyTrader connects to your master account via WebSocket.\n\n2. When a trade fills on the master, CopyTrader instantly places the same order on all enabled follower accounts.\n\n3. The lot size multiplier scales the quantity (e.g. 0.5x = half size, 2x = double).\n\n4. Each account authenticates directly with Tradovate — your credentials never leave your device.'
            )}
          />
          <View style={[s.settingRow, { borderBottomWidth: 0 }]}>
            <View style={s.settingInfo}>
              <Text style={s.settingLabel}>Version</Text>
            </View>
            <Text style={s.settingSub}>1.0.0</Text>
          </View>
        </View>

        {/* Disclaimer */}
        <View style={s.disclaimer}>
          <Text style={s.disclaimerText}>
            CopyTrader connects directly to Tradovate using your credentials. Always test on demo accounts before going live. Trading involves risk of loss.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { flex: 1, padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: '600', color: colors.textPrimary, marginBottom: 20 },

  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    borderWidth: 0.5,
    borderColor: colors.border,
    gap: 10,
  },
  statusRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statusLabel: { fontSize: 14, color: colors.textSecondary },
  statusVal: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },

  sectionLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 },

  section: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 22,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  settingInfo: { flex: 1, marginRight: 12 },
  settingLabel: { fontSize: 15, color: colors.textPrimary },
  settingSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  chevron: { fontSize: 20, color: colors.textMuted },

  disclaimer: {
    backgroundColor: colors.warning + '12',
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: colors.warning + '33',
  },
  disclaimerText: { fontSize: 12, color: colors.textSecondary, lineHeight: 18 },
});
