export interface User {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  subscriptionEnd?: string;
  status: 'active' | 'inactive' | 'pending';
  platform: 'windows' | 'android' | 'web';
  lastActive: string;
  subscriptionTier: 'free' | 'basic' | 'premium';
  deviceId?: string;
  activationCode?: string;
}

export interface Printer {
  id: string;
  name: string;
  type: 'local' | 'remote';
  status: 'online' | 'offline' | 'opening';
  owner?: string;
  isShared: boolean;
  model?: string;
  queue?: number;
  sharedWith?: string[];
  settings?: PrinterSettings;
}

export interface PrinterSettings {
  defaultPaperSize: 'A4' | 'Letter' | 'Legal';
  colorMode: 'color' | 'blackAndWhite' | 'grayscale';
  duplexPrinting: boolean;
  resolution: '300' | '600' | '1200';
  defaultTray: 'auto' | 'tray1' | 'tray2' | 'manual';
  notifications: boolean;
  autoRetry: boolean;
  retryAttempts: number;
  timeout: number;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'basic' | 'premium';
  status: 'active' | 'inactive' | 'pending';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  lastPayment?: string;
  nextPayment?: string;
}

export interface PrintJob {
  id: string;
  userId: string;
  printerId: string;
  filename: string;
  status: 'pending' | 'printing' | 'completed' | 'failed';
  timestamp: string;
  retries?: number;
  error?: string;
  settings?: PrintJobSettings;
}

export interface PrintJobSettings {
  copies: number;
  paperSize: string;
  orientation: 'portrait' | 'landscape';
  colorMode: 'color' | 'blackAndWhite' | 'grayscale';
  duplexPrinting: boolean;
  pageRanges?: string;
}