import React, { useState } from 'react';
import {
  MenuIcon,
  XIcon,
  MoonIcon,
  SunIcon,
  SearchIcon,
  UserIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { Menu } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
const AdminLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      navigate('/');
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

                  <div className="relative">
                    <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-gray-700 text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    {darkMode ? <SunIcon className="w-6 h-6 text-gray-400" /> : <MoonIcon className="w-6 h-6 text-gray-400" />}
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
