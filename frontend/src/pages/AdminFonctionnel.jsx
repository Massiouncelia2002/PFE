
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import AdminLayout from './AdminLayout';

const AdminFonctionnel = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Données statiques pour les graphiques
  const pieData = [
    { name: 'Admin Fonctionnel', value: 5 },
    { name: 'Planificateur', value: 3 },
    { name: 'Admin Dépôt', value: 2 },
  ];

  const barData = [
    { name: 'Janvier', Commandes: 40 },
    { name: 'Février', Commandes: 30 },
    { name: 'Mars', Commandes: 50 },
  ];

  const lineData = [
    { name: 'Semaine 1', Volume: 100 },
    { name: 'Semaine 2', Volume: 200 },
    { name: 'Semaine 3', Volume: 150 },
  ];

  const COLORS = ['#002855', '#FFC72C', '#FFFFFF'];

  return (
    <AdminLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Tableau de bord – Admin Fonctionnel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Répartition des rôles</h2>
          <PieChart width={200} height={200}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Commandes par Mois</h2>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Commandes" fill="#002855" />
          </BarChart>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Volume Hebdomadaire</h2>
          <LineChart width={300} height={200} data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Volume" stroke="#FFC72C" />
          </LineChart>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFonctionnel;
