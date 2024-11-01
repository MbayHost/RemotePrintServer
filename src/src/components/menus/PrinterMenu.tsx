import React from 'react';
import { Menu } from '@headlessui/react';
import { Share2, Undo2, Settings2, Search, Inbox, Workflow } from 'lucide-react';

export default function PrinterMenu() {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="px-4 py-1 hover:bg-gray-100">Printer</Menu.Button>
      <Menu.Items className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Share2 size={16} className="mr-2" />
              Share
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Undo2 size={16} className="mr-2" />
              Unshare
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Settings2 size={16} className="mr-2" />
              Properties...
            </button>
          )}
        </Menu.Item>
        <div className="border-t border-gray-200" />
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Search size={16} className="mr-2" />
              Find...
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Inbox size={16} className="mr-2" />
              Incoming Documents
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
              <Workflow size={16} className="mr-2" />
              Automation
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}