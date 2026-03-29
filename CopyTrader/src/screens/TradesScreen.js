// src/screens/TradesScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors } from '../utils/theme';
import { clearTradeLog } from '../services/storage';

export default function TradesScreen() {
  const { tradeLog } = useApp();

  function handleClear() {
    Alert.alert('Clear trade log', 'This will delete all logged trades from your device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: async () => { await clearTradeLog(); } },
    ]);
  }

  function renderTrade({ item, index }) {
    const isLong = item.action === 'Buy';
    const timeStr = new Date(item.time).toLocaleString([], {
      month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    return (
      <View style={[s.tradeCard, index === 0 && s.tradeCardFirst]}>
        <View style={s.tradeTop}>
          <View style={[s.dirBadge, { backgroundColor: isLong ? '#0A2E1E' : '#2E0F0F' }]}>
            <Text style={[s.dirText, { color: isLong ? colors.green : colors.red }]}>
              {isLong ? 'LONG' : 'SHORT'}
            </Text>
          </View>
          <Text style={s.symbol}>{item.symbol}</Text>
          <Text style={s.time}>{timeStr}</Text>
        </View>
        <View style={s.tradeBottom}>
          <View style={s.stat}>
            <Text style={s.statLabel}>Master qty</Text>
            <Text style={s.statVal}>{item.qty}</Text>
          </View>
          <View style={s.stat}>
            <Text style={s.statLabel}>Copied to</Text>
            <Text style={[s.statVal, { color: colors.green }]}>{item.copiedTo}</Text>
          </View>
          {item.failed > 0 && (
            <View style={s.stat}>
              <Text style={s.statLabel}>Failed</Text>
              <Text style={[s.statVal, { color: colors.red }]}>{item.failed}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Trade history</Text>
        {tradeLog.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={s.clearBtn}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {tradeLog.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyTitle}>No trades yet</Text>
          <Text style={s.emptySub}>Copied trades will appear here</Text>
        </View>
      ) : (
        <FlatList
          data={tradeLog}
          keyExtractor={(item) => String(item.id || item.time)}
          renderItem={renderTrade}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: '600', color: colors.textPrimary },
  clearBtn: { fontSize: 14, color: colors.red },

  list: { padding: 20, paddingTop: 10, paddingBottom: 40 },

  tradeCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  tradeCardFirst: { borderColor: colors.primary + '44' },

  tradeTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  dirBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  dirText: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  symbol: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.textPrimary },
  time: { fontSize: 12, color: colors.textMuted },

  tradeBottom: { flexDirection: 'row', gap: 20 },
  stat: {},
  statLabel: { fontSize: 11, color: colors.textSecondary, marginBottom: 2 },
  statVal: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },

  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  emptySub: { fontSize: 14, color: colors.textSecondary, marginTop: 6 },
});
