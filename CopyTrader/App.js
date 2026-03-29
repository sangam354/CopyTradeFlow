// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import DashboardScreen from './src/screens/DashboardScreen';
import AccountsScreen from './src/screens/AccountsScreen';
import AddAccountScreen from './src/screens/AddAccountScreen';
import TradesScreen from './src/screens/TradesScreen';
import PnlScreen from './src/screens/PnlScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { colors } from './src/utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.bg,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.primary,
  },
};

function TabIcon({ name, focused }) {
  const icons = { Home: '⊞', Accounts: '◎', Trades: '↕', PnL: '◑', Settings: '⚙' };
  return (
    <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.45 }}>{icons[name]}</Text>
  );
}

function AccountsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountsList" component={AccountsScreen} />
      <Stack.Screen name="AddAccount" component={AddAccountScreen} />
      <Stack.Screen name="EditAccount" component={AddAccountScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          height: 80,
          paddingBottom: 16,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11 },
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Accounts" component={AccountsStack} />
      <Tab.Screen name="Trades" component={TradesScreen} />
      <Tab.Screen name="PnL" component={PnlScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer theme={darkTheme}>
        <StatusBar style="light" />
        <MainTabs />
      </NavigationContainer>
    </AppProvider>
  );
}
