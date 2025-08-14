


import React, { useState } from "react";
import {
  Pencil,
  Trash2,
  Search,
  Filter,
  UserCheck,
  UserX,
  Calendar,
  Mail,
  Briefcase,
  Building,
  Download,
  Users,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import AdminLayout from "../pages/AdminLayout";
import { useNavigate } from "react-router-dom"; 

const UtilisateurTable = ({ utilisateurs, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedUser, setExpandedUser] = useState(null);
  const navigate = useNavigate();

  const toggleExpandUser = (codeUtilisateur) => {
    setExpandedUser(expandedUser === codeUtilisateur ? null : codeUtilisateur);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredUsers = utilisateurs.filter(user => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && user.statut) ||
      (filterStatus === "inactive" && !user.statut);

    return matchesSearch && matchesFilter;
  });

  const StatusBadge = ({ status }) => (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
      status
        ? 'bg-green-100 text-green-800 border border-green-200'
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {status ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
      {status ? 'Actif' : 'Inactif'}
    </div>
  );

  const RoleBadge = ({ role }) => {
    const colors = {
      "Admin Fonctionnel": "bg-purple-100 text-purple-800 border-purple-200",
      "Planificateur": "bg-blue-100 text-blue-800 border-blue-200",
      "Admin Dépôt": "bg-orange-100 text-orange-800 border-orange-200"
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${colors[role] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
        {role || "—"}
      </span>
    );
  };

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
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
                <p className="text-sm sm:text-base text-gray-600">{filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}</p>
              </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                  />
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-9 sm:pl-10 pr-7 sm:pr-8 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base min-w-32 sm:min-w-40"
                    >
                      <option value="all">Tous</option>
                      <option value="active">Actifs</option>
                      <option value="inactive">Inactifs</option>
                    </select>
                  </div>

                  <button
                    onClick={() => navigate("/ajouter-utilisateur")}
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Ajouter utilisateur</span>
                    <span className="sm:hidden">Ajouter</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
           
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Utilisateur</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Fonction</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Rôle</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Dates</th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Statut</th>
                    <th className="px-4 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user.codeUtilisateur}
                      className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'} hover:bg-blue-50`}
                    >
                      
                      <td className="px-4 sm:px-6 py-3">
                        <span className="font-mono text-xs sm:text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {user.codeUtilisateur}
                        </span>
                      </td>

                      
                      <td className="px-4 sm:px-6 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm mr-2 sm:mr-3 shadow-lg">
                            {user.prenom.charAt(0)}{user.nom.charAt(0)}
                          </div>
                          <div className="font-semibold text-sm sm:text-base text-gray-900">
                            {user.prenom} {user.nom}
                          </div>
                        </div>
                      </td>

                     
                      <td className="px-4 sm:px-6 py-3 text-xs sm:text-sm text-gray-600 flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{user.email}</span>
                      </td>

                      
                      <td className="px-4 sm:px-6 py-3">
                        <div className="space-y-1 text-xs sm:text-sm">
                          <div className="flex items-center text-gray-900">
                            <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                            {user.posteTravail || "—"}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Building className="w-3 h-3 mr-2 text-gray-400" />
                            {user.brancheFonction || "—"}
                          </div>
                        </div>
                      </td>

                      
                      <td className="px-4 sm:px-6 py-3">
                        <RoleBadge role={user.role} />
                      </td>

                     
                      <td className="px-4 sm:px-6 py-3 text-xs space-y-1">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          Créé: {formatDate(user.dateCreation)}
                        </div>
                        {user.dateFin && (
                          <div className="flex items-center text-red-600">
                            <Calendar className="w-3 h-3 mr-1 text-red-400" />
                            Fin: {formatDate(user.dateFin)}
                          </div>
                        )}
                      </td>

                      
                      <td className="px-4 sm:px-6 py-3">
                        <StatusBadge status={user.statut} />
                      </td>

                     
                      <td className="px-4 sm:px-6 py-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <ActionButton
                            icon={Pencil}
                            onClick={() => onEdit(user)}
                            className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            tooltip="Modifier"
                          />
                          <ActionButton
                            icon={Trash2}
                            onClick={() => onDelete(user.codeUtilisateur)}
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

            <div className="md:hidden">
              {filteredUsers.map((user, index) => (
                <div 
                  key={user.codeUtilisateur} 
                  className={`border-b border-gray-200 p-4 ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3 shadow-lg">
                        {user.prenom.charAt(0)}{user.nom.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {user.prenom} {user.nom}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span className="font-mono bg-gray-100 px-1 rounded">{user.codeUtilisateur}</span>
                        </div>
                        <div className="mt-1">
                          <StatusBadge status={user.statut} />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleExpandUser(user.codeUtilisateur)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {expandedUser === user.codeUtilisateur ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {expandedUser === user.codeUtilisateur && (
                    <div className="mt-3 pl-13 space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-900">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{user.posteTravail || "—"}</span>
                      </div>
                      
                      <div className="flex items-center text-xs text-gray-500">
                        <Building className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{user.brancheFonction || "—"}</span>
                      </div>
                      
                      <div className="mt-2">
                        <RoleBadge role={user.role} />
                      </div>
                      
                      <div className="text-xs space-y-1 mt-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-3 h-3 mr-1 text-gray-400" />
                          Créé: {formatDate(user.dateCreation)}
                        </div>
                        {user.dateFin && (
                          <div className="flex items-center text-red-600">
                            <Calendar className="w-3 h-3 mr-1 text-red-400" />
                            Fin: {formatDate(user.dateFin)}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <ActionButton
                          icon={Pencil}
                          onClick={() => onEdit(user)}
                          className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                          tooltip="Modifier"
                        />
                        <ActionButton
                          icon={Trash2}
                          onClick={() => onDelete(user.codeUtilisateur)}
                          className="bg-red-100 text-red-600 hover:bg-red-200"
                          tooltip="Supprimer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun utilisateur trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche ou filtres.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UtilisateurTable;