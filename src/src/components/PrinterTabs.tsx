import React, { useState } from 'react';
import { Printer } from '../types';
import LocalPrinterList from './LocalPrinterList';
import RemotePrinterList from './RemotePrinterList';

interface PrinterTabsProps {
  localPrinters: Printer[];
  remotePrinters: Printer[];
  onToggleShare: (printerId: string) => void;
  onRemovePrinter: (printerId: string) => void;
}

export default function PrinterTabs({
  localPrinters,
  remotePrinters,
  onToggleShare,
  onRemovePrinter
}: PrinterTabsProps) {
  const [activeTab, setActiveTab] = useState<'share' | 'print'>('share');

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'share'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('share')}
          >
            Share
            <span className="ml-2 text-xs text-gray-400">For printer owners</span>
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'print'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('print')}
          >
            Print
            <span className="ml-2 text-xs text-gray-400">For printer users</span>
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'share' ? (
          <LocalPrinterList
            printers={localPrinters}
            onToggleShare={onToggleShare}
          />
        ) : (
          <RemotePrinterList
            printers={remotePrinters}
            onRemovePrinter={onRemovePrinter}
          />
        )}
      </div>
    </div>
  );
}