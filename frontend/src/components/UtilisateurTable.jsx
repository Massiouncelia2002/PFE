// import React from "react";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";

// const UtilisateurTable = ({ utilisateurs, selectedId, onSelect, onDelete, onEdit }) => {
//   const handleCheckboxChange = (id) => {
//     onSelect(selectedId === id ? null : id);
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Sélection</th>
//                 <th className="px-6 py-3">Code Utilisateur</th>
//                 <th className="px-6 py-3">Nom</th>
//                 <th className="px-6 py-3">Prénom</th>
//                 <th className="px-6 py-3">Email</th>
//                 <th className="px-6 py-3">Poste</th>
//                 <th className="px-6 py-3">Branche</th>
//                 <th className="px-6 py-3">Date Fin</th>
//                 <th className="px-6 py-3">Date Création</th>
//                 <th className="px-6 py-3">Statut</th>
//                 <th className="px-6 py-3 text-center"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {utilisateurs.map((u) => (
//                 <tr
//                   key={u.codeUtilisateur}
//                   className={`border-t group hover:bg-gray-50 transition ${
//                     selectedId === u.codeUtilisateur ? "bg-blue-100" : ""
//                   }`}
//                 >
//                   <td className="px-6 py-4 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedId === u.codeUtilisateur}
//                       onChange={() => handleCheckboxChange(u.codeUtilisateur)}
//                     />
//                   </td>
//                   <td className="px-6 py-4">{u.codeUtilisateur}</td>
//                   <td className="px-6 py-4">{u.nom}</td>
//                   <td className="px-6 py-4">{u.prenom}</td>
//                   <td className="px-6 py-4">{u.email}</td>
//                   <td className="px-6 py-4">{u.posteTravail || "—"}</td>
//                   <td className="px-6 py-4">{u.brancheFonction || "—"}</td>
//                   <td className="px-6 py-4">
//                     {u.dateFin ? u.dateFin.substring(0, 19).replace("T", " ") : "—"}
//                   </td>
//                   <td className="px-6 py-4">
//                     {u.dateCreation ? u.dateCreation.substring(0, 19).replace("T", " ") : "—"}
//                   </td>
//                   <td className="px-6 py-4">{u.statut ? "Actif" : "Inactif"}</td>
//                   <td className="px-6 py-4 text-center flex justify-center gap-4">
//                     <Pencil
//                       className={`h-5 w-5 text-yellow-600 cursor-pointer opacity-0 group-hover:opacity-100 transition ${
//                         selectedId === u.codeUtilisateur ? "opacity-100" : ""
//                       }`}
//                       onClick={() => onEdit(u)}
//                     />
//                     <Trash2
//                       className={`h-5 w-5 text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition ${
//                         selectedId === u.codeUtilisateur ? "opacity-100" : ""
//                       }`}
//                       onClick={() => onDelete(u.codeUtilisateur)}
//                     />
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

// export default UtilisateurTable;




import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";

const UtilisateurTable = ({ utilisateurs, selectedId, onSelect, onDelete, onEdit }) => {
  const handleCheckboxChange = (id) => {
    onSelect(selectedId === id ? null : id);
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs</h2>
        <div className="overflow-auto rounded-lg shadow border">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Sélection</th>
                <th className="px-6 py-3">Code Utilisateur</th>
                <th className="px-6 py-3">Nom</th>
                <th className="px-6 py-3">Prénom</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Poste</th>
                <th className="px-6 py-3">Branche</th>
                <th className="px-6 py-3">Rôle</th> 
                <th className="px-6 py-3">Date Fin</th>
                <th className="px-6 py-3">Date Création</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {utilisateurs.map((u) => (
                <tr
                  key={u.codeUtilisateur}
                  className={`border-t group hover:bg-gray-50 transition ${
                    selectedId === u.codeUtilisateur ? "bg-blue-100" : ""
                  }`}
                >
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedId === u.codeUtilisateur}
                      onChange={() => handleCheckboxChange(u.codeUtilisateur)}
                    />
                  </td>
                  <td className="px-6 py-4">{u.codeUtilisateur}</td>
                  <td className="px-6 py-4">{u.nom}</td>
                  <td className="px-6 py-4">{u.prenom}</td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{u.posteTravail || "—"}</td>
                  <td className="px-6 py-4">{u.brancheFonction || "—"}</td>
                  <td className="px-6 py-4">{u.role || "—"}</td> {/* Affichage du rôle */}
                  <td className="px-6 py-4">
                    {u.dateFin ? u.dateFin.substring(0, 19).replace("T", " ") : "—"}
                  </td>
                  <td className="px-6 py-4">
                    {u.dateCreation ? u.dateCreation.substring(0, 19).replace("T", " ") : "—"}
                  </td>
                  <td className="px-6 py-4">{u.statut ? "Actif" : "Inactif"}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <Pencil
                      className={`h-5 w-5 text-yellow-600 cursor-pointer opacity-0 group-hover:opacity-100 transition ${
                        selectedId === u.codeUtilisateur ? "opacity-100" : ""
                      }`}
                      onClick={() => onEdit(u)}
                    />
                    <Trash2
                      className={`h-5 w-5 text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition ${
                        selectedId === u.codeUtilisateur ? "opacity-100" : ""
                      }`}
                      onClick={() => onDelete(u.codeUtilisateur)}
                    />
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

export default UtilisateurTable;
