// src/screens/AddAccountScreen.js
import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, Alert, Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import { colors, propFirms } from '../utils/theme';

export default function AddAccountScreen({ navigation, route }) {
  const { addAccount, updateAccount } = useApp();
  const editing = route?.params?.account;

  const [name, setName] = useState(editing?.name || '');
  const [username, setUsername] = useState(editing?.username || '');
  const [password, setPassword] = useState(editing?.password || '');
  const [appId, setAppId] = useState(editing?.appId || '');
  const [cid, setCid] = useState(editing?.cid || '');
  const [sec, setSec] = useState(editing?.sec || '');
  const [propFirm, setPropFirm] = useState(editing?.propFirm || 'Topstep');
  const [isDemo, setIsDemo] = useState(editing?.isDemo ?? true);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!name.trim()) { Alert.alert('Required', 'Please enter an account name.'); return; }
    if (!username.trim()) { Alert.alert('Required', 'Please enter your Tradovate username.'); return; }
    if (!password.trim()) { Alert.alert('Required', 'Please enter your password.'); return; }

    setSaving(true);
    try {
      if (editing) {
        await updateAccount(editing.id, { name, username, password, appId, cid, sec, propFirm, isDemo });
        Alert.alert('Saved', 'Account updated successfully.');
      } else {
        await addAccount({ name, username, password, appId, cid, sec, propFirm, isDemo, status: 'disconnected' });
        Alert.alert('Account added', `${name} has been added. Test the connection in the Accounts tab.`);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView style={s.scroll} contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

          {/* Header */}
          <View style={s.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={s.backBtn}>← Back</Text>
            </TouchableOpacity>
            <Text style={s.headerTitle}>{editing ? 'Edit account' : 'Add account'}</Text>
          </View>

          {/* Info banner */}
          <View style={s.infoBanner}>
            <Text style={s.infoText}>
              Your credentials are encrypted and stored securely on your device. They are never sent anywhere except directly to Tradovate's servers.
            </Text>
          </View>

          {/* Nickname */}
          <Text style={s.label}>Account nickname</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. Topstep Account 1"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          {/* Prop firm picker */}
          <Text style={s.label}>Prop firm</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chipScroll}>
            {propFirms.map((f) => (
              <TouchableOpacity
                key={f}
                style={[s.chip, propFirm === f && s.chipActive]}
                onPress={() => setPropFirm(f)}
              >
                <Text style={[s.chipText, propFirm === f && s.chipTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Demo / Live toggle */}
          <View style={s.demoRow}>
            <View>
              <Text style={s.label} style={{ marginBottom: 2 }}>Environment</Text>
              <Text style={s.demoSub}>{isDemo ? 'Using Tradovate demo server' : 'Using Tradovate live server'}</Text>
            </View>
            <View style={s.demoToggle}>
              <Text style={[s.demoLabel, !isDemo && s.demoLabelActive]}>Live</Text>
              <Switch
                value={isDemo}
                onValueChange={setIsDemo}
                trackColor={{ false: colors.red + '88', true: colors.green + '88' }}
                thumbColor={colors.textPrimary}
              />
              <Text style={[s.demoLabel, isDemo && s.demoLabelActive]}>Demo</Text>
            </View>
          </View>

          {/* Credentials */}
          <Text style={s.sectionTitle}>Tradovate credentials</Text>

          <Text style={s.label}>Username</Text>
          <TextInput
            style={s.input}
            placeholder="Your Tradovate username"
            placeholderTextColor={colors.textMuted}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={s.label}>Password</Text>
          <TextInput
            style={s.input}
            placeholder="Your Tradovate password"
            placeholderTextColor={colors.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={s.sectionTitle}>API credentials (optional)</Text>
          <Text style={s.sectionSub}>
            Required only if your Tradovate account uses API-based authentication. Find these in your Tradovate account settings under "API Access".
          </Text>

          <Text style={s.label}>App ID</Text>
          <TextInput
            style={s.input}
            placeholder="e.g. MyTradingApp"
            placeholderTextColor={colors.textMuted}
            value={appId}
            onChangeText={setAppId}
            autoCapitalize="none"
          />

          <Text style={s.label}>CID</Text>
          <TextInput
            style={s.input}
            placeholder="Client ID from Tradovate"
            placeholderTextColor={colors.textMuted}
            value={cid}
            onChangeText={setCid}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={s.label}>SEC</Text>
          <TextInput
            style={s.input}
            placeholder="Client secret from Tradovate"
            placeholderTextColor={colors.textMuted}
            value={sec}
            onChangeText={setSec}
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Save */}
          <TouchableOpacity
            style={[s.saveBtn, saving && s.saveBtnDisabled]}
            onPress={handleSave}
            disabled={saving}
          >
            <Text style={s.saveBtnText}>{saving ? 'Saving...' : editing ? 'Save changes' : 'Add account'}</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { flex: 1 },
  container: { padding: 20, paddingBottom: 60 },

  header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  backBtn: { fontSize: 15, color: colors.primary },
  headerTitle: { fontSize: 20, fontWeight: '600', color: colors.textPrimary },

  infoBanner: {
    backgroundColor: colors.blue + '18',
    borderRadius: 12,
    padding: 14,
    marginBottom: 22,
    borderWidth: 0.5,
    borderColor: colors.blue + '44',
  },
  infoText: { fontSize: 13, color: colors.blue, lineHeight: 19 },

  label: { fontSize: 12, fontWeight: '600', color: colors.textSecondary, marginBottom: 7, marginTop: 16, textTransform: 'uppercase', letterSpacing: 0.4 },

  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: colors.border,
    padding: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },

  chipScroll: { marginBottom: 4 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginRight: 8,
  },
  chipActive: { backgroundColor: colors.primary + '22', borderColor: colors.primary },
  chipText: { fontSize: 13, color: colors.textSecondary },
  chipTextActive: { color: colors.primary, fontWeight: '600' },

  demoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 0.5,
    borderColor: colors.border,
  },
  demoSub: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  demoToggle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  demoLabel: { fontSize: 13, color: colors.textMuted },
  demoLabelActive: { color: colors.textPrimary, fontWeight: '600' },

  sectionTitle: { fontSize: 16, fontWeight: '600', color: colors.textPrimary, marginTop: 28, marginBottom: 4 },
  sectionSub: { fontSize: 13, color: colors.textSecondary, lineHeight: 19, marginBottom: 4 },

  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveBtnDisabled: { opacity: 0.5 },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
