import React, { useState } from 'react';
import { Printer as PrinterIcon, Settings as SettingsIcon, AlertTriangle, CheckCircle2, RotateCcw } from 'lucide-react';
import { usePrinterDiscovery } from '../hooks/usePrinterDiscovery';
import PrinterOptionsModal from './modals/PrinterOptionsModal';
import { Printer } from '../types';
import PrintJobStatus from './PrintJobStatus';

export default function PrinterList() {
  const printers = usePrinterDiscovery();
  const [selectedPrinter, setSelectedPrinter] = useState<Printer | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  
  const localPrinters = printers.filter(p => p.type === 'local');
  const remotePrinters = printers.filter(p => p.type === 'remote');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle2 className="text-green-500" size={16} />;
      case 'offline':
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <RotateCcw className="text-blue-500 animate-spin" size={16} />;
    }
  };

  const getPrinterIcon = (model: string = '') => {
    const iconClass = model.toLowerCase().includes('pdf') ? 'text-purple-500' : 'text-blue-500';
    return <PrinterIcon className={iconClass} size={20} />;
  };

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Share</h2>
          <span className="text-sm text-gray-600">For printer owners</span>
        </div>
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Printer</th>
                <th className="text-left p-4">Sharing</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localPrinters.map((printer) => (
                <tr key={printer.id} className="border-b last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getPrinterIcon(printer.model)}
                      <div>
                        <div className="font-medium">{printer.name}</div>
                        <div className="text-sm text-gray-500">{printer.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-sm ${printer.isShared ? 'bg-green-500' : 'bg-gray-200'}`}></span>
                      {printer.isShared ? 'Shared' : 'Not shared'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(printer.status)}
                      <span className={`${printer.status === 'online' ? 'text-green-600' : 'text-blue-600'}`}>
                        {printer.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setSelectedPrinter(printer);
                        setShowOptions(true);
                      }}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                    >
                      <SettingsIcon size={16} />
                      Options
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Print</h2>
          <span className="text-sm text-gray-600">For printer users</span>
        </div>
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Printer</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Owner</th>
                <th className="text-left p-4">Queue</th>
              </tr>
            </thead>
            <tbody>
              {remotePrinters.map((printer) => (
                <tr key={printer.id} className="border-b last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getPrinterIcon(printer.model)}
                      <div>
                        <div className="font-medium">{printer.name}</div>
                        <div className="text-sm text-gray-500">{printer.model}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(printer.status)}
                      <span className={printer.status === 'online' ? 'text-green-600' : 'text-red-600'}>
                        {printer.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">{printer.owner}</td>
                  <td className="p-4">
                    {printer.queue && printer.queue > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {printer.queue} in queue
                      </span>
                    ) : (
                      <span className="text-gray-500">No queue</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <PrintJobStatus />

      {selectedPrinter && (
        <PrinterOptionsModal
          isOpen={showOptions}
          onClose={() => {
            setShowOptions(false);
            setSelectedPrinter(null);
          }}
          printer={selectedPrinter}
        />
      )}
    </div>
  );
}