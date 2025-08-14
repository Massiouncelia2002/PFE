import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Package, Activity, Target, BarChart3 } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminFonctionnel = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);


  const pieData = [
    { name: 'Admin Fonctionnel', value: 1 },
    { name: 'Planificateur', value: 2 },
    { name: 'Admin Dépôt', value: 1 },
  ];

  const barData = [
    { name: 'avril', Commandes:10 },
    { name: 'mai', Commandes: 4 },
    { name: 'juin', Commandes: 7 },
  ];

  const lineData = [
    { name: 'Semaine 1', Volume: 100 },
    { name: 'Semaine 2', Volume: 200 },
    { name: 'Semaine 3', Volume: 150 },
  ];

  const COLORS = ['#002855', '#FFC72C', '#FFFFFF'];

  const statsCards = [
    { title: 'Utilisateurs Actifs', value: '4', icon: Users, color: 'from-blue-900 to-blue-700' },
    { title: 'Nombre articles', value: '15', icon: Package, color: 'from-yellow-500 to-yellow-400' },
    { title: 'Nombre clients', value: '21', icon: Activity, color: 'from-gray-700 to-gray-600' },
    { title: 'Nombre Depots', value: '12', icon: Target, color: 'from-blue-800 to-blue-600' }
  ];

  return (
    <AdminLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Tableau de bord – Admin Fonctionnel</h1>

      
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
                  <span className="text-xs font-medium text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full">
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

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-1">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Répartition des Rôles</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Distribution actuelle des utilisateurs</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
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

       
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Évolution des client</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nombre de client inserer chaque mois</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <Package className="w-5 h-5 text-white" />
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
                    <Bar 
                      dataKey="Commandes" 
                      fill="url(#barGradient)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#002855" />
                        <stop offset="100%" stopColor="#FFC72C" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tendance du Volume</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyse hebdomadaire des volumes traités</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tendance:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">+15.2%</span>
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
                  <Line 
                    type="monotone" 
                    dataKey="Volume" 
                    stroke="#FFC72C"
                    strokeWidth={3}
                    dot={{ fill: '#002855', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#FFC72C', stroke: '#002855', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFonctionnel;