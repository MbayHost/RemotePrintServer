import { User, Subscription } from '../types';
import { mockApi } from './mockApi';

interface RegisterData {
  email: string;
  password: string;
  name: string;
  platform: 'windows' | 'android' | 'web';
  deviceId?: string;
}

interface LoginData {
  email: string;
  password: string;
  platform: 'windows' | 'android' | 'web';
  deviceId?: string;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private currentSubscription: Subscription | null = null;

  private constructor() {
    this.loadStoredSession();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private loadStoredSession(): void {
    const storedUser = localStorage.getItem('printer_user');
    const storedSubscription = localStorage.getItem('printer_subscription');
    
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
    if (storedSubscription) {
      this.currentSubscription = JSON.parse(storedSubscription);
    }
  }

  private saveSession(user: User, subscription: Subscription): void {
    localStorage.setItem('printer_user', JSON.stringify(user));
    localStorage.setItem('printer_subscription', JSON.stringify(subscription));
    this.currentUser = user;
    this.currentSubscription = subscription;
  }

  async register(data: RegisterData): Promise<{ user: User; subscription: Subscription }> {
    const result = await mockApi.register(data);
    this.saveSession(result.user, result.subscription);
    return result;
  }

  async login(data: LoginData): Promise<{ user: User; subscription: Subscription }> {
    const result = await mockApi.login(data);
    this.saveSession(result.user, result.subscription);
    return result;
  }

  async activateEmail(code: string): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');
    const result = await mockApi.activateEmail(this.currentUser.id, code);
    this.saveSession(result.user, result.subscription);
  }

  async resendActivation(): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');
    await mockApi.resendActivation(this.currentUser.id);
  }

  async updateSubscription(plan: 'free' | 'basic' | 'premium'): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');
    const result = await mockApi.updateSubscription(this.currentUser.id, plan);
    this.saveSession(result.user, result.subscription);
  }

  async activateSubscription(code: string): Promise<void> {
    if (!this.currentUser) throw new Error('No user logged in');
    const result = await mockApi.activateSubscription(this.currentUser.id, code);
    this.saveSession(result.user, result.subscription);
  }

  logout(): void {
    localStorage.removeItem('printer_user');
    localStorage.removeItem('printer_subscription');
    this.currentUser = null;
    this.currentSubscription = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  getCurrentSubscription(): Subscription | null {
    return this.currentSubscription;
  }

  isEmailVerified(): boolean {
    return this.currentUser?.status === 'active';
  }

  isSubscriptionActive(): boolean {
    return this.currentSubscription?.status === 'active';
  }
}

export const authService = AuthService.getInstance();