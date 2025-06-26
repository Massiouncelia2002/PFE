


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
//   e.preventDefault();

//   if (!fichier) {
//     setMessage("Veuillez sélectionner un fichier Excel.");
//     setType("danger");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("file", fichier);

//   const token = localStorage.getItem("token");

//   try {
//     const response = await fetch("http://localhost:5000/api/commande/commandes", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`
//       },
//       body: formData,
//     });

//     const result = await response.json();

//     if (response.ok && result.success) {
//       setType("success");
//       setMessage(result.message || "Fichier importé avec succès.");
//       fetchCommandesParDepot(); // recharge les commandes liées à tes dépôts
//     } else {
//       setType("danger");
//       setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
//     }
//   } catch (error) {
//     console.error("Erreur lors de l'envoi du fichier :", error);
//     setType("danger");
//     setMessage("Erreur lors de l'envoi du fichier.");
//   }
// };

// const fetchCommandes = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await fetch("http://localhost:5000/api/commande/getcommandes", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     const result = await response.json();
//     if (response.ok) {
//       setCommandes(result.data || []);
//     } else {
//       setMessage(result.error || "Erreur lors du chargement des commandes.");
//       setType("danger");
//     }
//   } catch (error) {
//     console.error("Erreur de récupération :", error);
//   }
// };

// const fetchCommandesParDepot = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await fetch("http://localhost:5000/api/commande/getcommandesByDepot", {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     const result = await response.json();
//     if (response.ok) {
//       setCommandes(result.data || []);
//     } else {
//       setMessage(result.error || "Erreur lors du chargement des commandes.");
//       setType("danger");
//     }
//   } catch (error) {
//     console.error("Erreur de récupération des commandes :", error);
//   }
// };






//   useEffect(() => {
//     fetchCommandesParDepot();
//   }, []);

//   const commandesFiltrees = commandes.filter((cmd) => {
//     const recherche = searchTerm.toLowerCase();
//     const matchTexte =
//       (cmd.codeClient && cmd.codeClient.toLowerCase().includes(recherche)) ||
//       (cmd.nomClient && cmd.nomClient.toLowerCase().includes(recherche)) ||
//       (cmd.codeArticle && cmd.codeArticle.toLowerCase().includes(recherche)) ||
//       (cmd.codeCommande && cmd.codeCommande.toLowerCase().includes(recherche)) ||
//       (cmd.designation && cmd.designation.toLowerCase().includes(recherche));

//     const dateCmd = new Date(cmd.dateCommande);
//     const dansPlage =
//       (!dateDebut || dateCmd >= new Date(dateDebut)) &&
//       (!dateFin || dateCmd <= new Date(dateFin));

//     return matchTexte && dansPlage;
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
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary me-3">
//           Importer
//         </button>
//         <button type="button" onClick={fetchCommandes} className="btn btn-success">
//           Toutes les commandes
//         </button>
//       </form>

//       {message && (
//         <div className={`alert alert-${type} mt-3`} role="alert">
//           {message}
//         </div>
//       )}

//       {/* Filtres */}
//       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div>
//           <input
//             type="text"
//             placeholder="Rechercher client, article, code..."
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="dateDebut" className="d-block">Date début</label>
//           <input
//             type="date"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={dateDebut}
//             onChange={(e) => setDateDebut(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="dateFin" className="d-block">Date fin</label>
//           <input
//             type="date"
//             className="w-full p-2 border border-gray-300 rounded-md"
//             value={dateFin}
//             onChange={(e) => setDateFin(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Tableau */}
//       {(searchTerm.trim() || dateDebut || dateFin) && commandesFiltrees.length > 0 && (
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
//       )}

//       {/* Filtrage commandes utilisateur */}
//       <button
//         type="button"
//         onClick={fetchCommandesParDepot}
//         className="btn btn-warning mt-3"
//       >
//         Filtrer mes commandes
//       </button>

//       {/* Aucun résultat */}
//       {(searchTerm.trim() || dateDebut || dateFin) && commandesFiltrees.length === 0 && (
//         <div className="alert alert-info mt-4">
//           Aucun résultat trouvé pour la recherche.
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImporterCommandes;





import React, { useState, useEffect, useRef } from "react";
import { Upload, FileText, Search, Calendar, Filter, Eye, Check, X, AlertCircle, Download, Trash2 } from "lucide-react";
import AdminLayoutPlannificateur from './AdminLayoutPlannificateur'; 

const ImporterCommandes = () => {
  const [fichier, setFichier] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [commandes, setCommandes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFichier(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.name.endsWith('.xlsx'))) {
      setFichier(file);
    } else {
      setMessage("Veuillez déposer un fichier Excel valide (.xlsx)");
      setType("danger");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
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

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/commande/commandes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setType("success");
        setMessage(result.message || "Fichier importé avec succès.");
        fetchCommandesParDepot();
      } else {
        setType("danger");
        setMessage(result.error || result.message || "Erreur lors de l'importation du fichier.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du fichier :", error);
      setType("danger");
      setMessage("Erreur lors de l'envoi du fichier.");
    }
  };

  const fetchCommandes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/commande/getcommandes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

  const fetchCommandesParDepot = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/commande/getcommandesByDepot", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

  const removeFile = () => {
    setFichier(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
     <AdminLayoutPlannificateur  >
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Importation des Commandes
              </h1>
              <p className="text-slate-600 mt-1">Importez et gérez vos commandes clients</p>
            </div>
          </div>
        </div>

        {/* Zone d'import */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Download className="w-5 h-5" />
              Import de Commandes
            </h2>
            <p className="text-blue-100 mt-1">Glissez-déposez votre fichier Excel ou cliquez pour sélectionner</p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Zone de drag & drop */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  isDragging
                    ? "border-blue-400 bg-blue-50 scale-105"
                    : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {!fichier ? (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <FileText className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-slate-700">
                        Glissez-déposez votre fichier Excel ici
                      </p>
                      <p className="text-slate-500 mt-1">ou cliquez pour parcourir</p>
                      <div className="inline-flex items-center gap-1 mt-3 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        <FileText className="w-4 h-4" />
                        Format XLSX accepté
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-green-800">{fichier.name}</p>
                        <p className="text-sm text-green-600">
                          {(fichier.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={!fichier}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Upload className="w-5 h-5" />
                  Importer les commandes
                </button>
                
                <button
                  type="button"
                  onClick={fetchCommandes}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Filter className="w-5 h-5" />
                  Toutes les commandes
                </button>
                
                <button
                  type="button"
                  onClick={fetchCommandesParDepot}
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-medium hover:from-amber-700 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Filter className="w-5 h-5" />
                  Mes commandes
                </button>
              </div>
            </form>

            {/* Messages */}
            {message && (
              <div className={`mt-6 p-4 rounded-xl flex items-start gap-3 ${
                type === "success" 
                  ? "bg-green-50 border border-green-200 text-green-800" 
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}>
                {type === "success" ? (
                  <Check className="w-5 h-5 mt-0.5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 mt-0.5 text-red-600" />
                )}
                <p className="font-medium">{message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Filtres de recherche */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Search className="w-5 h-5" />
              Recherche et Filtres
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Recherche globale</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Client, article, code..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Date début</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Date fin</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tableau des résultats */}
        {(searchTerm.trim() || dateDebut || dateFin) && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
              <h2 className="text-xl font-semibold text-white">
                Résultats de la recherche ({commandesFiltrees.length})
              </h2>
            </div>
            
            {commandesFiltrees.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Code Commande</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Code Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Nom Client</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Code Article</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Désignation</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Quantité</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {commandesFiltrees.map((cmd, index) => (
                      <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{cmd.codeCommande}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(cmd.dateCommande).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{cmd.codeClient}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{cmd.nomClient}</td>
                        <td className="px-6 py-4 text-sm font-mono text-slate-900">{cmd.codeArticle}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{cmd.designation}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">{cmd.quantiteDemandee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-slate-600">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </AdminLayoutPlannificateur>
  );
};

export default ImporterCommandes;