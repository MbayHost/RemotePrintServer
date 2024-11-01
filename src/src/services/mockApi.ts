import { User, Printer, Subscription } from '../types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
let mockUsers: User[] = [];
let mockSubscriptions: Subscription[] = [];

// Mock printer database
let mockPrinters: Printer[] = [
  {
    id: '1',
    name: 'PDFCreator',
    type: 'local',
    status: 'online',
    isShared: false,
    model: 'PDF Creator 8.0',
    queue: 0
  },
  {
    id: '2',
    name: 'PDF Architect 9',
    type: 'local',
    status: 'online',
    isShared: false,
    model: 'PDF Architect 9.0',
    queue: 0
  },
  {
    id: '3',
    name: 'Microsoft XPS Document Writer',
    type: 'local',
    status: 'online',
    isShared: false,
    model: 'XPS Writer 2.0',
    queue: 0
  }
];

// Generate activation code
const generateActivationCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

// Generate subscription code
const generateSubscriptionCode = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export const mockApi = {
  async register(data: {
    email: string;
    password: string;
    name: string;
    platform: 'windows' | 'android' | 'web';
    deviceId?: string;
  }): Promise<{ user: User; subscription: Subscription }> {
    await delay(500);

    const existingUser = mockUsers.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
      status: 'pending',
      platform: data.platform,
      deviceId: data.deviceId,
      lastActive: new Date().toISOString(),
      subscriptionTier: 'free',
      activationCode: generateActivationCode(),
      nickname: data.email.split('@')[0]
    };

    const subscription: Subscription = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      plan: 'free',
      status: 'pending',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: false
    };

    mockUsers.push(user);
    mockSubscriptions.push(subscription);

    // Simulate sending activation email
    console.log('Activation email sent:', {
      to: user.email,
      code: user.activationCode
    });

    return { user, subscription };
  },

  async login(data: {
    email: string;
    password: string;
    platform: 'windows' | 'android' | 'web';
    deviceId?: string;
  }): Promise<{ user: User; subscription: Subscription }> {
    await delay(300);

    const user = mockUsers.find(u => u.email === data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const subscription = mockSubscriptions.find(s => s.userId === user.id);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Update last active
    user.lastActive = new Date().toISOString();
    user.platform = data.platform;
    user.deviceId = data.deviceId;

    return { user, subscription };
  },

  async activateEmail(userId: string, code: string): Promise<{ user: User; subscription: Subscription }> {
    await delay(300);

    const user = mockUsers.find(u => u.id === userId && u.activationCode === code);
    if (!user) {
      throw new Error('Invalid activation code');
    }

    user.status = 'active';
    user.activationCode = undefined;

    const subscription = mockSubscriptions.find(s => s.userId === user.id);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.status = 'active';

    return { user, subscription };
  },

  async resendActivation(userId: string): Promise<void> {
    await delay(300);

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.activationCode = generateActivationCode();

    // Simulate sending activation email
    console.log('Activation email resent:', {
      to: user.email,
      code: user.activationCode
    });
  },

  async updateSubscription(
    userId: string,
    plan: 'free' | 'basic' | 'premium'
  ): Promise<{ user: User; subscription: Subscription }> {
    await delay(300);

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    const subscription = mockSubscriptions.find(s => s.userId === userId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    subscription.plan = plan;
    subscription.status = 'pending';
    const subscriptionCode = generateSubscriptionCode();

    // Simulate sending subscription code email
    console.log('Subscription code email sent:', {
      to: user.email,
      code: subscriptionCode,
      plan
    });

    return { user, subscription };
  },

  async activateSubscription(
    userId: string,
    code: string
  ): Promise<{ user: User; subscription: Subscription }> {
    await delay(300);

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }

    const subscription = mockSubscriptions.find(s => s.userId === userId);
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // In real implementation, validate the subscription code
    subscription.status = 'active';
    subscription.startDate = new Date().toISOString();
    subscription.endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    user.subscriptionTier = subscription.plan;

    return { user, subscription };
  },

  async discoverPrinters(): Promise<Printer[]> {
    await delay(200);
    return mockPrinters;
  },

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await delay(100);
    console.log('Email sent:', { to, subject, body });
  }
};