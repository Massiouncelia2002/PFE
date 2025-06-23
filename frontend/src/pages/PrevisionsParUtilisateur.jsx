// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid,
//   Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import { useEffect, useState } from 'react';
// import axios from 'axios';


// const PrevisionsParUtilisateur = () => {
//   const [dataByArticle, setDataByArticle] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("⛔ Aucun token trouvé. L'utilisateur n'est pas authentifié.");
//         return;
//       }

//       try {
//         const [historiqueRes, previsionRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/prediction/historique/utilisateur", {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//           axios.get("http://localhost:5000/api/prediction/previsions/utilisateur", {
//             headers: { Authorization: `Bearer ${token}` }
//           }),
//         ]);

//         const mergedData = {};

//         // Historique
//         historiqueRes.data.forEach(item => {
//           const article = item.codeArticle;
//           if (!mergedData[article]) mergedData[article] = [];
//           mergedData[article].push({
//             mois: item.mois,
//             historique: parseInt(item.quantiteDemandee),
//             quantitePrevue: null
//           });
//         });

//         // Prévisions
//         previsionRes.data.forEach(item => {
//           const article = item.codeArticle;
//           if (!mergedData[article]) mergedData[article] = [];
//           mergedData[article].push({
//             mois: item.mois,
//             historique: null,
//             quantitePrevue: parseInt(item.quantitePrevue)
//           });
//         });

//         // Trier les données par mois
//         Object.keys(mergedData).forEach(article => {
//           mergedData[article].sort((a, b) => new Date(a.mois) - new Date(b.mois));
//         });

//         setDataByArticle(mergedData);

//       } catch (err) {
//         console.error("❌ Erreur lors du chargement des données :", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-8">
//       {Object.entries(dataByArticle).map(([code, data]) => (
//         <div key={code}>
//           <h2 className="text-xl font-bold mb-2">{code}</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="mois" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="historique" stroke="#3498db" name="Historique" />
//               <Line type="monotone" dataKey="quantitePrevue" stroke="#e74c3c" name="Prévision" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default  PrevisionsParUtilisateur;









import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';

const couleurs = [
  "#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f1c40f", "#1abc9c",
  "#e67e22", "#34495e", "#7f8c8d", "#d35400"
];

const PrevisionsParUtilisateur = () => {
  const [dataByArticle, setDataByArticle] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⛔ Aucun token trouvé.");
        return;
      }

      try {
        const [historiqueRes, previsionRes] = await Promise.all([
          axios.get("http://localhost:5000/api/prediction/historique/utilisateur", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get("http://localhost:5000/api/prediction/previsions/utilisateur", {
            headers: { Authorization: `Bearer ${token}` }
          }),
        ]);

        const merged = {};

        // ⚙️ Fusionner historique
        historiqueRes.data.forEach(item => {
          const key = item.codeArticle;
          const subKey = `${item.codeDepot}_historique`;
          if (!merged[key]) merged[key] = {};
          if (!merged[key][item.mois]) merged[key][item.mois] = { mois: item.mois };
          merged[key][item.mois][subKey] = parseInt(item.quantiteDemandee);
        });

        // ⚙️ Fusionner prévision
        previsionRes.data.forEach(item => {
          const key = item.codeArticle;
          const subKey = `${item.codeDepot}_prevision`;
          if (!merged[key]) merged[key] = {};
          if (!merged[key][item.mois]) merged[key][item.mois] = { mois: item.mois };
          merged[key][item.mois][subKey] = parseInt(item.quantitePrevue);
        });

        // 📦 Convertir en tableau
        const finalData = {};
        Object.entries(merged).forEach(([article, moisMap]) => {
          finalData[article] = Object.values(moisMap).sort(
            (a, b) => new Date(a.mois) - new Date(b.mois)
          );
        });

        setDataByArticle(finalData);

      } catch (err) {
        console.error("❌ Erreur chargement données :", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      {Object.entries(dataByArticle).map(([article, data], indexArticle) => {
        const allKeys = new Set();
        data.forEach(entry => {
          Object.keys(entry).forEach(k => {
            if (k !== "mois") allKeys.add(k);
          });
        });

        return (
          <div key={article}>
            <h2 className="text-xl font-bold mb-2">Article : {article}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Legend />
                {[...allKeys].map((key, idx) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={couleurs[idx % couleurs.length]}
                    name={key.replace("_", " ").replace("prevision", "Prévision").replace("historique", "Historique")}
                    dot={false}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default PrevisionsParUtilisateur;
