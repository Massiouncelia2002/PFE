// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";


// const StockEditor = () => {
//   const [depots, setDepots] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDepots();
//   }, []);

// //   const fetchDepots = async () => {
// //     try {
// //       const response = await axios.get("http://localhost:5000/depot/");
// //       setDepots(response.data);
// //     } catch (error) {
// //       console.error('Erreur lors de la récupération des dépôts :', error);
// //     }
// //   };

// const fetchDepots = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/depot/");
//     const depotsAvecArticles = response.data.map(d => ({
//       ...d,
//       Articles: d.Articles || [], // sécurité
//     }));
//     setDepots(depotsAvecArticles);
//   } catch (error) {
//     console.error('Erreur lors de la récupération des dépôts :', error);
//   }
// };

//   const handleChange = (e, codeArticle, field) => {
//     const value = e.target.value;
//     setDepots((prevDepots) =>
//       prevDepots.map((depot) =>
//         depot.codeDepot === selectedDepot.codeDepot
//           ? {
//               ...depot,
//               Articles: depot.Articles.map((article) =>
//                 article.codeArticle === codeArticle
//                   ? {
//                       ...article,
//                       ArticleDepot: {
//                         ...article.ArticleDepot,
//                         [field]: value,
//                       },
//                     }
//                   : article
//               ),
//             }
//           : depot
//       )
//     );
//   };

//   const handleUpdate = async (codeDepot, codeArticle, stockMax, stockAlert) => {
//     setLoading(true);
//     try {
//       await axios.put(`/api/stock/${codeArticle}/${codeDepot}`, {
//         stockMax,
//         stockAlert,
//       });
//       alert('Stock mis à jour avec succès');
//     } catch (error) {
//       console.error("Erreur mise à jour stock :", error);
//       alert('Échec de la mise à jour du stock');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Modification des Stocks - Admin Dépôt</h2>

//       <div className="mb-4">
//         <label className="block mb-2">Sélectionner un dépôt :</label>
//         <select
//           className="border rounded p-2"
//           onChange={(e) =>
//             setSelectedDepot(
//               depots.find((d) => d.codeDepot === e.target.value)
//             )
//           }
//         >
//           <option value="">-- Choisir un dépôt --</option>
//           {depots.map((depot) => (
//             <option key={depot.codeDepot} value={depot.codeDepot}>
//               {depot.nomDepot}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedDepot && (
//         <div className="grid gap-4">
//           {selectedDepot && selectedDepot.Articles && selectedDepot.Articles.map((article) => (

//             <div key={article.codeArticle} className="shadow p-4">
//               <div>
//                 <h3 className="font-semibold text-lg">{article.nomArticle}</h3>
//                 <div className="mt-2 flex gap-2 items-center">
//                   <label>Stock Max :</label>
//                   <Input
//                     type="number"
//                     value={article.ArticleDepot.stockMax}
//                     onChange={(e) =>
//                       handleChange(e, article.codeArticle, 'stockMax')
//                     }
//                     className="w-24"
//                   />

//                   <label>Stock Alerte :</label>
//                   <Input
//                     type="number"
//                     value={article.ArticleDepot.stockAlert}
//                     onChange={(e) =>
//                       handleChange(e, article.codeArticle, 'stockAlert')
//                     }
//                     className="w-24"
//                   />

//                   <Button
//                     onClick={() =>
//                       handleUpdate(
//                         selectedDepot.codeDepot,
//                         article.codeArticle,
//                         article.ArticleDepot.stockMax,
//                         article.ArticleDepot.stockAlert
//                       )
//                     }
//                     disabled={loading}
//                   >
//                     Mettre à jour
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockEditor;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const StockEditor = () => {
//   const [depots, setDepots] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [selectedArticleCode, setSelectedArticleCode] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDepots();
//   }, []);

//   const fetchDepots = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/depot/");
//       const depotsAvecArticles = response.data.map(d => ({
//         ...d,
//         Articles: d.Articles || [],
//       }));
//       setDepots(depotsAvecArticles);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des dépôts :', error);
//     }
//   };

//   const handleChange = (e, codeArticle, field) => {
//     const value = e.target.value;
//     setDepots((prevDepots) =>
//       prevDepots.map((depot) =>
//         depot.codeDepot === selectedDepot.codeDepot
//           ? {
//               ...depot,
//               Articles: depot.Articles.map((article) =>
//                 article.codeArticle === codeArticle
//                   ? {
//                       ...article,
//                       ArticleDepot: {
//                         ...article.ArticleDepot,
//                         [field]: value,
//                       },
//                     }
//                   : article
//               ),
//             }
//           : depot
//       )
//     );
//   };

//   const handleUpdate = async (codeDepot, codeArticle, stockMax, stockAlert) => {
//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/articleDepot/article-depot/${codeDepot}/articles/${codeArticle}`, {
//         stockMax,
//         stockAlert,
//       });
//       alert('Stock mis à jour avec succès');
//     } catch (error) {
//       console.error("Erreur mise à jour stock :", error);
//       alert('Échec de la mise à jour du stock');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Modification des Stocks - Admin Dépôt</h2>

//       <div className="mb-4">
//         <label className="block mb-2">Sélectionner un dépôt :</label>
//         <select
//           className="border rounded p-2"
//           onChange={(e) => {
//             const depot = depots.find((d) => d.codeDepot === e.target.value);
//             setSelectedDepot(depot);
//             setSelectedArticleCode(null); // reset article sélectionné
//           }}
//         >
//           <option value="">-- Choisir un dépôt --</option>
//           {depots.map((depot) => (
//             <option key={depot.codeDepot} value={depot.codeDepot}>
//               {depot.nomDepot}
//             </option>
//           ))}
//         </select>
//       </div>

//       {selectedDepot && (
//         <div className="grid gap-4">
//           {selectedDepot.Articles.map((article) => (
//             <div key={article.codeArticle} className="shadow p-4 border">
//               <h3
//                 className="font-semibold text-lg cursor-pointer text-blue-700"
//                 onClick={() =>
//                   setSelectedArticleCode((prev) =>
//                     prev === article.codeArticle ? null : article.codeArticle
//                   )
//                 }
//               >
//                 {article.nomArticle}
//               </h3>

//               {selectedArticleCode === article.codeArticle && (
//                 <div className="mt-2 flex flex-wrap gap-4 items-center">
//                   <div>
//                     <label>Stock Max :</label>
//                     <Input
//                       type="number"
//                       value={article.ArticleDepot.stockMax}
//                       onChange={(e) =>
//                         handleChange(e, article.codeArticle, 'stockMax')
//                       }
//                       className="w-24"
//                     />
//                   </div>

//                   <div>
//                     <label>Stock Alerte :</label>
//                     <Input
//                       type="number"
//                       value={article.ArticleDepot.stockAlert}
//                       onChange={(e) =>
//                         handleChange(e, article.codeArticle, 'stockAlert')
//                       }
//                       className="w-24"
//                     />
//                   </div>

//                   <Button
//                     onClick={() =>
//                       handleUpdate(
//                         selectedDepot.codeDepot,
//                         article.codeArticle,
//                         article.ArticleDepot.stockMax,
//                         article.ArticleDepot.stockAlert
//                       )
//                     }
//                     disabled={loading}
//                   >
//                     Mettre à jour
//                   </Button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockEditor;















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const StockEditor = () => {
//   const [depots, setDepots] = useState([]);
//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [articles, setArticles] = useState([]);
//   const [selectedArticleCode, setSelectedArticleCode] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDepots();
//   }, []);

//   const fetchDepots = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/depot/");
//       setDepots(response.data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des dépôts :', error);
//     }
//   };

//   const fetchArticlesByDepot = async (codeDepot) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`);
//       setArticles(response.data);
//     } catch (error) {
//       console.error('Erreur lors de la récupération des articles :', error);
//     }
//   };

//   const handleDepotSelect = (e) => {
//     const depot = depots.find((d) => d.codeDepot === e.target.value);
//     setSelectedDepot(depot);
//     setSelectedArticleCode(null);
//     setArticles([]);
//     if (depot) fetchArticlesByDepot(depot.codeDepot);
//   };

//   const handleChange = (e, codeArticle, field) => {
//     const value = e.target.value;
//     setArticles((prevArticles) =>
//       prevArticles.map((article) =>
//         article.codeArticle === codeArticle
//           ? {
//               ...article,
//               ArticleDepot: {
//                 ...article.ArticleDepot,
//                 [field]: value,
//               },
//             }
//           : article
//       )
//     );
//   };

//   const handleUpdate = async (codeDepot, codeArticle, stockMax, stockAlert) => {
//     setLoading(true);
//     try {
//       await axios.put(`http://localhost:5000/articleDepot/article-depot/${codeDepot}/articles/${codeArticle}`, {
//         stockMax,
//         stockAlert,
//       });
//       alert('Stock mis à jour avec succès');
//     } catch (error) {
//       console.error("Erreur mise à jour stock :", error);
//       alert('Échec de la mise à jour du stock');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Modification des Stocks - Admin Dépôt</h2>

//       <div className="mb-4">
//         <label className="block mb-2">Sélectionner un dépôt :</label>
//         <select
//           className="border rounded p-2"
//           onChange={handleDepotSelect}
//           value={selectedDepot?.codeDepot || ''}
//         >
//           <option value="">-- Choisir un dépôt --</option>
//           {depots.map((depot) => (
//             <option key={depot.codeDepot} value={depot.codeDepot}>
//               {depot.nomDepot}
//             </option>
//           ))}
//         </select>
//       </div>

//       {articles.length > 0 && (
//         <div className="grid gap-4">
//           {articles.map((article) => (
//             <div key={article.codeArticle} className="shadow p-4 border">
//               <h3
//                 className="font-semibold text-lg cursor-pointer text-blue-700"
//                 onClick={() =>
//                   setSelectedArticleCode((prev) =>
//                     prev === article.codeArticle ? null : article.codeArticle
//                   )
//                 }
//               >
//                 {article.nomArticle}
//               </h3>

//               {selectedArticleCode === article.codeArticle && (
//                 <div className="mt-2 flex flex-wrap gap-4 items-center bg-gray-100 p-4 rounded">
//                   <div>
//                     <label>Stock Max :</label>
//                     <Input
//                       type="number"
//                       value={article.ArticleDepot?.stockMax || ''}
//                       onChange={(e) =>
//                         handleChange(e, article.codeArticle, 'stockMax')
//                       }
//                       className="w-24"
//                     />
//                   </div>

//                   <div>
//                     <label>Stock Alerte :</label>
//                     <Input
//                       type="number"
//                       value={article.ArticleDepot?.stockAlert || ''}
//                       onChange={(e) =>
//                         handleChange(e, article.codeArticle, 'stockAlert')
//                       }
//                       className="w-24"
//                     />
//                   </div>

//                   <Button
//                     onClick={() =>
//                       handleUpdate(
//                         selectedDepot.codeDepot,
//                         article.codeArticle,
//                         article.ArticleDepot.stockMax,
//                         article.ArticleDepot.stockAlert
//                       )
//                     }
//                     disabled={loading}
//                   >
//                     Mettre à jour
//                   </Button>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockEditor;










import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";

const StockEditor = () => {
    const [depots, setDepots] = useState([]);
    const [selectedDepot, setSelectedDepot] = useState(null);
    const [articles, setArticles] = useState([]);
    const [selectedArticleCode, setSelectedArticleCode] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDepots();
    }, []);

    const fetchDepots = async () => {
        try {
            const response = await axios.get("http://localhost:5000/depot/");
            setDepots(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des dépôts :', error);
        }
    };

    const fetchArticlesByDepot = async (codeDepot) => {
        try {
            const response = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`);
            console.log("Articles reçus :", response.data);
            const articlesWithFallback = response.data.map(article => ({
                ...article,
                ArticleDepot: article.ArticleDepot || { stockMax: '', stockAlert: '' }
            }));
            setArticles(articlesWithFallback);
        } catch (error) {
            console.error('Erreur lors de la récupération des articles :', error);
        }
    };

    const handleDepotSelect = (e) => {
        const depot = depots.find((d) => d.codeDepot === e.target.value);
        setSelectedDepot(depot);
        setSelectedArticleCode(null);
        setArticles([]);
        if (depot) fetchArticlesByDepot(depot.codeDepot);
    };

    const handleChange = (e, codeArticle, field) => {
        const value = e.target.value;
        setArticles((prevArticles) =>
            prevArticles.map((article) =>
                article.codeArticle === codeArticle
                    ? {
                        ...article,
                        ArticleDepot: {
                            ...article.ArticleDepot,
                            [field]: value,
                        },
                    }
                    : article
            )
        );
    };



    const handleUpdate = async (codeDepot, codeArticle, stockMax, stockAlert, quantiteStockee) => {
        setLoading(true);

        // Convertir en nombres décimaux (float)
        const stockMaxNum = parseFloat(stockMax);
        const stockAlertNum = parseFloat(stockAlert);
        const quantiteStockeeNum = parseFloat(quantiteStockee);


        // Validation champs non vides
        if (
            stockMax === '' || stockAlert === '' || quantiteStockee === '' ||
            isNaN(stockMaxNum) || isNaN(stockAlertNum) || isNaN(quantiteStockeeNum)
        ) {
            alert("Tous les champs doivent être remplis avec des nombres valides (0 accepté).");
            setLoading(false);
            return;
        }

        // Validation quantités ≥ 0
        if (stockMaxNum < 0 || stockAlertNum < 0 || quantiteStockeeNum < 0) {
            alert("Les quantités ne doivent pas être négatives.");
            setLoading(false);
            return;
        }

        // Validation stockAlert ≤ stockMax
        if (stockAlertNum > stockMaxNum) {
            alert("Le Stock Alerte ne peut pas être supérieur au Stock Max.");
            setLoading(false);
            return;
        }

        try {

            const confirmed = window.confirm("Confirmez-vous la mise à jour du stock ?");

            if (!confirmed) {
                setLoading(false);
                return;
            }
            await axios.put(`http://localhost:5000/articleDepot/article-depot/${codeDepot}/articles/${codeArticle}`, {
                stockMax: stockMaxNum,
                stockAlert: stockAlertNum,
                quantiteStockee: quantiteStockeeNum,
            });
            alert('Stock mis à jour avec succès');
        } catch (error) {
            console.error("Erreur mise à jour stock :", error);
            alert('Échec de la mise à jour du stock');
        }

        setLoading(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Modification des Stocks - Admin Dépôt</h2>

            <div className="mb-4">
                <label className="block mb-2">Sélectionner un dépôt :</label>
                <select
                    className="border rounded p-2"
                    onChange={handleDepotSelect}
                    value={selectedDepot?.codeDepot || ''}
                >
                    <option value="">-- Choisir un dépôt --</option>
                    {depots.map((depot) => (
                        <option key={depot.codeDepot} value={depot.codeDepot}>
                            {depot.nomDepot}-{depot.codeDepot}
                        </option>
                    ))}
                </select>
            </div>

            {selectedDepot && articles.length === 0 && (
                <p className="text-gray-500 italic">Aucun article trouvé pour ce dépôt.</p>
            )}

            {articles.length > 0 && (
                <div className="grid gap-4">
                    {articles.map((article) => (
                        <div key={article.codeArticle} className="shadow p-4 border rounded bg-white">
                            <h3
                                className="font-semibold text-lg cursor-pointer text-blue-700"
                                onClick={() =>
                                    setSelectedArticleCode((prev) =>
                                        prev === article.codeArticle ? null : article.codeArticle
                                    )
                                }
                            >
                                {article.codeArticle} - {article.designation}
                            </h3>

                            {selectedArticleCode === article.codeArticle && (
                                <div className="mt-2 flex flex-wrap gap-4 items-center bg-gray-100 p-4 rounded">
                                    <div>
                                        <label>Stock Max :</label>
                                        <Input
                                            type="number"
                                            value={article.ArticleDepot?.stockMax ?? ''}
                                            onChange={(e) =>
                                                handleChange(e, article.codeArticle, 'stockMax')
                                            }
                                            className="w-24"
                                        />
                                    </div>

                                    <div>
                                        <label>Stock Alerte :</label>
                                        <Input
                                            type="number"
                                            value={article.ArticleDepot?.stockAlert ?? ''}
                                            onChange={(e) =>
                                                handleChange(e, article.codeArticle, 'stockAlert')
                                            }
                                            className="w-24"
                                        />
                                    </div>

                                    <div>
                                        <label>Quantité Stockée :</label>
                                        <Input
                                            type="number"
                                            value={article.ArticleDepot?.quantiteStockee ?? ''}
                                            onChange={(e) =>
                                                handleChange(e, article.codeArticle, 'quantiteStockee')
                                            }
                                            className="w-24"
                                        />
                                    </div>
                                    <Button
                                        onClick={() =>
                                            handleUpdate(
                                                selectedDepot.codeDepot,
                                                article.codeArticle,
                                                article.ArticleDepot.stockMax,
                                                article.ArticleDepot.stockAlert,
                                                article.ArticleDepot.quantiteStockee // ✅ ici aussi
                                            )
                                        }
                                        disabled={loading}
                                    >
                                        Mettre à jour
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StockEditor;
