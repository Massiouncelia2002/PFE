// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MesDepots = () => {
//   const [depots, setDepots] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [message, setMessage] = useState("");

//   const fetchDepots = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:5000/depot/mes-depots", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setDepots(res.data);

//       if (res.data.length === 1) {
//         setSelectedDepot(res.data[0]);
//       }
//     } catch (err) {
//       console.error("Erreur récupération dépôts :", err);
//       setMessage("Impossible de récupérer les dépôts.");
//     }
//   };

//   useEffect(() => {
//     fetchDepots();
//   }, []);

//   const handleDepotChange = (e) => {
//     const depotCode = e.target.value;
//     const depot = depots.find((d) => d.codeDepot === depotCode);
//     setSelectedDepot(depot);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Mes Dépôts</h2>

//       {message && (
//         <div className="alert alert-danger" role="alert">
//           {message}
//         </div>
//       )}

//       {depots.length === 0 && !message && <p>Chargement des dépôts...</p>}

//       {depots.length > 1 && (
//         <div className="mb-3">
//           <label htmlFor="depotSelect" className="form-label">
//             Sélectionnez un dépôt :
//           </label>
//           <select
//             id="depotSelect"
//             className="form-select"
//             onChange={handleDepotChange}
//             value={selectedDepot?.codeDepot || ""}
//           >
//             <option value="">-- Choisir un dépôt --</option>
//             {depots.map((depot) => (
//               <option key={depot.codeDepot} value={depot.codeDepot}>
//                 {depot.nom} ({depot.codeDepot})
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedDepot && (
//         <div className="card">
//           <div className="card-header">Détails du dépôt</div>
//           <div className="card-body">
//             <p><strong>Nom :</strong> {selectedDepot.nom}</p>
//             <p><strong>Code :</strong> {selectedDepot.codeDepot}</p>
//             <p><strong>Wilaya :</strong> {selectedDepot.wilaya}</p>
//             <p><strong>Région :</strong> {selectedDepot.region}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MesDepots;








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PlanifierMesDepots = () => {
//   const [depots, setDepots] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [commandes, setCommandes] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // 📦 Récupérer les dépôts
//   useEffect(() => {
//     const fetchDepots = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/depot/mes-depots", { headers });
//         setDepots(res.data);
//         if (res.data.length === 1) {
//           setSelectedDepot(res.data[0]);
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage("Erreur récupération dépôts");
//       }
//     };
//     fetchDepots();
//   }, []);

//   // 📄 Quand on change de dépôt, récupère commandes + stocks
//   useEffect(() => {
//     const loadData = async () => {
//       if (!selectedDepot) return;

//       try {
//         const [cmdRes, stockRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/commande/getcommandesByDepot", { headers }),
//           axios.get(`http://localhost:5000/articleDepot/demandes/${codeDepot}`, { headers }),
//         ]);
//         setCommandes(cmdRes.data.data);
//         setStocks(stockRes.data);
//       } catch (err) {
//         console.error(err);
//         setMessage("Erreur récupération données dépôt");
//       }
//     };
//     loadData();
//   }, [selectedDepot]);

//   // 🧮 Agrégation par article
//   const summary = {};
//   commandes.forEach(cmd => {
//     const { codeArticle, designation, quantiteDemandee } = cmd;
//     if (!summary[codeArticle]) {
//       summary[codeArticle] = { codeArticle, designation, demande: 0 };
//     }
//     summary[codeArticle].demande += quantiteDemandee;
//   });
//   stocks.forEach(stock => {
//     if (summary[stock.codeArticle]) {
//       summary[stock.codeArticle].stock = stock.quantiteStockee;
//     } else {
//       summary[stock.codeArticle] = {
//         codeArticle: stock.codeArticle,
//         designation: stock.designation,
//         demande: 0,
//         stock: stock.quantiteStockee
//       };
//     }
//   });
//   const articles = Object.values(summary);

//   return (
//     <div className="container mt-4">
//       <h2>Planification par dépôt</h2>

//       {/* 🚚 Sélection du dépôt */}
//       {message && <div className="alert alert-danger">{message}</div>}
//       {depots.length > 1 && (
//         <select
//           className="form-select mb-4"
//           value={selectedDepot?.codeDepot || ""}
//           onChange={e =>
//             setSelectedDepot(depots.find(d => d.codeDepot === e.target.value))
//           }
//         >
//           <option value="">-- Choisir un dépôt --</option>
//           {depots.map(d => (
//             <option key={d.codeDepot} value={d.codeDepot}>
//               {d.nom} ({d.codeDepot})
//             </option>
//           ))}
//         </select>
//       )}

//       {/* 🧾 Tableau récapitulatif */}
//       {selectedDepot && (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Article</th>
//               <th>Demandé</th>
//               <th>Stocké</th>
//               <th>Statut</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {articles.map(a => {
//               const ok = a.demande <= (a.stock || 0);
//               return (
//                 <tr key={a.codeArticle}>
//                   <td>{a.designation} ({a.codeArticle})</td>
//                   <td>{a.demande}</td>
//                   <td>{a.stock != null ? a.stock : "—"}</td>
//                   <td>
//                     <span
//                       className={`badge bg-${ok ? "success" : "danger"}`}
//                     >
//                       {ok ? "OK" : "Insuffisant"}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-primary"
//                       disabled={!ok}
//                       onClick={() => handlePlanifier(a)}
//                     >
//                       Planifier
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// // Exemple de fonction de planification
// function handlePlanifier(article) {
//   alert(`Planification pour ${article.codeArticle} (${article.demande} unités)`);
// }

// export default PlanifierMesDepots;









// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PlanifierMesDepots = () => {
//   const [depots, setDepots] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // 🔄 Récupérer les dépôts à l'initialisation
//   useEffect(() => {
//     const fetchDepots = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/depot/mes-depots", { headers });
//         setDepots(res.data);
//         if (res.data.length === 1) {
//           setSelectedDepot(res.data[0]);
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage("Erreur lors de la récupération des dépôts.");
//       }
//     };
//     fetchDepots();
//   }, []);

//   // 🔄 Récupérer les articles avec demande + stock quand un dépôt est sélectionné
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedDepot) return;

//       try {
//         const res = await axios.get(`http://localhost:5000/articleDepot/demandes/${selectedDepot.codeDepot}`, {
//           headers
//         });
//         setArticles(res.data);
//       } catch (err) {
//         console.error(err);
//         setMessage("Erreur lors de la récupération des données du dépôt.");
//       }
//     };

//     fetchData();
//   }, [selectedDepot]);

//   const handlePlanifier = (article) => {
//     alert(`✅ Planification de l'article ${article.designation} (${article.codeArticle}) avec ${article.demandeTotale} unités demandées.`);
//     // ➕ Ici, tu peux envoyer une requête POST vers ton backend pour créer une "Planification"
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Planification des commandes par dépôt</h2>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {depots.length > 1 && (
//         <div className="mb-3">
//           <label className="form-label">Choisir un dépôt :</label>
//           <select
//             className="form-select"
//             value={selectedDepot?.codeDepot || ""}
//             onChange={(e) =>
//               setSelectedDepot(depots.find((d) => d.codeDepot === e.target.value))
//             }
//           >
//             <option value="">-- Sélectionner --</option>
//             {depots.map((d) => (
//               <option key={d.codeDepot} value={d.codeDepot}>
//                 {d.nom} ({d.codeDepot})
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedDepot && articles.length > 0 && (
//         <table className="table table-bordered">
//           <thead className="table-light">
//             <tr>
//               <th>Article</th>
//               <th>Demandé</th>
//               <th>Stocké</th>
//               <th>Statut</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {articles.map((article) => {
//               const ok = article.demandeTotale <= article.quantiteStockee;
//               return (
//                 <tr key={article.codeArticle}>
//                   <td>{article.designation} ({article.codeArticle})</td>
//                   <td>{article.demandeTotale}</td>
//                   <td>{article.quantiteStockee}</td>
//                   <td>
//                     <span className={`badge bg-${ok ? "success" : "danger"}`}>
//                       {ok ? "OK" : "Stock insuffisant"}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-primary btn-sm"
//                       disabled={!ok}
//                       onClick={() => handlePlanifier(article)}
//                     >
//                       Planifier
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}

//       {selectedDepot && articles.length === 0 && (
//         <p className="text-muted">Aucun article trouvé pour ce dépôt.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierMesDepots;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PlanifierMesDepots = () => {
//   const navigate = useNavigate();
//   const [depots, setDepots] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // 🔄 Récupérer les dépôts à l'initialisation
//   useEffect(() => {
//     const fetchDepots = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/depot/mes-depots", { headers });
//         setDepots(res.data);
//         if (res.data.length === 1) {
//           setSelectedDepot(res.data[0]);
//         }
//       } catch (err) {
//         console.error(err);
//         setMessage("Erreur lors de la récupération des dépôts.");
//       }
//     };
//     fetchDepots();
//   }, []);

//   // 🔄 Récupérer les articles avec demande + stock quand un dépôt est sélectionné
//   useEffect(() => {
//     const fetchData = async () => {
//       if (!selectedDepot) return;

//       try {
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/demandes/${selectedDepot.codeDepot}`,
//           { headers }
//         );
//         setArticles(res.data);
//       } catch (err) {
//         console.error(err);
//         setMessage("Erreur lors de la récupération des données du dépôt.");
//       }
//     };

//     fetchData();
//   }, [selectedDepot]);

//   // const handlePlanifier = (article) => {
//   //   alert(
//   //     `✅ Planification de l'article ${article.designation} (${article.codeArticle}) avec ${article.quantiteDemandeeTotale} unités demandées.`
//   //   );
//   //   // ➕ Ajouter ici l'appel backend pour planifier
//   // };

//   // const handlePlanifier = (article) => {
//   //   navigate("/planifier-commandes", { state: { article } });
//   // };


//   const handlePlanifier = (article) => {
//   navigate("/planifier-commandes", {
//     state: {
//       article: {
//         ...article,
//         codeDepot: selectedDepot.codeDepot, // ✅ Injecte le codeDepot ici
//       },
//     },
//   });
// };


//   return (
//     <div className="container mt-4">
//       <h2>Planification des commandes par dépôt</h2>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {depots.length > 1 && (
//         <div className="mb-3">
//           <label className="form-label">Choisir un dépôt :</label>
//           <select
//             className="form-select"
//             value={selectedDepot?.codeDepot || ""}
//             onChange={(e) =>
//               setSelectedDepot(depots.find((d) => d.codeDepot === e.target.value))
//             }
//           >
//             <option value="">-- Sélectionner --</option>
//             {depots.map((d) => (
//               <option key={d.codeDepot} value={d.codeDepot}>
//                 {d.nom} ({d.codeDepot})
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedDepot && articles.length > 0 && (
//         <table className="table table-bordered">
//           <thead className="table-light">
//             <tr>
//               <th>Article</th>
//               <th>Demandé</th>
//               <th>Stocké</th>
//               <th>Stock Max</th>
//               <th>Stock Alerte</th>
//               <th>Statut</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {articles.map((article) => {
//               const ok = article.quantiteDemandeeTotale <= article.quantiteStockee;
//               return (
//                 <tr key={article.codeArticle}>
//                   <td>{article.designation} ({article.codeArticle})</td>
//                   <td>{article.quantiteDemandeeTotale}</td>
//                   <td>{article.quantiteStockee}</td>
//                   <td>{article.stockMax}</td>
//                   <td>{article.stockAlert}</td>
//                   <td>
//                     <span
//                       className={`text-sm font-semibold ${ok ? "text-green-600" : "text-red-600"
//                         }`}
//                     >
//                       {ok ? "Stock suffisant" : "Stock insuffisant"}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-primary btn-sm"
//                       onClick={() => handlePlanifier(article)}
//                     >
//                       Planifier
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       )}

//       {selectedDepot && articles.length === 0 && (
//         <p className="text-muted">Aucun article trouvé pour ce dépôt.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierMesDepots;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlanifierMesDepots = () => {
  const navigate = useNavigate();
  const [depots, setDepots] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // 🔄 Récupérer les dépôts à l'initialisation
  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const res = await axios.get("http://localhost:5000/depot/mes-depots", { headers });
        setDepots(res.data);
        if (res.data.length === 1) {
          setSelectedDepot(res.data[0]);
        }
      } catch (err) {
        console.error(err);
        setMessage("Erreur lors de la récupération des dépôts.");
      }
    };
    fetchDepots();
  }, []);

  // 🔄 Récupérer les articles avec demande + stock quand un dépôt est sélectionné
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDepot) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/articleDepot/demandes/${selectedDepot.codeDepot}`,
          { headers }
        );
        setArticles(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Erreur lors de la récupération des données du dépôt.");
      }
    };

    fetchData();
  }, [selectedDepot]);

  const handlePlanifier = () => {
  navigate("/AfficherCommandesParClient", {
    state: {
      articles,
      codeDepot: selectedDepot.codeDepot
    },
  });
  // navigate("/AfficherCommandesPlanifiees", {
  //   state: {
  //     articles,
  //     codeDepot: selectedDepot.codeDepot
  //   },
  // });
};

  return (
    <div className="container mt-4">
      <h2>Planification des commandes par dépôt</h2>

      {message && <div className="alert alert-danger">{message}</div>}

      {depots.length > 1 && (
        <div className="mb-3">
          <label className="form-label">Choisir un dépôt :</label>
          <select
            className="form-select"
            value={selectedDepot?.codeDepot || ""}
            onChange={(e) =>
              setSelectedDepot(depots.find((d) => d.codeDepot === e.target.value))
            }
          >
            <option value="">-- Sélectionner --</option>
            {depots.map((d) => (
              <option key={d.codeDepot} value={d.codeDepot}>
                {d.nom} ({d.codeDepot})
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedDepot && articles.length > 0 && (
        <>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Article</th>
                <th>Demandé</th>
                <th>Stocké</th>
                <th>Stock Max</th>
                <th>Stock Alerte</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                const ok = article.quantiteDemandeeTotale <= article.quantiteStockee;
                return (
                  <tr key={article.codeArticle}>
                    <td>{article.designation} ({article.codeArticle})</td>
                    <td>{article.quantiteDemandeeTotale}</td>
                    <td>{article.quantiteStockee}</td>
                    <td>{article.stockMax}</td>
                    <td>{article.stockAlert}</td>
                    <td>
                      <span
                        className={`text-sm font-semibold ${ok ? "text-green-600" : "text-red-600"}`}
                      >
                        {ok ? "Stock suffisant" : "Stock insuffisant"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* ✅ Bouton global pour tout planifier */}
          <div className="text-end mt-3">
            <button className="btn btn-success" onClick={handlePlanifier}>
              Planifier tous les articles
            </button>
          </div>
        </>
      )}

      {selectedDepot && articles.length === 0 && (
        <p className="text-muted">Aucun article trouvé pour ce dépôt.</p>
      )}
    </div>
  );
};

export default PlanifierMesDepots;
