// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
// import Table from "../components/ui/Table";
// import AdminLayoutDepot from "./AdminLayoutDepot";

// const EntreeStock = () => {
//     const [depots, setDepots] = useState([]);
//     const [selectedDepot, setSelectedDepot] = useState(null);
//     const [articles, setArticles] = useState([]);
//     const [entrees, setEntrees] = useState({});
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchDepots();
//     }, []);

//     const fetchDepots = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/depot/");
//             setDepots(res.data);
//         } catch (err) {
//             console.error("Erreur récupération dépôts :", err);
//         }
//     };

//     const fetchArticles = async (codeDepot) => {
//         try {
//             const res = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`);
//             setArticles(res.data);
//         } catch (err) {
//             console.error("Erreur récupération articles :", err);
//         }
//     };

//     const handleDepotChange = (e) => {
//         const depotCode = e.target.value;
//         const depot = depots.find(d => d.codeDepot === depotCode);
//         setSelectedDepot(depot);
//         setArticles([]);
//         setEntrees({});
//         if (depot) fetchArticles(depot.codeDepot);
//     };

//     const handleChange = (e, codeArticle, field) => {
//         setEntrees({
//             ...entrees,
//             [codeArticle]: {
//                 ...entrees[codeArticle],
//                 [field]: e.target.value
//             }
//         });
//     };


//     const handleEntree = async (article) => {
//         const { quantiteEntree, dateEntree, commentaire } = entrees[article.codeArticle] || {};

//         const quantite = parseFloat(quantiteEntree);
//         const dateNow = new Date();
//         const dateChoisie = new Date(dateEntree);

//         // Vérifications d’intégrité
//         if (!quantiteEntree || isNaN(quantite) || quantite <= 0) {
//             alert("Veuillez saisir une quantité valide (positive).");
//             return;
//         }

//         if (!dateEntree) {
//             alert("La date d'entrée est obligatoire.");
//             return;
//         }

//         if (dateChoisie > dateNow) {
//             alert("La date d'entrée ne peut pas être dans le futur.");
//             return;
//         }

//         const confirmed = window.confirm(`Confirmer l'entrée de ${quantite} palettes pour ${article.designation} ?`);
//         if (!confirmed) return;

//         setLoading(true);

//         try {
//             await axios.post(`http://localhost:5000/entree/entrees`, {
//                 codeDepot: selectedDepot.codeDepot,
//                 codeArticle: article.codeArticle,
//                 quantiteEntree: quantite,
//                 dateEntree,
//                 commentaire
//             });

//             alert("Entrée enregistrée !");
//             setEntrees({ ...entrees, [article.codeArticle]: {} });
//         } catch (err) {
//             console.error("Erreur lors de l’entrée :", err);
//             alert("Erreur lors de l’enregistrement.");
//         }

//         setLoading(false);
//     };

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">Affecter une Entrée de Stock</h2>

//             <div className="mb-4">
//                 <label className="block mb-2">Sélectionnez un dépôt :</label>
//                 <select className="border rounded p-2" onChange={handleDepotChange} value={selectedDepot?.codeDepot || ""}>
//                     <option value="">-- Choisir un dépôt --</option>
//                     {depots.map((d) => (
//                         <option key={d.codeDepot} value={d.codeDepot}>
//                             {d.nomDepot} - {d.codeDepot}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {selectedDepot && articles.length === 0 && (
//                 <p className="text-gray-500">Aucun article trouvé pour ce dépôt.</p>
//             )}

//             {articles.length > 0 && (
//                 <div className="grid gap-4">
//                     {articles.map((article) => {
//                         const entry = entrees[article.codeArticle] || {};
//                         return (
//                             <div key={article.codeArticle} className="p-4 bg-white shadow rounded border">
//                                 <h3 className="font-semibold">{article.designation} ({article.codeArticle})</h3>
//                                 <div className="flex flex-col gap-2 mt-2">
//                                     <Input
//                                         type="number"
//                                         placeholder="Quantité à ajouter"
//                                         value={entry.quantiteEntree || ""}
//                                         onChange={(e) => handleChange(e, article.codeArticle, "quantiteEntree")}
//                                         className="w-48"
//                                     />
//                                     <Input
//                                         type="date"
//                                         value={entry.dateEntree || ""}
//                                         onChange={(e) => handleChange(e, article.codeArticle, "dateEntree")}
//                                         className="w-48"
//                                     />
//                                     <textarea
//                                         placeholder="Commentaire (optionnel)"
//                                         value={entry.commentaire || ""}
//                                         onChange={(e) => handleChange(e, article.codeArticle, "commentaire")}
//                                         className="border p-2 rounded w-full h-20"
//                                     />
//                                     <Button onClick={() => handleEntree(article)} disabled={loading}>
//                                         Enregistrer Entrée
//                                     </Button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EntreeStock;







// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import AdminLayoutDepot from "./AdminLayoutDepot";

// const EntreeStock = () => {
//     const [depots, setDepots] = useState([]);
//     const [selectedDepot, setSelectedDepot] = useState(null);
//     const [articles, setArticles] = useState([]);
//     const [entrees, setEntrees] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         fetchDepots();
//     }, []);

//     const fetchDepots = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get("http://localhost:5000/depot/mes-depots", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setDepots(res.data);
//         } catch (err) {
//             console.error("Erreur récupération dépôts :", err);
//         }
//     };


//     // const fetchArticles = async (codeDepot) => {
//     //     try {
//     //         const res = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`);
//     //         setArticles(res.data);
//     //     } catch (err) {
//     //         console.error("Erreur récupération articles :", err);
//     //     }
//     // };

//     const fetchArticles = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get("http://localhost:5000/articleDepot/mes-articles", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setArticles(res.data);
//         } catch (err) {
//             console.error("Erreur récupération des articles :", err);
//         }
//     };

//     const handleDepotChange = (e) => {
//         const depotCode = e.target.value;
//         const depot = depots.find(d => d.codeDepot === depotCode);
//         setSelectedDepot(depot);
//         setArticles([]);
//         setEntrees({});
//         if (depot) fetchArticles(depot.codeDepot);
//     };

//     const handleChange = (e, codeArticle, field) => {
//         setEntrees({
//             ...entrees,
//             [codeArticle]: {
//                 ...entrees[codeArticle],
//                 [field]: e.target.value
//             }
//         });
//     };

//     const handleEntree = async (article) => {
//         const { quantiteEntree, dateEntree, commentaire } = entrees[article.codeArticle] || {};

//         const quantite = parseFloat(quantiteEntree);
//         const dateNow = new Date();
//         const dateChoisie = new Date(dateEntree);

//         // Vérifications d'intégrité
//         if (!quantiteEntree || isNaN(quantite) || quantite <= 0) {
//             alert("Veuillez saisir une quantité valide (positive).");
//             return;
//         }

//         if (!dateEntree) {
//             alert("La date d'entrée est obligatoire.");
//             return;
//         }

//         if (dateChoisie > dateNow) {
//             alert("La date d'entrée ne peut pas être dans le futur.");
//             return;
//         }

//         const confirmed = window.confirm(`Confirmer l'entrée de ${quantite} palettes pour ${article.designation} ?`);
//         if (!confirmed) return;

//         setLoading(true);

//         try {
//             await axios.post(`http://localhost:5000/entree/entrees`, {
//                 codeDepot: selectedDepot.codeDepot,
//                 codeArticle: article.codeArticle,
//                 quantiteEntree: quantite,
//                 dateEntree,
//                 commentaire
//             });

//             alert("Entrée enregistrée !");
//             setEntrees({ ...entrees, [article.codeArticle]: {} });
//         } catch (err) {
//             console.error("Erreur lors de l'entrée :", err);
//             alert("Erreur lors de l'enregistrement.");
//         }

//         setLoading(false);
//     };

//     return (
//         <AdminLayoutDepot
//             darkMode={darkMode}
//             setDarkMode={setDarkMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//         >
//             <div className="max-w-4xl mx-auto p-4">
//                 <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Gestion des Entrées de Stock</h1>

//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">

//                     <div className="mb-6">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                             Dépôt affecté :
//                         </label>

//                         {depots.length === 1 ? (
//                             <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-white">
//                                 {depots[0].nomDepot} - {depots[0].codeDepot}
//                             </div>
//                         ) : (
//                             <select
//                                 className="border rounded p-2 w-full max-w-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                 onChange={handleDepotChange}
//                                 value={selectedDepot?.codeDepot || ""}
//                             >
//                                 <option value="">-- Choisir un dépôt --</option>
//                                 {depots.map((d) => (
//                                     <option key={d.codeDepot} value={d.codeDepot}>
//                                         {d.nomDepot} - {d.codeDepot}
//                                     </option>
//                                 ))}
//                             </select>
//                         )}
//                     </div>


//                     {selectedDepot && articles.length === 0 && (
//                         <p className="text-gray-500 dark:text-gray-400">Aucun article trouvé pour ce dépôt.</p>
//                     )}

//                     {articles.length > 0 && (
//                         <div className="space-y-4">
//                             {articles.map((article) => {
//                                 const entry = entrees[article.codeArticle] || {};
//                                 return (
//                                     <div
//                                         key={article.codeArticle}
//                                         className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600"
//                                     >
//                                         <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
//                                             {article.designation} ({article.codeArticle})
//                                         </h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                                     Quantité à ajouter
//                                                 </label>
//                                                 <Input
//                                                     type="number"
//                                                     value={entry.quantiteEntree || ""}
//                                                     onChange={(e) => handleChange(e, article.codeArticle, "quantiteEntree")}
//                                                     className="w-full"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                                     Date d'entrée
//                                                 </label>
//                                                 <Input
//                                                     type="date"
//                                                     value={entry.dateEntree || ""}
//                                                     onChange={(e) => handleChange(e, article.codeArticle, "dateEntree")}
//                                                     className="w-full"
//                                                 />
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                                     Commentaire (optionnel)
//                                                 </label>
//                                                 <textarea
//                                                     placeholder="Commentaire..."
//                                                     value={entry.commentaire || ""}
//                                                     onChange={(e) => handleChange(e, article.codeArticle, "commentaire")}
//                                                     className="border p-2 rounded w-full h-20 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                                 />
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <Button
//                                                     onClick={() => handleEntree(article)}
//                                                     disabled={loading}
//                                                     className="w-full md:w-auto"
//                                                 >
//                                                     Enregistrer Entrée
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </AdminLayoutDepot>
//     );
// };

// export default EntreeStock;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import AdminLayoutDepot from "./AdminLayoutDepot";

// const EntreeStock = () => {
//     const [depots, setDepots] = useState([]);
//     const [selectedDepot, setSelectedDepot] = useState(null);
//     const [articles, setArticles] = useState([]);
//     const [entrees, setEntrees] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [darkMode, setDarkMode] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");

//     // useEffect(() => {
//     //     fetchDepots();
//     //     fetchArticles(); // ✅ appel direct dès le début
//     // }, []);


//     useEffect(() => {
//         fetchDepots();
//     }, []);

//     useEffect(() => {
//         if (selectedDepot) {
//             fetchArticles(selectedDepot.codeDepot);
//         }
//     }, [selectedDepot]);

//     const fetchDepots = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get("http://localhost:5000/depot/mes-depots", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setDepots(res.data);

//             // Si 1 seul dépôt, on le sélectionne automatiquement
//             if (res.data.length === 1) {
//                 setSelectedDepot(res.data[0]);
//             }

//         } catch (err) {
//             console.error("Erreur récupération dépôts :", err);
//         }
//     };

//     // const fetchArticles = async () => {
//     //     try {
//     //         const token = localStorage.getItem("token");
//     //         const res = await axios.get("http://localhost:5000/articleDepot/mes-articles", {
//     //             headers: {
//     //                 Authorization: `Bearer ${token}`
//     //             }
//     //         });
//     //         setArticles(res.data);
//     //     } catch (err) {
//     //         console.error("Erreur récupération des articles :", err);
//     //     }
//     // };

//     const fetchArticles = async (codeDepot) => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             setArticles(res.data);
//         } catch (err) {
//             console.error("Erreur récupération des articles :", err);
//         }
//     };


//     const handleChange = (e, codeArticle, field) => {
//         setEntrees({
//             ...entrees,
//             [codeArticle]: {
//                 ...entrees[codeArticle],
//                 [field]: e.target.value
//             }
//         });
//     };

//     const handleEntree = async (article) => {
//         const { quantiteEntree, dateEntree, commentaire } = entrees[article.codeArticle] || {};
//         const quantite = parseFloat(quantiteEntree);
//         const dateNow = new Date();
//         const dateChoisie = new Date(dateEntree);

//         if (!quantiteEntree || isNaN(quantite) || quantite <= 0) {
//             alert("Veuillez saisir une quantité valide (positive).");
//             return;
//         }

//         if (!dateEntree) {
//             alert("La date d'entrée est obligatoire.");
//             return;
//         }

//         if (dateChoisie > dateNow) {
//             alert("La date d'entrée ne peut pas être dans le futur.");
//             return;
//         }

//         const confirmed = window.confirm(`Confirmer l'entrée de ${quantite} palettes pour ${article.designation} ?`);
//         if (!confirmed) return;

//         setLoading(true);

//         try {
//             await axios.post(`http://localhost:5000/entree/entrees`, {
//                 codeDepot: article.codeDepot, // ✅ pris depuis l'article
//                 codeArticle: article.codeArticle,
//                 quantiteEntree: quantite,
//                 dateEntree,
//                 commentaire
//             });

//             alert("Entrée enregistrée !");
//             setEntrees({ ...entrees, [article.codeArticle]: {} });
//         } catch (err) {
//             console.error("Erreur lors de l'entrée :", err);
//             alert("Erreur lors de l'enregistrement.");
//         }

//         setLoading(false);
//     };

//     return (
//         <AdminLayoutDepot
//             darkMode={darkMode}
//             setDarkMode={setDarkMode}
//             searchTerm={searchTerm}
//             setSearchTerm={setSearchTerm}
//         >
//             <div className="max-w-4xl mx-auto p-4">
//                 <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Gestion des Entrées de Stock</h1>

//                 <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">

//                     {depots.length === 1 && (
//                         <div className="mb-6">
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Dépôt affecté :
//                             </label>
//                             <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-white">
//                                 {depots[0].nomDepot} - {depots[0].codeDepot}
//                             </div>
//                         </div>
//                     )}

//                     {articles.length === 0 && (
//                         <p className="text-gray-500 dark:text-gray-400">Aucun article trouvé pour vos dépôts affectés.</p>
//                     )}

//                     {articles.length > 0 && (
//                         <div className="space-y-4">
//                             {articles.map((article) => {
//                                 const entry = entrees[article.codeArticle] || {};
//                                 return (
//                                     <div
//                                         key={article.codeArticle}
//                                         className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600"
//                                     >
//                                         <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
//                                             {article.designation} ({article.codeArticle}) — Dépôt: {article.codeDepot}
//                                         </h3>
//                                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                                     Quantité à ajouter
//                                                 </label>
//                                                 <Input
//                                                     type="number"
//                                                     value={entry.quantiteEntree || ""}
//                                                     onChange={(e) => handleChange(e, article.codeArticle, "quantiteEntree")}
//                                                     className="w-full"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                                     Date d'entrée
//                                                 </label>
//                                                 <Input
//                                                     type="date"
//                                                     value={entry.dateEntree || ""}
//                                                     onChange={(e) => handleChange(e, article.codeArticle, "dateEntree")}
//                                                     className="w-full"
//                                                 />
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                                     Commentaire (optionnel)
//                                                 </label>
//                                                 <textarea
//                                                     placeholder="Commentaire..."
//                                                     value={entry.commentaire || ""}
//                                                     onChange={(e) => handleChange(e, article.codeArticle, "commentaire")}
//                                                     className="border p-2 rounded w-full h-20 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                                 />
//                                             </div>
//                                             <div className="md:col-span-2">
//                                                 <Button
//                                                     onClick={() => handleEntree(article)}
//                                                     disabled={loading}
//                                                     className="w-full md:w-auto"
//                                                 >
//                                                     Enregistrer Entrée
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </AdminLayoutDepot>
//     );
// };

// export default EntreeStock;









import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import AdminLayoutDepot from "./AdminLayoutDepot";
import Select from "react-select";


const EntreeStock = () => {
    const [depots, setDepots] = useState([]);
    const [selectedDepot, setSelectedDepot] = useState(null);
    const [articles, setArticles] = useState([]);
    const [entrees, setEntrees] = useState({});
    const [dateEntree, setDateEntree] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    
const [selectedArticle, setSelectedArticle] = useState(null);


    // Pour la barre de recherche
    const [searchQuery, setSearchQuery] = useState("");

    // Pour les articles sélectionnés
    const [selectedArticles, setSelectedArticles] = useState([]);

    // Pour filtrer les articles selon la recherche
    const filteredArticles = articles.filter((article) =>
        article.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.codeArticle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Quand l'utilisateur clique sur un article
    const handleSelectArticle = (article) => {
        const exists = selectedArticles.find(a => a.codeArticle === article.codeArticle);
        if (!exists) {
            setSelectedArticles([...selectedArticles, { ...article, quantiteEntree: "", commentaire: "" }]);
        }
    };

    

    useEffect(() => {
        fetchDepots();
    }, []);

    useEffect(() => {
        if (selectedDepot) {
            fetchArticles(selectedDepot.codeDepot);
        }
    }, [selectedDepot]);

    const fetchDepots = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/depot/mes-depots", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDepots(res.data);
            if (res.data.length === 1) {
                setSelectedDepot(res.data[0]);
            }
        } catch (err) {
            console.error("Erreur récupération dépôts :", err);
        }
    };

    const fetchArticles = async (codeDepot) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticles(res.data);
        } catch (err) {
            console.error("Erreur récupération des articles :", err);
        }
    };

    const handleChange = (e, codeArticle, field) => {
        setEntrees({
            ...entrees,
            [codeArticle]: {
                ...entrees[codeArticle],
                [field]: e.target.value
            }
        });
    };

    // const handleSaveEntree = async () => {
    //     const dateNow = new Date();
    //     const dateChoisie = new Date(dateEntree);

    //     if (!dateEntree) {
    //         alert("La date d'entrée est obligatoire.");
    //         return;
    //     }

    //     if (dateChoisie > dateNow) {
    //         alert("La date d'entrée ne peut pas être dans le futur.");
    //         return;
    //     }

    //     const articlesPayload = Object.entries(entrees)
    //         .filter(([_, entry]) => parseFloat(entry.quantiteEntree) > 0)
    //         .map(([codeArticle, entry]) => ({
    //             codeArticle,
    //             quantiteEntree: parseFloat(entry.quantiteEntree),
    //             commentaire: entry.commentaire || ""
    //         }));

    //     if (articlesPayload.length === 0) {
    //         alert("Aucune entrée valide à enregistrer.");
    //         return;
    //     }

    //     const confirmed = window.confirm("Confirmer l'enregistrement de l'entrée pour plusieurs articles ?");
    //     if (!confirmed) return;

    //     setLoading(true);

    //     try {
    //         await axios.post("http://localhost:5000/entree/entrees", {
    //             codeDepot: selectedDepot.codeDepot,
    //             dateEntree,
    //             articles: articlesPayload
    //         });

    //         alert("Entrée enregistrée avec succès !");
    //         setEntrees({});
    //         setDateEntree("");
    //     } catch (err) {
    //         console.error("Erreur lors de l'entrée :", err);
    //         alert("Erreur lors de l'enregistrement.");
    //     }

    //     setLoading(false);
    // };


    const handleSaveEntree = async () => {
        const dateNow = new Date();
        const dateChoisie = new Date(dateEntree);

        if (!dateEntree) {
            alert("La date d'entrée est obligatoire.");
            return;
        }

        if (dateChoisie > dateNow) {
            alert("La date d'entrée ne peut pas être dans le futur.");
            return;
        }

        // Construction des articles à envoyer
        const articlesPayload = Object.entries(entrees)
            .filter(([_, entry]) => parseFloat(entry.quantiteEntree) > 0)
            .map(([codeArticle, entry]) => ({
                codeArticle,
                quantiteEntree: parseFloat(entry.quantiteEntree),
                commentaire: entry.commentaire?.trim() || ""
            }));

        if (articlesPayload.length === 0) {
            alert("Aucune entrée valide à enregistrer.");
            return;
        }

        const confirmed = window.confirm("Confirmer l'enregistrement de l'entrée pour les articles sélectionnés ?");
        if (!confirmed) return;

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/entree/entrees", {
                codeDepot: selectedDepot.codeDepot,
                dateEntree,
                articles: articlesPayload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            alert("✅ Entrée enregistrée avec succès !");
            setEntrees({});
            setDateEntree("");
        } catch (err) {
            console.error("❌ Erreur lors de l'enregistrement :", err);
            const msg = err.response?.data?.message || "Erreur lors de l'enregistrement.";
            alert(`Erreur : ${msg}`);
        }

        setLoading(false);
    };

        return (
            <AdminLayoutDepot
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            >
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Gestion des Entrées de Stock</h1>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                        {depots.length === 1 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Dépôt affecté :
                                </label>
                                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-white">
                                    {depots[0].nomDepot} - {depots[0].codeDepot}
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Date d'entrée (commune à tous les articles)
                            </label>
                            <Input
                                type="date"
                                value={dateEntree}
                                onChange={(e) => setDateEntree(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        {articles.length === 0 && (
                            <p className="text-gray-500 dark:text-gray-400">Aucun article trouvé pour vos dépôts affectés.</p>
                        )}

                        {articles.length > 0 && (
                            <div className="space-y-4">
                                {articles.map((article) => {
                                    const entry = entrees[article.codeArticle] || {};
                                    return (
                                        <div
                                            key={article.codeArticle}
                                            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600"
                                        >
                                            <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                                                {article.designation} ({article.codeArticle}) — Dépôt: {article.codeDepot}
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Quantité à ajouter
                                                    </label>
                                                    <Input
                                                        type="number"
                                                        value={entry.quantiteEntree || ""}
                                                        onChange={(e) => handleChange(e, article.codeArticle, "quantiteEntree")}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Commentaire (optionnel)
                                                    </label>
                                                    <textarea
                                                        placeholder="Commentaire..."
                                                        value={entry.commentaire || ""}
                                                        onChange={(e) => handleChange(e, article.codeArticle, "commentaire")}
                                                        className="border p-2 rounded w-full h-20 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className="text-right">
                                    <Button
                                        onClick={handleSaveEntree}
                                        disabled={loading}
                                        className="mt-4"
                                    >
                                        Enregistrer l'entrée globale
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayoutDepot>
        );
    };

 
// return (
//     <AdminLayoutDepot
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//     >
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
//                 Gestion des Entrées de Stock
//             </h1>

//             <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
//                 {depots.length === 1 && (
//                     <div className="mb-6">
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                             Dépôt affecté :
//                         </label>
//                         <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-gray-800 dark:text-white">
//                             {depots[0].nomDepot} - {depots[0].codeDepot}
//                         </div>
//                     </div>
//                 )}

//                 <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         Date d'entrée (commune à tous les articles)
//                     </label>
//                     <Input
//                         type="date"
//                         value={dateEntree}
//                         onChange={(e) => setDateEntree(e.target.value)}
//                         className="w-full"
//                     />
//                 </div>

//                 <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                         🔍 Rechercher un article
//                     </label>
//                     <Select
//                         options={articles.map((article) => ({
//                             value: article.codeArticle,
//                             label: `${article.designation} (${article.codeArticle})`,
//                             article,
//                         }))}
//                         placeholder="Sélectionner un article..."
//                         onChange={(selectedOption) => {
//                             if (!selectedOption) return;
//                             const article = selectedOption.article;
//                             if (!selectedArticles.some((a) => a.codeArticle === article.codeArticle)) {
//                                 setSelectedArticles((prev) => [
//                                     ...prev,
//                                     {
//                                         ...article,
//                                         quantiteEntree: '',
//                                         commentaire: '',
//                                     },
//                                 ]);
//                             }
//                         }}
//                         isClearable
//                         className="text-black"
//                     />
//                 </div>

//                 {selectedArticles.length > 0 && (
//                     <div className="space-y-4">
//                         {selectedArticles.map((article, index) => (
//                             <div
//                                 key={article.codeArticle}
//                                 className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600"
//                             >
//                                 <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
//                                     {article.designation} ({article.codeArticle}) — Dépôt: {article.codeDepot}
//                                 </h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                             Quantité à ajouter
//                                         </label>
//                                         <Input
//                                             type="number"
//                                             value={article.quantiteEntree}
//                                             onChange={(e) => {
//                                                 const updated = [...selectedArticles];
//                                                 updated[index].quantiteEntree = e.target.value;
//                                                 setSelectedArticles(updated);
//                                             }}
//                                             className="w-full"
//                                         />
//                                     </div>
//                                     <div className="md:col-span-2">
//                                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                             Commentaire (optionnel)
//                                         </label>
//                                         <textarea
//                                             placeholder="Commentaire..."
//                                             value={article.commentaire}
//                                             onChange={(e) => {
//                                                 const updated = [...selectedArticles];
//                                                 updated[index].commentaire = e.target.value;
//                                                 setSelectedArticles(updated);
//                                             }}
//                                             className="border p-2 rounded w-full h-20 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}

//                         <div className="text-right">
//                             <Button
//                                 onClick={handleSaveEntree}
//                                 disabled={loading}
//                                 className="mt-4"
//                             >
//                                 Enregistrer l'entrée globale
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     </AdminLayoutDepot>
// );

// };

export default EntreeStock;
