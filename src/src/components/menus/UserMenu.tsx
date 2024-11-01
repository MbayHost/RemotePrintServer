import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { LogIn, User, Lock, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProfileModal from '../profile/ProfileModal';
import ChangePasswordModal from '../profile/ChangePasswordModal';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="px-4 py-1 hover:bg-gray-100">User</Menu.Button>
        <Menu.Items className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 focus:outline-none">
          {!user ? (
            <Menu.Item>
              {({ active }) => (
                <button className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}>
                  <LogIn size={16} className="mr-2" />
                  Log In...
                </button>
              )}
            </Menu.Item>
          ) : (
            <>
              <Menu.Item>
                {({ active }) => (
                  <button 
                    onClick={() => setShowProfileModal(true)}
                    className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button 
                    onClick={() => setShowPasswordModal(true)}
                    className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <Lock size={16} className="mr-2" />
                    Change Password
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logout}
                    className={`${active ? 'bg-gray-100' : ''} flex w-full items-center px-4 py-2 text-sm text-gray-700`}
                  >
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </>
          )}
        </Menu.Items>
      </Menu>

      <ProfileModal 
        isOpen={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
      
      <ChangePasswordModal 
        isOpen={showPasswordModal} 
        onClose={() => setShowPasswordModal(false)} 
      />
    </>
  );
}