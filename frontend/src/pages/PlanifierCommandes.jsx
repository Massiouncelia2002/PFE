// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [clients, setClients] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );
//         setClients(res.data);
//       } catch (err) {
//         console.error("Erreur récupération des clients :", err);
//         setMessage("Erreur serveur lors de la récupération.");
//       }
//     };

//     if (article) fetchClients();
//   }, [article]);

//   if (!article) {
//     return <p>❌ Aucun article sélectionné.</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="text-red-500">{message}</div>}

//       {clients.length > 0 ? (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Client</th>
//               <th>Code Client</th>
//               <th>Quantité demandée</th>
//               <th>Date de commande</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clients.map((client, index) => (
//               <tr key={index}>
//                 <td>{client.nomClient}</td>
//                 <td>{client.codeClient}</td>
//                 <td>{client.quantiteDemandee}</td>
//                 <td>{client.dateCommande}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-muted">Aucune demande trouvée pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;




// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; // ⬅️ ajout useNavigate
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;
//   const navigate = useNavigate(); // ⬅️ initialiser navigate

//   const [clients, setClients] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );
//         setClients(res.data);
//       } catch (err) {
//         console.error("Erreur récupération des clients :", err);
//         setMessage("Erreur serveur lors de la récupération.");
//       }
//     };

//     if (article) fetchClients();
//   }, [article]);

//   if (!article) {
//     return <p>❌ Aucun article sélectionné.</p>;
//   }

//   // 👉 Fonction redirection
//   const handlePlanifierCommandes = () => {
//     navigate("/PlanifierVehicule", { state: { article } });
//   };

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="text-red-500">{message}</div>}

//       {clients.length > 0 ? (
//         <>
//           <table className="table table-bordered mt-3">
//             <thead className="table-light">
//               <tr>
//                 <th>Client</th>
//                 <th>Code Client</th>
//                 <th>Quantité demandée</th>
//                 <th>Date de commande</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map((client, index) => (
//                 <tr key={index}>
//                   <td>{client.nomClient}</td>
//                   <td>{client.codeClient}</td>
//                   <td>{client.quantiteDemandee}</td>
//                   <td>{client.dateCommande}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Bouton Planifier commandes */}
//           <div className="text-end mt-3">
//             <button className="btn btn-success" onClick={handlePlanifierCommandes}>
//               Planifier commandes
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="text-muted">Aucune demande trouvée pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;




// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [clients, setClients] = useState([]);
//   const [resultat, setResultat] = useState([]); // ⬅️ quantités affectées
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // Charger les clients qui ont demandé cet article
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );
//         setClients(res.data);
//       } catch (err) {
//         console.error("Erreur récupération des clients :", err);
//         setMessage("Erreur serveur lors de la récupération.");
//       }
//     };

//     if (article) fetchClients();
//   }, [article]);

//   const handlePlanifierCommandes = async () => {
//     if (!article?.codeArticle || !article?.codeDepot) {
//       setMessage("❌ Code article ou dépôt manquant.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//         {
//           clients,
//           codeArticle: article.codeArticle,
//           codeDepot: article.codeDepot,
//         }
//       );
//       setResultat(res.data);
//     } catch (err) {
//       console.error("Erreur lors du partage :", err);
//       setMessage("Erreur lors de la planification.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!article) {
//     return <p>❌ Aucun article sélectionné.</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {clients.length > 0 ? (
//         <>
//           <table className="table table-bordered mt-3">
//             <thead className="table-light">
//               <tr>
//                 <th>Client</th>
//                 <th>Code Client</th>
//                 <th>Quantité demandée</th>
//                 <th>Date de commande</th>
//                 {resultat.length > 0 && <th>Quantité à affecter</th>}
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map((client, index) => {
//                 const affecte = resultat.find(r => r.codeClient === client.codeClient);
//                 return (
//                   <tr key={index}>
//                     <td>{client.nomClient}</td>
//                     <td>{client.codeClient}</td>
//                     <td>{client.quantiteDemandee}</td>
//                     <td>{client.dateCommande}</td>
//                     {resultat.length > 0 && (
//                       <td>{affecte ? affecte.quantiteAffectee : "-"}</td>
//                     )}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {/* ✅ Bouton déclenche le calcul */}
//           <div className="text-end mt-3">
//             <button className="btn btn-success" onClick={handlePlanifierCommandes} disabled={loading}>
//               {loading ? "Calcul en cours..." : "Planifier commandes"}
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="text-muted">Aucune demande trouvée pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;








// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [clients, setClients] = useState([]);
//   const [resultat, setResultat] = useState([]); // liste avec quantités affectées
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // Charger les clients + lancer le partage automatique
//   useEffect(() => {
//     const fetchAndPartager = async () => {
//       try {
//         // Étape 1 : récupérer les clients ayant commandé l’article
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );
//         setClients(res.data);

//         // Étape 2 : appeler le backend pour partager les quantités automatiquement
//         const partageRes = await axios.post(
//           "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//           {
//             clients: res.data,
//             codeArticle: article.codeArticle,
//             codeDepot: article.codeDepot,
//           }
//         );

//         setResultat(partageRes.data);
//         console.log("✅ Quantités affectées :", partageRes.data);
//       } catch (err) {
//         console.error("❌ Erreur lors de la récupération ou du partage :", err);
//         setMessage("Erreur lors de la récupération des données.");
//       }
//     };

//     if (article?.codeArticle && article?.codeDepot) {
//       fetchAndPartager();
//     }
//   }, [article]);

//   if (!article) {
//     return <p>❌ Aucun article sélectionné.</p>;
//   }

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {clients.length > 0 ? (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Client</th>
//               <th>Code Client</th>
//               <th>Quantité demandée</th>
//               <th>Date de commande</th>
//               <th>Quantité à affecter</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clients.map((client, index) => {
//               const affecte = resultat.find(
//                 (r) => r.codeClient === client.codeClient
//               );
//               return (
//                 <tr key={index}>
//                   <td>{client.nomClient}</td>
//                   <td>{client.codeClient}</td>
//                   <td>{client.quantiteDemandee}</td>
//                   <td>{client.dateCommande}</td>
//                   <td>{affecte ? affecte.quantiteAffectee : "-"}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-muted">Aucune demande trouvée pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;








// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [clients, setClients] = useState([]);
//   const [resultat, setResultat] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // 🔁 Étape 1 : Charger les clients
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );
//         console.log("📦 Clients reçus :", res.data);
//         setClients(res.data);
//       } catch (err) {
//         console.error("Erreur récupération clients :", err);
//         setMessage("Erreur serveur lors de la récupération des clients.");
//       }
//     };

//     if (article?.codeArticle) {
//       console.log("🔎 Article reçu :", article);
//       fetchClients();
//     }
//   }, [article]);

//   // 🔁 Étape 2 : Quand clients sont chargés, appeler le partage
//   useEffect(() => {
//     const partager = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//           {
//             clients,
//             codeArticle: article.codeArticle,
//             codeDepot: article.codeDepot,
//           }
//         );
//         console.log("✅ Partage réussi :", res.data);
//         setResultat(res.data);
//       } catch (err) {
//         console.error("Erreur lors du partage :", err);
//         setMessage("Erreur serveur lors du partage des commandes.");
//       }
//     };

//     if (clients.length > 0 && article?.codeDepot) {
//       partager();
//     }
//   }, [clients]);

//   if (!article) return <p>❌ Aucun article sélectionné.</p>;

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {clients.length > 0 ? (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Client</th>
//               <th>Code Client</th>
//               <th>Quantité demandée</th>
//               <th>Date de commande</th>
//               <th>Quantité à affecter</th>
//             </tr>
//           </thead>
//           <tbody>
//             {clients.map((client, index) => {
//               const affecte = resultat.find(
//                 (r) => r.codeClient === client.codeClient
//               );
//               return (
//                 <tr key={index}>
//                   <td>{client.nomClient}</td>
//                   <td>{client.codeClient}</td>
//                   <td>{client.quantiteDemandee}</td>
//                   <td>{client.dateCommande}</td>
//                   <td>{affecte ? affecte.quantiteAffectee : "-"}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-muted">Aucune demande trouvée pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;








// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [clients, setClients] = useState([]);
//   const [resultat, setResultat] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   // 🔁 Étape 1 : Charger les clients
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );
//         console.log("📦 Clients reçus :", res.data);
//         setClients(res.data);
//       } catch (err) {
//         console.error("Erreur récupération clients :", err);
//         setMessage("Erreur serveur lors de la récupération des clients.");
//       }
//     };

//     if (article?.codeArticle) {
//       console.log("🔎 Article reçu :", article);
//       fetchClients();
//     }
//   }, [article]);

//   // 🔁 Étape 2 : Quand clients sont chargés, appeler le partage
//   useEffect(() => {
//     const partager = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//           {
//             clients,
//             codeArticle: article.codeArticle,
//             codeDepot: article.codeDepot,
//           }
//         );
//         console.log("✅ Partage réussi :", res.data);
//         setResultat(res.data);
//       } catch (err) {
//         console.error("Erreur lors du partage :", err);
//         setMessage("Erreur serveur lors du partage des commandes.");
//       }
//     };

//     if (clients.length > 0 && article?.codeDepot) {
//       partager();
//     }
//   }, [clients]);

//   if (!article) return <p>❌ Aucun article sélectionné.</p>;

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {resultat.length > 0 ? (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Client</th>
//               <th>Code Client</th>
//               <th>Quantité demandée</th>
//               <th>Date de commande</th>
//               <th>Quantité à affecter</th>
//             </tr>
//           </thead>
//           <tbody>
//             {resultat.map((client, index) => (
//               <tr key={index}>
//                 <td>{client.nomClient}</td>
//                 <td>{client.codeClient}</td>
//                 <td>{client.quantiteDemandee}</td>
//                 <td>{client.dateCommande || "-"}</td>
//                 <td>{client.quantiteAffectee}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-muted">Aucune commande à planifier pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;






// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [resultat, setResultat] = useState([]); // clients avec quantitéAffectée
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchEtPartager = async () => {
//       try {
//         if (!article?.codeArticle || !article?.codeDepot) {
//           setMessage("Code article ou dépôt manquant.");
//           return;
//         }

//         // 🔹 Appel unique pour tout récupérer et calculer
//         const clientsRes = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );

//         console.log("📦 Clients trouvés :", clientsRes.data);

//         if (!clientsRes.data || clientsRes.data.length === 0) {
//           setResultat([]);
//           return;
//         }

//         const partageRes = await axios.post(
//           "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//           {
//             clients: clientsRes.data,
//             codeArticle: article.codeArticle,
//             codeDepot: article.codeDepot,
//           }
//         );

//         console.log("✅ Résultat partagé :", partageRes.data);
//         setResultat(partageRes.data);
//       } catch (err) {
//         console.error("❌ Erreur globale :", err);
//         setMessage("Erreur serveur lors de la planification.");
//       }
//     };

//     fetchEtPartager();
//   }, [article]);

//   if (!article) return <p>❌ Aucun article sélectionné.</p>;

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {resultat.length > 0 ? (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Client</th>
//               <th>Code Client</th>
//               <th>Quantité demandée</th>
//               <th>Date de commande</th>
//               <th>Quantité à affecter</th>
//             </tr>
//           </thead>
//           <tbody>
//             {resultat.map((client, index) => (
//               <tr key={index}>
//                 <td>{client.nomClient}</td>
//                 <td>{client.codeClient}</td>
//                 <td>{client.quantiteDemandee}</td>
//                 <td>{client.dateCommande || "-"}</td>
//                 <td>{client.quantiteAffectee}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-muted">Aucune commande à planifier pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;






// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [resultat, setResultat] = useState([]);
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchEtPartager = async () => {
//       try {
//         if (!article?.codeArticle || !article?.codeDepot) {
//           setMessage("❌ Code article ou dépôt manquant.");
//           return;
//         }

//         // Étape 1 : Récupérer les clients ayant demandé l'article
//         const clientsRes = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );

//         if (!clientsRes.data || clientsRes.data.length === 0) {
//           setResultat([]);
//           return;
//         }

//         // Étape 2 : Envoyer les données au backend pour calcul
//         const partageRes = await axios.post(
//           "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//           {
//             clients: clientsRes.data,
//             codeArticle: article.codeArticle,
//             codeDepot: article.codeDepot,
//           }
//         );

//         setResultat(partageRes.data);
//       } catch (err) {
//         console.error("❌ Erreur globale :", err);
//         setMessage("Erreur serveur lors de la planification.");
//       }
//     };

//     if (article?.codeArticle && article?.codeDepot) {
//       fetchEtPartager();
//     }
//   }, [article]);

//   if (!article) return <p>❌ Aucun article sélectionné.</p>;

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger">{message}</div>}

//       {resultat.length > 0 ? (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Client</th>
//               <th>Code Client</th>
//               <th>Quantité demandée</th>
//               <th>Date de commande</th>
//               <th>Quantité à affecter</th>
//             </tr>
//           </thead>
//           <tbody>
//             {resultat.map((client, index) => (
//               <tr key={index}>
//                 <td>{client.nomClient}</td>
//                 <td>{client.codeClient}</td>
//                 <td>{client.quantiteDemandee}</td>
//                 <td>{client.dateCommande || "-"}</td>
//                 <td>{client.quantiteAffectee}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-muted">Aucune commande à planifier pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;










// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [resultat, setResultat] = useState([]); // Clients avec quantiteAffectee
//   const [message, setMessage] = useState("");

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchEtPartager = async () => {
//       try {
//         if (!article?.codeArticle || !article?.codeDepot) {
//           setMessage("❌ Code article ou dépôt manquant.");
//           return;
//         }

//         // 🔹 Récupérer les clients
//         const clientsRes = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );

//         console.log("📦 Clients trouvés :", clientsRes.data);

//         if (!clientsRes.data || clientsRes.data.length === 0) {
//           setResultat([]);
//           setMessage("Aucune commande trouvée pour cet article.");
//           return;
//         }

//         // 🔹 Appeler le backend pour partager les quantités
//         const partageRes = await axios.post(
//           "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//           {
//             clients: clientsRes.data,
//             codeArticle: article.codeArticle,
//             codeDepot: article.codeDepot,
//           }
//         );

//         console.log("✅ Résultat partagé :", partageRes.data);
//         setResultat(partageRes.data);
//         setMessage(""); // Nettoyer le message d'erreur si tout s'est bien passé
//       } catch (err) {
//         console.error("❌ Erreur globale :", err);
//         setMessage("Erreur serveur lors de la planification.");
//       }
//     };

//     fetchEtPartager();
//   }, [article]);

//   if (!article) return <p>❌ Aucun article sélectionné.</p>;

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger mt-2">{message}</div>}

//       {resultat.length > 0 ? (
//         <table className="table table-bordered mt-3">
//           <thead className="table-light">
//             <tr>
//               <th>Client</th>
//               <th>Code Client</th>
//               <th>Quantité demandée</th>
//               <th>Date de commande</th>
//               <th>Quantité à affecter</th>
//             </tr>
//           </thead>
//           <tbody>
//             {resultat.map((client, index) => (
//               <tr key={index}>
//                 <td>{client.nomClient}</td>
//                 <td>{client.codeClient}</td>
//                 <td>{client.quantiteDemandee}</td>
//                 <td>{client.dateCommande || "-"}</td>
//                 <td>{client.quantiteAffectee}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       ) : (
//         <p className="text-muted mt-3">Aucune commande à planifier pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;







// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; // 👈 Ajout de useNavigate
// import axios from "axios";

// const PlanifierCommandes = () => {
//   const { state } = useLocation();
//   const article = state?.article;

//   const [resultat, setResultat] = useState([]); // Clients avec quantiteAffectee
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate(); // 👈 Hook de navigation

//   const token = localStorage.getItem("token");
//   const headers = { Authorization: `Bearer ${token}` };

//   useEffect(() => {
//     const fetchEtPartager = async () => {
//       try {
//         if (!article?.codeArticle || !article?.codeDepot) {
//           setMessage("❌ Code article ou dépôt manquant.");
//           return;
//         }

//         // 🔹 Récupérer les clients
//         const clientsRes = await axios.get(
//           `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
//           { headers }
//         );

//         console.log("📦 Clients trouvés :", clientsRes.data);

//         if (!clientsRes.data || clientsRes.data.length === 0) {
//           setResultat([]);
//           setMessage("Aucune commande trouvée pour cet article.");
//           return;
//         }

//         // 🔹 Appeler le backend pour partager les quantités
//         const partageRes = await axios.post(
//           "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
//           {
//             clients: clientsRes.data,
//             codeArticle: article.codeArticle,
//             codeDepot: article.codeDepot,
//           }
//         );

//         console.log("✅ Résultat partagé :", partageRes.data);
//         setResultat(partageRes.data);
//         setMessage(""); // Nettoyer le message d'erreur si tout s'est bien passé
//       } catch (err) {
//         console.error("❌ Erreur globale :", err);
//         setMessage("Erreur serveur lors de la planification.");
//       }
//     };

//     fetchEtPartager();
//   }, [article]);

//   if (!article) return <p>❌ Aucun article sélectionné.</p>;

//   return (
//     <div className="container mt-4">
//       <h3>
//         Planification pour l'article : {article.designation} ({article.codeArticle})
//       </h3>

//       {message && <div className="alert alert-danger mt-2">{message}</div>}

//       {resultat.length > 0 ? (
//         <>
//           <table className="table table-bordered mt-3">
//             <thead className="table-light">
//               <tr>
//                 <th>Client</th>
//                 <th>Code Client</th>
//                 <th>Quantité demandée</th>
//                 <th>Date de commande</th>
//                 <th>Quantité à affecter</th>
//               </tr>
//             </thead>
//             <tbody>
//               {resultat.map((client, index) => (
//                 <tr key={index}>
//                   <td>{client.nomClient}</td>
//                   <td>{client.codeClient}</td>
//                   <td>{client.quantiteDemandee}</td>
//                   <td>{client.dateCommande || "-"}</td>
//                   <td>{client.quantiteAffectee}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* ✅ Bouton pour passer à l'affectation des véhicules */}
//           <button
//             className="btn btn-success mt-4"
//             onClick={() =>
//               navigate("/affecter-vehicule", {
//                 state: {
//                   article,
//                   clientsPlanifies: resultat,
//                 },
//               })
//             }
//           >
//             ✅ Affecter les véhicules
//           </button>
//         </>
//       ) : (
//         <p className="text-muted mt-3">Aucune commande à planifier pour cet article.</p>
//       )}
//     </div>
//   );
// };

// export default PlanifierCommandes;
  












import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PlanifierCommandes = () => {
  const { state } = useLocation();
  const article = state?.article;

  const [resultat, setResultat] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!article?.codeArticle || !article?.codeDepot) return;

    const fetchEtPartager = async () => {
      try {
        // 🔹 1. Récupérer les clients ayant commandé cet article
        const clientsRes = await axios.get(
          `http://localhost:5000/articleDepot/clients-par-article/${article.codeArticle}`,
          { headers }
        );

        const clients = clientsRes.data;

        if (!clients || clients.length === 0) {
          setResultat([]);
          setMessage("Aucune commande trouvée pour cet article.");
          return;
        }

        // 🔐 Ajouter codeCommande à chaque ligne
        const clientsAvecCommande = clients.map((c) => ({
          codeClient: c.codeClient,
          nomClient: c.nomClient,
          codeCommande: c.codeCommande,
          quantiteDemandee: c.quantiteDemandee,
          dateCommande: c.dateCommande,
        }));

        // 🔹 2. Appel au backend pour la répartition
        const partageRes = await axios.post(
          "http://localhost:5000/api/commandePlanifie/planification/partager-commandes",
          {
            clients: clientsAvecCommande,
            codeArticle: article.codeArticle,
            codeDepot: article.codeDepot,
          }
        );

        setResultat(partageRes.data);
        setMessage("");
      } catch (err) {
        console.error("❌ Erreur globale :", err);
        setMessage("Erreur serveur lors de la planification.");
      }
    };

    fetchEtPartager();
  }, []); // ✅ Ne pas dépendre de article pour éviter boucle infinie

  if (!article) return <p>❌ Aucun article sélectionné.</p>;

  return (
    <div className="container mt-4">
      <h3>
        Planification pour l'article : {article.designation} ({article.codeArticle})
      </h3>

      {message && <div className="alert alert-danger mt-2">{message}</div>}

      {resultat.length > 0 ? (
        <>
          <table className="table table-bordered mt-3">
            <thead className="table-light">
              <tr>
                <th>Client</th>
                <th>Code Client</th>
                <th>Date de commande</th>
                <th>Quantité demandée</th>
                <th>Quantité à livrer</th>
              </tr>
            </thead>
            <tbody>
              {resultat.map((client, index) => (
                <tr key={index}>
                  <td>{client.nomClient}</td>
                  <td>{client.codeClient}</td>
                  <td>{client.dateCommande || "-"}</td>
                  <td>{client.quantiteDemandee}</td>
                  <td>{client.quantiteALivrer}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="btn btn-success mt-4"
            onClick={() =>
              navigate("/AffecterVehiculePage", {
                state: {
                  article,
                  clientsPlanifies: resultat,
                },
              })
            }
          >
            ✅ Affecter les véhicules
          </button>
        </>
      ) : (
        <p className="text-muted mt-3">Aucune commande à planifier pour cet article.</p>
      )}
    </div>
  );
};

export default PlanifierCommandes;
