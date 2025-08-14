import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pencil, Trash2, Search, Filter, Download, Building, Mail, Phone, MapPin } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";

const ClientTable = ({ clients, fetchClients }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepot, setFilterDepot] = useState("all");

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

  const filteredClients = clients.filter(client => {
    const matchesSearch =
      client.nomClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.codeClient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterDepot === "all" || client.codeDepot === filterDepot;

    return matchesSearch && matchesFilter;
  });

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
       
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des clients</h1>
                <p className="text-sm sm:text-base text-gray-600">{filteredClients.length} client{filteredClients.length > 1 ? 's' : ''} trouvé{filteredClients.length > 1 ? 's' : ''}</p>
              </div>
            </div>

      
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, code ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div className="relative flex-1 sm:flex-none">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      value={filterDepot}
                      onChange={(e) => setFilterDepot(e.target.value)}
                      className="pl-9 sm:pl-10 pr-8 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full sm:w-auto min-w-[120px] sm:min-w-40"
                    >
                      <option value="all">Tous les dépôts</option>
                      {[...new Set(clients.map(c => c.codeDepot))].map(depot => (
                        <option key={depot} value={depot}>{depot}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => navigate("/ajouter-client")}
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden xs:inline">Ajouter client</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          
          <div className="hidden md:block bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Client</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Adresse</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Dépôt</th>
                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredClients.map((client, index) => (
                    <tr
                      key={client.codeClient}
                      className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'} hover:bg-blue-50`}
                    >
                      
                      <td className="px-4 sm:px-6 py-4">
                        <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {client.codeClient}
                        </span>
                      </td>

                     
                      <td className="px-4 sm:px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {client.nomClient}
                        </div>
                      </td>

                     
                      <td className="px-4 sm:px-6 py-4">
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center text-gray-600">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="truncate">{client.email}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Phone className="w-3 h-3 mr-2 text-gray-400" />
                            {client.tel}
                          </div>
                        </div>
                      </td>

                      
                      <td className="px-4 sm:px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="truncate">{client.adress}</span>
                        </div>
                      </td>

                     
                      <td className="px-4 sm:px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          {client.codeDepot}
                        </span>
                      </td>

                      <td className="px-4 sm:px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <ActionButton
                            icon={Pencil}
                            onClick={() => handleEdit(client.codeClient)}
                            className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            tooltip="Modifier"
                          />
                          <ActionButton
                            icon={Trash2}
                            onClick={() => handleDelete(client.codeClient)}
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

            {filteredClients.length === 0 && (
              <div className="text-center py-12">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun client trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche ou filtres.</p>
              </div>
            )}
          </div>


          <div className="md:hidden space-y-4">
            {filteredClients.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-xl border border-gray-100">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun client trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche ou filtres.</p>
              </div>
            ) : (
              filteredClients.map((client) => (
                <div key={client.codeClient} className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded mb-1 inline-block">
                        {client.codeClient}
                      </span>
                      <h3 className="font-semibold text-gray-900 text-lg">{client.nomClient}</h3>
                    </div>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                      {client.codeDepot}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />
                      {client.tel}
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span>{client.adress}</span>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4 space-x-2">
                    <ActionButton
                      icon={Pencil}
                      onClick={() => handleEdit(client.codeClient)}
                      className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                      tooltip="Modifier"
                    />
                    <ActionButton
                      icon={Trash2}
                      onClick={() => handleDelete(client.codeClient)}
                      className="bg-red-100 text-red-600 hover:bg-red-200"
                      tooltip="Supprimer"
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

export default ClientTable;