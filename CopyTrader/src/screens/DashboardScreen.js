// src/screens/DashboardScreen.js
import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors } from '../utils/theme';

export default function DashboardScreen({ navigation }) {
  const { accounts, masterId, isRunning, tradeLog, startCopying, stopCopying } = useApp();

  const masterAcc = useMemo(() => accounts.find((a) => a.id === masterId), [accounts, masterId]);
  const followers = useMemo(() => accounts.filter((a) => a.id !== masterId), [accounts, masterId]);
  const activeFollowers = followers.filter((f) => f.enabled).length;

  const totalPnlToday = useMemo(
    () => accounts.reduce((sum, a) => sum + (a.pnlToday || 0), 0),
    [accounts]
  );

  const recentTrades = tradeLog.slice(0, 5);

  async function handleToggle(value) {
    if (value) {
      if (!masterId) {
        Alert.alert('No master account', 'Go to Accounts tab and set a master account first.');
        return;
      }
      const result = await startCopying();
      if (!result.success) {
        Alert.alert('Failed to start', result.error);
      }
    } else {
      stopCopying();
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.headerTitle}>CopyTrader</Text>
            <Text style={s.headerSub}>
              {masterAcc ? `Master: ${masterAcc.name}` : 'No master selected'}
            </Text>
          </View>
          <View style={s.liveRow}>
            <View style={[s.dot, { backgroundColor: isRunning ? colors.green : colors.textMuted }]} />
            <Text style={[s.liveText, { color: isRunning ? colors.green : colors.textMuted }]}>
              {isRunning ? 'LIVE' : 'OFF'}
            </Text>
          </View>
        </View>

        {/* Big toggle */}
        <View style={s.toggleCard}>
          <View>
            <Text style={s.toggleLabel}>Copy trading</Text>
            <Text style={s.toggleSub}>
              {isRunning
                ? `Copying to ${activeFollowers} account${activeFollowers !== 1 ? 's' : ''}`
                : 'Tap to start copying trades'}
            </Text>
          </View>
          <Switch
            value={isRunning}
            onValueChange={handleToggle}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.textPrimary}
          />
        </View>

        {/* Stats row */}
        <View style={s.statsRow}>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Accounts</Text>
            <Text style={s.statValue}>{accounts.length}</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Active</Text>
            <Text style={s.statValue}>{activeFollowers}</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statLabel}>Trades today</Text>
            <Text style={s.statValue}>{recentTrades.length}</Text>
          </View>
          <View style={s.statCard}>
            <Text style={s.statLabel}>PnL today</Text>
            <Text style={[s.statValue, { color: totalPnlToday >= 0 ? colors.green : colors.red }]}>
              {totalPnlToday >= 0 ? '+' : ''}${totalPnlToday.toFixed(0)}
            </Text>
          </View>
        </View>

        {/* Recent trades */}
        <Text style={s.sectionTitle}>Recent copied trades</Text>

        {recentTrades.length === 0 ? (
          <View style={s.emptyCard}>
            <Text style={s.emptyText}>No trades copied yet</Text>
            <Text style={s.emptySub}>Start copying to see trades here</Text>
          </View>
        ) : (
          <View style={s.tradeList}>
            {recentTrades.map((trade, i) => (
              <View key={i} style={[s.tradeRow, i < recentTrades.length - 1 && s.tradeRowBorder]}>
                <View style={[s.dirBadge, { backgroundColor: trade.action === 'Buy' ? '#0A2E1E' : '#2E0F0F' }]}>
                  <Text style={[s.dirText, { color: trade.action === 'Buy' ? colors.green : colors.red }]}>
                    {trade.action === 'Buy' ? 'LONG' : 'SHORT'}
                  </Text>
                </View>
                <Text style={s.tradeSymbol}>{trade.symbol}</Text>
                <Text style={s.tradeCopies}>{trade.copiedTo} copied</Text>
                <Text style={s.tradeTime}>
                  {new Date(trade.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Quick nav to accounts */}
        {accounts.length === 0 && (
          <TouchableOpacity style={s.setupCard} onPress={() => navigation.navigate('Accounts')}>
            <Text style={s.setupTitle}>Get started →</Text>
            <Text style={s.setupSub}>Add your Tradovate accounts to begin</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '600', color: colors.textPrimary },
  headerSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  liveRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  liveText: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },

  toggleCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  toggleLabel: { fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  toggleSub: { fontSize: 13, color: colors.textSecondary, marginTop: 3 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  statLabel: { fontSize: 11, color: colors.textSecondary, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },

  sectionTitle: { fontSize: 13, fontWeight: '600', color: colors.textSecondary, letterSpacing: 0.5, marginBottom: 10, textTransform: 'uppercase' },

  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 28,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  emptyText: { fontSize: 15, color: colors.textSecondary },
  emptySub: { fontSize: 13, color: colors.textMuted, marginTop: 4 },

  tradeList: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  tradeRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  tradeRowBorder: { borderBottomWidth: 0.5, borderBottomColor: colors.border },
  dirBadge: { paddingHorizontal: 7, paddingVertical: 3, borderRadius: 5 },
  dirText: { fontSize: 11, fontWeight: '700' },
  tradeSymbol: { flex: 1, fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  tradeCopies: { fontSize: 12, color: colors.textSecondary },
  tradeTime: { fontSize: 12, color: colors.textMuted },

  setupCard: {
    marginTop: 16,
    backgroundColor: colors.primary + '22',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.primary + '44',
  },
  setupTitle: { fontSize: 16, fontWeight: '600', color: colors.primary },
  setupSub: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});
