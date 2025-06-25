// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";



// const Planifications = () => {

//     const location = useLocation();
//     const codeDepot = location.state?.codeDepot; 
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const token = localStorage.getItem("token");

//     console.log("📦 Dépôt demandé :", codeDepot);

//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/commandePlanifie/afficheCommandePanifie?codeDepot=${codeDepot}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         })
//             .then(res => setData(res.data))
//             .catch(console.error)
//             .finally(() => setLoading(false));
//     }, 
//     []);

//     if (loading) return <div>Chargement…</div>;

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">📦 Visualisation des planifications</h2>
//             <table className="min-w-full table-auto">
//                 <thead className="bg-gray-200">
//                     <tr>
//                         <th>Commande</th>
//                         <th>Client</th>
//                         <th>Date Commande</th>
//                         <th>Qté Demandée</th>
//                         <th>Qté Transportée</th>
//                         <th>Statut</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map(c => (
//                         <tr key={c.codeCommande} className="border-t">
//                             <td className="px-2 py-1">{c.codeCommande}</td>
//                             <td className="px-2 py-1">{c.codeClient}</td>
//                             <td className="px-2 py-1">{new Date(c.dateCommande).toLocaleDateString()}</td>
//                             <td className="px-2 py-1">{c.quantiteDemandee}</td>
//                             <td className="px-2 py-1">{c.quantiteTransporte}</td>
//                             <td className="px-2 py-1 font-semibold">
//                                 {c.statut === "non_planifie" ? "🟥 Non planifiée" :
//                                     c.statut === "partiel" ? "🟧 Partiellement planifiée" :
//                                         "🟩 Planifiée à 100%"}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Planifications;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
            navigate("/"); // Rediriger si pas de dépôt
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

    if (loading) return <div>Chargement…</div>;

    if (!data.length) {
        return <div className="text-center p-4">📭 Aucune commande planifiée trouvée pour ce dépôt.</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">📦 Visualisation des planifications</h2>
            <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                    <tr>
                        <th>Commande</th>
                        <th>Client</th>
                        <th>Date Commande</th>
                        <th>Qté Demandée</th>
                        <th>Qté Transportée</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(c => (
                        <tr key={c.codeCommande} className="border-t">
                            <td className="px-2 py-1">{c.codeCommande}</td>
                            <td className="px-2 py-1">{c.codeClient}</td>
                            <td className="px-2 py-1">{new Date(c.dateCommande).toLocaleDateString()}</td>
                            <td className="px-2 py-1">{c.quantiteDemandee}</td>
                            <td className="px-2 py-1">{c.quantiteTransporte}</td>
                            <td className="px-2 py-1 font-semibold">
                                {c.statut === "non_planifie" ? "🟥 Non planifiée" :
                                 c.statut === "partiellement_planifie" ? "🟧 Partiellement planifiée" :
                                 "🟩 Planifiée à 100%"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Planifications;
