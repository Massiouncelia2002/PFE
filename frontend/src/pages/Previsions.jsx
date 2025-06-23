// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Previsions = () => {
//   const [previsions, setPrevisions] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/prediction/previsions")
//       .then((res) => {
//         setPrevisions(res.data);
//       })
//       .catch((err) => {
//         console.error("Erreur lors du chargement des prévisions", err);
//       });
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">📈 Prévisions des Commandes</h2>
//       <table className="min-w-full border text-sm">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Code Article</th>
//             <th className="p-2 border">Mois</th>
//             <th className="p-2 border">Quantité Prévue</th>
//           </tr>
//         </thead>
//         <tbody>
//           {previsions.map((item, index) => (
//             <tr key={index}>
//               <td className="p-2 border">{item.codeArticle}</td>
//               <td className="p-2 border">{item.mois}</td>
//               <td className="p-2 border">{item.quantitePrevue}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Previsions;







// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const GraphPrevisions = () => {
//   const [previsions, setPrevisions] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/prediction/previsions")
//       .then(res => setPrevisions(res.data))
//       .catch(err => console.error("Erreur de chargement :", err));
//   }, []);

//   // Regrouper les prévisions par article
//   const articles = {};
//   previsions.forEach(p => {
//     if (!articles[p.codeArticle]) articles[p.codeArticle] = [];
//     articles[p.codeArticle].push({
//       mois: p.mois,
//       quantitePrevue: parseInt(p.quantitePrevue)
//     });
//   });

//   return (
//     <div className="space-y-8">
//       {Object.entries(articles).map(([code, data]) => (
//         <div key={code}>
//           <h2 className="text-xl font-bold">{code}</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="mois" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="quantitePrevue" stroke="#8884d8" name="Prévision" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default GraphPrevisions;







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

        // Historique
        historiqueRes.data.forEach(item => {
          const article = item.codeArticle;
          if (!mergedData[article]) mergedData[article] = [];
          mergedData[article].push({
            mois: item.mois,
            historique: parseInt(item.quantiteDemandee),
            quantitePrevue: null
          });
        });

        // Prévisions
        previsionRes.data.forEach(item => {
          const article = item.codeArticle;
          if (!mergedData[article]) mergedData[article] = [];
          mergedData[article].push({
            mois: item.mois,
            historique: null,
            quantitePrevue: parseInt(item.quantitePrevue)
          });
        });

        // Trier par mois
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
