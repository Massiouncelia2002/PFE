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









// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid,
//   Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const couleurs = [
//   "#3498db", "#e74c3c", "#2ecc71", "#9b59b6", "#f1c40f", "#1abc9c",
//   "#e67e22", "#34495e", "#7f8c8d", "#d35400"
// ];

// const PrevisionsParUtilisateur = () => {
//   const [dataByArticle, setDataByArticle] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("⛔ Aucun token trouvé.");
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

//         const merged = {};

//         // ⚙️ Fusionner historique
//         historiqueRes.data.forEach(item => {
//           const key = item.codeArticle;
//           const subKey = `${item.codeDepot}_historique`;
//           if (!merged[key]) merged[key] = {};
//           if (!merged[key][item.mois]) merged[key][item.mois] = { mois: item.mois };
//           merged[key][item.mois][subKey] = parseInt(item.quantiteDemandee);
//         });

//         // ⚙️ Fusionner prévision
//         previsionRes.data.forEach(item => {
//           const key = item.codeArticle;
//           const subKey = `${item.codeDepot}_prevision`;
//           if (!merged[key]) merged[key] = {};
//           if (!merged[key][item.mois]) merged[key][item.mois] = { mois: item.mois };
//           merged[key][item.mois][subKey] = parseInt(item.quantitePrevue);
//         });

//         // 📦 Convertir en tableau
//         const finalData = {};
//         Object.entries(merged).forEach(([article, moisMap]) => {
//           finalData[article] = Object.values(moisMap).sort(
//             (a, b) => new Date(a.mois) - new Date(b.mois)
//           );
//         });

//         setDataByArticle(finalData);

//       } catch (err) {
//         console.error("❌ Erreur chargement données :", err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="space-y-10">
//       {Object.entries(dataByArticle).map(([article, data], indexArticle) => {
//         const allKeys = new Set();
//         data.forEach(entry => {
//           Object.keys(entry).forEach(k => {
//             if (k !== "mois") allKeys.add(k);
//           });
//         });

//         return (
//           <div key={article}>
//             <h2 className="text-xl font-bold mb-2">Article : {article}</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="mois" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 {[...allKeys].map((key, idx) => (
//                   <Line
//                     key={key}
//                     type="monotone"
//                     dataKey={key}
//                     stroke={couleurs[idx % couleurs.length]}
//                     name={key.replace("_", " ").replace("prevision", "Prévision").replace("historique", "Historique")}
//                     dot={false}
//                     strokeWidth={2}
//                   />
//                 ))}
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default PrevisionsParUtilisateur;



// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid,
//   Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { TrendingUp, BarChart3, Calendar, Package, Activity, Eye, EyeOff } from 'lucide-react';
// import AdminLayoutPlannificateur from './AdminLayoutPlannificateur';

// const couleurs = [
//   "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", 
//   "#ef4444", "#ec4899", "#84cc16", "#f97316", "#6b7280"
// ];

// const PrevisionsParUtilisateur = () => {
//   const [dataByArticle, setDataByArticle] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [visibleArticles, setVisibleArticles] = useState({});
//   const [selectedMetrics, setSelectedMetrics] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("⛔ Aucun token trouvé.");
//         setLoading(false);
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

//         const merged = {};

//         // ⚙️ Fusionner historique
//         historiqueRes.data.forEach(item => {
//           const key = item.codeArticle;
//           const subKey = `${item.codeDepot}_historique`;
//           if (!merged[key]) merged[key] = {};
//           if (!merged[key][item.mois]) merged[key][item.mois] = { mois: item.mois };
//           merged[key][item.mois][subKey] = parseInt(item.quantiteDemandee);
//         });

//         // ⚙️ Fusionner prévision
//         previsionRes.data.forEach(item => {
//           const key = item.codeArticle;
//           const subKey = `${item.codeDepot}_prevision`;
//           if (!merged[key]) merged[key] = {};
//           if (!merged[key][item.mois]) merged[key][item.mois] = { mois: item.mois };
//           merged[key][item.mois][subKey] = parseInt(item.quantitePrevue);
//         });

//         // 📦 Convertir en tableau
//         const finalData = {};
//         Object.entries(merged).forEach(([article, moisMap]) => {
//           finalData[article] = Object.values(moisMap).sort(
//             (a, b) => new Date(a.mois) - new Date(b.mois)
//           );
//         });

//         setDataByArticle(finalData);
        
//         // Initialiser la visibilité des articles
//         const initialVisibility = {};
//         Object.keys(finalData).forEach(article => {
//           initialVisibility[article] = true;
//         });
//         setVisibleArticles(initialVisibility);

//       } catch (err) {
//         console.error("❌ Erreur chargement données :", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const toggleArticleVisibility = (article) => {
//     setVisibleArticles(prev => ({
//       ...prev,
//       [article]: !prev[article]
//     }));
//   };

//   const toggleMetric = (article, metric) => {
//     setSelectedMetrics(prev => ({
//       ...prev,
//       [article]: {
//         ...prev[article],
//         [metric]: prev[article]?.[metric] !== false
//       }
//     }));
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-xl">
//           <p className="font-semibold text-gray-800 mb-2">{`Mois: ${label}`}</p>
//           {payload.map((entry, index) => (
//             <div key={index} className="flex items-center gap-2 mb-1">
//               <div 
//                 className="w-3 h-3 rounded-full" 
//                 style={{ backgroundColor: entry.color }}
//               />
//               <span className="text-sm text-gray-700">
//                 {entry.name}: <span className="font-medium">{entry.value}</span>
//               </span>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
//             <Activity className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//           </div>
//           <p className="text-gray-600 font-medium">Chargement des prédictions...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
//             <TrendingUp className="w-6 h-6 text-indigo-600" />
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//               Prédictions par Utilisateur
//             </h1>
//           </div>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Analysez les tendances historiques et les prévisions futures de vos articles avec des visualisations interactives.
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
//                 <Package className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Articles Analysés</p>
//                 <p className="text-2xl font-bold text-gray-800">{Object.keys(dataByArticle).length}</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
//                 <BarChart3 className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Données Historiques</p>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {Object.values(dataByArticle).reduce((acc, data) => acc + data.length, 0)}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
//                 <Calendar className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Période Analysée</p>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {Object.values(dataByArticle).length > 0 
//                     ? `${Object.values(dataByArticle)[0].length} mois` 
//                     : '0 mois'}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="space-y-8">
//           {Object.entries(dataByArticle).map(([article, data], indexArticle) => {
//             const allKeys = new Set();
//             data.forEach(entry => {
//               Object.keys(entry).forEach(k => {
//                 if (k !== "mois") allKeys.add(k);
//               });
//             });

//             const isVisible = visibleArticles[article];

//             return (
//               <AdminLayoutPlannificateur>
//               <div 
//                 key={article} 
//                 className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
//               >
//                 {/* Chart Header */}
//                 <div className="p-6 border-b border-gray-100">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
//                         <Package className="w-5 h-5 text-white" />
//                       </div>
//                       <div>
//                         <h2 className="text-xl font-bold text-gray-800">Article {article}</h2>
//                         <p className="text-sm text-gray-500">{allKeys.size} métriques disponibles</p>
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={() => toggleArticleVisibility(article)}
//                       className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105"
//                     >
//                       {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                       <span className="text-sm font-medium">{isVisible ? 'Masquer' : 'Afficher'}</span>
//                     </button>
//                   </div>
                  
//                   {/* Metric Toggles */}
//                   <div className="flex flex-wrap gap-2">
//                     {[...allKeys].map((key, idx) => {
//                       const isSelected = selectedMetrics[article]?.[key] !== false;
//                       return (
//                         <button
//                           key={key}
//                           onClick={() => toggleMetric(article, key)}
//                           className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
//                             isSelected 
//                               ? 'bg-gradient-to-r text-white shadow-md' 
//                               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                           }`}
//                           style={isSelected ? {
//                             background: `linear-gradient(135deg, ${couleurs[idx % couleurs.length]}, ${couleurs[(idx + 1) % couleurs.length]})`
//                           } : {}}
//                         >
//                           {key.replace("_", " ").replace("prevision", "Prévision").replace("historique", "Historique")}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Chart Content */}
//                 <div className={`transition-all duration-500 ${isVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
//                   <div className="p-6">
//                     <ResponsiveContainer width="100%" height={350}>
//                       <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                         <defs>
//                           {[...allKeys].map((key, idx) => (
//                             <linearGradient key={key} id={`gradient-${article}-${idx}`} x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="5%" stopColor={couleurs[idx % couleurs.length]} stopOpacity={0.8}/>
//                               <stop offset="95%" stopColor={couleurs[idx % couleurs.length]} stopOpacity={0.1}/>
//                             </linearGradient>
//                           ))}
//                         </defs>
//                         <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
//                         <XAxis 
//                           dataKey="mois" 
//                           stroke="#6b7280"
//                           fontSize={12}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <YAxis 
//                           stroke="#6b7280"
//                           fontSize={12}
//                           tickLine={false}
//                           axisLine={false}
//                         />
//                         <Tooltip content={<CustomTooltip />} />
//                         <Legend 
//                           wrapperStyle={{ paddingTop: '20px' }}
//                         />
//                         {[...allKeys].map((key, idx) => {
//                           const isSelected = selectedMetrics[article]?.[key] !== false;
//                           return isSelected ? (
//                             <Line
//                               key={key}
//                               type="monotone"
//                               dataKey={key}
//                               stroke={couleurs[idx % couleurs.length]}
//                               name={key.replace("_", " ").replace("prevision", "Prévision").replace("historique", "Historique")}
//                               strokeWidth={3}
//                               dot={{ 
//                                 fill: couleurs[idx % couleurs.length], 
//                                 strokeWidth: 2, 
//                                 r: 4,
//                                 className: "hover:r-6 transition-all duration-200"
//                               }}
//                               activeDot={{ 
//                                 r: 6, 
//                                 fill: couleurs[idx % couleurs.length],
//                                 stroke: 'white',
//                                 strokeWidth: 2
//                               }}
//                             />
//                           ) : null;
//                         })}
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//                </AdminLayoutPlannificateur>
//             );
//           })}
//         </div>

//         {Object.keys(dataByArticle).length === 0 && !loading && (
//           <div className="text-center py-12">
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <BarChart3 className="w-8 h-8 text-gray-400" />
//             </div>
//             <p className="text-gray-500 text-lg">Aucune donnée de prédiction disponible</p>
//           </div>
//         )}
//       </div>
//     </div>
 
//   );
// };

// export default PrevisionsParUtilisateur;









import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TrendingUp, BarChart3, Calendar, Package, Activity, Eye, EyeOff } from 'lucide-react';
import AdminLayoutPlannificateur from './AdminLayoutPlannificateur';

const couleurs = [
  "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", 
  "#ef4444", "#ec4899", "#84cc16", "#f97316", "#6b7280"
];

const PrevisionsParUtilisateur = () => {
  const [dataByArticle, setDataByArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [visibleArticles, setVisibleArticles] = useState({});
  const [selectedMetrics, setSelectedMetrics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("⛔ Aucun token trouvé.");
        setLoading(false);
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
        
        // Initialiser la visibilité des articles
        const initialVisibility = {};
        Object.keys(finalData).forEach(article => {
          initialVisibility[article] = true;
        });
        setVisibleArticles(initialVisibility);

      } catch (err) {
        console.error("❌ Erreur chargement données :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleArticleVisibility = (article) => {
    setVisibleArticles(prev => ({
      ...prev,
      [article]: !prev[article]
    }));
  };

  const toggleMetric = (article, metric) => {
    setSelectedMetrics(prev => ({
      ...prev,
      [article]: {
        ...prev[article],
        [metric]: prev[article]?.[metric] !== false
      }
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-xl">
          <p className="font-semibold text-gray-800 mb-2">{`Mois: ${label}`}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-700">
                {entry.name}: <span className="font-medium">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <AdminLayoutPlannificateur>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <Activity className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-gray-600 font-medium">Chargement des prédictions...</p>
          </div>
        </div>
      </AdminLayoutPlannificateur>
    );
  }

  return (
    <AdminLayoutPlannificateur>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg mb-6">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Prédictions par Utilisateur
              </h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Analysez les tendances historiques et les prévisions futures de vos articles avec des visualisations interactives.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Articles Analysés</p>
                  <p className="text-2xl font-bold text-gray-800">{Object.keys(dataByArticle).length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Données Historiques</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Object.values(dataByArticle).reduce((acc, data) => acc + data.length, 0)}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Période Analysée</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {Object.values(dataByArticle).length > 0 
                      ? `${Object.values(dataByArticle)[0].length} mois` 
                      : '0 mois'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="space-y-8">
            {Object.entries(dataByArticle).map(([article, data], indexArticle) => {
              const allKeys = new Set();
              data.forEach(entry => {
                Object.keys(entry).forEach(k => {
                  if (k !== "mois") allKeys.add(k);
                });
              });

              const isVisible = visibleArticles[article];

              return (
                <div 
                  key={article} 
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  {/* Chart Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Package className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-800">Article {article}</h2>
                          <p className="text-sm text-gray-500">{allKeys.size} métriques disponibles</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleArticleVisibility(article)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105"
                      >
                        {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span className="text-sm font-medium">{isVisible ? 'Masquer' : 'Afficher'}</span>
                      </button>
                    </div>
                    
                    {/* Metric Toggles */}
                    <div className="flex flex-wrap gap-2">
                      {[...allKeys].map((key, idx) => {
                        const isSelected = selectedMetrics[article]?.[key] !== false;
                        return (
                          <button
                            key={key}
                            onClick={() => toggleMetric(article, key)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105 ${
                              isSelected 
                                ? 'bg-gradient-to-r text-white shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            style={isSelected ? {
                              background: `linear-gradient(135deg, ${couleurs[idx % couleurs.length]}, ${couleurs[(idx + 1) % couleurs.length]})`
                            } : {}}
                          >
                            {key.replace("_", " ").replace("prevision", "Prévision").replace("historique", "Historique")}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chart Content */}
                  <div className={`transition-all duration-500 ${isVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6">
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <defs>
                            {[...allKeys].map((key, idx) => (
                              <linearGradient key={key} id={`gradient-${article}-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={couleurs[idx % couleurs.length]} stopOpacity={0.8}/>
                                <stop offset="95%" stopColor={couleurs[idx % couleurs.length]} stopOpacity={0.1}/>
                              </linearGradient>
                            ))}
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" strokeOpacity={0.5} />
                          <XAxis 
                            dataKey="mois" 
                            stroke="#6b7280"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend 
                            wrapperStyle={{ paddingTop: '20px' }}
                          />
                          {[...allKeys].map((key, idx) => {
                            const isSelected = selectedMetrics[article]?.[key] !== false;
                            return isSelected ? (
                              <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={couleurs[idx % couleurs.length]}
                                name={key.replace("_", " ").replace("prevision", "Prévision").replace("historique", "Historique")}
                                strokeWidth={3}
                                dot={{ 
                                  fill: couleurs[idx % couleurs.length], 
                                  strokeWidth: 2, 
                                  r: 4,
                                  className: "hover:r-6 transition-all duration-200"
                                }}
                                activeDot={{ 
                                  r: 6, 
                                  fill: couleurs[idx % couleurs.length],
                                  stroke: 'white',
                                  strokeWidth: 2
                                }}
                              />
                            ) : null;
                          })}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {Object.keys(dataByArticle).length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">Aucune donnée de prédiction disponible</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayoutPlannificateur>
  );
};

export default PrevisionsParUtilisateur;