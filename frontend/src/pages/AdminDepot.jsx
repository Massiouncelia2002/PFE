// import React, { useState } from 'react';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
// import AdminLayoutDepot from './AdminLayoutDepot';

// const AdminDepot = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Données fictives pour les graphiques
//   const pieData = [
//     { name: 'Livraisons effectuées', value: 60 },
//     { name: 'Réapprovisionnements', value: 30 },
//     { name: 'En attente', value: 10 },
//   ];

//   const barData = [
//     { name: 'Janvier', Réapprovisionnements: 20 },
//     { name: 'Février', Réapprovisionnements: 35 },
//     { name: 'Mars', Réapprovisionnements: 25 },
//   ];

//   const lineData = [
//     { name: 'Semaine 1', Livraisons: 50 },
//     { name: 'Semaine 2', Livraisons: 70 },
//     { name: 'Semaine 3', Livraisons: 60 },
//   ];

//   const COLORS = ['#002855', '#FFC72C', '#FFFFFF'];

//   return (
//     <AdminLayoutDepot
//       darkMode={darkMode}
//       setDarkMode={setDarkMode}
//       searchTerm={searchTerm}
//       setSearchTerm={setSearchTerm}
//     >
//       <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Tableau de bord – Admin Dépôt</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white">État des opérations</h2>
//           <PieChart width={200} height={200}>
//             <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Réapprovisionnements mensuels</h2>
//           <BarChart width={300} height={200} data={barData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="Réapprovisionnements" fill="#002855" />
//           </BarChart>
//         </div>

//         <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
//           <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Livraisons hebdomadaires</h2>
//           <LineChart width={300} height={200} data={lineData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="Livraisons" stroke="#FFC72C" />
//           </LineChart>
//         </div>
//       </div>
//     </AdminLayoutDepot>
//   );
// };

// export default AdminDepot;


import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Truck, PackageCheck, Clock, TrendingUp, Activity } from 'lucide-react';
import AdminLayoutDepot from './AdminLayoutDepot';

const AdminDepot = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Données pour les graphiques
  const pieData = [
    { name: 'Livraisons effectuées', value: 60 },
    { name: 'Réapprovisionnements', value: 30 },
    { name: 'En attente', value: 10 },
  ];

  const barData = [
    { name: 'Janvier', Réapprovisionnements: 20, Livraisons: 35 },
    { name: 'Février', Réapprovisionnements: 35, Livraisons: 45 },
    { name: 'Mars', Réapprovisionnements: 25, Livraisons: 50 },
  ];

  const lineData = [
    { name: 'Semaine 1', Livraisons: 50, Réapprovisionnements: 20 },
    { name: 'Semaine 2', Livraisons: 70, Réapprovisionnements: 25 },
    { name: 'Semaine 3', Livraisons: 60, Réapprovisionnements: 30 },
  ];

  const COLORS = ['#002855', '#FFC72C', '#FFFFFF'];

  const statsCards = [
    { title: 'Livraisons Effectuées', value: '60', change: '+15%', icon: Truck, color: 'from-blue-900 to-blue-700' },
    { title: 'Réapprovisionnements', value: '30', change: '+5%', icon: PackageCheck, color: 'from-yellow-500 to-yellow-400' },
    { title: 'Opérations en Attente', value: '10', change: '-2%', icon: Clock, color: 'from-gray-700 to-gray-600' },
    { title: 'Taux de Réussite', value: '95.5%', change: '+1.8%', icon: Activity, color: 'from-blue-800 to-blue-600' }
  ];

  return (
    <AdminLayoutDepot
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Tableau de bord – Admin Dépôt</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400' : 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400'} px-2 py-1 rounded-full`}>
                    {stat.change}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Graphique en secteurs */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">État des Opérations</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Répartition des activités du dépôt</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <Activity className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={5}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {pieData.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Graphique en barres */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Activités Mensuelles</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Comparaison livraisons et réapprovisionnements</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <PackageCheck className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="Livraisons" 
                      fill="#002855"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      dataKey="Réapprovisionnements" 
                      fill="#FFC72C"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Graphique linéaire */}
        <div className="mt-6">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tendance Hebdomadaire</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Évolution des livraisons et réapprovisionnements</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tendance:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">+12.5%</span>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: darkMode ? '#9CA3AF' : '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(12px)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Livraisons" 
                    stroke="#002855"
                    strokeWidth={3}
                    dot={{ fill: '#002855', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#002855', stroke: '#FFC72C', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Réapprovisionnements" 
                    stroke="#FFC72C"
                    strokeWidth={3}
                    dot={{ fill: '#FFC72C', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#FFC72C', stroke: '#002855', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutDepot>
  );
};

export default AdminDepot;