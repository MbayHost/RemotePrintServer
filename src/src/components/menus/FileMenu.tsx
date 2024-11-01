import React from 'react';
import { Menu } from '@headlessui/react';
import { Settings, Languages, RefreshCw, LogOut } from 'lucide-react';

export default function FileMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-4 py-1 hover:bg-gray-100">File</Menu.Button>
      <Menu.Items className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Settings size={16} className="mr-2" />
              Options...
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Languages size={16} className="mr-2" />
              Language
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <RefreshCw size={16} className="mr-2" />
              Check for update
            </button>
          )}
        </Menu.Item>
        <div className="border-t border-gray-200" />
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <LogOut size={16} className="mr-2" />
              Exit
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}