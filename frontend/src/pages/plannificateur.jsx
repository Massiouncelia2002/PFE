import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Calendar, ClipboardList, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import AdminLayoutPlannificateur from './AdminLayoutPlannificateur';

const PlannificateurDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);


  const pieData = [
    { name: 'Plans exécutés', value: 75 },
    { name: 'Plans en cours', value: 20 },
    { name: 'Plans en retard', value: 5 },
  ];

  const barData = [
    { name: 'Janvier', 'Plans créés': 15, 'Plans exécutés': 12 },
    { name: 'Février', 'Plans créés': 18, 'Plans exécutés': 16 },
    { name: 'Mars', 'Plans créés': 20, 'Plans exécutés': 18 },
  ];

  const lineData = [
    { name: 'Semaine 1', 'Plans créés': 5, 'Plans exécutés': 4 },
    { name: 'Semaine 2', 'Plans créés': 7, 'Plans exécutés': 6 },
    { name: 'Semaine 3', 'Plans créés': 8, 'Plans exécutés': 7 },
  ];

  const COLORS = ['#002855', '#FFC72C', '#FFFFFF'];

  const statsCards = [
    { title: 'Plans Créés', value: '45', change: '+18%', icon: ClipboardList, color: 'from-blue-900 to-blue-700' },
    { title: 'Plans Exécutés', value: '40', change: '+15%', icon: CheckCircle, color: 'from-yellow-500 to-yellow-400' },
    { title: 'Plans en Retard', value: '5', change: '-3%', icon: Clock, color: 'from-gray-700 to-gray-600' },
    { title: 'Taux de Réussite', value: '88.9%', change: '+2.5%', icon: TrendingUp, color: 'from-blue-800 to-blue-600' }
  ];

  return (
    <AdminLayoutPlannificateur
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Tableau de bord – Planificateur</h1>

        
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

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
          <div className="lg:col-span-1">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">État des Plans</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Répartition des plans de livraison</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <Calendar className="w-5 h-5 text-white" />
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
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Activités Mensuelles</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Plans créés vs plans exécutés</p>
                </div>
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <ClipboardList className="w-5 h-5 text-white" />
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
                      dataKey="Plans créés" 
                      fill="#002855"
                      radius={[8, 8, 0, 0]}
                    />
                    <Bar 
                      dataKey="Plans exécutés" 
                      fill="#FFC72C"
                      radius={[8, 8, 0, 0]}
                    />
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Tendance Hebdomadaire</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Évolution des plans créés et exécutés</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tendance:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">+14.3%</span>
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
                    dataKey="Plans créés" 
                    stroke="#002855"
                    strokeWidth={3}
                    dot={{ fill: '#002855', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#002855', stroke: '#FFC72C', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Plans exécutés" 
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
    </AdminLayoutPlannificateur>
  );
};

export default PlannificateurDashboard;