import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Calendar, 
  Clock, 
  Package, 
  User, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Truck,
  MapPin,
  Timer,
  Hash,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Eye
} from "lucide-react";
import AdminLayoutDepot from './AdminLayoutDepot'; 

function PlanifsDepot() {
    const [planifs, setPlanifs] = useState([]);
    const [filteredPlanifs, setFilteredPlanifs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const fetchPlanifs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:5000/api/commandePlanifie/affichePlanificationPourAdminDepot",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPlanifs(res.data.data);
                setFilteredPlanifs(res.data.data);
            } catch (e) {
                console.error(e);
                setError("Impossible de récupérer les planifications.");
            } finally {
                setLoading(false);
            }
        };
        fetchPlanifs();
    }, []);

    useEffect(() => {
        let filtered = planifs;
        
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.commande?.client?.nomClient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.commande?.client?.codeClient?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredPlanifs(filtered);
    }, [searchTerm, planifs]);

    const handleGenererBon = async (commandePlanifieId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `http://localhost:5000/api/commandePlanifie/genererBonLivraison/${commandePlanifieId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `BonLivraison_${commandePlanifieId}.pdf`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error(err);
            alert("❌ Échec de la génération du bon de livraison.");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return timeString;
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-2xl mb-4">
                        <RefreshCw className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400">Chargement des planifications...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-2xl mb-4">
                        <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-medium text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
       <AdminLayoutDepot >
        <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
            
            <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl flex items-center justify-center">
                                <Truck className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                                    La liste des commandes planifiées
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Gestion des livraisons planifiées • {filteredPlanifs.length} planification{filteredPlanifs.length > 1 ? 's' : ''}
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="p-2 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-all duration-200"
                            >
                                {darkMode ? '☀️' : '🌙'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
                <div className="mb-8">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Rechercher par client ou code..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>
                            
                            <button className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700 transition-all duration-200 shadow-lg">
                                <Filter className="w-5 h-5" />
                                <span>Filtres</span>
                            </button>
                        </div>
                    </div>
                </div>

                
                {filteredPlanifs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full mb-6">
                            <Package className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Aucune planification trouvée
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Aucune planification ne correspond à vos critères de recherche.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredPlanifs.map((p) =>
                            p.commande && Array.isArray(p.commande.articlesCommandes)
                                ? p.commande.articlesCommandes.map((ac, idx) => (
                                    <div
                                        key={`${p.commandePlanifieId}-${idx}`}
                                        className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                                    >
                                        
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-yellow-500 rounded-xl flex items-center justify-center">
                                                    <Hash className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                                        Commande #{p.commandePlanifieId}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {p.commande.client?.nomClient}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    <CheckCircle className="w-3 h-3 mr-1" />
                                                    Planifiée
                                                </span>
                                            </div>
                                        </div>

                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                            <div className="bg-blue-50/50 dark:bg-blue-900/20 rounded-xl p-4">
                                                <div className="flex items-center space-x-3">
                                                    <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
                                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                                            {p.commande.client?.codeClient}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-yellow-50/50 dark:bg-yellow-900/20 rounded-xl p-4">
                                                <div className="flex items-center space-x-3">
                                                    <Package className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Article</p>
                                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                                            {ac.article?.codeArticle}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-green-50/50 dark:bg-green-900/20 rounded-xl p-4">
                                                <div className="flex items-center space-x-3">
                                                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Date prévue</p>
                                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                                            {formatDate(p.datePrevue)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-purple-50/50 dark:bg-purple-900/20 rounded-xl p-4">
                                                <div className="flex items-center space-x-3">
                                                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                                    <div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Heure</p>
                                                        <p className="font-semibold text-gray-900 dark:text-white text-sm">
                                                            {formatTime(p.heurePrevue)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                      
                                        <div className="bg-gray-50/50 dark:bg-gray-700/30 rounded-xl p-4 mb-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Désignation:</span>
                                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                                        {ac.article?.designation}
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Durée prévue:</span>
                                                    <p className="font-medium text-gray-900 dark:text-white mt-1 flex items-center">
                                                        <Timer className="w-4 h-4 mr-1" />
                                                        {p.dureePrevue}h
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400">Quantité:</span>
                                                    <p className="font-medium text-gray-900 dark:text-white mt-1">
                                                        {p.quantiteTransporte} unités
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                Commandé le {formatDate(p.commande.dateCommande)}
                                            </div>
                                            
                                            <div className="flex space-x-3">
                                               
                                                
                                                <button
                                                    onClick={() => handleGenererBon(p.commandePlanifieId)}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                                                >
                                                    <Download className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Générer bon de livraison</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : null
                        )}
                    </div>
                )}
            </div>
        </div>
        </AdminLayoutDepot>
    );
}

export default PlanifsDepot;