import React, { useState, useEffect, useCallback } from 'react';
import {
  MenuIcon,
  XIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";

const AdminLayout = React.memo(({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(() => {
    return {
      nom: localStorage.getItem('nom') || '',
      prenom: localStorage.getItem('prenom') || '',
      role: localStorage.getItem('role') || ''
    };
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      localStorage.clear();
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const getInitials = useCallback(() => {
    return `${user.prenom?.[0] || ''}${user.nom?.[0] || ''}`.toUpperCase();
  }, [user.nom, user.prenom]);

  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0d1117] text-gray-900 dark:text-white">
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

          <main className="flex-1 lg:ml-64 min-h-screen bg-gray-50 dark:bg-[#0d1117]">
            <div className="sticky top-0 z-30 w-full bg-white dark:bg-[#002855] border-b border-gray-200 dark:border-[#003366]/30">
              <div className="flex items-center justify-between px-4 md:px-6 py-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                  >
                    {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                  </button>
                  <p className="text-base md:text-lg font-medium text-gray-800 dark:text-white">
                    Bienvenue, <span className="text-yellow-400">{user.role}</span> :{' '}
                    {user.nom} {user.prenom}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    {darkMode ? (
                      <SunIcon className="w-6 h-6 text-yellow-400" />
                    ) : (
                      <MoonIcon className="w-6 h-6 text-blue-400" />
                    )}
                  </button>

                  
                  <Menu as="div" className="relative inline-block text-left">
  <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#e1e8f0] dark:bg-[#1a1a1a] text-gray-800 dark:text-white font-semibold uppercase shadow">
    {getInitials()}
  </Menu.Button>
  <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-[#1a1a1a] rounded-md shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
    <div className="py-1">
      
     
      <Menu.Item>
        {({ active }) => (
          <Link
            to="/profil"
            className={`${
              active ? 'bg-gray-100 dark:bg-gray-700' : ''
            } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full`}
          >
            <UserIcon className="w-4 h-4 mr-2" />
            Profil
          </Link>
        )}
      </Menu.Item>

      
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={handleLogout}
            className={`${
              active ? 'bg-gray-100 dark:bg-gray-700' : ''
            } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 w-full`}
          >
            <LogoutIcon className="w-4 h-4 mr-2" />
            Déconnexion
          </button>
        )}
      </Menu.Item>

    </div>
  </Menu.Items>
</Menu>

                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 lg:p-8">
              {React.Children.map(children, child => {
                return React.cloneElement(child, { key: 'content' });
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
});

export default AdminLayout;

