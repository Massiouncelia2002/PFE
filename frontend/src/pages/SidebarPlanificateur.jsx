// import React, { useState } from 'react';
// import {
//   HomeIcon,
//   ChartBarIcon,
//   CogIcon,
//   ChevronDownIcon,
//   ChevronRightIcon
// } from '@heroicons/react/outline';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ isOpen = true, closeSidebar = () => {} }) => {
//   const [openSections, setOpenSections] = useState({});

//   const toggleSection = (name) => {
//     setOpenSections((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//     }));
//   };

//   const navSections = [
//     {
//       title: null,
//       items: [
//         { name: 'Dashboard', icon: HomeIcon, to: '/admin-depot' },
//         { name: 'Settings', icon: CogIcon, to: '/settings' },
//       ],
//     },
//     {
//       title: 'Gestion',
//       items: [
//         {
//           name: 'Importer Commande',
//           icon: HomeIcon,
//           to: '/import-commandes',
//         },
//         {
//           name: 'Planifier Commande',
//           icon: ChartBarIcon,
//           children: [
//             { name: 'Mes dépôts', to: '/PlanifierMesDepots' },
//             { name: 'Prédictions', to: '/PrevisionsParUtilisateur' },
//             { name: 'Planifier', to: '/PlanifierCommande' },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <>
//       {/* Overlay mobile */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
//         onClick={closeSidebar}
//       />

//       <aside
//         className={`fixed top-0 left-0 h-screen w-64 z-50 transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 
//         bg-[#002855] dark:bg-[#1f2937] border-r border-[#003366]/30 dark:border-[#333333]/30`}
//       >
//         {/* Header Logo */}
//         <div className="px-5 py-5 border-b border-[#003366]/30 dark:border-[#333333]/30">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-white dark:bg-[#333333] rounded-lg flex items-center justify-center shadow overflow-hidden">
//               <img
//                 src="/images/logosansback.png"
//                 alt="Logo"
//                 className="w-12 h-12 object-contain"
//               />
//             </div>
//             <div className="flex flex-col">
//               <h1 className="text-lg font-bold text-white dark:text-gray-100 tracking-tight">
//                 StockFlow
//               </h1>
//               <p className="text-xs text-[#a8c6ff] dark:text-gray-400">CEVITAL</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex-1 overflow-y-auto h-[calc(100vh-130px)] custom-scrollbar px-3 py-4">
//           <nav className="space-y-2">
//             {navSections.map((section, idx) => (
//               <div key={idx} className="space-y-1">
//                 {section.title && (
//                   <div className="px-2 mb-2">
//                     <h3 className="text-[0.7rem] font-semibold text-[#a8c6ff]/80 dark:text-gray-400 uppercase tracking-wider">
//                       {section.title}
//                     </h3>
//                   </div>
//                 )}
//                 {section.items.map(({ name, icon: Icon, to, children }) => (
//                   <div key={name}>
//                     {children ? (
//                       <>
//                         <button
//                           onClick={() => toggleSection(name)}
//                           className={`w-full group flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all duration-200
//                             ${
//                               openSections[name]
//                                 ? 'bg-[#003366] dark:bg-[#2a2a2a] text-white dark:text-gray-100'
//                                 : 'hover:bg-[#003366]/50 dark:hover:bg-[#2a2a2a]/50 text-[#c9d8ff] dark:text-gray-300'
//                             }`}
//                         >
//                           <Icon className="w-5 h-5" />
//                           <span className="flex-1 text-sm font-medium">{name}</span>
//                           {openSections[name] ? (
//                             <ChevronDownIcon className="w-4 h-4 text-[#a8c6ff]/80 dark:text-gray-400/80" />
//                           ) : (
//                             <ChevronRightIcon className="w-4 h-4 text-[#a8c6ff]/80 dark:text-gray-400/80" />
//                           )}
//                         </button>
//                         <div
//                           className={`overflow-hidden transition-all duration-300 ${
//                             openSections[name] ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
//                           }`}
//                         >
//                           <div className="ml-6 mt-1 space-y-1 pl-3 border-l border-[#003366]/30 dark:border-[#333333]/30">
//                             {children.map((child) => (
//                               <Link
//                                 key={child.name}
//                                 to={child.to}
//                                 className="block px-3 py-2 text-xs font-medium text-[#a8c6ff]/90 dark:text-gray-400 hover:text-white dark:hover:text-gray-100 rounded hover:bg-[#003366]/30 dark:hover:bg-[#2a2a2a]/30 transition-all duration-200"
//                               >
//                                 {child.name}
//                               </Link>
//                             ))}
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <Link
//                         to={to}
//                         className="group flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-[#003366]/50 dark:hover:bg-[#2a2a2a]/50 text-[#c9d8ff] dark:text-gray-300 hover:text-white dark:hover:text-gray-100"
//                       >
//                         <Icon className="w-5 h-5" />
//                         <span className="text-sm font-medium">{name}</span>
//                       </Link>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </nav>
//         </div>

//         {/* Footer */}
//         <div className="px-5 py-3 border-t border-[#003366]/30 dark:border-[#333333]/30 bg-[#002855]/80 dark:bg-[#1a1a1a]/80">
//           <div className="flex items-center justify-between">
//             <div className="flex flex-col">
//               <div className="text-xs text-[#a8c6ff]/80 dark:text-gray-400">© 2025 CEVITAL</div>
//               <div className="text-[0.65rem] text-[#a8c6ff]/60 dark:text-gray-500 mt-0.5">
//                 StockFlow v1.0
//               </div>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
//               <span className="text-xs text-[#a8c6ff]/80 dark:text-gray-400">En ligne</span>
//             </div>
//           </div>
//         </div>
//       </aside>

//       <style >{`
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #3b82f6 transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background-color: #3b82f6;
//           border-radius: 3px;
//         }
//         .dark .custom-scrollbar {
//           scrollbar-color: #555 transparent;
//         }
//         .dark .custom-scrollbar::-webkit-scrollbar-thumb {
//           background-color: #555;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import {
  Home,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Package,
  Truck,
  Users,
  Layers,
  Link2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen = true, closeSidebar = () => {} }) => {
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
        { name: 'Dashboard', icon: Home, to: '/admin-depot' },
        { name: 'Settings', icon: Settings, to: '/settings' },
      ],
    },
    {
      title: 'Gestion',
      items: [
        {
          name: 'Importer Commande',
          icon: Layers,
          to: '/import-commandes',
        },
        {
          name: 'Planifier Commande',
          icon: BarChart3,
          children: [
            { name: 'Planifier mes commandes', to: '/PlanifierMesDepots' },
            { name: 'Prédictions', to: '/PrevisionsParUtilisateur' },
        
          ],
        },
      ],
    },
  ];

  return (
    <>
      {/* Overlay pour mobile */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />
      
      <aside 
        className={`fixed top-0 left-0 h-screen w-64 z-50 transform transition-all duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 bg-[#002855] dark:bg-[#1f2937] shadow-2xl border-r border-[#003366]/30 dark:border-[#333333]/30`}
      >
        {/* Header avec logo */}
        <div className="px-6 py-6 border-b border-[#003366]/30 dark:border-[#333333]/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ffffff] dark:bg-[#333333] rounded-lg flex items-center justify-center shadow">
              <img 
                src="/images/logosansback.png" 
                alt="StockFlow Logo" 
                className="w-19 h-19 rounded object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 rounded bg-white/10 backdrop-blur flex items-center justify-center text-white dark:text-gray-300 font-bold text-sm hidden">
                SF
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-white dark:text-gray-100 tracking-tight">
                StockFlow
              </h1>
              <p className="text-sm text-[#a8c6ff] dark:text-gray-400 font-medium">
                CEVITAL
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-140px)] custom-scrollbar">
          <nav className="px-4 py-5 space-y-2">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                {section.title && (
                  <div className="px-3 mb-3">
                    <h3 className="text-sm font-semibold text-[#a8c6ff]/80 dark:text-gray-400 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                )}
                
                <div className="space-y-1">
                  {section.items.map(({ name, icon: Icon, to, children }) => (
                    <div key={name}>
                      {children ? (
                        <>
                          <button
                            onClick={() => toggleSection(name)}
                            className={`w-full group flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                              openSections[name] 
                                ? 'bg-[#003366] dark:bg-[#2a2a2a] text-white dark:text-gray-100' 
                                : 'hover:bg-[#003366]/50 dark:hover:bg-[#2a2a2a]/50 text-[#c9d8ff] dark:text-gray-300 hover:text-yellow-400 hover:shadow-lg'
                            }`}
                          >
                            <Icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                              openSections[name] 
                                ? 'text-white dark:text-gray-100' 
                                : 'text-[#a8c6ff] dark:text-gray-400 group-hover:text-yellow-400 group-hover:scale-110'
                            }`} />
                            <span className="flex-1 text-base font-medium transition-all duration-300 group-hover:text-yellow-400">
                              {name}
                            </span>
                            {openSections[name] ? (
                              <ChevronDown className="w-5 h-5 text-[#a8c6ff]/80 dark:text-gray-400/80 group-hover:text-yellow-400 transition-all duration-300" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-[#a8c6ff]/80 dark:text-gray-400/80 group-hover:text-yellow-400 transition-all duration-300" />
                            )}
                          </button>
                          
                          <div className={`overflow-hidden transition-all duration-500 ${
                            openSections[name] ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="ml-8 mt-2 space-y-1 pl-4 border-l-2 border-[#003366]/30 dark:border-[#333333]/30">
                              {children.map((child) => (
                                <Link
                                  key={child.name}
                                  to={child.to}
                                  className="group block px-4 py-2.5 text-sm font-medium text-[#a8c6ff]/90 dark:text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-400 rounded-lg hover:bg-[#003366]/30 dark:hover:bg-[#2a2a2a]/30 transition-all duration-300 transform hover:scale-105 hover:shadow-md flex items-center gap-3"
                                >
                                  <div className="w-2 h-2 rounded-full bg-[#a8c6ff]/70 dark:bg-gray-500 group-hover:bg-yellow-400 dark:group-hover:bg-yellow-400 transition-all duration-300 group-hover:scale-125"></div>
                                  <span className="transition-all duration-300">{child.name}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link
                          to={to}
                          className="group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-[#003366]/50 dark:hover:bg-[#2a2a2a]/50 text-[#c9d8ff] dark:text-gray-300 hover:text-yellow-400 dark:hover:text-yellow-400 hover:shadow-lg"
                        >
                          <Icon className="w-5 h-5 flex-shrink-0 text-[#a8c6ff] dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 transition-all duration-300 group-hover:scale-110" />
                          <span className="flex-1 text-base font-medium transition-all duration-300">
                            {name}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#003366]/30 dark:border-[#333333]/30 bg-[#002855]/80 dark:bg-[#1a1a1a]/80">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="text-sm text-[#a8c6ff]/80 dark:text-gray-400">
                © 2025 CEVITAL
              </div>
              <div className="text-xs text-[#a8c6ff]/60 dark:text-gray-500 mt-0.5">
                StockFlow v1.0
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-[#a8c6ff]/80 dark:text-gray-400">En ligne</span>
            </div>
          </div>
        </div>
      </aside>

      <style jsx global>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3b82f6;
          border-radius: 4px;
        }
        .dark .custom-scrollbar {
          scrollbar-color: #555 transparent;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #555;
        }
      `}</style>
    </>
  );
};

export default Sidebar;