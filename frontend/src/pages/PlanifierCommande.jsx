// import React, { useState, useEffect } from "react";

// const PlanifierCommande = () => {
//     const [commandes, setCommandes] = useState([]);
//     const [vehiculesDispo, setVehiculesDispo] = useState([]);
//     const [codeCommande, setCodeCommande] = useState("");
//     const [datePlanification, setDatePlanification] = useState("");
//     const [vehicules, setVehicules] = useState([
//         { matricule: "", quantiteTransporte: 0 }
//     ]);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         fetch("http://localhost:5000/api/commande/getcommandes")
//             .then((res) => res.json())
//             .then((data) => setCommandes(data.data || []))
//             .catch((err) => console.error("Erreur commandes :", err));

//         fetch("http://localhost:5000/vehicules")
//             .then((res) => res.json())
//             .then((data) => setVehiculesDispo(data))
//             .catch((err) => console.error("Erreur véhicules :", err));
//     }, []);

//     const handleVehiculeChange = (index, field, value) => {
//         const updatedVehicules = [...vehicules];
//         updatedVehicules[index][field] = value;
//         setVehicules(updatedVehicules);
//     };

//     const ajouterVehicule = () => {
//         setVehicules([...vehicules, { matricule: "", quantiteTransporte: 0 }]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const payload = { codeCommande, datePlanification, vehicules };

//         try {
//             const res = await fetch("http://localhost:5000/api/commandePlanifie/planifier", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             if (!res.ok) {
//                 const errorData = await res.json();
//                 throw new Error(errorData.message || "Erreur serveur");
//             }

//             const data = await res.json();
//             setMessage(data.message || "Planification réussie !");
//         } catch (error) {
//             console.error("Erreur :", error);
//             setMessage("Erreur lors de la planification : " + error.message);
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//             <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
//                 Planifier une commande
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label
//                         htmlFor="codeCommande"
//                         className="block mb-2 font-semibold text-gray-700"
//                     >
//                         Code Commande
//                     </label>

//                     <select
//                         id="codeCommande"
//                         className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         value={codeCommande}
//                         onChange={(e) => setCodeCommande(e.target.value)}
//                         required
//                     >
//                         <option value="">-- Sélectionner --</option>
//                         {commandes.map((cmd) => (
//                             <option key={cmd.codeCommande} value={cmd.codeCommande}>
//                                 Code: {cmd.codeCommande} | Date: {cmd.dateCommande} | Client: {cmd.client?.nom || "N/A"} | Quantités:{" "}
//                                 {cmd.articleCommandeClients
//                                     ? cmd.articleCommandeClients.map((art, i) => (
//                                         <span key={i}>
//                                             {art.quantiteDemandee}{i < cmd.articleCommandeClients.length - 1 ? ", " : ""}
//                                         </span>
//                                     ))
//                                     : "N/A"}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label
//                         htmlFor="datePlanification"
//                         className="block mb-2 font-semibold text-gray-700"
//                     >
//                         Date de Planification
//                     </label>
//                     <input
//                         id="datePlanification"
//                         type="date"
//                         className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         value={datePlanification}
//                         onChange={(e) => setDatePlanification(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Véhicules</h3>

//                 {vehicules.map((vehicule, index) => (
//                     <div
//                         key={index}
//                         className="flex flex-col md:flex-row md:space-x-4 mb-4 items-center"
//                     >
//                         <select
//                             className="flex-1 border border-gray-300 rounded-md p-2 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             value={vehicule.matricule}
//                             onChange={(e) =>
//                                 handleVehiculeChange(index, "matricule", e.target.value)
//                             }
//                             required
//                         >
//                             <option value="">-- Matricule --</option>
//                             {vehiculesDispo.map((v) => (
//                                 <option key={v.matricule} value={v.matricule}>
//                                     Matricule: {v.matricule}    Capacite: {v.capaciteVehicule}
//                                 </option>
//                             ))}
//                         </select>
//                         <input
//                             type="number"
//                             min={0}
//                             className="w-40 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             placeholder="Quantité transportée"
//                             value={vehicule.quantiteTransporte}
//                             onChange={(e) =>
//                                 handleVehiculeChange(index, "quantiteTransporte", e.target.value)
//                             }
//                             required
//                         />
//                     </div>
//                 ))}

//                 <button
//                     type="button"
//                     onClick={ajouterVehicule}
//                     className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
//                 >
//                     + Ajouter un véhicule
//                 </button>

//                 <div>
//                     <button
//                         type="submit"
//                         className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors duration-300"
//                     >
//                         Planifier
//                     </button>
//                 </div>
//             </form>

//             {message && (
//                 <p
//                     className={`mt-6 text-center font-semibold ${message.toLowerCase().includes("erreur")
//                         ? "text-red-600"
//                         : "text-green-600"
//                         }`}
//                 >
//                     {message}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default PlanifierCommande;










// import React, { useState, useEffect } from "react";

// const PlanifierCommande = () => {
//     const [commandes, setCommandes] = useState([]);
//     const [vehiculesDispo, setVehiculesDispo] = useState([]);
//     const [codeCommande, setCodeCommande] = useState("");
//     const [datePlanification, setDatePlanification] = useState("");
//     const [vehicules, setVehicules] = useState([{ matricule: "", quantiteTransporte: 0 }]);
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const commandesRes = await fetch("http://localhost:5000/api/commande/getcommandes");
//                 const commandesData = await commandesRes.json();
//                 setCommandes(commandesData.data || []);

//                 const vehiculesRes = await fetch("http://localhost:5000/vehicules");
//                 const vehiculesData = await vehiculesRes.json();
//                 setVehiculesDispo(vehiculesData || []);
//             } catch (err) {
//                 console.error("Erreur de chargement :", err);
//                 setMessage("Erreur de chargement des données");
//             }
//         };

//         fetchData();
//     }, []);

//     const handleVehiculeChange = (index, field, value) => {
//         const updated = [...vehicules];
//         updated[index][field] = field === "quantiteTransporte" ? Number(value) : value;
//         setVehicules(updated);
//     };

//     const ajouterVehicule = () => {
//         setVehicules([...vehicules, { matricule: "", quantiteTransporte: 0 }]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         const payload = {
//             codeCommande,
//             datePlanification,
//             vehicules,
//         };

//         try {
//             const res = await fetch("http://localhost:5000/api/commandePlanifie/planifier", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(payload),
//             });

//             const data = await res.json();

//             if (!res.ok) throw new Error(data.message || "Erreur serveur");

//             setMessage(data.message || "Planification réussie !");
//             setCodeCommande("");
//             setDatePlanification("");
//             setVehicules([{ matricule: "", quantiteTransporte: 0 }]);
//         } catch (error) {
//             console.error("Erreur lors de la soumission :", error);
//             setMessage("Erreur : " + error.message);
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//             <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
//                 Planifier une commande
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Sélection de la commande */}
//                 <div>
//                     <label htmlFor="codeCommande" className="block mb-2 font-semibold text-gray-700">
//                         Code Commande
//                     </label>
//                     <select
//                         id="codeCommande"
//                         className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         value={codeCommande}
//                         onChange={(e) => setCodeCommande(e.target.value)}
//                         required
//                     >
//                         <option value="">-- Sélectionner --</option>
//                         {commandes.map((cmd) => (
//                             <option key={cmd.codeCommande} value={cmd.codeCommande}>
//                                 Code: {cmd.codeCommande} | Date: {cmd.dateCommande} | Client: {cmd.client ? cmd.client.nomClient : "N/A"} | Quantités:{" "}
//                                 {cmd.articleCommandeClients?.map((art, i) => (
//                                     `${art.quantiteDemandee}${i < (cmd.articleCommandeClients.length - 1) ? ", " : ""}`
//                                 ))}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Date de planification */}
//                 <div>
//                     <label htmlFor="datePlanification" className="block mb-2 font-semibold text-gray-700">
//                         Date de Planification
//                     </label>
//                     <input
//                         type="date"
//                         id="datePlanification"
//                         className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                         value={datePlanification}
//                         onChange={(e) => setDatePlanification(e.target.value)}
//                         required
//                     />
//                 </div>

//                 {/* Liste des véhicules */}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-4">Véhicules</h3>
//                 {vehicules.map((vehicule, index) => (
//                     <div key={index} className="flex flex-col md:flex-row md:space-x-4 mb-4 items-center">
//                         <select
//                             className="flex-1 border border-gray-300 rounded-md p-2 mb-2 md:mb-0 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             value={vehicule.matricule}
//                             onChange={(e) => handleVehiculeChange(index, "matricule", e.target.value)}
//                             required
//                         >
//                             <option value="">-- Matricule --</option>
//                             {vehiculesDispo.map((v) => (
//                                 <option key={v.matricule} value={v.matricule}>
//                                     {v.matricule} — Capacité: {v.capaciteVehicule}
//                                 </option>
//                             ))}
//                         </select>
//                         <input
//                             type="number"
//                             min={0}
//                             className="w-40 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             placeholder="Quantité transportée"
//                             value={vehicule.quantiteTransporte}
//                             onChange={(e) => handleVehiculeChange(index, "quantiteTransporte", e.target.value)}
//                             required
//                         />
//                     </div>
//                 ))}

//                 {/* Bouton ajouter véhicule */}
//                 <button
//                     type="button"
//                     onClick={ajouterVehicule}
//                     className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
//                 >
//                     + Ajouter un véhicule
//                 </button>

//                 {/* Bouton soumission */}
//                 <div>
//                     <button
//                         type="submit"
//                         className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-colors duration-300"
//                     >
//                         Planifier
//                     </button>
//                 </div>
//             </form>

//             {/* Message de réponse */}
//             {message && (
//                 <p className={`mt-6 text-center font-semibold ${message.toLowerCase().includes("erreur") ? "text-red-600" : "text-green-600"}`}>
//                     {message}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default PlanifierCommande;













// import React, { useEffect, useState } from "react";

// function PlanifierCommande() {
//   const [commandes, setCommandes] = useState([]);
//   const [selectedCommande, setSelectedCommande] = useState(null);
//   const [vehiculesDispo, setVehiculesDispo] = useState([]);
//   const [selectedVehicule, setSelectedVehicule] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const commandesRes = await fetch("http://localhost:5000/api/commande/getcommandes");
//         const rawCommandes = await commandesRes.json();

//         const regrouped = rawCommandes.data.reduce((acc, curr) => {
//           let existing = acc.find(c => c.codeCommande === curr.codeCommande);
//           if (!existing) {
//             existing = {
//               codeCommande: curr.codeCommande,
//               dateCommande: curr.dateCommande,
//               client: {
//                 codeClient: curr.codeClient,
//                 nomClient: curr.nomClient
//               },
//               articleCommandeClients: []
//             };
//             acc.push(existing);
//           }

//           existing.articleCommandeClients.push({
//             codeArticle: curr.codeArticle,
//             designation: curr.designation,
//             quantiteDemandee: curr.quantiteDemandee
//           });

//           return acc;
//         }, []);

//         setCommandes(regrouped);

//         const vehiculesRes = await fetch("http://localhost:5000/vehicules");
//         const vehiculesData = await vehiculesRes.json();
//         setVehiculesDispo(vehiculesData || []);
//       } catch (err) {
//         console.error("Erreur de chargement des données :", err);
//         setMessage("Erreur de chargement des données");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCommandeChange = (e) => {
//     const selectedIndex = parseInt(e.target.value);
//     setSelectedCommande(commandes[selectedIndex]);
//   };

//   const handleVehiculeChange = (e) => {
//     setSelectedVehicule(e.target.value);
//   };

//   const handlePlanification = async () => {
//     if (!selectedCommande || !selectedVehicule) {
//       setMessage("Veuillez sélectionner une commande et un véhicule.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/commandePlanifie/planifier", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           codeCommande: selectedCommande.codeCommande,
//           codeVehicule: selectedVehicule
//         })
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("Commande planifiée avec succès !");
//       } else {
//         setMessage(result.error || "Erreur lors de la planification.");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la planification :", error);
//       setMessage("Erreur serveur.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">Planifier une commande</h2>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-medium mb-2">Sélectionner une commande :</label>
//         <select
//           className="w-full border rounded px-3 py-2"
//           onChange={handleCommandeChange}
//         >
//           <option value="">-- Choisir une commande --</option>
//           {commandes.map((commande, index) => (
//             <option key={index} value={index}>
//               {commande.codeCommande} - {commande.client.nomClient}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedCommande && (
//         <div className="mb-6 border p-4 rounded bg-gray-50">
//           <p><strong>Date :</strong> {selectedCommande.dateCommande}</p>
//           <p><strong>Client :</strong> {selectedCommande.client?.nomClient}</p>
//           <p className="mt-2 font-semibold">Articles commandés :</p>
//           <ul className="list-disc list-inside">
//             {selectedCommande.articleCommandeClients.map((article, idx) => (
//               <li key={idx}>
//                 {article.designation || article.codeArticle} - Quantité : {article.quantiteDemandee}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="mb-4">
//         <label className="block text-gray-700 font-medium mb-2">Sélectionner un véhicule :</label>
//         <select
//           className="w-full border rounded px-3 py-2"
//           onChange={handleVehiculeChange}
//         >
//           <option value="">-- Choisir un véhicule --</option>
//           {vehiculesDispo.map((vehicule, idx) => (
//             <option key={idx} value={vehicule.matricule}>
//               {vehicule.matricule}  -  {vehicule.capaciteVehicule}  -   {vehicule.statut}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button
//         onClick={handlePlanification}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         Planifier la commande
//       </button>

//       {message && <p className="mt-4 text-center text-red-600">{message}</p>}
//     </div>
//   );
// }

// export default PlanifierCommande;










// import React, { useEffect, useState } from "react";

// function PlanifierCommande() {
//   const [commandes, setCommandes] = useState([]);
//   const [selectedCommande, setSelectedCommande] = useState(null);

//   // On suppose que chaque véhicule sélectionné a sa quantité
//   const [vehiculesDispo, setVehiculesDispo] = useState([]);
//   const [vehiculesSelectionnes, setVehiculesSelectionnes] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const commandesRes = await fetch("http://localhost:5000/api/commande/getcommandes");
//         const rawCommandes = await commandesRes.json();

//         const regrouped = rawCommandes.data.reduce((acc, curr) => {
//           let existing = acc.find(c => c.codeCommande === curr.codeCommande);
//           if (!existing) {
//             existing = {
//               codeCommande: curr.codeCommande,
//               dateCommande: curr.dateCommande,
//               client: {
//                 codeClient: curr.codeClient,
//                 nomClient: curr.nomClient
//               },
//               articleCommandeClients: []
//             };
//             acc.push(existing);
//           }

//           existing.articleCommandeClients.push({
//             codeArticle: curr.codeArticle,
//             designation: curr.designation,
//             quantiteDemandee: curr.quantiteDemandee
//           });

//           return acc;
//         }, []);

//         setCommandes(regrouped);

//         const vehiculesRes = await fetch("http://localhost:5000/vehicules");
//         const vehiculesData = await vehiculesRes.json();
//         setVehiculesDispo(vehiculesData || []);
//       } catch (err) {
//         console.error("Erreur de chargement des données :", err);
//         setMessage("Erreur de chargement des données");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCommandeChange = (e) => {
//     const selectedIndex = parseInt(e.target.value);
//     setSelectedCommande(commandes[selectedIndex]);
//   };

//   // Gérer l'ajout ou la modification des véhicules sélectionnés avec quantité
//   const handleVehiculeQuantiteChange = (matricule, quantite) => {
//     setVehiculesSelectionnes(prev => {
//       const existing = prev.find(v => v.matricule === matricule);
//       if (existing) {
//         // Modifier quantité
//         return prev.map(v => v.matricule === matricule ? { ...v, quantiteTransporte: quantite } : v);
//       } else {
//         // Ajouter nouveau véhicule sélectionné
//         return [...prev, { matricule, quantiteTransporte: quantite }];
//       }
//     });
//   };

//   const handlePlanification = async () => {
//     if (!selectedCommande) {
//       setMessage("Veuillez sélectionner une commande.");
//       return;
//     }
//     if (vehiculesSelectionnes.length === 0) {
//       setMessage("Veuillez sélectionner au moins un véhicule avec quantité.");
//       return;
//     }

//     // Vérifier que toutes les quantités sont > 0
//     for (const v of vehiculesSelectionnes) {
//       if (!v.quantiteTransporte || v.quantiteTransporte <= 0) {
//         setMessage(`Quantité invalide pour le véhicule ${v.matricule}.`);
//         return;
//       }
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/commandePlanifie/planifier", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           codeCommande: selectedCommande.codeCommande,
//           vehicules: vehiculesSelectionnes
//         })
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("Commande planifiée avec succès !");
//         // Reset selections si besoin
//         setSelectedCommande(null);
//         setVehiculesSelectionnes([]);
//       } else {
//         setMessage(result.error || "Erreur lors de la planification.");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la planification :", error);
//       setMessage("Erreur serveur.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">Planifier une commande</h2>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-medium mb-2">Sélectionner une commande :</label>
//         <select
//           className="w-full border rounded px-3 py-2"
//           onChange={handleCommandeChange}
//           value={selectedCommande ? commandes.indexOf(selectedCommande) : ""}
//         >
//           <option value="">-- Choisir une commande --</option>
//           {commandes.map((commande, index) => (
//             <option key={index} value={index}>
//               {commande.codeCommande} - {commande.client.nomClient}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedCommande && (
//         <div className="mb-6 border p-4 rounded bg-gray-50">
//           <p><strong>Date :</strong> {new Date(selectedCommande.dateCommande).toLocaleDateString()}</p>
//           <p><strong>Client :</strong> {selectedCommande.client?.nomClient}</p>
//           <p className="mt-2 font-semibold">Articles commandés :</p>
//           <ul className="list-disc list-inside">
//             {selectedCommande.articleCommandeClients.map((article, idx) => (
//               <li key={idx}>
//                 {article.designation || article.codeArticle} - Quantité : {article.quantiteDemandee}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="mb-4">
//         <p className="block text-gray-700 font-medium mb-2">Sélectionner les véhicules et quantités :</p>
//         {vehiculesDispo.length === 0 && <p>Aucun véhicule disponible</p>}

//         {vehiculesDispo.map((vehicule) => {
//           const vehiculeSelectionne = vehiculesSelectionnes.find(v => v.matricule === vehicule.matricule);
//           return (
//             <div key={vehicule.matricule} className="mb-3 flex items-center space-x-4">
//               <div className="w-1/2">
//                 <span>{vehicule.matricule} - Capacité: {vehicule.capaciteVehicule} - Statut: {vehicule.statut}</span>
//               </div>
//               <input
//                 type="number"
//                 min="0"
//                 placeholder="Quantité transportée"
//                 value={vehiculeSelectionne ? vehiculeSelectionne.quantiteTransporte : ""}
//                 onChange={(e) => handleVehiculeQuantiteChange(vehicule.matricule, parseInt(e.target.value) || 0)}
//                 className="w-1/4 border rounded px-2 py-1"
//               />
//             </div>
//           );
//         })}
//       </div>

//       <button
//         onClick={handlePlanification}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         Planifier la commande
//       </button>

//       {message && <p className="mt-4 text-center text-red-600">{message}</p>}
//     </div>
//   );
// }

// export default PlanifierCommande;




// import React, { useEffect, useState } from "react";

// function PlanifierCommande() {
//   const [commandes, setCommandes] = useState([]);
//   const [selectedCommande, setSelectedCommande] = useState(null);

//   const [vehiculesDispo, setVehiculesDispo] = useState([]);
//   const [vehiculesSelectionnes, setVehiculesSelectionnes] = useState([]);
//   const [vehiculeChoisi, setVehiculeChoisi] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const commandesRes = await fetch(
//           "http://localhost:5000/api/commande/getcommandes"
//         );
//         const rawCommandes = await commandesRes.json();

//         const regrouped = rawCommandes.data.reduce((acc, curr) => {
//           let existing = acc.find(
//             (c) => c.codeCommande === curr.codeCommande
//           );
//           if (!existing) {
//             existing = {
//               codeCommande: curr.codeCommande,
//               dateCommande: curr.dateCommande,
//               client: {
//                 codeClient: curr.codeClient,
//                 nomClient: curr.nomClient,
//               },
//               articleCommandeClients: [],
//             };
//             acc.push(existing);
//           }

//           existing.articleCommandeClients.push({
//             codeArticle: curr.codeArticle,
//             designation: curr.designation,
//             quantiteDemandee: curr.quantiteDemandee,
//           });

//           return acc;
//         }, []);

//         setCommandes(regrouped);

//         const vehiculesRes = await fetch("http://localhost:5000/vehicules");
//         const vehiculesData = await vehiculesRes.json();
//         setVehiculesDispo(vehiculesData || []);
//       } catch (err) {
//         console.error("Erreur de chargement des données :", err);
//         setMessage("Erreur de chargement des données");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCommandeChange = (e) => {
//     const selectedIndex = parseInt(e.target.value);
//     setSelectedCommande(commandes[selectedIndex]);
//   };

//   // Ajouter véhicule choisi à la liste des sélectionnés
//   const handleAjouterVehicule = () => {
//     if (!vehiculeChoisi) {
//       setMessage("Veuillez choisir un véhicule avant d'ajouter.");
//       return;
//     }
//     if (vehiculesSelectionnes.some((v) => v.matricule === vehiculeChoisi)) {
//       setMessage("Ce véhicule est déjà dans la liste.");
//       return;
//     }
//     setVehiculesSelectionnes((prev) => [
//       ...prev,
//       { matricule: vehiculeChoisi, quantiteTransporte: 0 },
//     ]);
//     setVehiculeChoisi("");
//     setMessage("");
//   };

//   const handleVehiculeQuantiteChange = (matricule, quantite) => {
//     setVehiculesSelectionnes((prev) =>
//       prev.map((v) =>
//         v.matricule === matricule ? { ...v, quantiteTransporte: quantite } : v
//       )
//     );
//   };

//   const handlePlanification = async () => {
//     if (!selectedCommande) {
//       setMessage("Veuillez sélectionner une commande.");
//       return;
//     }
//     if (vehiculesSelectionnes.length === 0) {
//       setMessage("Veuillez sélectionner au moins un véhicule avec quantité.");
//       return;
//     }

//     for (const v of vehiculesSelectionnes) {
//       if (!v.quantiteTransporte || v.quantiteTransporte <= 0) {
//         setMessage(`Quantité invalide pour le véhicule ${v.matricule}.`);
//         return;
//       }
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/commandePlanifie/planifier",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             codeCommande: selectedCommande.codeCommande,
//             vehicules: vehiculesSelectionnes,
//           }),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         setMessage("Commande planifiée avec succès !");
//         setSelectedCommande(null);
//         setVehiculesSelectionnes([]);
//       } else {
//         setMessage(result.error || "Erreur lors de la planification.");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la planification :", error);
//       setMessage("Erreur serveur.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
//       <h2 className="text-2xl font-bold mb-6 text-center">Planifier une commande</h2>

//       <div className="mb-4">
//         <label className="block text-gray-700 font-medium mb-2">
//           Sélectionner une commande :
//         </label>
//         <select
//           className="w-full border rounded px-3 py-2"
//           onChange={handleCommandeChange}
//           value={selectedCommande ? commandes.indexOf(selectedCommande) : ""}
//         >
//           <option value="">-- Choisir une commande --</option>
//           {commandes.map((commande, index) => (
//             <option key={index} value={index}>
//               {commande.codeCommande} - {commande.client.nomClient}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedCommande && (
//         <div className="mb-6 border p-4 rounded bg-gray-50">
//           <p>
//             <strong>Date :</strong>{" "}
//             {new Date(selectedCommande.dateCommande).toLocaleDateString()}
//           </p>
//           <p>
//             <strong>Client :</strong> {selectedCommande.client?.nomClient}
//           </p>
//           <p className="mt-2 font-semibold">Articles commandés :</p>
//           <ul className="list-disc list-inside">
//             {selectedCommande.articleCommandeClients.map((article, idx) => (
//               <li key={idx}>
//                 {article.designation || article.codeArticle} - Quantité :{" "}
//                 {article.quantiteDemandee}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Sélection véhicule via liste déroulante */}
//       <div className="mb-4">
//         <label className="block text-gray-700 font-medium mb-2">
//           Choisir un véhicule :
//         </label>
//         <select
//           className="w-full border rounded px-3 py-2"
//           value={vehiculeChoisi}
//           onChange={(e) => setVehiculeChoisi(e.target.value)}
//         >
//           <option value="">-- Sélectionner un véhicule --</option>
//           {vehiculesDispo.map((v) => (
//             <option key={v.matricule} value={v.matricule}>
//               {v.matricule} - Capacité: {v.capaciteVehicule} - Statut: {v.statut}
//             </option>
//           ))}
//         </select>
//         <button
//           className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           onClick={handleAjouterVehicule}
//         >
//           Ajouter véhicule
//         </button>
//       </div>

//       {/* Liste véhicules sélectionnés avec quantités */}
//       {vehiculesSelectionnes.length > 0 && (
//         <div className="mb-4">
//           <p className="font-semibold mb-2">Véhicules sélectionnés :</p>
//           {vehiculesSelectionnes.map((v) => (
//             <div
//               key={v.matricule}
//               className="flex items-center space-x-4 mb-2"
//             >
//               <span className="w-1/2">{v.matricule}</span>
//               <input
//                 type="number"
//                 min="0"
//                 placeholder="Quantité transportée"
//                 value={v.quantiteTransporte}
//                 onChange={(e) =>
//                   handleVehiculeQuantiteChange(
//                     v.matricule,
//                     parseInt(e.target.value) || 0
//                   )
//                 }
//                 className="w-1/4 border rounded px-2 py-1"
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       <button
//         onClick={handlePlanification}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         Planifier la commande
//       </button>

//       {message && (
//         <p className="mt-4 text-center text-red-600">{message}</p>
//       )}
//     </div>
//   );
// }

// export default PlanifierCommande;






import React, { useEffect, useState } from "react";

function PlanifierCommande() {
  const [commandes, setCommandes] = useState([]);
  const [selectedCommande, setSelectedCommande] = useState(null);

  const [vehiculesDispo, setVehiculesDispo] = useState([]);
  const [vehiculeSelectionne, setVehiculeSelectionne] = useState(""); // pour liste déroulante
  const [vehiculesSelectionnes, setVehiculesSelectionnes] = useState([]); // véhicules ajoutés
  const [message, setMessage] = useState("");

  // Chargement des commandes et véhicules disponibles au chargement du composant
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chargement commandes
        const commandesRes = await fetch("http://localhost:5000/api/commande/getcommandes");
        const rawCommandes = await commandesRes.json();

        // Regroupement commandes (selon ta logique initiale)
        const regrouped = rawCommandes.data.reduce((acc, curr) => {
          let existing = acc.find(c => c.codeCommande === curr.codeCommande);
          if (!existing) {
            existing = {
              codeCommande: curr.codeCommande,
              dateCommande: curr.dateCommande,
              client: {
                codeClient: curr.codeClient,
                nomClient: curr.nomClient
              },
              articleCommandeClients: []
            };
            acc.push(existing);
          }
          existing.articleCommandeClients.push({
            codeArticle: curr.codeArticle,
            designation: curr.designation,
            quantiteDemandee: curr.quantiteDemandee
          });
          return acc;
        }, []);

        setCommandes(regrouped);

        // Chargement véhicules disponibles
        const vehiculesRes = await fetch("http://localhost:5000/vehicules");
        const vehiculesData = await vehiculesRes.json();
        setVehiculesDispo(vehiculesData || []);
      } catch (err) {
        console.error("Erreur de chargement des données :", err);
        setMessage("Erreur de chargement des données");
      }
    };

    fetchData();
  }, []);

  // Lorsqu’on change la commande sélectionnée
  const handleCommandeChange = (e) => {
    const selectedIndex = parseInt(e.target.value);
    setSelectedCommande(commandes[selectedIndex]);
  };

  // Lorsqu’on change le véhicule dans la liste déroulante (avant ajout)
  const handleVehiculeSelectionChange = (e) => {
    setVehiculeSelectionne(e.target.value);
  };

  // Ajouter le véhicule sélectionné à la liste des véhicules sélectionnés
  const handleAjouterVehicule = () => {
    if (!vehiculeSelectionne) {
      setMessage("Veuillez choisir un véhicule à ajouter.");
      return;
    }

    // Vérifier que le véhicule n’est pas déjà ajouté
    if (vehiculesSelectionnes.find(v => v.matricule === vehiculeSelectionne)) {
      setMessage("Ce véhicule est déjà ajouté.");
      return;
    }

    // Trouver les détails du véhicule dans la liste dispo
    const vehicule = vehiculesDispo.find(v => v.matricule === vehiculeSelectionne);
    if (!vehicule) {
      setMessage("Véhicule non trouvé.");
      return;
    }

    // Ajouter véhicule avec quantité initiale à 0 (à saisir ensuite)
    setVehiculesSelectionnes(prev => [...prev, { matricule: vehicule.matricule, quantiteTransporte: 0 }]);
    setMessage("");
  };

  // Modifier la quantité transportée pour un véhicule déjà sélectionné
  const handleQuantiteChange = (matricule, quantite) => {
    setVehiculesSelectionnes(prev =>
      prev.map(v =>
        v.matricule === matricule ? { ...v, quantiteTransporte: quantite } : v
      )
    );
  };

  // Envoi de la planification
  const handlePlanification = async () => {
    if (!selectedCommande) {
      setMessage("Veuillez sélectionner une commande.");
      return;
    }
    if (vehiculesSelectionnes.length === 0) {
      setMessage("Veuillez ajouter au moins un véhicule avec quantité.");
      return;
    }

    // Vérifier que toutes les quantités > 0
    for (const v of vehiculesSelectionnes) {
      if (!v.quantiteTransporte || v.quantiteTransporte <= 0) {
        setMessage(`Quantité invalide pour le véhicule ${v.matricule}.`);
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/commandePlanifie/planifier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeCommande: selectedCommande.codeCommande,
          vehicules: vehiculesSelectionnes
        })
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Commande planifiée avec succès !");
        // Reset
        setSelectedCommande(null);
        setVehiculesSelectionnes([]);
        setVehiculeSelectionne("");
      } else {
        setMessage(result.error || "Erreur lors de la planification.");
      }
    } catch (error) {
      console.error("Erreur lors de la planification :", error);
      setMessage("Erreur serveur.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Planifier une commande</h2>

      {/* Sélection commande */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Sélectionner une commande :</label>
        <select
          className="w-full border rounded px-3 py-2"
          onChange={handleCommandeChange}
          value={selectedCommande ? commandes.indexOf(selectedCommande) : ""}
        >
          <option value="">-- Choisir une commande --</option>
          {commandes.map((commande, index) => (
            <option key={index} value={index}>
              {commande.codeCommande} - {commande.client.nomClient}
            </option>
          ))}
        </select>
      </div>

      {/* Détails commande sélectionnée */}
      {selectedCommande && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <p><strong>Date :</strong> {new Date(selectedCommande.dateCommande).toLocaleDateString()}</p>
          <p><strong>Client :</strong> {selectedCommande.client?.nomClient}</p>
          <p className="mt-2 font-semibold">Articles commandés :</p>
          <ul className="list-disc list-inside">
            {selectedCommande.articleCommandeClients.map((article, idx) => (
              <li key={idx}>
                {article.designation || article.codeArticle} - Quantité : {article.quantiteDemandee}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sélection véhicule à ajouter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Choisir un véhicule disponible :</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={vehiculeSelectionne}
          onChange={handleVehiculeSelectionChange}
        >
          <option value="">-- Choisir un véhicule --</option>
          {vehiculesDispo.map(v => (
            <option key={v.matricule} value={v.matricule}>
              {v.matricule} - Capacité: {v.capaciteVehicule} - Statut: {v.statut}
            </option>
          ))}
        </select>
        <button
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handleAjouterVehicule}
        >
          Ajouter véhicule
        </button>
      </div>

      {/* Liste des véhicules sélectionnés avec saisie quantité */}
      {vehiculesSelectionnes.length > 0 && (
        <div className="mb-6 border p-4 rounded bg-gray-100">
          <p className="font-semibold mb-3">Véhicules sélectionnés :</p>
          {vehiculesSelectionnes.map(v => (
            <div key={v.matricule} className="flex items-center space-x-4 mb-2">
              <span className="w-1/2">{v.matricule}</span>
              <input
                type="number"
                min="1"
                placeholder="Quantité transportée"
                value={v.quantiteTransporte}
                onChange={(e) => handleQuantiteChange(v.matricule, parseInt(e.target.value) || 0)}
                className="w-1/3 border rounded px-2 py-1"
              />
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handlePlanification}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Planifier la commande
      </button>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
}

export default PlanifierCommande;
