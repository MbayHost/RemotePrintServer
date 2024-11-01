import React from 'react';
import { Printer } from '../types';

interface RemotePrinterListProps {
  printers: Printer[];
  onRemovePrinter: (printerId: string) => void;
}

export default function RemotePrinterList({
  printers,
  onRemovePrinter
}: RemotePrinterListProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-700 mb-2">Remote printers</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Printer
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                Owner
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
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      {printer.status}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">
                  {printer.owner}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
          Find Printer
        </button>
        <button className="px-4 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded">
          Remove
        </button>
      </div>
    </div>
  );
}