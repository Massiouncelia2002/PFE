import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Plus, X, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import AdminLayout from "./AdminLayout";

const AffectationDepot = () => {
    const [depots, setDepots] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [selectedUtilisateur, setSelectedUtilisateur] = useState("");
    const [selectedDepot, setSelectedDepot] = useState("");
    const [depotsAffectes, setDepotsAffectes] = useState([]);
    const [message, setMessage] = useState({ type: "", text: "" });
    const [utilisateurData, setUtilisateurData] = useState(null);
    const [depotsStatus, setDepotsStatus] = useState({});
    const [utilisateursAvecDepots, setUtilisateursAvecDepots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDepotList, setShowDepotList] = useState(false);
    const [searchDepot, setSearchDepot] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resDepots = await axios.get("http://localhost:5000/depot");
                setDepots(resDepots.data);
                const resUsers = await axios.get("http://localhost:5000/utilisateur/utilisateurs-depot-groupe");
                const { admins, gestionnaires } = resUsers.data;
                const usersFiltres = [...admins, ...gestionnaires];
                setUtilisateurs(usersFiltres);

                const resUtilDepots = await axios.get("http://localhost:5000/depot/utilisateurs-avec-depots");
                setUtilisateursAvecDepots(resUtilDepots.data);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedUtilisateur) {
            const fetchUtilisateur = async () => {
                try {
                    const res = await axios.get(
                        `http://localhost:5000/utilisateur/${selectedUtilisateur}`
                    );
                    setUtilisateurData(res.data);
                    setDepotsAffectes(res.data.depots || []);
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'utilisateur :", error);
                }
            };
            fetchUtilisateur();
        }
    }, [selectedUtilisateur]);

    const checkDepotAffecte = async (codeDepot) => {
        if (!utilisateurData) return false;

        try {
            const res = await axios.get(`http://localhost:5000/depot/check/${codeDepot}/${utilisateurData.role}`);
            return res.data.affecte;
        } catch (error) {
            console.error("Erreur lors de la vérification du dépôt :", error);
            return false;
        }
    };

    const handleAddDepot = () => {
        if (selectedDepot) {
            if (utilisateurData?.role === "Admin Dépôt") {
               
                setDepotsAffectes([selectedDepot]);
            } else {
                
                if (!depotsAffectes.includes(selectedDepot)) {
                    setDepotsAffectes([...depotsAffectes, selectedDepot]);
                }
            }
            setSelectedDepot("");
        }
    };

    const handleRemoveDepot = (codeDepot) => {
        setDepotsAffectes(depotsAffectes.filter((d) => d !== codeDepot));
    };

    const handleAffectation = async () => {
        if (!selectedUtilisateur || depotsAffectes.length === 0) {
            setMessage({ type: "error", text: "Veuillez sélectionner un utilisateur et au moins un dépôt." });
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/depot/affecter-multiple", {
                codeUtilisateur: selectedUtilisateur,
                codesDepot: depotsAffectes
            });

            if (res.status === 200) {
                setMessage({ type: "success", text: "Dépôts affectés avec succès !" });
                setDepotsAffectes([]);

                const updatedDepotsStatus = { ...depotsStatus };
                depotsAffectes.forEach((depotCode) => {
                    updatedDepotsStatus[depotCode] = true;
                });
                setDepotsStatus(updatedDepotsStatus);

                const resUtilDepots = await axios.get("http://localhost:5000/depot/utilisateurs-avec-depots");
                setUtilisateursAvecDepots(resUtilDepots.data);
            }
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.message || "Erreur lors de l'affectation." });
        } finally {
            setIsLoading(false);
        }
    };

    const verifyDepotsStatus = async () => {
        if (!utilisateurData) return;
        const status = {};
        for (let depot of depots) {
            status[depot.codeDepot] = await checkDepotAffecte(depot.codeDepot);
        }
        setDepotsStatus(status);
    };

    useEffect(() => {
        verifyDepotsStatus();
    }, [depots, utilisateurData]);

    const getDepotsInterditsParRole = () => {
        if (!selectedUtilisateur || !utilisateurData) return [];

        const roleSelectionne = utilisateurData.role;
        const codeUtilisateurSelectionne = utilisateurData.codeUtilisateur;

        const autresUtilisateurs = utilisateursAvecDepots.filter(
            (u) => u.codeUtilisateur !== codeUtilisateurSelectionne
        );

        let depotsInterdits = [];

        autresUtilisateurs.forEach((util) => {
            if (roleSelectionne === "Planificateur" && util.role === "Planificateur") {
                depotsInterdits.push(...(util.depots || []));
            } else if (roleSelectionne === "Admin Dépôt" && util.role === "Admin Dépôt") {
                depotsInterdits.push(...(util.depots || []));
            }
        });

        return depotsInterdits.map((d) => d.codeDepot);
    };

    const depotsInterdits = getDepotsInterditsParRole();

    const filteredDepots = depots.filter((d) => {
        const code = d.codeDepot?.toLowerCase() || "";
        const nom = d.nomDepot?.toLowerCase() || "";
        const region = d.region?.toLowerCase() || "";
        const wilaya = d.wilaya?.toLowerCase() || "";
        const s = searchDepot.toLowerCase();
        return (
            code.includes(s) || nom.includes(s) || region.includes(s) || wilaya.includes(s)
        );
    });

    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <AdminLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-slate-800 mb-4">
                            Gestion des Affectations Utilisateurs
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Affectez facilement les dépôts aux différents utilisateurs
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                     
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                                <Plus className="mr-3 text-blue-600" size={28} />
                                Nouvelle Affectation
                            </h2>

                            <div className="space-y-6">
                               
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Sélectionnez un utilisateur
                                    </label>
                                    <select
                                        value={selectedUtilisateur}
                                        onChange={(e) => {
                                            setSelectedUtilisateur(e.target.value);
                                            setDepotsAffectes([]);
                                            setUtilisateurData(null);
                                            setMessage({ type: "", text: "" });
                                        }}
                                        className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">-- Choisir un utilisateur --</option>
                                        <optgroup label="Administrateurs de dépôt">
                                            {utilisateurs
                                                .filter((u) => u.role === "Admin Dépôt")
                                                .map((u) => {
                                                    const dejaAffecte = utilisateursAvecDepots.some(
                                                        (aff) =>
                                                            aff.codeUtilisateur === u.codeUtilisateur &&
                                                            aff.depots && aff.depots.length > 0
                                                    );

                                                    return (
                                                        <option
                                                            key={u.codeUtilisateur}
                                                            value={u.codeUtilisateur}
                                                            disabled={dejaAffecte}
                                                            className={dejaAffecte ? "text-slate-400" : ""}
                                                        >
                                                            {u.nom} {u.prenom} ({u.codeUtilisateur}) {dejaAffecte ? " - Déjà affecté" : ""}
                                                        </option>
                                                    );
                                                })}
                                        </optgroup>

                                        <optgroup label="Planificateur">
                                            {utilisateurs
                                                .filter((u) => u.role === "Planificateur")
                                                .map((u) => (
                                                    <option key={u.codeUtilisateur} value={u.codeUtilisateur}>
                                                        {u.nom} {u.prenom} ({u.codeUtilisateur})
                                                    </option>
                                                ))}
                                        </optgroup>
                                    </select>

                                    {selectedUtilisateur && utilisateurData && (
                                        <div className="text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <p className="font-medium text-slate-800">
                                                {utilisateurData.nom} {utilisateurData.prenom}
                                            </p>
                                            <p className="text-slate-600">
                                                <span className="font-medium">Code :</span> {utilisateurData.codeUtilisateur}
                                            </p>
                                            <p className="text-slate-600">
                                                <span className="font-medium">Rôle :</span> {utilisateurData.role}
                                            </p>
                                        </div>
                                    )}
                                </div>

                              
                                <div className="space-y-3">
                                    <label className="block text-sm font-semibold text-slate-700">
                                        Dépôts sélectionnés
                                    </label>
                                    <div className="min-h-[80px] border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 transition-all duration-200 hover:border-blue-300">
                                        {depotsAffectes.length === 0 ? (
                                            <div className="flex items-center justify-center h-full text-slate-400">
                                                <span>Aucun dépôt sélectionné</span>
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-2">
                                                {depotsAffectes.map((codeDepot) => {
                                                    const depot = depots.find((d) => d.codeDepot === codeDepot);
                                                    return (
                                                        <span
                                                            key={codeDepot}
                                                            className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-200 group"
                                                            onClick={() => handleRemoveDepot(codeDepot)}
                                                            title="Cliquez pour désélectionner"
                                                        >
                                                            {depot ? `${depot.codeDepot} - ${depot.nomDepot}` : codeDepot}
                                                            <X className="ml-2 w-4 h-4 group-hover:text-blue-600" />
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                    {utilisateurData?.role === "Admin Dépôt" && depotsAffectes.length > 0 && (
                                        <p className="text-sm text-blue-600">
                                            Note: Un Admin Dépôt ne peut être affecté qu'à un seul dépôt
                                        </p>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setShowDepotList(true)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                    >
                                        <Plus className="mr-2 w-4 h-4" />
                                        Choisir des dépôts
                                    </button>
                                </div>

                                <button
                                    onClick={handleAffectation}
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Affectation en cours...
                                        </div>
                                    ) : (
                                        "Affecter les dépôts"
                                    )}
                                </button>
                            </div>
                        </div>

                   
                        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">
                                Utilisateurs avec leurs dépôts affectés
                            </h3>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {utilisateursAvecDepots.length === 0 ? (
                                    <p className="text-center text-slate-500 py-8 italic">
                                        Aucune affectation trouvée
                                    </p>
                                ) : (
                                    utilisateursAvecDepots.map((user) => (
                                        <div key={user.codeUtilisateur} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                                            <div className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 transition-colors duration-200">
                                                <div className="font-semibold text-slate-800 text-lg">
                                                    {user.nom} {user.prenom}
                                                </div>
                                                <div className="text-sm text-slate-600">
                                                    <span className="font-medium">Code :</span> {user.codeUtilisateur} • <span className="font-medium">Rôle :</span> {user.role}
                                                </div>
                                            </div>

                                            {user.depots && user.depots.length > 0 && (
                                                <div className="p-4 bg-white border-t border-slate-200">
                                                    <div className="space-y-2">
                                                        {user.depots.map((d) => (
                                                            <div key={d.codeDepot} className="flex items-center p-3 bg-slate-50 rounded-lg">
                                                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                                                <div>
                                                                    <div className="font-medium text-slate-800">{d.nomDepot}</div>
                                                                    <div className="text-sm text-slate-600">
                                                                        {d.codeDepot} • {d.region} • {d.wilaya}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                  
                    {message.text && (
                        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg transform transition-all duration-300 ${
                            message.type === "success" 
                                ? "bg-green-500 text-white" 
                                : "bg-red-500 text-white"
                        }`}>
                            <div className="flex items-center">
                                {message.type === "success" ? (
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                )}
                                {message.text}
                            </div>
                        </div>
                    )}

                   
                    {showDepotList && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                                <div className="p-6 border-b border-slate-200">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-2xl font-bold text-slate-800">Sélectionner les dépôts</h3>
                                        <button
                                            className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                                            onClick={() => setShowDepotList(false)}
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Rechercher par code, nom, région ou wilaya..."
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={searchDepot}
                                            onChange={(e) => setSearchDepot(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="p-6 overflow-y-auto max-h-[60vh]">
                                    {filteredDepots.length === 0 ? (
                                        <p className="text-center text-slate-500 py-8">Aucun dépôt trouvé.</p>
                                    ) : (
                                        <div className="space-y-2">
                                            {filteredDepots.map((d) => {
                                                const estInterdit = depotsInterdits.includes(d.codeDepot);
                                                const estDejaAffecte = depotsStatus[d.codeDepot];
                                                const estDejaSelectionne = depotsAffectes.includes(d.codeDepot);
                                                
                                                return (
                                                    <div
                                                        key={d.codeDepot}
                                                        className={`flex items-center p-4 border border-slate-200 rounded-xl transition-all duration-200 cursor-pointer ${
                                                            estInterdit || estDejaAffecte 
                                                                ? "bg-slate-100 border-slate-300 cursor-not-allowed" 
                                                                : estDejaSelectionne 
                                                                    ? "bg-blue-50 border-blue-300 hover:bg-blue-100" 
                                                                    : "hover:bg-blue-50 hover:border-blue-300"
                                                        }`}
                                                        onClick={() => {
                                                            if (!estInterdit && !estDejaAffecte) {
                                                                if (utilisateurData?.role === "Admin Dépôt") {
                                                                   
                                                                    setDepotsAffectes([d.codeDepot]);
                                                                } else {
                                                                    
                                                                    if (estDejaSelectionne) {
                                                                        handleRemoveDepot(d.codeDepot);
                                                                    } else {
                                                                        setDepotsAffectes([...depotsAffectes, d.codeDepot]);
                                                                    }
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <div className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center ${
                                                            estDejaSelectionne 
                                                                ? "bg-blue-600 border-blue-600" 
                                                                : "border-slate-300"
                                                        } ${
                                                            estInterdit || estDejaAffecte ? "opacity-50" : ""
                                                        }`}>
                                                            {estDejaSelectionne && (
                                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-slate-800">
                                                                {d.codeDepot} - {d.nomDepot}
                                                            </div>
                                                            <div className="text-sm text-slate-600">
                                                                Région: {d.region} • Wilaya: {d.wilaya}
                                                            </div>
                                                            {estInterdit && (
                                                                <div className="text-xs text-red-500 mt-1">
                                                                    Ce dépôt est déjà affecté à un autre {utilisateurData?.role}
                                                                </div>
                                                            )}
                                                            {estDejaAffecte && !estInterdit && (
                                                                <div className="text-xs text-orange-500 mt-1">
                                                                    Ce dépôt est déjà affecté
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                                    <button
                                        onClick={() => setShowDepotList(false)}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                    >
                                        Valider la sélection
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AffectationDepot;