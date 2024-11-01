import { Printer } from '../types';
import { mockApi } from './mockApi';

interface EmailNotification {
  to: string;
  subject: string;
  body: string;
}

export class EmailNotificationService {
  private static instance: EmailNotificationService;
  private lastNotifications: Map<string, string> = new Map();

  private constructor() {}

  static getInstance(): EmailNotificationService {
    if (!EmailNotificationService.instance) {
      EmailNotificationService.instance = new EmailNotificationService();
    }
    return EmailNotificationService.instance;
  }

  async notifyPrinterStatus(printer: Printer, ownerEmail: string): Promise<void> {
    const lastStatus = this.lastNotifications.get(printer.id);
    
    if (lastStatus !== printer.status) {
      const notification = this.createNotification(printer, ownerEmail);
      await this.sendEmail(notification);
      this.lastNotifications.set(printer.id, printer.status);
    }
  }

  private createNotification(printer: Printer, ownerEmail: string): EmailNotification {
    const status = printer.status === 'online' ? 'came online' : 'went offline';
    
    return {
      to: ownerEmail,
      subject: `Printer Status Change: ${printer.name}`,
      body: `Your printer "${printer.name}" ${status} at ${new Date().toLocaleString()}.
        
Current Status: ${printer.status}
Printer ID: ${printer.id}
Model: ${printer.model || 'N/A'}
Queue Size: ${printer.queue || 0}

This is an automated message from your PrintHand service.`
    };
  }

  private async sendEmail(notification: EmailNotification): Promise<void> {
    try {
      await mockApi.sendEmail(
        notification.to,
        notification.subject,
        notification.body
      );
    } catch (error) {
      console.error('Email notification failed:', error);
    }
  }
}

export const emailNotifier = EmailNotificationService.getInstance();