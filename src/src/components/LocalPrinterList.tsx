import React from 'react';
import { Share2 } from 'lucide-react';
import { Printer } from '../types';

interface LocalPrinterListProps {
  printers: Printer[];
  onToggleShare: (printerId: string) => void;
}

export default function LocalPrinterList({
  printers,
  onToggleShare
}: LocalPrinterListProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-2">Local printers</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Printer
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Sharing
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {printers.map((printer) => (
              <tr key={printer.id}>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {printer.name}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => onToggleShare(printer.id)}
                    className="flex items-center text-sm text-gray-600"
                  >
                    <Share2 size={16} className="mr-1" />
                    {printer.isShared ? 'Shared' : 'Not shared'}
                  </button>
                </td>
                <td className="px-4 py-2">
                  <span className="text-sm text-purple-600">
                    {printer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
          Share
        </button>
        <button className="px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
          Properties
        </button>
        <button className="px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
          Incoming
        </button>
      </div>
    </div>
  );
}