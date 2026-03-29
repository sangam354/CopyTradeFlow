// src/screens/PnlScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, getInitials, getAvatarColor } from '../utils/theme';

export default function PnlScreen() {
  const { accounts, masterId } = useApp();

  const total = accounts.reduce((s, a) => s + (a.pnlToday || 0), 0);
  const totalAllTime = accounts.reduce((s, a) => s + (a.pnlAllTime || 0), 0);

  const maxAbs = Math.max(...accounts.map((a) => Math.abs(a.pnlToday || 0)), 1);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>

        <Text style={s.headerTitle}>PnL dashboard</Text>

        {/* Summary cards */}
        <View style={s.summaryRow}>
          <View style={s.summaryCard}>
            <Text style={s.summaryLabel}>Today</Text>
            <Text style={[s.summaryValue, { color: total >= 0 ? colors.green : colors.red }]}>
              {total >= 0 ? '+' : ''}${total.toFixed(2)}
            </Text>
          </View>
          <View style={s.summaryCard}>
            <Text style={s.summaryLabel}>All time</Text>
            <Text style={[s.summaryValue, { color: totalAllTime >= 0 ? colors.green : colors.red }]}>
              {totalAllTime >= 0 ? '+' : ''}${totalAllTime.toFixed(2)}
            </Text>
          </View>
        </View>

        <Text style={s.sectionLabel}>Per account</Text>

        {accounts.length === 0 && (
          <View style={s.empty}>
            <Text style={s.emptyText}>Add accounts to see PnL here</Text>
          </View>
        )}

        {accounts.map((acc, i) => {
          const pnl = acc.pnlToday || 0;
          const pnlAll = acc.pnlAllTime || 0;
          const isMaster = acc.id === masterId;
          const av = getAvatarColor(i);
          const barWidth = maxAbs === 0 ? 0 : Math.abs(pnl) / maxAbs;

          return (
            <View key={acc.id} style={s.accountCard}>
              <View style={s.cardTop}>
                <View style={[s.avatar, { backgroundColor: av.bg }]}>
                  <Text style={[s.avatarText, { color: av.text }]}>{getInitials(acc.name)}</Text>
                </View>
                <View style={s.info}>
                  <View style={s.nameRow}>
                    <Text style={s.accName}>{acc.name}</Text>
                    {isMaster && <View style={s.masterBadge}><Text style={s.masterBadgeText}>MASTER</Text></View>}
                  </View>
                  <Text style={s.accMeta}>{acc.propFirm}</Text>
                </View>
                <View style={s.pnlCol}>
                  <Text style={[s.pnlToday, { color: pnl >= 0 ? colors.green : colors.red }]}>
                    {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                  </Text>
                  <Text style={s.pnlAllTime}>{pnlAll >= 0 ? '+' : ''}${pnlAll.toFixed(0)} all time</Text>
                </View>
              </View>

              {/* Bar */}
              <View style={s.barTrack}>
                <View
                  style={[
                    s.barFill,
                    {
                      width: `${(barWidth * 100).toFixed(1)}%`,
                      backgroundColor: pnl >= 0 ? colors.green : colors.red,
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 20, paddingBottom: 40 },
  headerTitle: { fontSize: 24, fontWeight: '600', color: colors.textPrimary, marginBottom: 18 },

  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  summaryLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
  summaryValue: { fontSize: 24, fontWeight: '700' },

  sectionLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 },

  accountCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  avatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 12, fontWeight: '700' },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  accName: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  accMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  masterBadge: { backgroundColor: colors.primary + '22', paddingHorizontal: 6, paddingVertical: 1, borderRadius: 5 },
  masterBadgeText: { fontSize: 9, fontWeight: '700', color: colors.primary },
  pnlCol: { alignItems: 'flex-end' },
  pnlToday: { fontSize: 15, fontWeight: '700' },
  pnlAllTime: { fontSize: 11, color: colors.textMuted, marginTop: 2 },

  barTrack: { height: 5, backgroundColor: colors.card, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3, minWidth: 4 },

  empty: { padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 15, color: colors.textSecondary },
});
