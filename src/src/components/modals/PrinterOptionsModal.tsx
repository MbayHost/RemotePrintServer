import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Printer } from '../../types';

interface PrinterOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  printer: Printer;
}

export default function PrinterOptionsModal({
  isOpen,
  onClose,
  printer
}: PrinterOptionsModalProps) {
  const [settings, setSettings] = useState({
    defaultPaperSize: 'A4',
    colorMode: 'color',
    duplexPrinting: true,
    resolution: '600',
    defaultTray: 'auto',
    notifications: true,
    autoRetry: true,
    retryAttempts: 3,
    timeout: 30,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">{printer.name}</h2>
            <p className="text-sm text-gray-500">{printer.model}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium">Print Settings</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Default Paper Size</label>
              <select
                value={settings.defaultPaperSize}
                onChange={(e) => setSettings(s => ({ ...s, defaultPaperSize: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="A4">A4</option>
                <option value="Letter">Letter</option>
                <option value="Legal">Legal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color Mode</label>
              <select
                value={settings.colorMode}
                onChange={(e) => setSettings(s => ({ ...s, colorMode: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="color">Color</option>
                <option value="blackAndWhite">Black & White</option>
                <option value="grayscale">Grayscale</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Resolution (DPI)</label>
              <select
                value={settings.resolution}
                onChange={(e) => setSettings(s => ({ ...s, resolution: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="300">300 DPI</option>
                <option value="600">600 DPI</option>
                <option value="1200">1200 DPI</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Default Paper Tray</label>
              <select
                value={settings.defaultTray}
                onChange={(e) => setSettings(s => ({ ...s, defaultTray: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="auto">Auto Select</option>
                <option value="tray1">Tray 1</option>
                <option value="tray2">Tray 2</option>
                <option value="manual">Manual Feed</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Advanced Settings</h3>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Duplex Printing</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.duplexPrinting}
                  onChange={(e) => setSettings(s => ({ ...s, duplexPrinting: e.target.checked }))}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Print Notifications</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => setSettings(s => ({ ...s, notifications: e.target.checked }))}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Auto Retry on Failure</label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  checked={settings.autoRetry}
                  onChange={(e) => setSettings(s => ({ ...s, autoRetry: e.target.checked }))}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Retry Attempts</label>
              <input
                type="number"
                min="1"
                max="5"
                value={settings.retryAttempts}
                onChange={(e) => setSettings(s => ({ ...s, retryAttempts: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Connection Timeout (seconds)</label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.timeout}
                onChange={(e) => setSettings(s => ({ ...s, timeout: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}