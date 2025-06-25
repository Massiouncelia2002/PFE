import React, { useState } from 'react';
import { MenuIcon, XIcon, HomeIcon, ChartBarIcon, CogIcon, UserIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (name) => {
    setOpenSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navSections = [
    {
      title: null,
      items: [
        { name: 'Dashboard', icon: HomeIcon, to: '/admin-depot' },
        { name: 'Settings', icon: CogIcon, to: '/settings' },
      ],
    },
    {
      title: 'Gestion',
      items: [
      
        {
          name: 'ENTREES Dépôts',
          icon: HomeIcon,
          to: '/EntreeStock',
        },
        {
          name: 'Livraison',
          icon: ChartBarIcon,
          children: [
            { name: 'afficher planification', to: '/liste-articles' },
            { name: 'gerer les documents', to: '/articles' },
          ],
        },
        {
          name: 'Consulter les commandes planifiees',
          icon: HomeIcon,
          to: '/AffichePlanificationAdmin',
        },
        
        
        
      ],
    },
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`} onClick={closeSidebar} />
      <aside className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 w-64 border-r border-gray-200 dark:border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 w-full flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Analytics</h2>
            <nav className="space-y-4">
              {navSections.map((section, idx) => (
                <div key={idx}>
                  {section.title && (
                    <p className="text-xs uppercase text-gray-500 dark:text-gray-400 px-3 mb-1">
                      {section.title}
                    </p>
                  )}
                  <div className="space-y-1">
                    {section.items.map(({ name, icon: Icon, to, children }) => (
                      <div key={name}>
                        {children ? (
                          <>
                            <button
                              onClick={() => toggleSection(name)}
                              className="w-full flex items-center gap-3 p-3 rounded-lg text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                              <Icon className="w-5 h-5" />
                              <span className="flex-1">{name}</span>
                              {openSections[name] ? (
                                <ChevronDownIcon className="w-4 h-4" />
                              ) : (
                                <ChevronRightIcon className="w-4 h-4" />
                              )}
                            </button>
                            {openSections[name] && (
                              <div className="ml-8 space-y-1">
                                {children.map((child) => (
                                  <Link
                                    key={child.name}
                                    to={child.to}
                                    className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={to}
                            className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                            <span>{name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-8">© 2025 CEVITAL</div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

