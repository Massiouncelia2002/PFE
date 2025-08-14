import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GraphPrevisions = () => {
  const [dataByArticle, setDataByArticle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historiqueRes, previsionRes] = await Promise.all([
          axios.get("http://localhost:5000/api/prediction/historique"),
          axios.get("http://localhost:5000/api/prediction/previsions")
        ]);

        const mergedData = {};

     
        historiqueRes.data.forEach(item => {
          const article = item.codeArticle;
          if (!mergedData[article]) mergedData[article] = [];
          mergedData[article].push({
            mois: item.mois,
            historique: parseInt(item.quantiteDemandee),
            quantitePrevue: null
          });
        });

       
        previsionRes.data.forEach(item => {
          const article = item.codeArticle;
          if (!mergedData[article]) mergedData[article] = [];
          mergedData[article].push({
            mois: item.mois,
            historique: null,
            quantitePrevue: parseInt(item.quantitePrevue)
          });
        });

        
        Object.keys(mergedData).forEach(article => {
          mergedData[article].sort((a, b) => new Date(a.mois) - new Date(b.mois));
        });

        setDataByArticle(mergedData);

      } catch (err) {
        console.error("Erreur chargement des données :", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {Object.entries(dataByArticle).map(([code, data]) => (
        <div key={code}>
          <h2 className="text-xl font-bold mb-2">{code}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mois" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="historique" stroke="#3498db" name="Historique" />
              <Line type="monotone" dataKey="quantitePrevue" stroke="#e74c3c" name="Prévision" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
};

export default GraphPrevisions;
