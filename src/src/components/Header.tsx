import React from 'react';
import { Printer } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FileMenu from './menus/FileMenu';
import UserMenu from './menus/UserMenu';
import PrinterMenu from './menus/PrinterMenu';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-2">
            <Printer className="text-blue-600" size={20} />
            <span className="font-semibold">PrintHand: 3936865</span>
          </div>
          {user && <div className="text-sm text-green-600">{user.email}</div>}
        </div>
        <div className="flex border-b border-gray-200">
          <FileMenu />
          <UserMenu />
          <PrinterMenu />
          <button className="px-4 py-1 hover:bg-gray-100">Help</button>
        </div>
      </div>
    </header>
  );
}