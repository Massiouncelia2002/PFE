// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function PlanifsDepot() {
//     const [planifs, setPlanifs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchPlanifs = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const res = await axios.get(
//                     "http://localhost:5000/api/commandePlanifie/affichePlanificationPourAdminDepot",
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 setPlanifs(res.data.data);
//             } catch (e) {
//                 console.error(e);
//                 setError("Impossible de récupérer les planifications.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPlanifs();
//     }, []);

//     if (loading) return <div>Chargement...</div>;
//     if (error) return <div className="text-red-500">{error}</div>;

//     return (
//         <div className="p-4">
//             <h2 className="text-2xl font-semibold mb-4">Planifications du dépôt</h2>
//             {planifs.length === 0 ? (
//                 <div>Aucune planification</div>
//             ) : (
//                 <table className="min-w-full bg-white">
                   

//                     <thead className="bg-gray-200">
//                         <tr>
                            
//                             <th className="px-4 py-2">Code client</th>
//                             <th className="px-4 py-2">Nom client</th>
//                             <th className="px-4 py-2">Code article</th>
//                             <th className="px-4 py-2">Désignation</th>
//                             <th className="px-4 py-2">Date commande</th>
//                             <th className="px-4 py-2">Date prévue</th>
//                             <th className="px-4 py-2">Heure Départ prévue</th>
//                             <th className="px-4 py-2">Durée (h)</th>
//                             <th className="px-4 py-2">Quantité transportée</th>
//                         </tr>
//                     </thead>

                    

//                     <tbody>
//                         {planifs.map((p) =>
//                             p.commande.articlesCommandes.map((ac, idx) => (
//                                 <tr key={`${p.commandePlanifieId}-${idx}`} className="border-t">
                                   
//                                     <td className="px-4 py-2">{p.commande.client.codeClient}</td>
//                                     <td className="px-4 py-2">{p.commande.client.nomClient}</td>
//                                     <td className="px-4 py-2">{ac.article.codeArticle}</td>
//                                     <td className="px-4 py-2">{ac.article.designation}</td>
//                                     <td className="px-4 py-2">{p.commande.dateCommande}</td>
//                                     <td className="px-4 py-2">{p.datePrevue}</td>
//                                     <td className="px-4 py-2">{p.heurePrevue}</td>
//                                     <td className="px-4 py-2">{p.dureePrevue}</td>
//                                     <td className="px-4 py-2">{p.quantiteTransporte}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// }

// export default PlanifsDepot;














import React, { useEffect, useState } from "react";
import axios from "axios";

function PlanifsDepot() {
    const [planifs, setPlanifs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPlanifs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:5000/api/commandePlanifie/affichePlanificationPourAdminDepot",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setPlanifs(res.data.data);
            } catch (e) {
                console.error(e);
                setError("Impossible de récupérer les planifications.");
            } finally {
                setLoading(false);
            }
        };
        fetchPlanifs();
    }, []);

    const handleGenererBon = async (commandePlanifieId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `http://localhost:5000/api/commandePlanifie/genererBonLivraison/${commandePlanifieId}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "blob" // pour recevoir le PDF
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

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Planifications du dépôt</h2>
            {planifs.length === 0 ? (
                <div>Aucune planification</div>
            ) : (
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2">Code client</th>
                            <th className="px-4 py-2">Nom client</th>
                            <th className="px-4 py-2">Code article</th>
                            <th className="px-4 py-2">Désignation</th>
                            <th className="px-4 py-2">Date commande</th>
                            <th className="px-4 py-2">Date prévue</th>
                            <th className="px-4 py-2">Heure Départ prévue</th>
                            <th className="px-4 py-2">Durée (h)</th>
                            <th className="px-4 py-2">Quantité transportée</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planifs.map((p) =>
                            p.commande.articlesCommandes.map((ac, idx) => (
                                <tr key={`${p.commandePlanifieId}-${idx}`} className="border-t">
                                    <td className="px-4 py-2">{p.commande.client.codeClient}</td>
                                    <td className="px-4 py-2">{p.commande.client.nomClient}</td>
                                    <td className="px-4 py-2">{ac.article.codeArticle}</td>
                                    <td className="px-4 py-2">{ac.article.designation}</td>
                                    <td className="px-4 py-2">{p.commande.dateCommande}</td>
                                    <td className="px-4 py-2">{p.datePrevue}</td>
                                    <td className="px-4 py-2">{p.heurePrevue}</td>
                                    <td className="px-4 py-2">{p.dureePrevue}</td>
                                    <td className="px-4 py-2">{p.quantiteTransporte}</td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleGenererBon(p.commandePlanifieId)}
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Générer PDF
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PlanifsDepot;
