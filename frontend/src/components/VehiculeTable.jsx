// import React from "react";
// import { Pencil, Trash2 } from "lucide-react";
// import AdminLayout from "../pages/AdminLayout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const VehiculeTable = ({ vehicules, selectedId, onSelect, refreshData }) => {
//   const navigate = useNavigate();

//   const handleCheckboxChange = (id) => {
//     onSelect(selectedId === id ? null : id);
//   };

//   const handleEdit = (vehicule) => {
//     navigate(`/modifier-vehicule/${vehicule.matricule}`);
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?");
//     if (!confirmed) return;

//     try {
//       const res = await axios.delete(`http://localhost:5000/vehicules/${id}`);
//       if (res.status === 200) {
//         toast.success("Véhicule supprimé avec succès !");
//         onSelect(null);
//         refreshData();
//       } else {
//         toast.error("Échec de la suppression.");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression du véhicule", error);
//       toast.error("Erreur lors de la suppression.");
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des véhicules</h2>
//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Sélection</th>
//                 <th className="px-6 py-3">Matricule</th>
//                 {/* <th className="px-6 py-3">Type Véhicule</th> */}
//                 <th className="px-6 py-3">Capacité</th>
//                 <th className="px-6 py-3">Statut</th>
//                 <th className="px-6 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {vehicules.map((v) => (
//                 <tr
//                   key={v.matricule}
//                   className={`border-t group hover:bg-gray-50 transition ${
//                     selectedId === v.matricule ? "bg-blue-100" : ""
//                   }`}
//                 >
//                   <td className="px-6 py-4 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedId === v.matricule}
//                       onChange={() => handleCheckboxChange(v.matricule)}
//                     />
//                   </td>
//                   <td className="px-6 py-4">{v.matricule}</td>
//                   {/* <td className="px-6 py-4">{v.typeVehicule}</td> */}
//                   <td className="px-6 py-4">{v.capaciteVehicule}</td>
//                   <td className="px-6 py-4">{v.statut}</td>
//                   <td className="px-6 py-4 text-center flex justify-center gap-4">
//                     <Pencil
//                       className="h-5 w-5 text-yellow-600 cursor-pointer transition hover:scale-110"
//                       onClick={() => handleEdit(v)}
//                     />
//                     <Trash2
//                       className="h-5 w-5 text-red-600 cursor-pointer transition hover:scale-110"
//                       onClick={() => handleDelete(v.matricule)}
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

// export default VehiculeTable;



import React, { useState } from "react";
import { Pencil, Trash2, Search, Filter, Download, Car, Check, X } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VehiculeTable = ({ vehicules, selectedId, onSelect, refreshData }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleCheckboxChange = (id) => {
    onSelect(selectedId === id ? null : id);
  };

  const handleEdit = (vehicule) => {
    navigate(`/modifier-vehicule/${vehicule.matricule}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`http://localhost:5000/vehicules/${id}`);
      if (res.status === 200) {
        toast.success("Véhicule supprimé avec succès !");
        onSelect(null);
        refreshData();
      } else {
        toast.error("Échec de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule", error);
      toast.error("Erreur lors de la suppression.");
    }
  };

  const filteredVehicules = vehicules.filter(vehicule => {
    const matchesSearch =
      vehicule.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicule.typeVehicule?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && vehicule.statut === "Actif") ||
      (filterStatus === "inactive" && vehicule.statut !== "Actif");

    return matchesSearch && matchesFilter;
  });

  const StatusBadge = ({ status }) => (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
      status === "Actif"
        ? 'bg-green-100 text-green-800 border border-green-200'
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {status === "Actif" ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
      {status || "Inactif"}
    </div>
  );

  const ActionButton = ({ icon: Icon, onClick, className, tooltip }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${className}`}
      >
        <Icon className="w-4 h-4" />
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4 sm:gap-0">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des véhicules</h1>
                  <p className="text-sm sm:text-base text-gray-600">{filteredVehicules.length} véhicule{filteredVehicules.length > 1 ? 's' : ''} trouvé{filteredVehicules.length > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par matricule ou type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-8 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="all">Tous les statuts</option>
                      <option value="active">Actifs uniquement</option>
                      <option value="inactive">Inactifs uniquement</option>
                    </select>
                  </div>

                  <button
                    onClick={() => navigate("/ajouter-vehicule")}
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Ajouter véhicule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Sel.</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Matricule</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">Type</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">Capacité</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Statut</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredVehicules.map((vehicule, index) => (
                    <tr
                      key={vehicule.matricule}
                      className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'} hover:bg-blue-50 ${
                        selectedId === vehicule.matricule ? "bg-blue-100" : ""
                      }`}
                    >
                      {/* Sélection */}
                      <td className="px-3 sm:px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedId === vehicule.matricule}
                          onChange={() => handleCheckboxChange(vehicule.matricule)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </td>

                      {/* Matricule */}
                      <td className="px-3 sm:px-6 py-4">
                        <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {vehicule.matricule}
                        </span>
                      </td>

                      {/* Type - hidden on small screens */}
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-600 hidden sm:table-cell">
                        {vehicule.typeVehicule || "—"}
                      </td>

                      {/* Capacité - hidden on medium and small screens */}
                      <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          {vehicule.capaciteVehicule}
                        </span>
                      </td>

                      {/* Statut */}
                      <td className="px-3 sm:px-6 py-4">
                        <StatusBadge status={vehicule.statut} />
                      </td>

                      {/* Actions */}
                      <td className="px-3 sm:px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <ActionButton
                            icon={Pencil}
                            onClick={() => handleEdit(vehicule)}
                            className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            tooltip="Modifier"
                          />
                          <ActionButton
                            icon={Trash2}
                            onClick={() => handleDelete(vehicule.matricule)}
                            className="bg-red-100 text-red-600 hover:bg-red-200"
                            tooltip="Supprimer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredVehicules.length === 0 && (
              <div className="text-center py-12">
                <Car className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
                <p className="text-sm sm:text-base text-gray-600">Essayez de modifier vos critères de recherche ou filtres.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VehiculeTable;