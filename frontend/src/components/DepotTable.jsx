import React, { useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Search, Filter, Building, Box, Ruler, MapPin, Download, Plus, AlertCircle } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";
import { useNavigate } from "react-router-dom";

const DepotTable = ({ depots, fetchDepots }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const navigate = useNavigate();

  const filteredDepots = depots.filter(depot => {
    const matchesSearch =
      depot.nomDepot.toLowerCase().includes(searchTerm.toLowerCase()) ||
      depot.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      depot.wilaya.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterType === "all" ||
      (filterType === "C" && depot.typeDepot === "C");

    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (codeDepot, codeUtilisateur) => {
    if (codeUtilisateur) {
      setErrorMessage("Ce dépôt est déjà affecté à un utilisateur et ne peut pas être supprimé.");
      return;
    }

    const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce dépôt ?");
    if (!confirmed) return;

    try {
      const res = await axios.delete(`http://localhost:5000/depot/${codeDepot}`);
      if (res.status === 200) {
        setErrorMessage("");
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
    navigate(`/modifier-depot/${codeDepot}`);
  };

  const TypeBadge = ({ type }) => {
    const colors = {
      "C": "bg-purple-100 text-purple-800 border-purple-200",
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors[type] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {type === "C" ? "CLR" : type || "—"}
      </span>
    );
  };

  const ActionButton = ({ icon: Icon, onClick, className, tooltip, disabled = false }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Icon className="w-4 h-4" />
      </button>
      {!disabled && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
    
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des dépôts</h1>
                <p className="text-sm sm:text-base text-gray-600">{filteredDepots.length} dépôt{filteredDepots.length > 1 ? 's' : ''} trouvé{filteredDepots.length > 1 ? 's' : ''}</p>
              </div>
            </div>

           
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, région ou wilaya..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="pl-9 sm:pl-10 pr-8 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full sm:w-auto min-w-[120px] sm:min-w-40"
                    >
                      <option value="all">Tous les types</option>
                      <option value="C">CLR uniquement</option>
                    </select>
                  </div>

                  <button
                    onClick={() => navigate("/ajouter-depot")}
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden xs:inline">Ajouter dépôt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

         
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-red-800">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

 
          <div className="hidden md:block bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nom</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Capacité</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Localisation</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDepots.map((depot, index) => (
                    <tr
                      key={depot.codeDepot}
                      className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'} hover:bg-blue-50`}
                    >
                     
                      <td className="px-4 sm:px-6 py-4">
                        <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {depot.codeDepot}
                        </span>
                      </td>

                     
                      <td className="px-4 sm:px-6 py-4 font-semibold text-gray-900">
                        {depot.nomDepot}
                      </td>

                      
                      <td className="px-4 sm:px-6 py-4">
                        <TypeBadge type={depot.typeDepot} />
                      </td>

                     
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600 flex items-center">
                        <Ruler className="w-4 h-4 mr-2 text-gray-400" />
                        {depot.capaciteDepot}
                      </td>

                      
                      <td className="px-4 sm:px-6 py-4">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-gray-900">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            {depot.region}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                            {depot.wilaya || "—"}
                          </div>
                        </div>
                      </td>

                    
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                        {depot.description || "—"}
                      </td>

                    
                      <td className="px-4 sm:px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <ActionButton
                            icon={Pencil}
                            onClick={() => handleEdit(depot.codeDepot)}
                            className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            tooltip="Modifier"
                          />
                          <ActionButton
                            icon={Trash2}
                            onClick={() => handleDelete(depot.codeDepot, depot.codeUtilisateur)}
                            className={`${
                              depot.codeUtilisateur
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-red-100 text-red-600 hover:bg-red-200"
                            }`}
                            tooltip={
                              depot.codeUtilisateur
                                ? "Dépôt affecté - Non supprimable"
                                : "Supprimer"
                            }
                            disabled={!!depot.codeUtilisateur}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredDepots.length === 0 && (
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun dépôt trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche ou filtres.</p>
              </div>
            )}
          </div>

          
          <div className="md:hidden space-y-4">
            {filteredDepots.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-xl border border-gray-100">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun dépôt trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche ou filtres.</p>
              </div>
            ) : (
              filteredDepots.map((depot) => (
                <div key={depot.codeDepot} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded mb-1 inline-block">
                        {depot.codeDepot}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-lg">{depot.nomDepot}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <TypeBadge type={depot.typeDepot} />
                      <div className="flex items-center text-sm text-gray-600">
                        <Ruler className="w-4 h-4 mr-1 text-gray-400" />
                        {depot.capaciteDepot}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-900">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <div>
                        <div>{depot.region}</div>
                        {depot.wilaya && (
                          <div className="text-xs text-gray-500">{depot.wilaya}</div>
                        )}
                      </div>
                    </div>
                    {depot.description && (
                      <div className="text-sm text-gray-600">
                        <div className="font-medium text-gray-700 mb-1">Description:</div>
                        {depot.description}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <ActionButton
                      icon={Pencil}
                      onClick={() => handleEdit(depot.codeDepot)}
                      className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      tooltip="Modifier"
                    />
                    <ActionButton
                      icon={Trash2}
                      onClick={() => handleDelete(depot.codeDepot, depot.codeUtilisateur)}
                      className={`${
                        depot.codeUtilisateur
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-red-100 text-red-600 hover:bg-red-200"
                      }`}
                      tooltip={
                        depot.codeUtilisateur
                          ? "Dépôt affecté - Non supprimable"
                          : "Supprimer"
                      }
                      disabled={!!depot.codeUtilisateur}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DepotTable;


