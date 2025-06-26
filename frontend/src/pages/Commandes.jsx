import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '../components/ui/Card';
import { Loader } from 'lucide-react';
import { toast } from 'react-toastify';

const Commandes = () => {
  const [depots, setDepots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const response = await axios.get('http://localhost:5000/depot/mes-depots', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDepots(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des dépôts :", error);
        toast.error("Impossible de charger vos dépôts");
      } finally {
        setLoading(false);
      }
    };

    fetchDepots();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mes Dépôts (Commandes)</h1>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader className="animate-spin h-6 w-6 text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {depots.length === 0 ? (
            <p className="text-gray-500">Aucun dépôt affecté.</p>
          ) : (
            depots.map((depot) => (
              <Card key={depot.codeDepot}>
                <CardContent className="p-4">
                  <h2 className="text-lg font-semibold">{depot.nom}</h2>
                  <p className="text-sm text-gray-500">Code : {depot.codeDepot}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Commandes;
