// import React, { useState } from "react";

// const ImporterCommandes = () => {
//   const [fichier, setFichier] = useState(null);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("success");

//   const handleFileChange = (e) => {
//     setFichier(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", fichier);

//     try {
//       const response = await fetch("http://localhost:5000/import/commandes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       setType(response.ok ? "success" : "danger");
//       setMessage(result.message || result.error);
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Importer les Commandes Clients</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Importer
//         </button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;








// import React, { useState, useEffect } from "react";

// const ImporterCommandes = () => {
//   const [fichier, setFichier] = useState(null);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("success");
//   const [commandes, setCommandes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateDebut, setDateDebut] = useState("");
//   const [dateFin, setDateFin] = useState("");

//   // Gérer la sélection du fichier
//   const handleFileChange = (e) => {
//     setFichier(e.target.files[0]);
//   };

//   // Soumettre le fichier pour l'importation
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", fichier);

//     try {
//       const response = await fetch("http://localhost:5000/import/commandes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       setType(response.ok ? "success" : "danger");
//       setMessage(result.message || result.error);
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };

//   // Récupérer les commandes depuis l'API
//   const fetchCommandes = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/commandes");
//       const result = await response.json();
//       if (response.ok) {
//         setCommandes(result.data || []);
//       } else {
//         setMessage(result.error || "Erreur lors du chargement des commandes.");
//         setType("danger");
//       }
//     } catch (error) {
//       console.error("Erreur de récupération :", error);
//     }
//   };

//   // Filtrer les commandes en fonction des critères
//   const commandesFiltrees = commandes.filter((cmd) => {
//     const recherche = searchTerm.toLowerCase();
//     const matchTexte =
//       cmd.codeClient.toLowerCase().includes(recherche) ||
//       cmd.nomClient.toLowerCase().includes(recherche) ||
//       cmd.codeArticle.toLowerCase().includes(recherche) ||
//       cmd.designatio.toLowerCase().includes(recherche);

//     const dateCmd = new Date(cmd.dateCommande);
//     const dansPlage =
//       (!dateDebut || dateCmd >= new Date(dateDebut)) &&
//       (!dateFin || dateCmd <= new Date(dateFin));

//     return matchTexte && dansPlage;
//   });

//   useEffect(() => {
//     fetchCommandes(); // Charger les commandes au chargement du composant
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Importer les Commandes Clients</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary me-3">
//           Importer
//         </button>
//         <button type="button" onClick={fetchCommandes} className="btn btn-success">
//           Afficher les commandes
//         </button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}

//       {commandes.length > 0 && (
//         <>
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Rechercher client, article, code..."
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div>
//               <input
//                 type="date"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={dateDebut}
//                 onChange={(e) => setDateDebut(e.target.value)}
//               />
//             </div>
//             <div>
//               <input
//                 type="date"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={dateFin}
//                 onChange={(e) => setDateFin(e.target.value)}
//               />
//             </div>
//           </div>

//           <table className="table table-bordered mt-4">
//             <thead className="table-light">
//               <tr>
//                 <th>Code Commande</th>
//                 <th>Date</th>
//                 <th>Code Client</th>
//                 <th>Nom Client</th>
//                 <th>Code Article</th>
//                 <th>Désignation</th>
//                 <th>Quantité Demandée</th>
//               </tr>
//             </thead>
//             <tbody>
//               {commandesFiltrees.map((cmd, index) => (
//                 <tr key={index}>
//                   <td>{cmd.codeCommande}</td>
//                   <td>{cmd.dateCommande}</td>
//                   <td>{cmd.codeClient}</td>
//                   <td>{cmd.nomClient}</td>
//                   <td>{cmd.codeArticle}</td>
//                   <td>{cmd.designation}</td>
//                   <td>{cmd.quantiteDemandee}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;













//  Soumettre le fichier pour l'importation
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", fichier);

//     try {
//       const response = await fetch("http://localhost:5000/import/commandes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();
//       setType(response.ok ? "success" : "danger");
//       setMessage(result.message || result.error);
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };








// import React, { useState, useEffect } from "react";

// const ImporterCommandes = () => {
//   const [fichier, setFichier] = useState(null);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("success");
//   const [commandes, setCommandes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateDebut, setDateDebut] = useState("");
//   const [dateFin, setDateFin] = useState("");

//   // Gérer la sélection du fichier
//   const handleFileChange = (e) => {
//     setFichier(e.target.files[0]);
//   };

 


// const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append("file", fichier);
  
//     try {
//       const response = await fetch("http://localhost:5000/import/commandes", {
//         method: "POST",
//         body: formData,
//       });
  
//       const result = await response.json();
  
//       // Ici on affiche toujours un message même si l'import échoue
//       if (response.ok && result.success) {
//         setType("success");
//         setMessage(result.message || "Fichier importé avec succès.");
//         fetchCommandes(); // Recharge les données importées si tout va bien
//       } else {
//         setType("danger");
//         setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
//       }
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };

//   // Récupérer les commandes depuis l'API
//   const fetchCommandes = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/commandes");
//       const result = await response.json();
//       if (response.ok) {
//         setCommandes(result.data || []);
//       } else {
//         setMessage(result.error || "Erreur lors du chargement des commandes.");
//         setType("danger");
//       }
//     } catch (error) {
//       console.error("Erreur de récupération :", error);
//     }
//   };

//   // Filtrer les commandes en fonction des critères
//   const commandesFiltrees = commandes.filter((cmd) => {
//     const recherche = searchTerm.toLowerCase();

//     // Vérification des propriétés avant d'utiliser toLowerCase
//     const matchTexte =
//       (cmd.codeClient && cmd.codeClient.toLowerCase().includes(recherche)) ||
//       (cmd.nomClient && cmd.nomClient.toLowerCase().includes(recherche)) ||
//       (cmd.codeArticle && cmd.codeArticle.toLowerCase().includes(recherche)) ||
//       (cmd.designatio && cmd.designatio.toLowerCase().includes(recherche)) ||
//       (cmd.codeCommande && cmd.codeCommande.toLowerCase().includes(recherche)) || // Ajout de la recherche par codeCommande
//       (cmd.designation && cmd.designation.toLowerCase().includes(recherche));

//     const dateCmd = new Date(cmd.dateCommande);
//     const dansPlage =
//       (!dateDebut || dateCmd >= new Date(dateDebut)) &&
//       (!dateFin || dateCmd <= new Date(dateFin));

//     return matchTexte && dansPlage;
//   });

//   useEffect(() => {
//     fetchCommandes(); // Charger les commandes au chargement du composant
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Importer les Commandes Clients</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary me-3">
//           Importer
//         </button>
//         <button type="button" onClick={fetchCommandes} className="btn btn-success">
//           Afficher les commandes
//         </button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}

//       {commandes.length > 0 && (
//         <>
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Rechercher client, article, code..."
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div>
//             <label htmlFor="dateDebut" className="d-block">Date début</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={dateDebut}
//                 onChange={(e) => setDateDebut(e.target.value)}
//               />
//             </div>
//             <div>
//             <label htmlFor="dateFin" className="d-block">Date fin</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={dateFin}
//                 onChange={(e) => setDateFin(e.target.value)}
//               />
//             </div>
//           </div>

//           <table className="table table-bordered mt-4">
//             <thead className="table-light">
//               <tr>
//                 <th>Code Commande</th>
//                 <th>Date</th>
//                 <th>Code Client</th>
//                 <th>Nom Client</th>
//                 <th>Code Article</th>
//                 <th>Désignation</th>
//                 <th>Quantité Demandée</th>
//               </tr>
//             </thead>
//             <tbody>
//               {commandesFiltrees.map((cmd, index) => (
//                 <tr key={index}>
//                   <td>{cmd.codeCommande}</td>
//                   <td>{cmd.dateCommande}</td>
//                   <td>{cmd.codeClient}</td>
//                   <td>{cmd.nomClient}</td>
//                   <td>{cmd.codeArticle}</td>
//                   <td>{cmd.designation}</td>
//                   <td>{cmd.quantiteDemandee}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;











// import React, { useState, useEffect } from "react";

// const ImporterCommandes = () => {
//   const [fichier, setFichier] = useState(null);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("success");
//   const [commandes, setCommandes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateDebut, setDateDebut] = useState("");
//   const [dateFin, setDateFin] = useState("");

//   const handleFileChange = (e) => {
//     setFichier(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", fichier);

//     try {
//       const response = await fetch("http://localhost:5000/api/commande/commandes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setType("success");
//         setMessage(result.message || "Fichier importé avec succès.");
//         fetchCommandes();
//       } else {
//         setType("danger");
//         setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
//       }
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };

//   const fetchCommandes = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/commande/getcommandes");
//       const result = await response.json();
//       if (response.ok) {
//         setCommandes(result.data || []);
//       } else {
//         setMessage(result.error || "Erreur lors du chargement des commandes.");
//         setType("danger");
//       }
//     } catch (error) {
//       console.error("Erreur de récupération :", error);
//     }
//   };

//   const commandesFiltrees = commandes.filter((cmd) => {
//     const recherche = searchTerm.toLowerCase();
//     const matchTexte =
//       (cmd.codeClient && cmd.codeClient.toLowerCase().includes(recherche)) ||
//       (cmd.nomClient && cmd.nomClient.toLowerCase().includes(recherche)) ||
//       (cmd.codeArticle && cmd.codeArticle.toLowerCase().includes(recherche)) ||
//       (cmd.designatio && cmd.designatio.toLowerCase().includes(recherche)) ||
//       (cmd.codeCommande && cmd.codeCommande.toLowerCase().includes(recherche)) ||
//       (cmd.designation && cmd.designation.toLowerCase().includes(recherche));

//     const dateCmd = new Date(cmd.dateCommande);
//     const dansPlage =
//       (!dateDebut || dateCmd >= new Date(dateDebut)) &&
//       (!dateFin || dateCmd <= new Date(dateFin));

//     return matchTexte && dansPlage;
//   });

//   useEffect(() => {
//     fetchCommandes();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Importer les Commandes Clients</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary me-3">
//           Importer
//         </button>
//         <button type="button" onClick={fetchCommandes} className="btn btn-success">
//           Afficher les commandes
//         </button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}

//       {commandes.length > 0 && (
//         <>
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <input
//                 type="text"
//                 placeholder="Rechercher client, article, code..."
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="dateDebut" className="d-block">Date début</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={dateDebut}
//                 onChange={(e) => setDateDebut(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="dateFin" className="d-block">Date fin</label>
//               <input
//                 type="date"
//                 className="w-full p-2 border border-gray-300 rounded-md"
//                 value={dateFin}
//                 onChange={(e) => setDateFin(e.target.value)}
//               />
//             </div>
//           </div>

//           {(searchTerm.trim() || dateDebut || dateFin) && (
//             <table className="table table-bordered mt-4">
//               <thead className="table-light">
//                 <tr>
//                   <th>Code Commande</th>
//                   <th>Date</th>
//                   <th>Code Client</th>
//                   <th>Nom Client</th>
//                   <th>Code Article</th>
//                   <th>Désignation</th>
//                   <th>Quantité Demandée</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {commandesFiltrees.map((cmd, index) => (
//                   <tr key={index}>
//                     <td>{cmd.codeCommande}</td>
//                     <td>{cmd.dateCommande}</td>
//                     <td>{cmd.codeClient}</td>
//                     <td>{cmd.nomClient}</td>
//                     <td>{cmd.codeArticle}</td>
//                     <td>{cmd.designation}</td>
//                     <td>{cmd.quantiteDemandee}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;














/////////////code vrai 




import React, { useState, useEffect } from "react";

const ImporterCommandes = () => {
  const [fichier, setFichier] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [commandes, setCommandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fichier) {
      setMessage("Veuillez sélectionner un fichier Excel.");
      setType("danger");
      return;
    }

    const formData = new FormData();
    formData.append("file", fichier);

    try {
      const response = await fetch("http://localhost:5000/api/commande/commandes", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setType("success");
        setMessage(result.message || "Fichier importé avec succès.");
        fetchCommandes();
      } else {
        setType("danger");
        setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
      }
    } catch (error) {
      setType("danger");
      setMessage("Erreur lors de l'envoi du fichier.");
    }
  };


  const fetchCommandes = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/commande/getcommandes");
    const result = await response.json();
    if (response.ok) {
      setCommandes(result.data || []);
    } else {
      setMessage(result.error || "Erreur lors du chargement des commandes.");
      setType("danger");
    }
  } catch (error) {
    console.error("Erreur de récupération :", error);
  }
};


  const commandesFiltrees = commandes.filter((cmd) => {
    const recherche = searchTerm.toLowerCase();
    const matchTexte =
      (cmd.codeClient && cmd.codeClient.toLowerCase().includes(recherche)) ||
      (cmd.nomClient && cmd.nomClient.toLowerCase().includes(recherche)) ||
      (cmd.codeArticle && cmd.codeArticle.toLowerCase().includes(recherche)) ||
      (cmd.codeCommande && cmd.codeCommande.toLowerCase().includes(recherche)) ||
      (cmd.designation && cmd.designation.toLowerCase().includes(recherche));

    const dateCmd = new Date(cmd.dateCommande);
    const dansPlage =
      (!dateDebut || dateCmd >= new Date(dateDebut)) &&
      (!dateFin || dateCmd <= new Date(dateFin));

    return matchTexte && dansPlage;
  });

  useEffect(() => {
    fetchCommandes();
  }, []);




  

  const fetchCommandesParDepot = async () => {
  try {
    const idUtilisateur = localStorage.getItem("idUtilisateur"); // ou autre méthode
    const response = await fetch(`http://localhost:5000/api/commande/getcommandesByDepot/${idUtilisateur}`);
    const result = await response.json();
    if (response.ok) {
      setCommandes(result.data || []);
    } else {
      setMessage(result.error || "Erreur lors du chargement des commandes.");
      setType("danger");
    }
  } catch (error) {
    console.error("Erreur de récupération des commandes :", error);
  }
};

useEffect(() => {
  fetchCommandesParDepot();
}, []);



  return (
    <div className="container mt-5">
      <h2>Importer les Commandes Clients</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-3">
          Importer
        </button>
        <button type="button" onClick={fetchCommandes} className="btn btn-success">
          Afficher les commandes
        </button>
      </form>

      {message && (
        <div className={`alert alert-${type} mt-3`} role="alert">
          {message}
        </div>
      )}

      {/* Barre de recherche toujours visible */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Rechercher client, article, code..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateDebut" className="d-block">Date début</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateFin" className="d-block">Date fin</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau seulement s’il y a une recherche OU une date ET qu’il y a des résultats */}
      {(searchTerm.trim() || dateDebut || dateFin) && commandesFiltrees.length > 0 && (
        <table className="table table-bordered mt-4">
          <thead className="table-light">
            <tr>
              <th>Code Commande</th>
              <th>Date</th>
              <th>Code Client</th>
              <th>Nom Client</th>
              <th>Code Article</th>
              <th>Désignation</th>
              <th>Quantité Demandée</th>
            </tr>
          </thead>
          <tbody>
            {commandesFiltrees.map((cmd, index) => (
              <tr key={index}>
                <td>{cmd.codeCommande}</td>
                <td>{cmd.dateCommande}</td>
                <td>{cmd.codeClient}</td>
                <td>{cmd.nomClient}</td>
                <td>{cmd.codeArticle}</td>
                <td>{cmd.designation}</td>
                <td>{cmd.quantiteDemandee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button type="button" onClick={fetchCommandesParDepot} className="btn btn-warning ms-2">
  Filtrer mes commandes
</button>

      {/* Message si aucun résultat */}
      {(searchTerm.trim() || dateDebut || dateFin) && commandesFiltrees.length === 0 && (
        <div className="alert alert-info mt-4">
          Aucun résultat trouvé pour la recherche.
        </div>
      )}
    </div>
  );
};

export default ImporterCommandes;



















// import React, { useState, useEffect } from "react";

// const ImporterCommandes = () => {
//   const [fichier, setFichier] = useState(null);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("success");
//   const [commandes, setCommandes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateDebut, setDateDebut] = useState("");
//   const [dateFin, setDateFin] = useState("");

//   const handleFileChange = (e) => {
//     setFichier(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", fichier);

//     try {
//       const response = await fetch("http://localhost:5000/import/commandes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setType("success");
//         setMessage(result.message || "Fichier importé avec succès.");
//         fetchCommandes();
//       } else {
//         setType("danger");
//         setMessage(result.error || result.message || "Erreur lors de l'importation.");
//       }
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };

//   const fetchCommandes = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/commande/getcommandes");
//       const result = await response.json();
//       if (response.ok) {
//         setCommandes(result.data || []);
//       } else {
//         setMessage(result.error || "Erreur de chargement des commandes.");
//         setType("danger");
//       }
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de la récupération des commandes.");
//     }
//   };

//   useEffect(() => {
//     fetchCommandes();
//   }, []);

//   const commandesFiltrees = commandes.filter((cmd) => {
//     const recherche = searchTerm.toLowerCase();
//     const dateCmd = new Date(cmd.dateCommande);

//     const matchTexte =
//       (cmd.codeClient?.toLowerCase().includes(recherche)) ||
//       (cmd.nomClient?.toLowerCase().includes(recherche)) ||
//       (cmd.codeArticle?.toLowerCase().includes(recherche)) ||
//       (cmd.codeCommande?.toLowerCase().includes(recherche)) ||
//       (cmd.designation?.toLowerCase().includes(recherche));

//     const inDateRange =
//       (!dateDebut || dateCmd >= new Date(dateDebut)) &&
//       (!dateFin || dateCmd <= new Date(dateFin));

//     return matchTexte && inDateRange;
//   });

//   return (
//     <div className="container mt-5">
//       <h2>Importer les Commandes Clients</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="form-control"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary me-2">Importer</button>
//         <button type="button" onClick={fetchCommandes} className="btn btn-secondary">Afficher les commandes</button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}

//       <div className="mt-4 row">
//         <div className="col-md-4 mb-2">
//           <input
//             type="text"
//             placeholder="Rechercher client, article, code..."
//             className="form-control"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="col-md-3 mb-2">
//           <label>Date début</label>
//           <input
//             type="date"
//             className="form-control"
//             value={dateDebut}
//             onChange={(e) => setDateDebut(e.target.value)}
//           />
//         </div>
//         <div className="col-md-3 mb-2">
//           <label>Date fin</label>
//           <input
//             type="date"
//             className="form-control"
//             value={dateFin}
//             onChange={(e) => setDateFin(e.target.value)}
//           />
//         </div>
//       </div>

//       {commandesFiltrees.length > 0 ? (
//         <table className="table table-striped table-bordered mt-4">
//           <thead>
//             <tr>
//               <th>Code Commande</th>
//               <th>Date</th>
//               <th>Code Client</th>
//               <th>Nom Client</th>
//               <th>Code Article</th>
//               <th>Désignation</th>
//               <th>Quantité Demandée</th>
//             </tr>
//           </thead>
//           <tbody>
//             {commandesFiltrees.map((cmd, index) => (
//               <tr key={index}>
//                 <td>{cmd.codeCommande}</td>
//                 <td>{new Date(cmd.dateCommande).toLocaleDateString()}</td>
//                 <td>{cmd.codeClient}</td>
//                 <td>{cmd.nomClient}</td>
//                 <td>{cmd.codeArticle}</td>
//                 <td>{cmd.designation}</td>
//                 <td>{cmd.quantiteDemandee}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         (searchTerm || dateDebut || dateFin) && (
//           <div className="alert alert-info mt-4">
//             Aucun résultat trouvé.
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;









// import React, { useState, useEffect } from "react";

// const ImporterCommandes = () => {
//   const [fichier, setFichier] = useState(null);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("success");
//   const [commandes, setCommandes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateDebut, setDateDebut] = useState("");
//   const [dateFin, setDateFin] = useState("");
//   const [chargement, setChargement] = useState(false);

//   const handleFileChange = (e) => {
//     setFichier(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", fichier);

//     try {
//       const response = await fetch("http://localhost:5000/import/commandes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setType("success");
//         setMessage(result.message || "Fichier importé avec succès.");
        
//         // Attendre avant de recharger les commandes
//         setTimeout(() => {
//           fetchCommandes();
//         }, 1000);
//       } else {
//         setType("danger");
//         setMessage(result.error || result.message || "Erreur lors de l'importation.");
//       }
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };

//   const fetchCommandes = async () => {
//     try {
//       setChargement(true);
//       const response = await fetch("http://localhost:5000/import/getcommandes");
//       console.log("Commandes récupérées:", result.data);
//       const result = await response.json();
//       if (response.ok) {
//         setCommandes(result.data || []);
//       } else {
//         setMessage(result.error || "Erreur de chargement des commandes.");
//         setType("danger");
//       }
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de la récupération des commandes.");
//     } finally {
//       setChargement(false);
//     }
//   };

//   useEffect(() => {
//     fetchCommandes();
//   }, []);

//   const commandesFiltrees = commandes.filter((cmd) => {
//     const recherche = searchTerm.toLowerCase();
//     const dateCmd = new Date(cmd.dateCommande);

//     const matchTexte =
//       // (cmd.codeClient?.toLowerCase().includes(recherche)) ||
//       // (cmd.nomClient?.toLowerCase().includes(recherche)) ||
//       // (cmd.codeArticle?.toLowerCase().includes(recherche)) ||
//       // (cmd.codeCommande?.toLowerCase().includes(recherche)) ||
//       // (cmd.designation?.toLowerCase().includes(recherche));
//       (cmd.codeClient?.toString().toLowerCase().includes(recherche))  ||
//       (cmd.nomClient?.toString().toLowerCase().includes(recherche))  ||
//       (cmd.codeArticle?.toString().toLowerCase().includes(recherche))  ||
//       (cmd.codeCommande?.toString().toLowerCase().includes(recherche))  ||
//       (cmd.designation?.toString().toLowerCase().includes(recherche))
       

//     const inDateRange =
//       (!dateDebut || dateCmd >= new Date(dateDebut)) &&
//       (!dateFin || dateCmd <= new Date(dateFin));

//     return matchTexte && inDateRange;
//   });

//   return (
//     <div className="container mt-5">
//       <h2>Importer les Commandes Clients</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="form-control"
//           />
//         </div>
//         <button type="submit" className="btn btn-primary me-2">Importer</button>
//         <button type="button" onClick={fetchCommandes} className="btn btn-secondary">Afficher les commandes</button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}

//       <div className="mt-4 row">
//         <div className="col-md-4 mb-2">
//           <input
//             type="text"
//             placeholder="Rechercher client, article, code..."
//             className="form-control"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="col-md-3 mb-2">
//           <label>Date début</label>
//           <input
//             type="date"
//             className="form-control"
//             value={dateDebut}
//             onChange={(e) => setDateDebut(e.target.value)}
//           />
//         </div>
//         <div className="col-md-3 mb-2">
//           <label>Date fin</label>
//           <input
//             type="date"
//             className="form-control"
//             value={dateFin}
//             onChange={(e) => setDateFin(e.target.value)}
//           />
//         </div>
//       </div>

//       {chargement && (
//         <div className="alert alert-info mt-4">Chargement des commandes...</div>
//       )}

//       {commandesFiltrees.length > 0 ? (
//         <table className="table table-striped table-bordered mt-4">
//           <thead>
//             <tr>
//               <th>Code Commande</th>
//               <th>Date</th>
//               <th>Code Client</th>
//               <th>Nom Client</th>
//               <th>Code Article</th>
//               <th>Désignation</th>
//               <th>Quantité Demandée</th>
//             </tr>
//           </thead>
//           <tbody>
//             {commandesFiltrees.map((cmd, index) => (
//               <tr key={index}>
//                 <td>{cmd.codeCommande}</td>
//                 <td>{new Date(cmd.dateCommande).toLocaleDateString()}</td>
//                 <td>{cmd.codeClient}</td>
//                 <td>{cmd.nomClient}</td>
//                 <td>{cmd.codeArticle}</td>
//                 <td>{cmd.designation}</td>
//                 <td>{cmd.quantiteDemandee}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         (searchTerm || dateDebut || dateFin) && !chargement && (
//           <div className="alert alert-info mt-4">
//             Aucun résultat trouvé.
//           </div>
//         )
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;









// import React, { useState, useEffect } from "react";

// const ImporterCommandes = () => {
//   const [fichier, setFichier] = useState(null);
//   const [message, setMessage] = useState("");
//   const [type, setType] = useState("success");
//   const [commandes, setCommandes] = useState([]);

//   const handleFileChange = (e) => {
//     setFichier(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!fichier) {
//       setMessage("Veuillez sélectionner un fichier Excel.");
//       setType("danger");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", fichier);

//     try {
//       const response = await fetch("http://localhost:5000/api/commande/commandes", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await response.json();

//       if (response.ok && result.success) {
//         setType("success");
//         setMessage(result.message || "Fichier importé avec succès.");
//         fetchCommandes();
//       } else {
//         setType("danger");
//         setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
//       }
//     } catch (error) {
//       setType("danger");
//       setMessage("Erreur lors de l'envoi du fichier.");
//     }
//   };

//   const fetchCommandes = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/commande/getcommandes");
//       const result = await response.json();
//       if (response.ok) {
//         setCommandes(result.data || []);
//       } else {
//         setMessage(result.error || "Erreur lors du chargement des commandes.");
//         setType("danger");
//       }
//     } catch (error) {
//       console.error("Erreur de récupération :", error);
//     }
//   };

//   useEffect(() => {
//     fetchCommandes();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Importer les Commandes Clients</h2>

//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <input
//             type="file"
//             accept=".xlsx"
//             onChange={handleFileChange}
//             className="form-control"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary me-3">
//           Importer
//         </button>
//         <button type="button" onClick={fetchCommandes} className="btn btn-success">
//           Afficher les commandes
//         </button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}

//       {commandes.length > 0 && (
//         <table className="table table-bordered mt-4">
//           <thead className="table-light">
//             <tr>
//               <th>Code Commande</th>
//               <th>Date</th>
//               <th>Code Client</th>
//               <th>Nom Client</th>
//               <th>Code Article</th>
//               <th>Désignation</th>
//               <th>Quantité Demandée</th>
//             </tr>
//           </thead>
//           <tbody>
//             {commandes.map((cmd, index) => (
//               <tr key={index}>
//                 <td>{cmd.codeCommande}</td>
//                 <td>{cmd.dateCommande}</td>
//                 <td>{cmd.codeClient}</td>
//                 <td>{cmd.nomClient}</td>
//                 <td>{cmd.codeArticle}</td>
//                 <td>{cmd.designation}</td>
//                 <td>{cmd.quantiteDemandee}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {commandes.length === 0 && (
//         <div className="alert alert-info mt-4">
//           Aucune commande à afficher.
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;
