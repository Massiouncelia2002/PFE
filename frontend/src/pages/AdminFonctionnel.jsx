import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

const AdminFonctionnel = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3000/utilisateurs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Erreur lors de la récupération des utilisateurs');

        const data = await res.json();
        setUtilisateurs(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateurs();
  }, []);

  const utilisateursFiltres = utilisateurs.filter((u) =>
    `${u.prenom} ${u.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Tableau de bord – Admin Fonctionnel
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Chargement des utilisateurs...</p>
      ) : (
        <div className="space-y-4">
          {utilisateursFiltres.map((user) => (
            <div
              key={user.codeutilis}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow text-gray-900 dark:text-white"
            >
              <p className="font-semibold">
                {user.nom} {user.prenom}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminFonctionnel;






