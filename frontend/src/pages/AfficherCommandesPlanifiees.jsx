import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Package, Calendar, User, CheckCircle, AlertCircle, Clock } from "lucide-react";
import AdminLayoutPlannificateur from './AdminLayoutPlannificateur'; 

const Planifications = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const codeDepot = location.state?.codeDepot;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!codeDepot) {
            alert("⚠️ Aucun dépôt sélectionné !");
            navigate("/"); 
            return;
        }

        console.log("📦 Dépôt demandé :", codeDepot);

        axios.get(`http://localhost:5000/api/commandePlanifie/afficheCommandePanifie?codeDepot=${codeDepot}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => setData(res.data))
            .catch((err) => {
                console.error("Erreur récupération données planification:", err);
            })
            .finally(() => setLoading(false));
    }, [codeDepot, token, navigate]);

    const getStatusConfig = (statut) => {
        switch (statut) {
            case "non_planifie":
                return {
                    icon: <AlertCircle className="w-4 h-4" />,
                    text: "Non planifiée",
                    color: "bg-red-50 text-red-700 border-red-200",
                    dot: "bg-red-500"
                };
            case "partiellement_planifie":
                return {
                    icon: <Clock className="w-4 h-4" />,
                    text: "Partiellement planifiée",
                    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
                    dot: "bg-yellow-500"
                };
            default:
                return {
                    icon: <CheckCircle className="w-4 h-4" />,
                    text: "Planifiée à 100%",
                    color: "bg-green-50 text-green-700 border-green-200",
                    dot: "bg-green-500"
                };
        }
    };

    const getProgressPercentage = (demandee, transportee) => {
        if (!demandee || demandee === 0) return 0;
        return Math.min((transportee / demandee) * 100, 100);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                    <p className="text-slate-600 font-medium">Chargement des données...</p>
                </div>
            </div>
        );
    }

    if (!data.length) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
                    <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Aucune commande trouvée</h3>
                    <p className="text-slate-500">Aucune commande planifiée pour ce dépôt.</p>
                </div>
            </div>
        );
    }

    const totalCommandes = data.length;
    const commandesCompletes = data.filter(c => c.statut === "planifie").length;
    const commandesPartielles = data.filter(c => c.statut === "partiellement_planifie").length;
    const commandesNonPlanifiees = data.filter(c => c.statut === "non_planifie").length;

    return (
        <AdminLayoutPlannificateur>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 mb-2">Planifications des commandes</h1>
                            <p className="text-slate-600">Dépôt: <span className="font-semibold text-blue-600">{codeDepot}</span></p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>Mis à jour: {new Date().toLocaleDateString('fr-FR')}</span>
                            </div>
                        </div>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-slate-600">Total</p>
                                    <p className="text-2xl font-bold text-slate-800">{totalCommandes}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-slate-600">Complètes</p>
                                    <p className="text-2xl font-bold text-green-600">{commandesCompletes}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-50 rounded-lg">
                                    <Clock className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-slate-600">Partielles</p>
                                    <p className="text-2xl font-bold text-yellow-600">{commandesPartielles}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="flex items-center">
                                <div className="p-3 bg-red-50 rounded-lg">
                                    <AlertCircle className="w-6 h-6 text-red-600" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm text-slate-600">Non planifiées</p>
                                    <p className="text-2xl font-bold text-red-600">{commandesNonPlanifiees}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Commande</th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Client</th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Date</th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Progression</th>
                                    <th className="text-left py-4 px-6 font-semibold text-slate-700">Statut</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.map((commande) => {
                                    const statusConfig = getStatusConfig(commande.statut);
                                    const progressPercentage = getProgressPercentage(commande.quantiteDemandee, commande.quantiteTransporte);
                                    
                                    return (
                                        <tr key={commande.codeCommande} className="hover:bg-slate-50 transition-colors duration-200">
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-slate-800">{commande.codeCommande}</div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center">
                                                    <div className="p-2 bg-slate-100 rounded-lg mr-3">
                                                        <User className="w-4 h-4 text-slate-600" />
                                                    </div>
                                                    <span className="text-slate-700">{commande.codeClient}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-slate-600">
                                                    {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-slate-600">
                                                            {commande.quantiteTransporte} / {commande.quantiteDemandee}
                                                        </span>
                                                        <span className="text-slate-700 font-medium">
                                                            {progressPercentage.toFixed(0)}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-slate-200 rounded-full h-2">
                                                        <div 
                                                            className={`h-2 rounded-full transition-all duration-500 ${
                                                                progressPercentage === 100 ? 'bg-green-500' :
                                                                progressPercentage > 0 ? 'bg-yellow-500' : 'bg-red-500'
                                                            }`}
                                                            style={{ width: `${progressPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                                                    <div className={`w-2 h-2 rounded-full ${statusConfig.dot}`}></div>
                                                    {statusConfig.icon}
                                                    <span>{statusConfig.text}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

               
                <div className="lg:hidden mt-6">
                    <div className="space-y-4">
                        {data.map((commande) => {
                            const statusConfig = getStatusConfig(commande.statut);
                            const progressPercentage = getProgressPercentage(commande.quantiteDemandee, commande.quantiteTransporte);
                            
                            return (
                                <div key={commande.codeCommande} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-semibold text-slate-800 text-lg">{commande.codeCommande}</h3>
                                            <p className="text-slate-600">{commande.codeClient}</p>
                                        </div>
                                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></div>
                                            <span>{statusConfig.text}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">Date:</span>
                                            <span className="text-slate-800">{new Date(commande.dateCommande).toLocaleDateString('fr-FR')}</span>
                                        </div>
                                        
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-slate-600">Progression:</span>
                                                <span className="text-slate-800 font-medium">
                                                    {commande.quantiteTransporte} / {commande.quantiteDemandee} ({progressPercentage.toFixed(0)}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 rounded-full h-2">
                                                <div 
                                                    className={`h-2 rounded-full transition-all duration-500 ${
                                                        progressPercentage === 100 ? 'bg-green-500' :
                                                        progressPercentage > 0 ? 'bg-yellow-500' : 'bg-red-500'
                                                    }`}
                                                    style={{ width: `${progressPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
        </AdminLayoutPlannificateur>
    );
};

export default Planifications;