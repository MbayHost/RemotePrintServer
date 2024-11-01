import { Printer } from '../types';
import { mockApi } from './mockApi';

const DISCOVERY_INTERVAL = 5000;

class PrinterDiscoveryService {
  private static instance: PrinterDiscoveryService;
  private listeners: ((printers: Printer[]) => void)[] = [];
  private activePrinters: Map<string, Printer> = new Map();
  private discoveryInterval: NodeJS.Timer | null = null;

  private constructor() {
    this.startDiscovery();
  }

  static getInstance(): PrinterDiscoveryService {
    if (!PrinterDiscoveryService.instance) {
      PrinterDiscoveryService.instance = new PrinterDiscoveryService();
    }
    return PrinterDiscoveryService.instance;
  }

  private async discoverPrinters(): Promise<void> {
    try {
      const discoveredPrinters = await mockApi.discoverPrinters();
      
      // Update printer statuses
      discoveredPrinters.forEach(printer => {
        const existing = this.activePrinters.get(printer.id);
        if (!existing || existing.status !== printer.status) {
          this.activePrinters.set(printer.id, printer);
          this.notifyListeners();
        }
      });

      // Check for offline printers
      this.activePrinters.forEach((printer, id) => {
        if (!discoveredPrinters.find(p => p.id === id)) {
          const offlinePrinter = { ...printer, status: 'offline' as const };
          this.activePrinters.set(id, offlinePrinter);
          this.notifyListeners();
        }
      });
    } catch (error) {
      console.error('Printer discovery failed:', error);
    }
  }

  private startDiscovery(): void {
    if (!this.discoveryInterval) {
      // Initial discovery
      this.discoverPrinters();
      
      this.discoveryInterval = setInterval(() => {
        this.discoverPrinters();
      }, DISCOVERY_INTERVAL);
    }
  }

  subscribe(callback: (printers: Printer[]) => void): () => void {
    this.listeners.push(callback);
    callback(Array.from(this.activePrinters.values()));

    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    const printers = Array.from(this.activePrinters.values());
    this.listeners.forEach(listener => listener(printers));
  }

  dispose(): void {
    if (this.discoveryInterval) {
      clearInterval(this.discoveryInterval);
      this.discoveryInterval = null;
    }
    this.listeners = [];
    this.activePrinters.clear();
  }
}

export const printerDiscovery = PrinterDiscoveryService.getInstance();