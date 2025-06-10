// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AffectationDepot = () => {
//   const [depots, setDepots] = useState([]);
//   const [utilisateurs, setUtilisateurs] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState("");
//   const [selectedUtilisateur, setSelectedUtilisateur] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       const resDepots = await axios.get("http://localhost:5000/depot");
//       const resUsers = await axios.get("http://localhost:5000/utilisateur");
//       setDepots(resDepots.data);
//       setUtilisateurs(resUsers.data);
//     };
//     fetchData();
//   }, []);

//   const handleAffectation = async () => {
//     if (!selectedDepot || !selectedUtilisateur) {
//       setMessage("Veuillez sélectionner un dépôt et un utilisateur.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/depot/affecter", {
//         codeDepot: selectedDepot,
//         codeUtilisateur: selectedUtilisateur,
//       });

//       if (res.status === 200) {
//         setMessage("Utilisateur affecté au dépôt avec succès.");
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Erreur lors de l'affectation.");
//     }
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-xl font-bold">Affecter un utilisateur à un dépôt</h2>

//       {message && (
//         <div className="p-3 rounded bg-blue-100 border border-blue-400 text-blue-800">
//           {message}
//         </div>
//       )}

//       <div className="flex flex-col gap-4 max-w-md">
//         <select
//           value={selectedDepot}
//           onChange={(e) => setSelectedDepot(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Sélectionnez un dépôt</option>
//           {depots.map((d) => (
//             <option key={d.codeDepot} value={d.codeDepot}>
//               {d.nomDepot} ({d.codeDepot})
//             </option>
//           ))}
//         </select>

//         <select
//           value={selectedUtilisateur}
//           onChange={(e) => setSelectedUtilisateur(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="">Sélectionnez un utilisateur</option>
//           {utilisateurs.map((u) => (
//             <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
//               {u.nom} {u.prenom} ({u.codeUtilisateur})
//             </option>
//           ))}
//         </select>

//         <button
//           onClick={handleAffectation}
//           className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
//         >
//           Affecter
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AffectationDepot;








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AffectationDepot = () => {
//   const [depots, setDepots] = useState([]);
//   const [utilisateurs, setUtilisateurs] = useState([]);
//   const [selectedUtilisateur, setSelectedUtilisateur] = useState("");
//   const [selectedDepot, setSelectedDepot] = useState("");
//   const [depotsAffectes, setDepotsAffectes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [utilisateurData, setUtilisateurData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resDepots = await axios.get("http://localhost:5000/depot");
//         const resUsers = await axios.get("http://localhost:5000/utilisateur");
//         setDepots(resDepots.data);
//         setUtilisateurs(resUsers.data);
//       } catch (error) {
//         console.error("Erreur lors du chargement des données:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Récupérer les dépôts affectés à l'utilisateur
//   useEffect(() => {
//     if (selectedUtilisateur) {
//       const fetchUtilisateur = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:5000/utilisateur/${selectedUtilisateur}`
//           );
//           setUtilisateurData(res.data);
//           setDepotsAffectes(res.data.depots || []); // Si dépots est undefined, mettre un tableau vide
//         } catch (error) {
//           console.error("Erreur lors de la récupération de l'utilisateur :", error);
//         }
//       };
//       fetchUtilisateur();
//     }
//   }, [selectedUtilisateur]);

//   const handleAddDepot = () => {
//     if (selectedDepot && !depotsAffectes.includes(selectedDepot)) {
//       setDepotsAffectes([...depotsAffectes, selectedDepot]);
//       setSelectedDepot("");
//     }
//   };

//   const handleRemoveDepot = (codeDepot) => {
//     setDepotsAffectes(depotsAffectes.filter((d) => d !== codeDepot));
//   };

//   const handleAffectation = async () => {
//     if (!selectedUtilisateur || depotsAffectes.length === 0) {
//       setMessage("Veuillez sélectionner un utilisateur et au moins un dépôt.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/depot/affecter-multiple", {
//         codeUtilisateur: selectedUtilisateur,
//         codesDepot: depotsAffectes,
//       });

//       if (res.status === 200) {
//         setMessage("Dépôts affectés avec succès !");
//         setDepotsAffectes([]);
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Erreur lors de l'affectation.");
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row p-6 gap-8">
//       <div className="max-w-md flex flex-col gap-4">
//         <h2 className="text-xl font-bold">Affecter des dépôts à un utilisateur</h2>

//         <select
//           value={selectedUtilisateur}
//           onChange={(e) => {
//             setSelectedUtilisateur(e.target.value);
//             setDepotsAffectes([]);
//             setUtilisateurData(null);
//             setMessage("");
//           }}
//           className="border p-2 rounded"
//         >
//           <option value="">Sélectionnez un utilisateur</option>
//           {utilisateurs.map((u) => (
//             <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
//               {u.nom} {u.prenom} ({u.codeUtilisateur})
//             </option>
//           ))}
//         </select>

//         {selectedUtilisateur && utilisateurData && (
//           <>
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">Utilisateur sélectionné :</h3>
//               <p>Nom : {utilisateurData.nom} {utilisateurData.prenom}</p>
//               <p>Code utilisateur : {utilisateurData.codeUtilisateur}</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="text-lg font-semibold">Dépôts affectés :</h3>
//               {(depotsAffectes && depotsAffectes.length === 0) ? (
//                 <p>Aucun dépôt affecté à cet utilisateur.</p>
//               ) : (
//                 <ul className="list-disc ml-5">
//                   {depotsAffectes.map((code) => {
//                     const depot = depots.find((d) => d.codeDepot === code);
//                     return (
//                       <li key={code} className="flex items-center justify-between">
//                         {depot?.nomDepot || code}
//                         <button
//                           onClick={() => handleRemoveDepot(code)}
//                           className="ml-2 text-red-600 hover:underline text-sm"
//                         >
//                           Supprimer
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>

//             <div className="mt-4">
//               <select
//                 value={selectedDepot}
//                 onChange={(e) => setSelectedDepot(e.target.value)}
//                 className="border p-2 rounded"
//               >
//                 <option value="">Sélectionnez un dépôt à ajouter</option>
//                 {depots.map((d) => (
//                   <option key={d.codeDepot} value={d.codeDepot}>
//                     {d.nomDepot} ({d.codeDepot})
//                   </option>
//                 ))}
//               </select>

//               <button
//                 onClick={handleAddDepot}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2"
//               >
//                 Ajouter le dépôt
//               </button>
//             </div>
//           </>
//         )}

//         {message && (
//           <div className="p-3 rounded bg-blue-100 border border-blue-400 text-blue-800 mt-4">
//             {message}
//           </div>
//         )}

//         <button
//           onClick={handleAffectation}
//           className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Valider l’affectation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AffectationDepot;








// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AffectationDepot = () => {
//   const [depots, setDepots] = useState([]);
//   const [utilisateurs, setUtilisateurs] = useState([]);
//   const [selectedUtilisateur, setSelectedUtilisateur] = useState("");
//   const [selectedDepot, setSelectedDepot] = useState("");
//   const [depotsAffectes, setDepotsAffectes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [utilisateurData, setUtilisateurData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resDepots = await axios.get("http://localhost:5000/depot");
//         const resUsers = await axios.get("http://localhost:5000/utilisateur");
//         setDepots(resDepots.data);
//         setUtilisateurs(resUsers.data);
//       } catch (error) {
//         console.error("Erreur lors du chargement des données:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedUtilisateur) {
//       const fetchUtilisateur = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:5000/utilisateur/${selectedUtilisateur}`
//           );
//           setUtilisateurData(res.data);
//           setDepotsAffectes(res.data.depots || []);
//         } catch (error) {
//           console.error("Erreur lors de la récupération de l'utilisateur :", error);
//         }
//       };
//       fetchUtilisateur();
//     }
//   }, [selectedUtilisateur]);

//   const handleAddDepot = () => {
//     if (selectedDepot && !depotsAffectes.includes(selectedDepot)) {
//       setDepotsAffectes([...depotsAffectes, selectedDepot]);
//       setSelectedDepot("");
//     }
//   };

//   const handleRemoveDepot = (codeDepot) => {
//     setDepotsAffectes(depotsAffectes.filter((d) => d !== codeDepot));
//   };

//   const handleAffectation = async () => {
//     if (!selectedUtilisateur || depotsAffectes.length === 0) {
//       setMessage("Veuillez sélectionner un utilisateur et au moins un dépôt.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/depot/affecter-multiple", {
//         codeUtilisateur: selectedUtilisateur,
//         codesDepot: depotsAffectes,
//       });

//       if (res.status === 200) {
//         setMessage("Dépôts affectés avec succès !");
//         setDepotsAffectes([]);
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Erreur lors de l'affectation.");
//     }
//   };

//   // 🔒 Liste de tous les dépôts déjà affectés à n'importe quel utilisateur
//   const depotsDejaAffectes = utilisateurs
//     .map((u) => u.depots || [])
//     .flat();

//   return (
//     <div className="flex flex-col lg:flex-row p-6 gap-8">
//       <div className="max-w-md flex flex-col gap-4">
//         <h2 className="text-xl font-bold">Affecter des dépôts à un utilisateur</h2>

//         <select
//           value={selectedUtilisateur}
//           onChange={(e) => {
//             setSelectedUtilisateur(e.target.value);
//             setDepotsAffectes([]);
//             setUtilisateurData(null);
//             setMessage("");
//           }}
//           className="border p-2 rounded"
//         >
//           <option value="">Sélectionnez un utilisateur</option>
//           {utilisateurs.map((u) => (
//             <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
//               {u.nom} {u.prenom} ({u.codeUtilisateur})
//             </option>
//           ))}
//         </select>

//         {selectedUtilisateur && utilisateurData && (
//           <>
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">Utilisateur sélectionné :</h3>
//               <p>Nom : {utilisateurData.nom} {utilisateurData.prenom}</p>
//               <p>Code utilisateur : {utilisateurData.codeUtilisateur}</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="text-lg font-semibold">Dépôts affectés :</h3>
//               {depotsAffectes.length === 0 ? (
//                 <p>Aucun dépôt affecté à cet utilisateur.</p>
//               ) : (
//                 <ul className="list-disc ml-5">
//                   {depotsAffectes.map((code) => {
//                     const depot = depots.find((d) => d.codeDepot === code);
//                     return (
//                       <li key={code} className="flex items-center justify-between">
//                         {depot?.nomDepot || code}
//                         <button
//                           onClick={() => handleRemoveDepot(code)}
//                           className="ml-2 text-red-600 hover:underline text-sm"
//                         >
//                           Supprimer
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>

//             <div className="mt-4">
//               <select
//                 value={selectedDepot}
//                 onChange={(e) => setSelectedDepot(e.target.value)}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Sélectionnez un dépôt à ajouter</option>
//                 {depots.map((d) => {
//                   const isDisabled = depotsDejaAffectes.includes(d.codeDepot);
//                   return (
//                     <option
//                       key={d.codeDepot}
//                       value={d.codeDepot}
//                       disabled={isDisabled}
//                       className={isDisabled ? "text-gray-400" : ""}
//                     >
//                       {d.nomDepot} ({d.codeDepot}) {isDisabled ? " - Déjà affecté" : ""}
//                     </option>
//                   );
//                 })}
//               </select>

//               <button
//                 onClick={handleAddDepot}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
//               >
//                 Ajouter le dépôt
//               </button>
//             </div>
//           </>
//         )}

//         {message && (
//           <div className="p-3 rounded bg-blue-100 border border-blue-400 text-blue-800 mt-4">
//             {message}
//           </div>
//         )}

//         <button
//           onClick={handleAffectation}
//           className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Valider l’affectation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AffectationDepot;







// //le code sans affichage de la liste ok sans button supprimer sans 

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AffectationDepot = () => {
//   const [depots, setDepots] = useState([]);
//   const [utilisateurs, setUtilisateurs] = useState([]);
//   const [selectedUtilisateur, setSelectedUtilisateur] = useState("");
//   const [selectedDepot, setSelectedDepot] = useState("");
//   const [depotsAffectes, setDepotsAffectes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [utilisateurData, setUtilisateurData] = useState(null);
//   const [depotsStatus, setDepotsStatus] = useState({}); // Suivi de l'état des dépôts

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resDepots = await axios.get("http://localhost:5000/depot");
//         const resUsers = await axios.get("http://localhost:5000/utilisateur");
//         setDepots(resDepots.data);
//         setUtilisateurs(resUsers.data);
//       } catch (error) {
//         console.error("Erreur lors du chargement des données:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (selectedUtilisateur) {
//       const fetchUtilisateur = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:5000/utilisateur/${selectedUtilisateur}`
//           );
//           setUtilisateurData(res.data);
//           setDepotsAffectes(res.data.depots || []);
//         } catch (error) {
//           console.error("Erreur lors de la récupération de l'utilisateur :", error);
//         }
//       };
//       fetchUtilisateur();
//     }
//   }, [selectedUtilisateur]);

//   // Vérifier si un dépôt est déjà affecté
//   const checkDepotAffecte = async (codeDepot) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/depot/affecte/${codeDepot}`);
//       return res.data.message === "Dépôt est affecté à un utilisateur";
//     } catch (error) {
//       console.error("Erreur lors de la vérification du dépôt :", error);
//       return false;
//     }
//   };

//   const handleAddDepot = () => {
//     if (selectedDepot && !depotsAffectes.includes(selectedDepot)) {
//       setDepotsAffectes([...depotsAffectes, selectedDepot]);
//       setSelectedDepot("");
//     }
//   };

//   const handleRemoveDepot = (codeDepot) => {
//     setDepotsAffectes(depotsAffectes.filter((d) => d !== codeDepot));
//   };

//   const handleAffectation = async () => {
//     if (!selectedUtilisateur || depotsAffectes.length === 0) {
//       setMessage("Veuillez sélectionner un utilisateur et au moins un dépôt.");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/depot/affecter-multiple", {
//         codeUtilisateur: selectedUtilisateur,
//         codesDepot: depotsAffectes,
//       });

//       if (res.status === 200) {
//         setMessage("Dépôts affectés avec succès !");
//         setDepotsAffectes([]);
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Erreur lors de l'affectation.");
//     }
//   };

//   // Vérifier l'état des dépôts
//   const verifyDepotsStatus = async () => {
//     const status = {};
//     for (let depot of depots) {
//       status[depot.codeDepot] = await checkDepotAffecte(depot.codeDepot);
//     }
//     setDepotsStatus(status);
//   };

//   useEffect(() => {
//     verifyDepotsStatus();
//   }, [depots]);

//   return (
//     <div className="flex flex-col lg:flex-row p-6 gap-8">
//       <div className="max-w-md flex flex-col gap-4">
//         <h2 className="text-xl font-bold">Affecter des dépôts à un utilisateur</h2>

//         <select
//           value={selectedUtilisateur}
//           onChange={(e) => {
//             setSelectedUtilisateur(e.target.value);
//             setDepotsAffectes([]);
//             setUtilisateurData(null);
//             setMessage("");
//           }}
//           className="border p-2 rounded"
//         >
//           <option value="">Sélectionnez un utilisateur</option>
//           {utilisateurs.map((u) => (
//             <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
//               {u.nom} {u.prenom} ({u.codeUtilisateur})
//             </option>
//           ))}
//         </select>

//         {selectedUtilisateur && utilisateurData && (
//           <>
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold">Utilisateur sélectionné :</h3>
//               <p>Nom : {utilisateurData.nom} {utilisateurData.prenom}</p>
//               <p>Code utilisateur : {utilisateurData.codeUtilisateur}</p>
//             </div>

//             <div className="mt-6">
//               <h3 className="text-lg font-semibold">Dépôts affectés :</h3>
//               {depotsAffectes.length === 0 ? (
//                 <p>Aucun dépôt affecté à cet utilisateur.</p>
//               ) : (
//                 <ul className="list-disc ml-5">
//                   {depotsAffectes.map((code) => {
//                     const depot = depots.find((d) => d.codeDepot === code);
//                     return (
//                       <li key={code} className="flex items-center justify-between">
//                         {depot?.nomDepot || code}
//                         <button
//                           onClick={() => handleRemoveDepot(code)}
//                           className="ml-2 text-red-600 hover:underline text-sm"
//                         >
//                           Supprimer
//                         </button>
//                       </li>
//                     );
//                   })}
//                 </ul>
//               )}
//             </div>

//             <div className="mt-4">
//               <select
//                 value={selectedDepot}
//                 onChange={(e) => setSelectedDepot(e.target.value)}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Sélectionnez un dépôt à ajouter</option>
//                 {depots.map((d) => {
//                   const isDisabled = depotsStatus[d.codeDepot]; // Vérifier si le dépôt est affecté
//                   return (
//                     <option
//                       key={d.codeDepot}
//                       value={d.codeDepot}
//                       disabled={isDisabled}
//                       className={`${isDisabled ? "text-gray-400" : ""}`}
//                     >
//                       {d.nomDepot} ({d.codeDepot}) {isDisabled ? " - Déjà affecté" : ""}
//                     </option>
//                   );
//                 })}
//               </select>

//               <button
//                 onClick={handleAddDepot}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
//               >
//                 Ajouter le dépôt
//               </button>
//             </div>
//           </>
//         )}

//         {message && (
//           <div className="p-3 rounded bg-blue-100 border border-blue-400 text-blue-800 mt-4">
//             {message}
//           </div>
//         )}

//         <button
//           onClick={handleAffectation}
//           className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           Valider l’affectation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AffectationDepot;











import React, { useEffect, useState } from "react";
import axios from "axios";

const AffectationDepot = () => {
    const [depots, setDepots] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [selectedUtilisateur, setSelectedUtilisateur] = useState("");
    const [selectedDepot, setSelectedDepot] = useState("");
    const [depotsAffectes, setDepotsAffectes] = useState([]);
    const [message, setMessage] = useState("");
    const [utilisateurData, setUtilisateurData] = useState(null);
    const [depotsStatus, setDepotsStatus] = useState({});
    const [utilisateursAvecDepots, setUtilisateursAvecDepots] = useState([]); // 🔥 NOUVEAU




    useEffect(() => {
        const fetchData = async () => {
            try {
                const resDepots = await axios.get("http://localhost:5000/depot");
                setDepots(resDepots.data);
                const resUsers = await axios.get("http://localhost:5000/utilisateur/utilisateurs-depot-groupe");
                const { admins, gestionnaires } = resUsers.data;
                const usersFiltres = [...admins, ...gestionnaires];
                setUtilisateurs(usersFiltres);




                // 🔥 Appel à la route qui retourne les utilisateurs avec leurs dépôts affectés
                const resUtilDepots = await axios.get("http://localhost:5000/depot/utilisateurs-avec-depots");
                setUtilisateursAvecDepots(resUtilDepots.data);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedUtilisateur) {
            const fetchUtilisateur = async () => {
                try {

                    const res = await axios.get(
                        `http://localhost:5000/utilisateur/${selectedUtilisateur}`
                    );
                    setUtilisateurData(res.data);
                    setDepotsAffectes(res.data.depots || []);
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'utilisateur :", error);
                }
            };
            fetchUtilisateur();
        }
    }, [selectedUtilisateur]);

    const checkDepotAffecte = async (codeDepot) => {
        if (!utilisateurData) return false;

        try {
            // const res = await axios.get(`http://localhost:5000/depot/check/${codeDepot}/${utilisateurData.role}`);
            const res = await axios.get(`http://localhost:5000/depot/check/${codeDepot}/${utilisateurData.codeUtilisateur}/${utilisateurData.role}`);
            return res.data.affecte;
        } catch (error) {
            console.error("Erreur lors de la vérification du dépôt :", error);
            return false;
        }
    };



    const handleAddDepot = () => {
        if (
            selectedDepot &&
            !depotsAffectes.includes(selectedDepot) &&
            !depotsInterdits.includes(selectedDepot)
        ) {
            setDepotsAffectes([...depotsAffectes, selectedDepot]);
            setSelectedDepot("");
        }
    };


    const handleRemoveDepot = (codeDepot) => {
        setDepotsAffectes(depotsAffectes.filter((d) => d !== codeDepot));
    };




    const handleAffectation = async () => {
        if (!selectedUtilisateur || depotsAffectes.length === 0) {
            setMessage("Veuillez sélectionner un utilisateur et au moins un dépôt.");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/depot/affecter-multiple", {
                codeUtilisateur: selectedUtilisateur,
                codesDepot: depotsAffectes,
                role: utilisateurData?.role,
            });

            if (res.status === 200) {
                setMessage("Dépôts affectés avec succès !");
                setDepotsAffectes([]);

                
                const updatedDepotsStatus = { ...depotsStatus };
                depotsAffectes.forEach((depotCode) => {
                    updatedDepotsStatus[depotCode] = true;  
                });
                setDepotsStatus(updatedDepotsStatus);

                
                const resUtilDepots = await axios.get("http://localhost:5000/depot/utilisateurs-avec-depots");
                setUtilisateursAvecDepots(resUtilDepots.data);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur lors de l'affectation.");
        }
    };


    const verifyDepotsStatus = async () => {
        if (!utilisateurData) return;
        const status = {};
        for (let depot of depots) {
            status[depot.codeDepot] = await checkDepotAffecte(depot.codeDepot);
        }
        setDepotsStatus(status);
    };


    useEffect(() => {
        verifyDepotsStatus();
    }, [depots, utilisateurData]);


  


    const getDepotsInterditsParRole = () => {
        if (!selectedUtilisateur || !utilisateurData) return [];

        const roleSelectionne = utilisateurData.role;
        const codeUtilisateurSelectionne = utilisateurData.codeUtilisateur;

        
        const autresUtilisateurs = utilisateursAvecDepots.filter(
            (u) => u.codeUtilisateur !== codeUtilisateurSelectionne
        );

        let depotsInterdits = [];

        autresUtilisateurs.forEach((util) => {
            if (roleSelectionne === "Gestionnaire Dépôt" && util.role === "Gestionnaire Dépôt") {
                depotsInterdits.push(...(util.depots || []));
            } else if (roleSelectionne === "Admin Dépôt" && util.role === "Admin Dépôt") {
                depotsInterdits.push(...(util.depots || []));
            }
        });

        return depotsInterdits.map((d) => d.codeDepot); 
    };


    const depotsInterdits = getDepotsInterditsParRole();


    


return (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
            Affectation des Dépôts aux Utilisateurs
        </h2>

        {/* Section Sélection */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
            {/* Colonne Utilisateur */}
            <div className="lg:w-1/2 flex flex-col gap-4 border p-4 rounded shadow bg-white">
                <h3 className="text-lg font-semibold">Sélectionnez un utilisateur :</h3>
                <select
                    value={selectedUtilisateur}
                    onChange={(e) => {
                        setSelectedUtilisateur(e.target.value);
                        setDepotsAffectes([]);
                        setUtilisateurData(null);
                        setMessage("");
                    }}
                    className="border p-2 rounded"
                >
                    <option value="">-- Choisir un utilisateur --</option>
                    <optgroup label="Administrateurs de dépôt">
                        {utilisateurs
                            .filter((u) => u.role === "Admin Dépôt")
                            .map((u) => (
                                <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
                                    {u.nom} {u.prenom} ({u.codeUtilisateur})
                                </option>
                            ))}
                    </optgroup>
                    <optgroup label="Gestionnaires de dépôt">
                        {utilisateurs
                            .filter((u) => u.role === "Gestionnaire Dépôt")
                            .map((u) => (
                                <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
                                    {u.nom} {u.prenom} ({u.codeUtilisateur})
                                </option>
                            ))}
                    </optgroup>
                </select>

                {selectedUtilisateur && utilisateurData && (
                    <div className="text-sm bg-gray-50 p-3 rounded">
                        <p><strong>Nom :</strong> {utilisateurData.nom} {utilisateurData.prenom}</p>
                        <p><strong>Code :</strong> {utilisateurData.codeUtilisateur}</p>
                        <p><strong>Rôle :</strong> {utilisateurData.role}</p>
                    </div>
                )}
            </div>

            {/* Colonne Dépôt */}
            <div className="lg:w-1/2 flex flex-col gap-4 border p-4 rounded shadow bg-white">
                <h3 className="text-lg font-semibold">Affecter un dépôt :</h3>
                <select
                    value={selectedDepot}
                    onChange={(e) => setSelectedDepot(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">-- Choisir un dépôt --</option>
                    {depots.map((depot) => (
                        <option
                            key={depot.codeDepot}
                            value={depot.codeDepot}
                            disabled={depotsStatus[depot.codeDepot]}
                        >
                            {depot.nomDepot}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleAddDepot}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    disabled={!selectedDepot || depotsInterdits.includes(selectedDepot)}
                >
                    Ajouter ce dépôt
                </button>

                {depotsAffectes.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-semibold">Dépôts sélectionnés :</h4>
                        <ul className="list-disc pl-5">
                            {depotsAffectes.map((code) => {
                                const depot = depots.find((d) => d.codeDepot === code);
                                return (
                                    <li key={code} className="flex justify-between items-center">
                                        {depot?.nomDepot || code}
                                        <button
                                            onClick={() => handleRemoveDepot(code)}
                                            className="ml-2 text-red-500 hover:underline text-sm"
                                        >
                                            Supprimer
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>

        
        {message && (
            <div className="mb-4 p-3 rounded bg-blue-100 border border-blue-400 text-blue-800">
                {message}
            </div>
        )}
        <div className="mb-10">
            <button
                onClick={handleAffectation}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
                Valider l’affectation
            </button>
        </div>

    

{/* Section affichage des affectations */}
<div className="bg-gray-100 p-6 rounded">
  <h3 className="text-xl font-bold mb-6 text-center">
    Utilisateurs avec leurs dépôts affectés
  </h3>

  {utilisateursAvecDepots.length === 0 ? (
    <p className="text-center text-gray-600">Aucune affectation trouvée.</p>
  ) : (
    <div className="flex flex-col space-y-4">
      {utilisateursAvecDepots.map((user) => (
        <div
          key={user.codeUtilisateur}
          className="border border-gray-300 rounded-lg shadow bg-white p-4"
        >
          <p className="font-semibold text-lg mb-2">
            {user.nom} {user.prenom}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <strong>Code utilisateur :</strong> {user.codeUtilisateur}
          </p>
          {/* <p className="text-sm text-gray-600 mb-3">
            <strong>Rôle :</strong> {user.role}
          </p> */}

          <div>
            <p className="font-medium mb-1">Dépôts affectés :</p>
            {user.depots && user.depots.length > 0 ? (
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {user.depots.map((d) => (
                  <li key={d.codeDepot}>
                    <div className="ml-2">
                      <p>
                        <strong>Code :</strong> {d.codeDepot}
                      </p>
                      <p>
                        <strong>Nom :</strong> {d.nomDepot}
                      </p>
                      <p>
                        <strong>Région :</strong> {d.region}
                      </p>
                      <p>
                        <strong>Wilaya :</strong> {d.wilaya}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Aucun dépôt affecté.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>


    </div>
);


};

export default AffectationDepot;














// return (
    //     <div className="flex flex-col lg:flex-row p-6 gap-8">
    //         <div className="max-w-md flex flex-col gap-4">
    //             <h2 className="text-xl font-bold">Affecter des dépôts à un utilisateur</h2>



    //             <select
    //                 value={selectedUtilisateur}
    //                 onChange={(e) => {
    //                     setSelectedUtilisateur(e.target.value);
    //                     setDepotsAffectes([]);
    //                     setUtilisateurData(null);
    //                     setMessage("");
    //                 }}
    //                 className="border p-2 rounded"
    //             >
    //                 <option value="">Sélectionnez un utilisateur</option>

    //                 <optgroup label="Administrateurs de dépôt">
    //                     {utilisateurs
    //                         .filter((u) => u.role === "Admin Dépôt") // adapte selon ta structure
    //                         .map((u) => (
    //                             <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
    //                                 {u.nom} {u.prenom} ({u.codeUtilisateur})
    //                             </option>
    //                         ))}
    //                 </optgroup>

    //                 <optgroup label="Gestionnaires de dépôt">
    //                     {utilisateurs
    //                         .filter((u) => u.role === "Gestionnaire Dépôt") // adapte selon ta structure
    //                         .map((u) => (
    //                             <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
    //                                 {u.nom} {u.prenom} ({u.codeUtilisateur})
    //                             </option>
    //                         ))}
    //                 </optgroup>
    //             </select>





    //             {selectedUtilisateur && utilisateurData && (
    //                 <>
    //                     <div className="mt-4">
    //                         <h3 className="text-lg font-semibold">Utilisateur sélectionné :</h3>
    //                         <p>Nom : {utilisateurData.nom} {utilisateurData.prenom}</p>
    //                         <p>Code utilisateur : {utilisateurData.codeUtilisateur}</p>
    //                     </div>

    //                     <div className="mt-6">
    //                         <h3 className="text-lg font-semibold">Dépôts affectés :</h3>
    //                         {depotsAffectes.length === 0 ? (
    //                             <p>Aucun dépôt affecté à cet utilisateur.</p>
    //                         ) : (
    //                             <ul className="list-disc ml-5">
    //                                 {depotsAffectes.map((code) => {
    //                                     const depot = depots.find((d) => d.codeDepot === code);
    //                                     return (
    //                                         <li key={code} className="flex items-center justify-between">
    //                                             {depot?.nomDepot || code}
    //                                             <button
    //                                                 onClick={() => handleRemoveDepot(code)}
    //                                                 className="ml-2 text-red-600 hover:underline text-sm"
    //                                             >
    //                                                 Supprimer
    //                                             </button>
    //                                         </li>
    //                                     );
    //                                 })}
    //                             </ul>
    //                         )}
    //                     </div>

    //                     <div className="mt-4">


    //                         <select
    //                             value={selectedDepot}
    //                             onChange={(e) => setSelectedDepot(e.target.value)}
    //                             className="border p-2 rounded"
    //                         >
    //                             <option value="">Sélectionnez un dépôt</option>
    //                             {depots.map((depot) => (
    //                                 <option
    //                                     key={depot.codeDepot}
    //                                     value={depot.codeDepot}
    //                                     disabled={depotsStatus[depot.codeDepot]}
    //                                 >
    //                                     {depot.nomDepot}
    //                                 </option>
    //                             ))}
    //                         </select>

    //                         {/* Bouton pour ajouter le dépôt */}
    //                         <button
    //                             onClick={handleAddDepot}
    //                             className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
    //                             disabled={!selectedDepot || depotsInterdits.includes(selectedDepot)}
    //                         >
    //                             Ajouter ce dépôt
    //                         </button>



    //                     </div>
    //                 </>
    //             )}

    //             {message && (
    //                 <div className="p-3 rounded bg-blue-100 border border-blue-400 text-blue-800 mt-4">
    //                     {message}
    //                 </div>
    //             )}

    //             <button
    //                 onClick={handleAffectation}
    //                 className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    //             >
    //                 Valider l’affectation
    //             </button>
    //         </div>



    //         <div className="mt-10">
    //             <h2 className="text-xl font-bold mb-4">Utilisateurs avec leurs dépôts affectés</h2>
    //             {utilisateursAvecDepots.length === 0 ? (
    //                 <p>Aucune affectation trouvée.</p>
    //             ) : (
    //                 <ul className="space-y-4">
    //                     {utilisateursAvecDepots.map((utilisateur) => (
    //                         <li key={utilisateur.codeUtilisateur} className="border p-4 rounded shadow">
    //                             <p className="font-semibold">
    //                                 {utilisateur.nom} {utilisateur.prenom} ({utilisateur.codeUtilisateur})
    //                             </p>
    //                             {(utilisateur.depots && utilisateur.depots.length > 0) ? (
    //                                 <ul className="list-disc ml-5 mt-2">
    //                                     {utilisateur.depots.map((depot) => (
    //                                         <li key={depot.codeDepot}>
    //                                             {depot.nomDepot} ({depot.codeDepot}) - {depot.region}, {depot.wilaya}
    //                                         </li>
    //                                     ))}
    //                                 </ul>
    //                             ) : (
    //                                 <p className="text-sm text-gray-500">Aucun dépôt affecté.</p>
    //                             )}
    //                         </li>
    //                     ))}
    //                 </ul>
    //             )}
    //         </div>
    //     </div>
    // );






























































































































































































{/* <select
                                value={selectedDepot}
                                onChange={(e) => setSelectedDepot(e.target.value)}
                                className="border p-2 rounded w-full"
                            >
                                <option value="">Sélectionnez un dépôt à ajouter</option>
                                {depots.map((d) => {
                                    const isDisabled = depotsStatus[d.codeDepot];
                                    return (
                                        <option
                                            key={d.codeDepot}
                                            value={d.codeDepot}
                                            disabled={isDisabled}
                                            className={`${isDisabled ? "text-gray-400" : ""}`}
                                        >
                                            {d.nomDepot} ({d.codeDepot}) {isDisabled ? " - Déjà affecté" : ""}
                                        </option>
                                    );
                                })}
                            </select> */}



{/* <select
                                value={selectedDepot}
                                onChange={(e) => setSelectedDepot(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="">Sélectionnez un dépôt</option>
                                {depots.map((depot) => {
                                    let disabled = false;

                                    if (utilisateurData?.role === "Gestionnaire Dépôt") {
                                        const depotsGestionnaires = getDepotsAffectesParRole("Gestionnaire Dépôt");
                                        disabled = depotsGestionnaires.includes(depot.codeDepot) &&
                                            !depotsAffectes.includes(depot.codeDepot); // autorise s'il est déjà sélectionné pour cette affectation
                                    }

                                    if (utilisateurData?.role === "Admin Dépôt") {
                                        const depotsAdmins = getDepotsAffectesParRole("Admin Dépôt");
                                        disabled = depotsAdmins.includes(depot.codeDepot) &&
                                            !depotsAffectes.includes(depot.codeDepot);
                                    }

                                    return (
                                        <option
                                            key={depot.codeDepot}
                                            value={depot.codeDepot}
                                            disabled={disabled}
                                        >
                                            {depot.nom} ({depot.codeDepot})
                                        </option>
                                    );
                                })}
                            </select> */}



{/* 
                            <select
                                value={selectedDepot}
                                onChange={(e) => setSelectedDepot(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="">Sélectionnez un dépôt</option>
                                {depots.map((depot) => {
                                    const depotsGrises = getDepotsInterditsParRole();
                                    const estGrise = depotsGrises.includes(depot.codeDepot);
                                    return (
                                        <option key={depot.codeDepot} value={depot.codeDepot} disabled={estGrise}>
                                            {depot.nomDepot} {estGrise ? "(déjà affecté)" : ""}
                                        </option>
                                    );
                                })}
                            </select> */}


{/* <select
                                value={selectedDepot}
                                onChange={(e) => setSelectedDepot(e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="">Sélectionnez un dépôt</option>
                                {depots.map((depot) => (
                                    <option
                                        key={depot.codeDepot}
                                        value={depot.codeDepot}
                                        disabled={depotsInterdits.includes(depot.codeDepot)}
                                    >
                                        {depot.nomDepot} ({depot.codeDepot})
                                    </option>
                                ))}
                            </select> */}










{/* <select
                    value={selectedUtilisateur}
                    onChange={(e) => {
                        setSelectedUtilisateur(e.target.value);
                        setDepotsAffectes([]);
                        setUtilisateurData(null);
                        setMessage("");
                    }}
                    className="border p-2 rounded"
                >

                    <option value="">Sélectionnez un utilisateur</option>
                    {utilisateurs && utilisateurs.length > 0 && utilisateurs.map((u) => (
                        <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
                            {u.nom} {u.prenom} ({u.codeUtilisateur})
                        </option>
                    ))}

                    
                </select> */}
























// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AffectationDepot = () => {
//     const [depots, setDepots] = useState([]);
//     const [utilisateurs, setUtilisateurs] = useState([]);
//     const [selectedUtilisateur, setSelectedUtilisateur] = useState("");
//     const [selectedDepot, setSelectedDepot] = useState("");
//     const [depotsAffectes, setDepotsAffectes] = useState([]);
//     const [message, setMessage] = useState("");
//     const [utilisateurData, setUtilisateurData] = useState(null);
//     const [utilisateursAvecDepots, setUtilisateursAvecDepots] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const resDepots = await axios.get("http://localhost:5000/depot");
//                 const resUsers = await axios.get("http://localhost:5000/utilisateur/utilisateurs-depot-groupe");
//                 const resUtilDepots = await axios.get("http://localhost:5000/depot/utilisateurs-avec-depots");

//                 const { admins, gestionnaires } = resUsers.data;
//                 setDepots(resDepots.data);
//                 setUtilisateurs([...admins, ...gestionnaires]);
//                 setUtilisateursAvecDepots(resUtilDepots.data);
//             } catch (error) {
//                 console.error("Erreur lors du chargement des données:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (selectedUtilisateur) {
//             const fetchUtilisateur = async () => {
//                 try {
//                     const res = await axios.get(`http://localhost:5000/utilisateur/${selectedUtilisateur}`);
//                     setUtilisateurData(res.data);
//                     setDepotsAffectes(res.data.depots || []);
//                 } catch (error) {
//                     console.error("Erreur lors de la récupération de l'utilisateur :", error);
//                 }
//             };
//             fetchUtilisateur();
//         }
//     }, [selectedUtilisateur]);

//     const getAllDepotsAffectes = () => {
//         let tous = [];
//         utilisateursAvecDepots.forEach((u) => {
//             if (u.depots) {
//                 tous = [...tous, ...u.depots];
//             }
//         });
//         return tous;
//     };

//     const handleAddDepot = () => {
//         if (selectedDepot && !depotsAffectes.includes(selectedDepot)) {
//             setDepotsAffectes([...depotsAffectes, selectedDepot]);
//             setSelectedDepot("");
//         }
//     };

//     const handleRemoveDepot = (codeDepot) => {
//         setDepotsAffectes(depotsAffectes.filter((d) => d !== codeDepot));
//     };

//     const handleAffectation = async () => {
//         if (!selectedUtilisateur || depotsAffectes.length === 0) {
//             setMessage("Veuillez sélectionner un utilisateur et au moins un dépôt.");
//             return;
//         }
//         try {
//             const res = await axios.post("http://localhost:5000/depot/affecter-multiple", {
//                 codeUtilisateur: selectedUtilisateur,
//                 codesDepot: depotsAffectes,
//             });
//             if (res.status === 200) {
//                 setMessage("Dépôts affectés avec succès !");
//                 setDepotsAffectes([]);
//                 const resUtilDepots = await axios.get("http://localhost:5000/depot/utilisateurs-avec-depots");
//                 setUtilisateursAvecDepots(resUtilDepots.data);
//             }
//         } catch (error) {
//             setMessage(error.response?.data?.message || "Erreur lors de l'affectation.");
//         }
//     };

//     const allDepotsAffectes = getAllDepotsAffectes();

//     return (
//         <div className="p-6 space-y-6">
//             <h2 className="text-xl font-bold">Affecter des dépôts</h2>
//             <select
//                 value={selectedUtilisateur}
//                 onChange={(e) => {
//                     setSelectedUtilisateur(e.target.value);
//                     setDepotsAffectes([]);
//                     setUtilisateurData(null);
//                     setMessage("");
//                 }}
//                 className="border p-2 rounded"
//             >
//                 <option value="">Sélectionnez un utilisateur</option>
//                 <optgroup label="Administrateurs">
//                     {utilisateurs.filter(u => u.role === "Admin Dépôt").map(u => (
//                         <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
//                             {u.nom} {u.prenom} ({u.codeUtilisateur})
//                         </option>
//                     ))}
//                 </optgroup>
//                 <optgroup label="Gestionnaires">
//                     {utilisateurs.filter(u => u.role === "Gestionnaire Dépôt").map(u => (
//                         <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
//                             {u.nom} {u.prenom} ({u.codeUtilisateur})
//                         </option>
//                     ))}
//                 </optgroup>
//             </select>

//             <div>
//                 <h3 className="font-semibold">Sélectionnez un dépôt à affecter :</h3>
//                 <select
//                     value={selectedDepot}
//                     onChange={(e) => setSelectedDepot(e.target.value)}
//                     className="border p-2 rounded"
//                 >
//                     <option value="">-- Choisir un dépôt --</option>
//                     {depots.map(depot => {
//                         const isAlreadyAffecte = allDepotsAffectes.includes(depot.codeDepot);
//                         const isDisabled = isAlreadyAffecte && !depotsAffectes.includes(depot.codeDepot);
//                         return (
//                             <option
//                                 key={depot.codeDepot}
//                                 value={depot.codeDepot}
//                                 disabled={isDisabled}
//                             >
//                                 {depot.nomDepot} {isDisabled ? "(Déjà affecté)" : ""}
//                             </option>
//                         );
//                     })}
//                 </select>
//                 <button onClick={handleAddDepot} className="ml-2 bg-blue-500 text-white px-3 py-1 rounded">
//                     Ajouter
//                 </button>
//             </div>

//             <div>
//                 <h3 className="font-semibold">Dépôts affectés :</h3>
//                 <ul>
//                     {depotsAffectes.map(code => (
//                         <li key={code} className="flex items-center gap-2">
//                             {code}
//                             <button
//                                 onClick={() => handleRemoveDepot(code)}
//                                 className="text-red-500 hover:underline"
//                             >
//                                 Supprimer
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>

//             <button onClick={handleAffectation} className="bg-green-600 text-white px-4 py-2 rounded">
//                 Affecter les dépôts
//             </button>

//             {message && <p className="text-sm text-blue-600 mt-2">{message}</p>}
//         </div>
//     );
// };

// export default AffectationDepot;
