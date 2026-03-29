// src/screens/AccountsScreen.js
import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, getInitials, getAvatarColor } from '../utils/theme';

export default function AccountsScreen({ navigation }) {
  const { accounts, masterId, setMasterAccount, updateAccount, removeAccount, testConnection } = useApp();
  const [testing, setTesting] = useState({});

  const master = accounts.find((a) => a.id === masterId);
  const followers = accounts.filter((a) => a.id !== masterId);

  async function handleTest(acc) {
    setTesting((p) => ({ ...p, [acc.id]: true }));
    const result = await testConnection(acc);
    setTesting((p) => ({ ...p, [acc.id]: false }));
    if (result.success) {
      Alert.alert('Connected!', `${acc.name} authenticated successfully.`);
    } else {
      Alert.alert('Connection failed', result.error);
    }
  }

  function handleDelete(acc) {
    Alert.alert(
      'Remove account',
      `Remove ${acc.name}? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeAccount(acc.id) },
      ]
    );
  }

  function handleSetMaster(acc) {
    Alert.alert(
      'Set as master',
      `Set "${acc.name}" as the master account? All trades from this account will be copied to followers.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Set master', onPress: () => setMasterAccount(acc.id) },
      ]
    );
  }

  function renderAccount(acc, index, isMaster = false) {
    const av = getAvatarColor(index);
    const statusColor = acc.status === 'connected' ? colors.green
      : acc.status === 'error' ? colors.red
      : colors.textMuted;

    return (
      <View key={acc.id} style={s.accountCard}>
        <View style={s.cardTop}>
          <View style={[s.avatar, { backgroundColor: av.bg }]}>
            <Text style={[s.avatarText, { color: av.text }]}>{getInitials(acc.name)}</Text>
          </View>
          <View style={s.accountInfo}>
            <View style={s.nameRow}>
              <Text style={s.accountName}>{acc.name}</Text>
              {isMaster && (
                <View style={s.masterBadge}>
                  <Text style={s.masterBadgeText}>MASTER</Text>
                </View>
              )}
            </View>
            <Text style={s.accountMeta}>{acc.propFirm} · {acc.username}</Text>
            <Text style={[s.accountStatus, { color: statusColor }]}>
              {acc.status === 'connected' ? 'Connected'
                : acc.status === 'error' ? 'Error'
                : 'Not connected'}
            </Text>
          </View>
          {!isMaster && (
            <Switch
              value={acc.enabled}
              onValueChange={(v) => updateAccount(acc.id, { enabled: v })}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.textPrimary}
              style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
            />
          )}
        </View>

        {!isMaster && (
          <View style={s.multiplierRow}>
            <Text style={s.multiplierLabel}>Lot multiplier</Text>
            <View style={s.multiplierButtons}>
              {[0.25, 0.5, 1, 1.5, 2, 3].map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[s.mBtn, acc.multiplier === m && s.mBtnActive]}
                  onPress={() => updateAccount(acc.id, { multiplier: m })}
                >
                  <Text style={[s.mBtnText, acc.multiplier === m && s.mBtnTextActive]}>
                    {m}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={s.cardActions}>
          <TouchableOpacity
            style={s.actionBtn}
            onPress={() => handleTest(acc)}
            disabled={!!testing[acc.id]}
          >
            <Text style={s.actionBtnText}>
              {testing[acc.id] ? 'Testing...' : 'Test connection'}
            </Text>
          </TouchableOpacity>

          {!isMaster && (
            <TouchableOpacity style={s.actionBtn} onPress={() => handleSetMaster(acc)}>
              <Text style={s.actionBtnText}>Set as master</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={s.actionBtn} onPress={() => navigation.navigate('EditAccount', { account: acc })}>
            <Text style={s.actionBtnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[s.actionBtn, s.actionBtnDanger]} onPress={() => handleDelete(acc)}>
            <Text style={s.actionBtnDangerText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView style={s.scroll} contentContainerStyle={s.container} showsVerticalScrollIndicator={false}>

        <View style={s.header}>
          <Text style={s.headerTitle}>Accounts</Text>
          <TouchableOpacity style={s.addBtn} onPress={() => navigation.navigate('AddAccount')}>
            <Text style={s.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {accounts.length === 0 && (
          <View style={s.emptyState}>
            <Text style={s.emptyTitle}>No accounts yet</Text>
            <Text style={s.emptySub}>Add your Tradovate accounts to get started</Text>
            <TouchableOpacity style={s.emptyAddBtn} onPress={() => navigation.navigate('AddAccount')}>
              <Text style={s.emptyAddBtnText}>Add first account</Text>
            </TouchableOpacity>
          </View>
        )}

        {master && (
          <>
            <Text style={s.sectionLabel}>Master account</Text>
            {renderAccount(master, 0, true)}
          </>
        )}

        {followers.length > 0 && (
          <>
            <Text style={s.sectionLabel}>Follower accounts ({followers.length})</Text>
            {followers.map((acc, i) => renderAccount(acc, i + 1))}
          </>
        )}

        {!master && accounts.length > 0 && (
          <View style={s.noMasterBanner}>
            <Text style={s.noMasterText}>Tap "Set as master" on any account to choose your master.</Text>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  container: { padding: 20, paddingBottom: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '600', color: colors.textPrimary },
  addBtn: { backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
  addBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },

  sectionLabel: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10, marginTop: 4 },

  accountCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 14, fontWeight: '700' },
  accountInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  accountName: { fontSize: 15, fontWeight: '600', color: colors.textPrimary },
  masterBadge: { backgroundColor: colors.primary + '22', paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  masterBadgeText: { fontSize: 10, fontWeight: '700', color: colors.primary, letterSpacing: 0.5 },
  accountMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  accountStatus: { fontSize: 12, marginTop: 2 },

  multiplierRow: { marginTop: 14, paddingTop: 14, borderTopWidth: 0.5, borderTopColor: colors.border },
  multiplierLabel: { fontSize: 12, color: colors.textSecondary, marginBottom: 8 },
  multiplierButtons: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  mBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  mBtnActive: { backgroundColor: colors.primary + '22', borderColor: colors.primary },
  mBtnText: { fontSize: 13, color: colors.textSecondary, fontWeight: '500' },
  mBtnTextActive: { color: colors.primary },

  cardActions: { flexDirection: 'row', gap: 8, marginTop: 14, flexWrap: 'wrap' },
  actionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.card,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  actionBtnText: { fontSize: 12, color: colors.textSecondary },
  actionBtnDanger: { borderColor: colors.red + '44' },
  actionBtnDangerText: { fontSize: 12, color: colors.red },

  noMasterBanner: {
    backgroundColor: colors.warning + '18',
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: colors.warning + '44',
    marginTop: 8,
  },
  noMasterText: { fontSize: 13, color: colors.warning },

  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: colors.textPrimary },
  emptySub: { fontSize: 14, color: colors.textSecondary, marginTop: 6, textAlign: 'center' },
  emptyAddBtn: {
    marginTop: 20,
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyAddBtnText: { fontSize: 15, fontWeight: '600', color: '#fff' },
});
