
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const GestionRetours = () => {
//     const [planifications, setPlanifications] = useState([]);

//     useEffect(() => {
//         axios
//             .get("http://localhost:5000/api/commandePlanifie/affichePlanificationPourAdminDepot", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             })
//             .then((res) => {
//                 const planifs = res.data.data.map((p) => ({
//                     ...p,
//                     statutLivraison: p.statutLivraison || "en_cours",
//                     quantiteRetourne: p.statutLivraison === "annule" ? p.quantiteTransporte : 0,
//                     bonRetourGenere: !!p.bonRetour, // true si déjà généré côté backend
//                 }));
//                 setPlanifications(planifs);
//             })
//             .catch((err) => {
//                 toast.error("Erreur lors du chargement des planifications");
//                 console.error(err);
//             });
//     }, []);

//     const handleStatutChange = (index, newStatut) => {
//         const updated = [...planifications];
//         updated[index].statutLivraison = newStatut;
//         updated[index].quantiteRetourne =
//             newStatut === "annule" ? updated[index].quantiteTransporte : newStatut === "retourne" ? 0 : "";
//         updated[index].bonRetourGenere = false; // annuler le bouton PDF si statut changé
//         setPlanifications(updated);
//     };

//     const handleQuantiteRetourneChange = (index, value) => {
//         const updated = [...planifications];
//         updated[index].quantiteRetourne = value;
//         setPlanifications(updated);
//     };


//     const handleEnregistrer = async (planif, index) => {
//         const quantiteRetourne = parseFloat(planif.quantiteRetourne);
//         const quantiteTransporte = planif.quantiteTransporte;

//         // ✅ Vérification côté frontend avant l’appel API
//         if (
//             planif.statutLivraison === "retourne" &&
//             (isNaN(quantiteRetourne) || quantiteRetourne <= 0 || quantiteRetourne >= quantiteTransporte)
//         ) {
//             toast.warn("⚠️ Quantité retournée invalide : doit être > 0 et < quantité transportée.");
//             return;
//         }

//         try {
//             await axios.post(
//                 `http://localhost:5000/api/commandePlanifie/gererRetour/${planif.commandePlanifieId}`,
//                 {
//                     statut: planif.statutLivraison,
//                     quantiteRetourne: quantiteRetourne,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 }
//             );

//             toast.success("✅ Retour enregistré !");
//             const updated = [...planifications];
//             updated[index].bonRetourGenere = true;
//             setPlanifications(updated);
//         } catch (error) {
//             // ✅ Affichage du message exact du backend si présent
//             if (error.response?.data?.message) {
//                 toast.error(error.response.data.message);
//             } else {
//                 toast.error("❌ Erreur d'enregistrement.");
//             }
//             console.error("Erreur lors de l'enregistrement :", error);
//         }
//     };




//     const handleGenererBonRetour = async (planif) => {
//         try {
//             const response = await axios.post(
//                 `http://localhost:5000/api/commandePlanifie/genererBonRetour/${planif.commandePlanifieId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                     responseType: "blob",
//                 }
//             );
//             const blob = new Blob([response.data], { type: "application/pdf" });
//             const link = document.createElement("a");
//             link.href = window.URL.createObjectURL(blob);
//             link.download = `BonRetour_${planif.commandePlanifieId}.pdf`;
//             link.click();
//         } catch (error) {
//             toast.error("❌ Erreur PDF bon de retour");
//             console.error(error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="mb-4">Gestion des Retours</h2>
//             <table className="table table-bordered">
//                 <thead className="table-light">
//                     <tr>
//                         <th>Commande</th>
//                         <th>Client</th>
//                         <th>Véhicule</th>
//                         <th>Qté Transportée</th>
//                         <th>Statut</th>
//                         <th>Qté Retournée</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {planifications.map((p, i) => (
//                         <tr key={p.commandePlanifieId}>
//                             <td>{p.commande.codeCommande}</td>
//                             <td>{p.commande.client.nomClient}</td>
//                             <td>{p.vehicule.matricule}</td>
//                             <td>{p.quantiteTransporte}</td>
//                             <td>
//                                 <select
//                                     className="form-select"
//                                     value={p.statutLivraison}
//                                     onChange={(e) => handleStatutChange(i, e.target.value)}
//                                 >
//                                     <option value="livre">Livré</option>
//                                     <option value="annule">Annulé</option>
//                                     <option value="retourne">Retourné</option>
//                                 </select>
//                             </td>
//                             <td>
//                                 <input
//                                     type="number"
//                                     className="form-control"
//                                     value={p.quantiteRetourne}
//                                     onChange={(e) => handleQuantiteRetourneChange(i, e.target.value)}
//                                     disabled={p.statutLivraison !== "retourne"}
//                                     min="0"
//                                     max={p.quantiteTransporte}
//                                     step="0.01"
//                                 />
//                             </td>
//                             <td className="d-flex flex-column gap-2">
//                                 <button className="btn btn-success" onClick={() => handleEnregistrer(p, i)}>
//                                     Enregistrer
//                                 </button>
//                                 <button
//                                     className="btn btn-primary"
//                                     disabled={!p.bonRetourGenere}
//                                     onClick={() => handleGenererBonRetour(p)}
//                                 >
//                                     Générer Bon de Retour
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default GestionRetours;















import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Truck, User, FileText, Save, Download, CheckCircle, XCircle, RotateCcw } from "lucide-react";
import AdminLayoutDepot from "./AdminLayoutDepot";
const GestionRetours = () => {
    const [planifications, setPlanifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://localhost:5000/api/commandePlanifie/affichePlanificationPourAdminDepot", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((res) => {
                const planifs = res.data.data.map((p) => ({
                    ...p,
                    statutLivraison: p.statutLivraison || "en_cours",
                    quantiteRetourne: p.statutLivraison === "annule" ? p.quantiteTransporte : 0,
                    bonRetourGenere: !!p.bonRetour,
                }));
                setPlanifications(planifs);
            })
            .catch((err) => {
                toast.error("Erreur lors du chargement des planifications");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleStatutChange = (index, newStatut) => {
        const updated = [...planifications];
        updated[index].statutLivraison = newStatut;
        updated[index].quantiteRetourne =
            newStatut === "annule" ? updated[index].quantiteTransporte : newStatut === "retourne" ? 0 : "";
        updated[index].bonRetourGenere = false;
        setPlanifications(updated);
    };

    const handleQuantiteRetourneChange = (index, value) => {
        const updated = [...planifications];
        updated[index].quantiteRetourne = value;
        setPlanifications(updated);
    };

    const handleEnregistrer = async (planif, index) => {
        const quantiteRetourne = parseFloat(planif.quantiteRetourne);
        const quantiteTransporte = planif.quantiteTransporte;

        if (
            planif.statutLivraison === "retourne" &&
            (isNaN(quantiteRetourne) || quantiteRetourne <= 0 || quantiteRetourne >= quantiteTransporte)
        ) {
            toast.warn("⚠️ Quantité retournée invalide : doit être > 0 et < quantité transportée.");
            return;
        }

        try {
            await axios.post(
                `http://localhost:5000/api/commandePlanifie/gererRetour/${planif.commandePlanifieId}`,
                {
                    statut: planif.statutLivraison,
                    quantiteRetourne: quantiteRetourne,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            toast.success("✅ Retour enregistré !");
            const updated = [...planifications];
            updated[index].bonRetourGenere = true;
            setPlanifications(updated);
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("❌ Erreur d'enregistrement.");
            }
            console.error("Erreur lors de l'enregistrement :", error);
        }
    };

    const handleGenererBonRetour = async (planif) => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/commandePlanifie/genererBonRetour/${planif.commandePlanifieId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    responseType: "blob",
                }
            );
            const blob = new Blob([response.data], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = `BonRetour_${planif.commandePlanifieId}.pdf`;
            link.click();
        } catch (error) {
            toast.error("❌ Erreur PDF bon de retour");
            console.error(error);
        }
    };

    const getStatutBadge = (statut) => {
        const badges = {
            livre: "bg-emerald-100 text-emerald-800 border-emerald-200",
            annule: "bg-red-100 text-red-800 border-red-200",
            retourne: "bg-amber-100 text-amber-800 border-amber-200",
            en_cours: "bg-blue-100 text-blue-800 border-blue-200"
        };
        
        const icons = {
            livre: <CheckCircle className="w-4 h-4" />,
            annule: <XCircle className="w-4 h-4" />,
            retourne: <RotateCcw className="w-4 h-4" />,
            en_cours: <Package className="w-4 h-4" />
        };

        const labels = {
            livre: "Livré",
            annule: "Annulé", 
            retourne: "Retourné",
            en_cours: "En cours"
        };

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${badges[statut] || badges.en_cours}`}>
                {icons[statut]}
                {labels[statut]}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AdminLayoutDepot>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Gestion des Retours</h1>
                    </div>
                    <p className="text-gray-600">Gérez les statuts de livraison et les retours de marchandises</p>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            Commande
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Client
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <Truck className="w-4 h-4" />
                                            Véhicule
                                        </div>
                                    </th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Qté Transportée</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Statut</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Qté Retournée</th>
                                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {planifications.map((p, i) => (
                                    <tr key={p.commandePlanifieId} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                {p.commande.codeCommande}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-gray-900">{p.commande.client.nomClient}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-mono text-sm">{p.vehicule.matricule}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-blue-600">{p.quantiteTransporte}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <select
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                                                value={p.statutLivraison}
                                                onChange={(e) => handleStatutChange(i, e.target.value)}
                                            >
                                                <option value="livre">Livré</option>
                                                <option value="annule">Annulé</option>
                                                <option value="retourne">Retourné</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-6">
                                            <input
                                                type="number"
                                                className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                                    p.statutLivraison !== "retourne" 
                                                        ? "bg-gray-50 border-gray-200 text-gray-500" 
                                                        : "bg-white border-gray-200"
                                                }`}
                                                value={p.quantiteRetourne}
                                                onChange={(e) => handleQuantiteRetourneChange(i, e.target.value)}
                                                disabled={p.statutLivraison !== "retourne"}
                                                min="0"
                                                max={p.quantiteTransporte}
                                                step="0.01"
                                                placeholder="0"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-2">
                                                <button 
                                                    className="flex items-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                                    onClick={() => handleEnregistrer(p, i)}
                                                >
                                                    <Save className="w-4 h-4" />
                                                    Enregistrer
                                                </button>
                                                <button
                                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                        p.bonRetourGenere
                                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    }`}
                                                    disabled={!p.bonRetourGenere}
                                                    onClick={() => handleGenererBonRetour(p)}
                                                >
                                                    <Download className="w-4 h-4" />
                                                    PDF
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                    {planifications.map((p, i) => (
                        <div key={p.commandePlanifieId} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                            {p.commande.codeCommande}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <User className="w-4 h-4" />
                                        <span className="font-medium">{p.commande.client.nomClient}</span>
                                    </div>
                                </div>
                                {getStatutBadge(p.statutLivraison)}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Véhicule</label>
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-4 h-4 text-gray-400" />
                                        <span className="font-mono text-sm">{p.vehicule.matricule}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Qté Transportée</label>
                                    <span className="font-semibold text-blue-600">{p.quantiteTransporte}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2">Statut</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                                        value={p.statutLivraison}
                                        onChange={(e) => handleStatutChange(i, e.target.value)}
                                    >
                                        <option value="livre">Livré</option>
                                        <option value="annule">Annulé</option>
                                        <option value="retourne">Retourné</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-2">Quantité Retournée</label>
                                    <input
                                        type="number"
                                        className={`w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                            p.statutLivraison !== "retourne" 
                                                ? "bg-gray-50 border-gray-200 text-gray-500" 
                                                : "bg-white border-gray-200"
                                        }`}
                                        value={p.quantiteRetourne}
                                        onChange={(e) => handleQuantiteRetourneChange(i, e.target.value)}
                                        disabled={p.statutLivraison !== "retourne"}
                                        min="0"
                                        max={p.quantiteTransporte}
                                        step="0.01"
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <button 
                                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
                                        onClick={() => handleEnregistrer(p, i)}
                                    >
                                        <Save className="w-4 h-4" />
                                        Enregistrer
                                    </button>
                                    <button
                                        className={`flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                            p.bonRetourGenere
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                        disabled={!p.bonRetourGenere}
                                        onClick={() => handleGenererBonRetour(p)}
                                    >
                                        <Download className="w-4 h-4" />
                                        Générer PDF
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {planifications.length === 0 && !loading && (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune planification trouvée</h3>
                        <p className="text-gray-600">Il n'y a actuellement aucune planification à gérer.</p>
                    </div>
                )}
            </div>
        </div>
        </AdminLayoutDepot>
    );
};

export default GestionRetours;