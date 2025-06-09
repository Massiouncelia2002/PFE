
import React, { useState, useEffect } from 'react';
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

const AdminLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState({ nom: '', prenom: '', role: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/', { replace: true });
    } else {
      const nom = localStorage.getItem('nom') || '';
      const prenom = localStorage.getItem('prenom') || '';
      const role = localStorage.getItem('role') || '';
      setUser({ nom, prenom, role });
    }
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('nom');
      localStorage.removeItem('prenom');
      localStorage.removeItem('role');
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

          <main className="flex-1 lg:ml-64">
            {/* Topbar */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-30">
              <div className="flex items-center justify-between px-4 md:px-6 py-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                  </button>

                  {/* Message de bienvenue */}
                  <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-200">
                    Bienvenue, {user.role} : {user.nom} {user.prenom}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {darkMode ? (
                      <SunIcon className="w-6 h-6 text-gray-400" />
                    ) : (
                      <MoonIcon className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  <Menu as="div" className="relative inline-block text-left">
                    <Menu.Button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold">
                      U
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
                            >
                              <UserIcon className="w-4 h-4 mr-2" />
                              Profil
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200`}
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

            {/* Main content */}
            <div className="p-4 md:p-6 lg:p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
