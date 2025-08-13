import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';
import AdminLayoutDepot from './PlanificateurLayout';

const AdminDepot = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Données fictives pour les graphiques
  const pieData = [
    { name: 'Livraisons effectuées', value: 60 },
    { name: 'Réapprovisionnements', value: 30 },
    { name: 'En attente', value: 10 },
  ];

  const barData = [
    { name: 'Janvier', Réapprovisionnements: 20 },
    { name: 'Février', Réapprovisionnements: 35 },
    { name: 'Mars', Réapprovisionnements: 25 },
  ];

  const lineData = [
    { name: 'Semaine 1', Livraisons: 50 },
    { name: 'Semaine 2', Livraisons: 70 },
    { name: 'Semaine 3', Livraisons: 60 },
  ];

  const COLORS = ['#002855', '#FFC72C', '#FFFFFF'];

  return (
    <AdminLayoutDepot
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Tableau de bord – Admin Dépôt</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">État des opérations</h2>
          <PieChart width={200} height={200}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Réapprovisionnements mensuels</h2>
          <BarChart width={300} height={200} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Réapprovisionnements" fill="#002855" />
          </BarChart>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Livraisons hebdomadaires</h2>
          <LineChart width={300} height={200} data={lineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Livraisons" stroke="#FFC72C" />
          </LineChart>
        </div>
      </div>
    </AdminLayoutDepot>
  );
};

export default AdminDepot;
