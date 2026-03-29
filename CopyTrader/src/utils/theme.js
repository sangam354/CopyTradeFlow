// src/utils/theme.js

export const colors = {
  bg: '#0A0A0A',
  surface: '#161616',
  card: '#1C1C1C',
  border: '#2A2A2A',
  borderLight: '#333333',
  primary: '#1D9E75',
  primaryDark: '#0F6E56',
  danger: '#E24B4A',
  warning: '#EF9F27',
  blue: '#378ADD',
  textPrimary: '#F5F5F5',
  textSecondary: '#888888',
  textMuted: '#555555',
  green: '#1D9E75',
  red: '#E24B4A',
};

export const avatarColors = [
  { bg: '#0F2A3F', text: '#378ADD' },
  { bg: '#0A2E1E', text: '#1D9E75' },
  { bg: '#2A1A30', text: '#9B7FD4' },
  { bg: '#2E1A0A', text: '#EF9F27' },
  { bg: '#2E0F0F', text: '#E24B4A' },
  { bg: '#1A2A1A', text: '#63B941' },
];

export function getAvatarColor(index) {
  return avatarColors[index % avatarColors.length];
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const propFirms = [
  'Topstep',
  'Apex Trader Funding',
  'Funded Trader Pro',
  'MyFundedFutures',
  'TradeDay',
  'BluSky Futures',
  'Earn2Trade',
  'Leeloo Trading',
  'Other',
];
