// import React, { useState } from "react";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";

// const DepotTable = ({ depots, fetchDepots, selectedId, onSelect }) => {


//   const handleDelete = async () => {
//     if (!selectedId) {
//       alert("Aucun dépôt sélectionné.");
//       return;
//     }

//     const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?");
//     if (!confirmed) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/depot/${selectedId}`);
//       if (res.status === 200) {
//         onSelect(null); 
//         fetchDepots(); 
//       } else {
//         console.error("Échec de la suppression", res);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du dépôt", error);
//     }
//   };


//   const handleEdit = () => {
//     if (selectedId) {
      
//       window.location.href = `/modifier-depot/${selectedId}`;
//     } else {
//       alert("Veuillez sélectionner un dépôt à modifier.");
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     if (selectedId === id) {
//       onSelect(null);  
//     } else {
//       onSelect(id);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des dépôts</h2>

//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleDelete}
//             disabled={!selectedId}
//             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
//           >
//             <Trash2 className="h-5 w-5" />
//             Supprimer
//           </button>
//           <button
//             onClick={handleEdit}
//             disabled={!selectedId}
//             className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition disabled:bg-gray-400"
//           >
//             <Pencil className="h-5 w-5" />
//             Modifier
//           </button>
//         </div>

//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Sélection</th>
//                 <th className="px-6 py-3">Code Dépôt</th>
//                 <th className="px-6 py-3">Nom</th>
//                 <th className="px-6 py-3">Type</th>
//                 <th className="px-6 py-3">Capacité</th>
//                 <th className="px-6 py-3">Description</th>
//                 <th className="px-6 py-3">Région</th>
//               </tr>
//             </thead>
//             <tbody>
//               {depots.map((d) => (
//                 <tr
//                   key={d.idDepot}
//                   className={`border-t group hover:bg-gray-50 transition ${selectedId === d.idDepot ? "bg-blue-100" : ""}`}
//                 >
//                   <td className="px-6 py-4 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedId === d.idDepot}
//                       onChange={() => handleCheckboxChange(d.idDepot)}
//                     />
//                   </td>
//                   <td className="px-6 py-4">{d.codeDepot}</td>
//                   <td className="px-6 py-4">{d.nomDepot}</td>
//                   <td className="px-6 py-4">{d.typeDepot}</td>
//                   <td className="px-6 py-4">{d.capaciteDepot}</td>
//                   <td className="px-6 py-4">{d.description || "—"}</td>
//                   <td className="px-6 py-4">{d.region}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default DepotTable;





// import React from "react";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";

// const DepotTable = ({ depots, fetchDepots, selectedCode, onSelect }) => {

//   const handleDelete = async () => {
//     if (!selectedCode) {
//       alert("Aucun dépôt sélectionné.");
//       return;
//     }

//     const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?");
//     if (!confirmed) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/depot/${selectedCode}`);
//       if (res.status === 200) {
//         onSelect(null); 
//         fetchDepots(); 
//       } else {
//         console.error("Échec de la suppression", res);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du dépôt", error);
//     }
//   };

//   const handleEdit = () => {
//     if (selectedCode) {
//       window.location.href = `/modifier-depot/${selectedCode}`;
//     } else {
//       alert("Veuillez sélectionner un dépôt à modifier.");
//     }
//   };

//   const handleCheckboxChange = (code) => {
//     if (selectedCode === code) {
//       onSelect(null);  
//     } else {
//       onSelect(code);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des dépôts</h2>

//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleDelete}
//             disabled={!selectedCode}
//             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
//           >
//             <Trash2 className="h-5 w-5" />
//             Supprimer
//           </button>
//           <button
//             onClick={handleEdit}
//             disabled={!selectedCode}
//             className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition disabled:bg-gray-400"
//           >
//             <Pencil className="h-5 w-5" />
//             Modifier
//           </button>
//         </div>

//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Sélection</th>
//                 <th className="px-6 py-3">code depot</th>
//                 <th className="px-6 py-3">Nom</th>
//                 <th className="px-6 py-3">Type</th>
//                 <th className="px-6 py-3">Capacité</th>
//                 <th className="px-6 py-3">Description</th>
//                 <th className="px-6 py-3">Région</th>
//               </tr>
//             </thead>
//             <tbody>
//               {depots.map((d) => (
//                 <tr
//                   key={d.codeDepot}
//                   className={`border-t group hover:bg-gray-50 transition ${selectedCode === d.codeDepot ? "bg-blue-100" : ""}`}
//                 >
//                   <td className="px-6 py-4 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedCode === d.codeDepot}
//                       onChange={() => handleCheckboxChange(d.codeDepot)}
//                     />
//                   </td>
//                   <td className="px-6 py-4">{d.codeDepot}</td>
//                   <td className="px-6 py-4">{d.nomDepot}</td>
//                   <td className="px-6 py-4">{d.typeDepot}</td>
//                   <td className="px-6 py-4">{d.capaciteDepot}</td>
//                   <td className="px-6 py-4">{d.description || "—"}</td>
//                   <td className="px-6 py-4">{d.region}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default DepotTable;








// import React from "react";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";

// const DepotTable = ({ depots, fetchDepots, selectedCode, onSelect }) => {
//   const handleDelete = async () => {
//     if (!selectedCode) {
//       alert("Aucun dépôt sélectionné.");
//       return;
//     }

//     const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?");
//     if (!confirmed) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/depot/${selectedCode}`);
//       if (res.status === 200) {
//         onSelect(null);
//         fetchDepots();
//       } else {
//         console.error("Échec de la suppression", res);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du dépôt", error);
//     }
//   };

//   const handleEdit = () => {
//     if (selectedCode) {
//       window.location.href = `/modifier-depot/${selectedCode}`;
//     } else {
//       alert("Veuillez sélectionner un dépôt à modifier.");
//     }
//   };

//   const handleCheckboxChange = (code) => {
//     if (selectedCode === code) {
//       onSelect(null);
//     } else {
//       onSelect(code);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des dépôts</h2>

//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={handleDelete}
//             disabled={!selectedCode}
//             className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition disabled:bg-gray-400"
//           >
//             <Trash2 className="h-5 w-5" />
//             Supprimer
//           </button>
//           <button
//             onClick={handleEdit}
//             disabled={!selectedCode}
//             className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition disabled:bg-gray-400"
//           >
//             <Pencil className="h-5 w-5" />
//             Modifier
//           </button>
//         </div>

//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Sélection</th>
//                 <th className="px-6 py-3">Code Dépôt</th>
//                 <th className="px-6 py-3">Nom</th>
//                 <th className="px-6 py-3">Type</th>
//                 <th className="px-6 py-3">Capacité</th>
//                 <th className="px-6 py-3">Description</th>
//                 <th className="px-6 py-3">Région</th>
//                 <th className="px-6 py-3">Wilaya</th> {/* ✅ Nouvelle colonne */}
//               </tr>
//             </thead>
//             <tbody>
//               {depots.map((d) => (
//                 <tr
//                   key={d.codeDepot}
//                   className={`border-t group hover:bg-gray-50 transition ${selectedCode === d.codeDepot ? "bg-blue-100" : ""}`}
//                 >
//                   <td className="px-6 py-4 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedCode === d.codeDepot}
//                       onChange={() => handleCheckboxChange(d.codeDepot)}
//                     />
//                   </td>
//                   <td className="px-6 py-4">{d.codeDepot}</td>
//                   <td className="px-6 py-4">{d.nomDepot}</td>
//                   <td className="px-6 py-4">{d.typeDepot}</td>
//                   <td className="px-6 py-4">{d.capaciteDepot}</td>
//                   <td className="px-6 py-4">{d.description || "—"}</td>
//                   <td className="px-6 py-4">{d.region}</td>
//                   <td className="px-6 py-4">{d.wilaya || "—"}</td> {/* ✅ Affichage de la wilaya */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default DepotTable;







// import React from "react";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";

// const DepotTable = ({ depots, fetchDepots }) => {
//   const handleDelete = async (codeDepot) => {
//     const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?");
//     if (!confirmed) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/depot/${codeDepot}`);
//       if (res.status === 200) {
//         fetchDepots();
//       } else {
//         console.error("Échec de la suppression", res);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du dépôt", error);
//     }
//   };

//   const handleEdit = (codeDepot) => {
//     window.location.href = `/modifier-depot/${codeDepot}`;
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des dépôts</h2>

//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Code Dépôt</th>
//                 <th className="px-6 py-3">Nom</th>
//                 <th className="px-6 py-3">Type</th>
//                 <th className="px-6 py-3">Capacité</th>
//                 <th className="px-6 py-3">Description</th>
//                 <th className="px-6 py-3">Région</th>
//                 <th className="px-6 py-3">Wilaya</th>
//                 <th className="px-6 py-3 text-center">Actions</th> {/* ✅ Colonne Actions */}
//               </tr>
//             </thead>
//             <tbody>
//               {depots.map((d) => (
//                 <tr key={d.codeDepot} className="border-t group hover:bg-gray-50 transition">
//                   <td className="px-6 py-4">{d.codeDepot}</td>
//                   <td className="px-6 py-4">{d.nomDepot}</td>
//                   <td className="px-6 py-4">{d.typeDepot}</td>
//                   <td className="px-6 py-4">{d.capaciteDepot}</td>
//                   <td className="px-6 py-4">{d.description || "—"}</td>
//                   <td className="px-6 py-4">{d.region}</td>
//                   <td className="px-6 py-4">{d.wilaya || "—"}</td>
//                   <td className="px-6 py-4 text-center">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handleEdit(d.codeDepot)}
//                         className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 transition"
//                       >
//                         <Pencil className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(d.codeDepot)}
//                         className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default DepotTable;








// //code apres laa suppression effectue avec verification 

// import React, { useState } from "react";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";


// const DepotTable = ({ depots, fetchDepots }) => {
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleDelete = async (codeDepot) => {
//     const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?");
//     if (!confirmed) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/depot/${codeDepot}`);
//       if (res.status === 200) {
//         setErrorMessage(""); // Clear any previous error
//         fetchDepots();
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du dépôt", error);
//       setErrorMessage(
//         error.response?.data?.message || "Une erreur est survenue lors de la suppression."
//       );
//     }
//   };

//   const handleEdit = (codeDepot) => {
//     window.location.href = `/modifier-depot/${codeDepot}`;
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des dépôts</h2>

//         {/* 🔴 Affichage d’un message d’erreur s’il y en a un */}
//         {errorMessage && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {errorMessage}
//           </div>
//         )}

//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Code Dépôt</th>
//                 <th className="px-6 py-3">Nom</th>
//                 <th className="px-6 py-3">Type</th>
//                 <th className="px-6 py-3">Capacité</th>
//                 <th className="px-6 py-3">Description</th>
//                 <th className="px-6 py-3">Région</th>
//                 <th className="px-6 py-3">Wilaya</th>
//                 <th className="px-6 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {depots.map((d) => (
//                 <tr key={d.codeDepot} className="border-t group hover:bg-gray-50 transition">
//                   <td className="px-6 py-4">{d.codeDepot}</td>
//                   <td className="px-6 py-4">{d.nomDepot}</td>
//                   <td className="px-6 py-4">{d.typeDepot}</td>
//                   <td className="px-6 py-4">{d.capaciteDepot}</td>
//                   <td className="px-6 py-4">{d.description || "—"}</td>
//                   <td className="px-6 py-4">{d.region}</td>
//                   <td className="px-6 py-4">{d.wilaya || "—"}</td>
//                   <td className="px-6 py-4 text-center">
//                     <div className="flex justify-center gap-2">
//                       <button
//                         onClick={() => handleEdit(d.codeDepot)}
//                         className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 transition"
//                       >
//                         <Pencil className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(d.codeDepot)}
//                         disabled={!!d.codeUtilisateur} // ❗️Grisé si affecté à un utilisateur
//                         className={`p-2 rounded text-white transition ${
//                           d.codeUtilisateur
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-red-600 hover:bg-red-700"
//                         }`}
//                         title={
//                           d.codeUtilisateur
//                             ? "Ce dépôt est affecté à un utilisateur"
//                             : "Supprimer le dépôt"
//                         }
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default DepotTable;




import React, { useState } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";

const DepotTable = ({ depots, fetchDepots }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async (codeDepot, codeUtilisateur) => {
    if (codeUtilisateur) {
      setErrorMessage("Ce dépôt est déjà affecté à un utilisateur et ne peut pas être supprimé.");
      return; // Empêche la suppression si le dépôt est affecté à un utilisateur
    }

    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`http://localhost:5000/depot/${codeDepot}`);
      if (res.status === 200) {
        setErrorMessage(""); // Clear any previous error
        fetchDepots();
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du dépôt", error);
      setErrorMessage(
        error.response?.data?.message || "Une erreur est survenue lors de la suppression."
      );
    }
  };

  const handleEdit = (codeDepot) => {
    window.location.href = `/modifier-depot/${codeDepot}`;
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Liste des dépôts</h2>

        {/* 🔴 Affichage d’un message d’erreur s’il y en a un */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errorMessage}
          </div>
        )}

        <div className="overflow-auto rounded-lg shadow border">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Code Dépôt</th>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Capacité</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Région</th>
                <th className="px-6 py-3">Wilaya</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {depots.map((d) => (
                <tr key={d.codeDepot} className="border-t group hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{d.codeDepot}</td>
                  <td className="px-6 py-4">{d.nomDepot}</td>
                  <td className="px-6 py-4">{d.typeDepot}</td>
                  <td className="px-6 py-4">{d.capaciteDepot}</td>
                  <td className="px-6 py-4">{d.description || "—"}</td>
                  <td className="px-6 py-4">{d.region}</td>
                  <td className="px-6 py-4">{d.wilaya || "—"}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(d.codeDepot)}
                        className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 transition"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(d.codeDepot, d.codeUtilisateur)}
                        disabled={!!d.codeUtilisateur} // Désactive si affecté à un utilisateur
                        className={`p-2 rounded text-white transition ${
                          d.codeUtilisateur
                            ? "bg-gray-400 cursor-not-allowed" // Si affecté, grisé
                            : "bg-red-600 hover:bg-red-700" // Sinon, rouge avec hover
                        }`}
                        title={
                          d.codeUtilisateur
                            ? "Ce dépôt est affecté à un utilisateur"
                            : "Supprimer le dépôt"
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DepotTable;




