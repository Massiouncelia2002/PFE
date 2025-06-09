// import React from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";

// const ClientTable = ({ clients, selectedId, onSelect, fetchClients }) => {
//   const navigate = useNavigate();

//   const handleCheckboxChange = (id) => {
//     onSelect(selectedId === id ? null : id);
//   };

//   const handleDelete = async () => {
//     if (!selectedId) {
//       alert("Aucun client sélectionné.");
//       return;
//     }

//     const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
//     if (!confirmed) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/client/${selectedId}`);
//       if (res.status === 200) {
//         onSelect(null);
//         fetchClients();
//       } else {
//         console.error("Échec de la suppression", res);
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du client", error);
//     }
//   };

//   const handleEdit = () => {
//     if (selectedId) {
//       navigate(`/modifier-client/${selectedId}`);
//     } else {
//       alert("Veuillez sélectionner un client à modifier.");
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des clients</h2>

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
//                 <th className="px-6 py-3">Code Client</th>
//                 <th className="px-6 py-3">Nom</th>
//                 <th className="px-6 py-3">Email</th>
//                 <th className="px-6 py-3">Adresse</th>
//                 <th className="px-6 py-3">Téléphone</th>
//                 <th className="px-6 py-3">Dépot affecté</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map((c) => (
//                 <tr
//                   key={c.codeClient}
//                   className={`border-t group hover:bg-gray-50 transition ${
//                     selectedId === c.codeClient ? "bg-blue-100" : ""
//                   }`}
//                 >
//                   <td className="px-6 py-4 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedId === c.codeClient}
//                       onChange={() => handleCheckboxChange(c.codeClient)}
//                     />
//                   </td>
//                   <td className="px-6 py-4">{c.codeClient}</td>
//                   <td className="px-6 py-4">{c.nomClient}</td>
//                   <td className="px-6 py-4">{c.email}</td>
//                   <td className="px-6 py-4">{c.adress}</td>
//                   <td className="px-6 py-4">{c.tel}</td>
//                   <td className="px-6 py-4">{c.codeDepot}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ClientTable;





import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";

const ClientTable = ({ clients, fetchClients }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const firstConfirm = window.confirm("Êtes-vous sûr de vouloir supprimer ce client ?");
    if (!firstConfirm) return;
  
    const secondConfirm = window.confirm("Cette action est irréversible. Voulez-vous vraiment continuer ?");
    if (!secondConfirm) return;
  
    try {
      const res = await axios.delete(`http://localhost:5000/client/${id}`);
      if (res.status === 200) {
        alert("Client supprimé avec succès !");
        fetchClients();
      } else {
        console.error("Échec de la suppression", res);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du client", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/modifier-client/${id}`);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Liste des clients</h2>

        <div className="overflow-auto rounded-lg shadow border">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Code Client</th>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Adresse</th>
                <th className="px-6 py-3">Téléphone</th>
                <th className="px-6 py-3">Dépôt affecté</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.codeClient} className="border-t group hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{c.codeClient}</td>
                  <td className="px-6 py-4">{c.nomClient}</td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4">{c.adress}</td>
                  <td className="px-6 py-4">{c.tel}</td>
                  <td className="px-6 py-4">{c.codeDepot}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(c.codeClient)}
                      className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.codeClient)}
                      className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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

export default ClientTable;
