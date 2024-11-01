import { useState, useEffect } from 'react';
import { Printer } from '../types';
import { printerDiscovery } from '../services/printerDiscovery';
import { emailNotifier } from '../services/emailNotifier';
import { useAuth } from '../contexts/AuthContext';

export function usePrinterDiscovery() {
  const [printers, setPrinters] = useState<Printer[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = printerDiscovery.subscribe(async (discoveredPrinters) => {
      setPrinters(discoveredPrinters);
      
      // Send email notifications for owned printers
      if (user?.email) {
        discoveredPrinters
          .filter(printer => printer.owner === user.nickname)
          .forEach(printer => {
            emailNotifier.notifyPrinterStatus(printer, user.email);
          });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return printers;
}