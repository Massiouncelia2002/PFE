// import React, { useState } from 'react';

// const AffectationForm = () => {
//   const [formData, setFormData] = useState({
//     codeArticle: '',
//     codeDepot: '',
//     quantiteStockee: 0,
//     stockMax: 0,
//     stockAlert: 0
//   });

//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/depot/affecter-article", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage({ type: 'success', text: data.message });
//       } else {
//         setMessage({ type: 'error', text: data.message });
//       }
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Erreur lors de l’envoi.' });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-6 p-4 border rounded-xl shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Affecter un article à un dépôt</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="codeArticle"
//           placeholder="Code Article"
//           value={formData.codeArticle}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="codeDepot"
//           placeholder="Code Dépôt"
//           value={formData.codeDepot}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         {/* <input
//           type="number"
//           name="quantiteStockee"
//           placeholder="Quantité Stockée"
//           value={formData.quantiteStockee}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="stockMax"
//           placeholder="Stock Max"
//           value={formData.stockMax}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="number"
//           name="stockAlert"
//           placeholder="Stock Alerte"
//           value={formData.stockAlert}
//           onChange={handleChange}
//           required
//           className="w-full border p-2 rounded"
//         /> */}

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Affecter
//         </button>

//         {message && (
//           <div
//             className={`mt-3 p-2 rounded text-white ${
//               message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AffectationForm;











// import React, { useState, useEffect } from "react";

// const AffectationForm = () => {
//   const [formData, setFormData] = useState({
//     codeArticle: "",
//     codeDepot: "",
//     quantiteStockee: 0,
//     stockMax: 0,
//     stockAlert: 0,
//   });

//   const [message, setMessage] = useState("");

//   const [depots, setDepots] = useState([]);
//   const [articles, setArticles] = useState([]);

//   const [showDepotList, setShowDepotList] = useState(false);
//   const [showArticleList, setShowArticleList] = useState(false);

//   // Récupération des dépôts via fetch
//   useEffect(() => {
//     fetch("http://localhost:5000/depot/") // adapte l'URL si besoin
//       .then((res) => res.json())
//       .then((data) => {
//         setDepots(data);
//       })
//       .catch(() => {
//         setMessage({ type: "error", text: "Erreur chargement dépôts." });
//       });
//   }, []);

//   // Récupération des articles via fetch
//   useEffect(() => {
//     fetch("http://localhost:5000/api/articles/") // adapte l'URL si besoin
//       .then((res) => res.json())
//       .then((data) => {
//         setArticles(data);
//       })
//       .catch(() => {
//         setMessage({ type: "error", text: "Erreur chargement articles." });
//       });
//   }, []);

//   // Sélection dépôt (un seul à la fois)
//   const handleDepotSelect = (codeDepot) => {
//     setFormData((prev) => ({ ...prev, codeDepot }));
//     setShowDepotList(false);
//   };

//   // Sélection article (un seul à la fois)
//   const handleArticleSelect = (codeArticle) => {
//     setFormData((prev) => ({ ...prev, codeArticle }));
//     setShowArticleList(false);
//   };

//   // Sélectionner tout : ici on prend le premier de la liste par exemple
//   // car le form attend un seul code. Tu peux adapter si tu veux multi-selection.
//   const selectAllDepots = () => {
//     if (depots.length > 0) {
//       setFormData((prev) => ({ ...prev, codeDepot: depots[0].codeDepot }));
//     }
//   };

//   const selectAllArticles = () => {
//     if (articles.length > 0) {
//       setFormData((prev) => ({ ...prev, codeArticle: articles[0].codeArticle }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/depot/affecter-article", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage({ type: "success", text: data.message });
//       } else {
//         setMessage({ type: "error", text: data.message });
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: "Erreur lors de l’envoi." });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-6 p-4 border rounded-xl shadow-lg">
//       <h2 className="text-xl font-semibold mb-4">Affecter un article à un dépôt</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Choisir dépôt */}
//         <div>
//           <button
//             type="button"
//             onClick={() => setShowDepotList((prev) => !prev)}
//             className="w-full border p-2 rounded text-left"
//           >
//             {formData.codeDepot
//               ? `Dépôt sélectionné: ${formData.codeDepot}`
//               : "Choisir un dépôt"}
//           </button>
//           {showDepotList && (
//             <div className="border p-2 mt-2 max-h-40 overflow-auto rounded bg-gray-50">
//               <button
//                 type="button"
//                 className="mb-2 text-sm text-blue-600 underline"
//                 onClick={selectAllDepots}
//               >
//                 Sélectionner tout
//               </button>
//               {depots.map((depot) => (
//                 <div key={depot.codeDepot} className="flex items-center mb-1">
//                   <button
//                     type="button"
//                     className={`mr-2 w-5 h-5 border rounded ${
//                       formData.codeDepot === depot.codeDepot
//                         ? "bg-blue-600"
//                         : "bg-white"
//                     }`}
//                     onClick={() => handleDepotSelect(depot.codeDepot)}
//                   />
//                   <span>{depot.nom} ({depot.codeDepot})</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Choisir article */}
//         <div>
//           <button
//             type="button"
//             onClick={() => setShowArticleList((prev) => !prev)}
//             className="w-full border p-2 rounded text-left"
//           >
//             {formData.codeArticle
//               ? `Article sélectionné: ${formData.codeArticle}`
//               : "Choisir un article"}
//           </button>
//           {showArticleList && (
//             <div className="border p-2 mt-2 max-h-40 overflow-auto rounded bg-gray-50">
//               <button
//                 type="button"
//                 className="mb-2 text-sm text-blue-600 underline"
//                 onClick={selectAllArticles}
//               >
//                 Sélectionner tout
//               </button>
//               {articles.map((article) => (
//                 <div key={article.codeArticle} className="flex items-center mb-1">
//                   <button
//                     type="button"
//                     className={`mr-2 w-5 h-5 border rounded ${
//                       formData.codeArticle === article.codeArticle
//                         ? "bg-blue-600"
//                         : "bg-white"
//                     }`}
//                     onClick={() => handleArticleSelect(article.codeArticle)}
//                   />
//                   <span>{article.nom} ({article.codeArticle})</span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>


//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Affecter
//         </button>

//         {message && (
//           <div
//             className={`mt-3 p-2 rounded text-white ${
//               message.type === "success" ? "bg-green-500" : "bg-red-500"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default AffectationForm;









// import React, { useState, useEffect } from "react";

// const AffectationForm = () => {
//   const [formData, setFormData] = useState({
//     codeArticle: "",
//     codeDepot: "",
//     quantiteStockee: 0,
//     stockMax: 0,
//     stockAlert: 0,
//   });

//   const [message, setMessage] = useState("");

//   const [depots, setDepots] = useState([]);
//   const [articles, setArticles] = useState([]);

//   const [showDepotModal, setShowDepotModal] = useState(false);
//   const [showArticleModal, setShowArticleModal] = useState(false);

//   // Récupération des dépôts
//   useEffect(() => {
//     fetch("http://localhost:5000/depot/liste")
//       .then((res) => res.json())
//       .then(setDepots)
//       .catch(() =>
//         setMessage({ type: "error", text: "Erreur chargement dépôts." })
//       );
//   }, []);

//   // Récupération des articles
//   useEffect(() => {
//     fetch("http://localhost:5000/article/liste")
//       .then((res) => res.json())
//       .then(setArticles)
//       .catch(() =>
//         setMessage({ type: "error", text: "Erreur chargement articles." })
//       );
//   }, []);

//   const handleDepotSelect = (codeDepot) => {
//     setFormData((prev) => ({ ...prev, codeDepot }));
//     setShowDepotModal(false);
//   };

//   const handleArticleSelect = (codeArticle) => {
//     setFormData((prev) => ({ ...prev, codeArticle }));
//     setShowArticleModal(false);
//   };

//   const selectAllDepots = () => {
//     if (depots.length > 0) {
//       setFormData((prev) => ({ ...prev, codeDepot: depots[0].codeDepot }));
//     }
//   };

//   const selectAllArticles = () => {
//     if (articles.length > 0) {
//       setFormData((prev) => ({ ...prev, codeArticle: articles[0].codeArticle }));
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/depot/affecter-article", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage({ type: "success", text: data.message });
//       } else {
//         setMessage({ type: "error", text: data.message });
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: "Erreur lors de l’envoi." });
//     }
//   };

//   // Modale générique
//   const Modal = ({ title, children, onClose }) => (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white rounded-lg max-w-md w-full p-4 shadow-lg max-h-[80vh] overflow-auto">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="text-lg font-semibold">{title}</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-700 font-bold text-xl leading-none"
//           >
//             &times;
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );

//   return (
//     <div className="max-w-md mx-auto mt-6 p-4 border rounded-xl shadow-lg relative">
//       <h2 className="text-xl font-semibold mb-4">Affecter un article à un dépôt</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <button
//             type="button"
//             onClick={() => setShowDepotModal(true)}
//             className="w-full border p-2 rounded text-left"
//           >
//             {formData.codeDepot
//               ? `Dépôt sélectionné: ${formData.codeDepot}`
//               : "Choisir un dépôt"}
//           </button>
//         </div>

//         <div>
//           <button
//             type="button"
//             onClick={() => setShowArticleModal(true)}
//             className="w-full border p-2 rounded text-left"
//           >
//             {formData.codeArticle
//               ? `Article sélectionné: ${formData.codeArticle}`
//               : "Choisir un article"}
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Affecter
//         </button>

//         {message && (
//           <div
//             className={`mt-3 p-2 rounded text-white ${
//               message.type === "success" ? "bg-green-500" : "bg-red-500"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//       </form>

//       {/* Modale Dépôts */}
//       {showDepotModal && (
//         <Modal title="Liste des dépôts" onClose={() => setShowDepotModal(false)}>
//           <button
//             type="button"
//             className="mb-3 text-sm text-blue-600 underline"
//             onClick={selectAllDepots}
//           >
//             Sélectionner tout
//           </button>
//           {depots.length === 0 && <p>Aucun dépôt disponible.</p>}
//           {depots.map((depot) => (
//             <div key={depot.codeDepot} className="flex items-center mb-2 cursor-pointer">
//               <button
//                 type="button"
//                 className={`mr-2 w-5 h-5 border rounded ${
//                   formData.codeDepot === depot.codeDepot
//                     ? "bg-blue-600"
//                     : "bg-white"
//                 }`}
//                 onClick={() => handleDepotSelect(depot.codeDepot)}
//               />
//               <span>{depot.nom} ({depot.codeDepot})</span>
//             </div>
//           ))}
//         </Modal>
//       )}

//       {/* Modale Articles */}
//       {showArticleModal && (
//         <Modal title="Liste des articles" onClose={() => setShowArticleModal(false)}>
//           <button
//             type="button"
//             className="mb-3 text-sm text-blue-600 underline"
//             onClick={selectAllArticles}
//           >
//             Sélectionner tout
//           </button>
//           {articles.length === 0 && <p>Aucun article disponible.</p>}
//           {articles.map((article) => (
//             <div key={article.codeArticle} className="flex items-center mb-2 cursor-pointer">
//               <button
//                 type="button"
//                 className={`mr-2 w-5 h-5 border rounded ${
//                   formData.codeArticle === article.codeArticle
//                     ? "bg-blue-600"
//                     : "bg-white"
//                 }`}
//                 onClick={() => handleArticleSelect(article.codeArticle)}
//               />
//               <span>{article.nom} ({article.codeArticle})</span>
//             </div>
//           ))}
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default AffectationForm;








// import React, { useState, useEffect } from 'react';

// const AffectationForm = () => {
//   const [formData, setFormData] = useState({
//     codeArticle: '',
//     codeDepot: '',
//     quantiteStockee: 0,
//     stockMax: 0,
//     stockAlert: 0
//   });

//   const [message, setMessage] = useState('');

//   // Pour liste depots et articles
//   const [depots, setDepots] = useState([]);
//   const [articles, setArticles] = useState([]);

//   // Pour afficher/masquer les listes
//   const [showDepotList, setShowDepotList] = useState(false);
//   const [showArticleList, setShowArticleList] = useState(false);

//   // Pour gérer les sélections multiples
//   const [selectedDepots, setSelectedDepots] = useState([]);
//   const [selectedArticles, setSelectedArticles] = useState([]);

//   // Fetch depots une fois au montage
//   useEffect(() => {
//     fetch('http://localhost:5000/depot/')
//       .then(res => res.json())
//       .then(data => {
//         // Adapter ici si la data est dans data.data ou juste data
//         if (data && Array.isArray(data.data)) {
//           setDepots(data.data);
//         } else if (Array.isArray(data)) {
//           setDepots(data);
//         } else {
//           setDepots([]);
//         }
//       })
//       .catch(() => setDepots([]));
//   }, []);

//   // Fetch articles une fois au montage
//   useEffect(() => {
//     fetch('http://localhost:5000/api/articles/')
//       .then(res => res.json())
//       .then(data => {
//         if (data && Array.isArray(data.data)) {
//           setArticles(data.data);
//         } else if (Array.isArray(data)) {
//           setArticles(data);
//         } else {
//           setArticles([]);
//         }
//       })
//       .catch(() => setArticles([]));
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Exemple : tu peux ajuster comment tu envoies les sélections
//     // Ici, on prend juste le premier sélectionné (ou adapter selon besoin)
//     const dataToSend = {
//       ...formData,
//       codeDepot: selectedDepots[0] || formData.codeDepot,
//       codeArticle: selectedArticles[0] || formData.codeArticle
//     };

//     try {
//       const res = await fetch("http://localhost:5000/depot/affecter-article", {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(dataToSend)
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage({ type: 'success', text: data.message });
//       } else {
//         setMessage({ type: 'error', text: data.message });
//       }
//     } catch (err) {
//       setMessage({ type: 'error', text: 'Erreur lors de l’envoi.' });
//     }
//   };

//   // Sélection simple depot
//   const toggleDepot = (code) => {
//     setSelectedDepots(prev =>
//       prev.includes(code)
//         ? prev.filter(c => c !== code)
//         : [...prev, code]
//     );
//   };

//   // Sélection simple article
//   const toggleArticle = (code) => {
//     setSelectedArticles(prev =>
//       prev.includes(code)
//         ? prev.filter(c => c !== code)
//         : [...prev, code]
//     );
//   };

//   // Tout sélectionner / désélectionner
//   const toggleSelectAll = (listType) => {
//     if (listType === 'depots') {
//       if (selectedDepots.length === depots.length) {
//         setSelectedDepots([]);
//       } else {
//         setSelectedDepots(depots.map(d => d.codeDepot || d.id || d.code));
//       }
//     } else if (listType === 'articles') {
//       if (selectedArticles.length === articles.length) {
//         setSelectedArticles([]);
//       } else {
//         setSelectedArticles(articles.map(a => a.codeArticle || a.id || a.code));
//       }
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-6 p-4 border rounded-xl shadow-lg relative">
//       <h2 className="text-xl font-semibold mb-4">Affecter un article à un dépôt</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <div>
//           <input
//             type="text"
//             name="codeArticle"
//             placeholder="Code Article"
//             value={formData.codeArticle}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//           <button
//             type="button"
//             onClick={() => setShowArticleList(true)}
//             className="mt-1 text-blue-600 underline"
//           >
//             Choisir les articles
//           </button>
//         </div>

//         <div>
//           <input
//             type="text"
//             name="codeDepot"
//             placeholder="Code Dépôt"
//             value={formData.codeDepot}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//           <button
//             type="button"
//             onClick={() => setShowDepotList(true)}
//             className="mt-1 text-blue-600 underline"
//           >
//             Choisir les dépôts
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Affecter
//         </button>

//         {message && (
//           <div
//             className={`mt-3 p-2 rounded text-white ${
//               message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//       </form>

//       {/* Modal liste depots */}
//       {showDepotList && (
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center"
//           onClick={() => setShowDepotList(false)}
//         >
//           <div
//             className="bg-white rounded p-4 max-w-sm w-full"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold">Liste des dépôts</h3>
//               <button
//                 className="text-red-500 font-bold"
//                 onClick={() => setShowDepotList(false)}
//               >
//                 X
//               </button>
//             </div>
//             <button
//               onClick={() => toggleSelectAll('depots')}
//               className="mb-2 text-sm underline text-blue-600"
//             >
//               {selectedDepots.length === depots.length ? 'Désélectionner tout' : 'Sélectionner tout'}
//             </button>

//             <div style={{ maxHeight: 300, overflowY: 'auto' }}>
//               {Array.isArray(depots) && depots.length > 0 ? (
//                 depots.map(depot => {
//                   const code = depot.codeDepot || depot.id || depot.code || '';
//                   return (
//                     <div key={code} className="flex items-center mb-1">
//                       <button
//                         type="button"
//                         onClick={() => toggleDepot(code)}
//                         className={`mr-2 w-5 h-5 border rounded ${
//                           selectedDepots.includes(code) ? 'bg-blue-600' : ''
//                         }`}
//                       />
//                       <span>{code} - {depot.nomDepot || depot.name || 'Nom'}</span>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>Aucun dépôt disponible</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal liste articles */}
//       {showArticleList && (
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center"
//           onClick={() => setShowArticleList(false)}
//         >
//           <div
//             className="bg-white rounded p-4 max-w-sm w-full"
//             onClick={e => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold">Liste des articles</h3>
//               <button
//                 className="text-red-500 font-bold"
//                 onClick={() => setShowArticleList(false)}
//               >
//                 X
//               </button>
//             </div>
//             <button
//               onClick={() => toggleSelectAll('articles')}
//               className="mb-2 text-sm underline text-blue-600"
//             >
//               {selectedArticles.length === articles.length ? 'Désélectionner tout' : 'Sélectionner tout'}
//             </button>

//             <div style={{ maxHeight: 300, overflowY: 'auto' }}>
//               {Array.isArray(articles) && articles.length > 0 ? (
//                 articles.map(article => {
//                   const code = article.codeArticle || article.id || article.code || '';
//                   return (
//                     <div key={code} className="flex items-center mb-1">
//                       <button
//                         type="button"
//                         onClick={() => toggleArticle(code)}
//                         className={`mr-2 w-5 h-5 border rounded ${
//                           selectedArticles.includes(code) ? 'bg-blue-600' : ''
//                         }`}
//                       />
//                       <span>{code} - {article.nomArticle || article.name || 'Nom'}</span>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>Aucun article disponible</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AffectationForm;











// import React, { useState, useEffect } from "react";

// const AffectationSimple = () => {
//   const [depots, setDepots] = useState([]);
//   const [articles, setArticles] = useState([]);

//   const [selectedDepot, setSelectedDepot] = useState(null);
//   const [selectedArticle, setSelectedArticle] = useState(null);

//   const [showDepotList, setShowDepotList] = useState(false);
//   const [showArticleList, setShowArticleList] = useState(false);

//   const [searchDepot, setSearchDepot] = useState("");
//   const [searchArticle, setSearchArticle] = useState("");

//   const [message, setMessage] = useState(null);

//   // Fetch dépôts
//   useEffect(() => {
//     fetch("http://localhost:5000/depot/")
//       .then((res) => res.json())
//       .then((data) => {
//         // Si la data est dans data.data
//         if (data && Array.isArray(data.data)) setDepots(data.data);
//         else if (Array.isArray(data)) setDepots(data);
//         else setDepots([]);
//       })
//       .catch(() => setDepots([]));
//   }, []);

//   // Fetch articles
//   useEffect(() => {
//     fetch("http://localhost:5000/api/articles/")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data && Array.isArray(data.data)) setArticles(data.data);
//         else if (Array.isArray(data)) setArticles(data);
//         else setArticles([]);
//       })
//       .catch(() => setArticles([]));
//   }, []);

//   // Filtrer dépôts selon recherche
//   const filteredDepots = depots.filter((d) => {
//     const code = d.codeDepot?.toLowerCase() || "";
//     const nom = d.nomDepot?.toLowerCase() || "";
//     const region = d.region?.toLowerCase() || "";
//     const wilaya = d.wilaya?.toLowerCase() || "";
//     const s = searchDepot.toLowerCase();
//     return (
//       code.includes(s) || nom.includes(s) || region.includes(s) || wilaya.includes(s)
//     );
//   });

//   // Filtrer articles selon recherche
//   const filteredArticles = articles.filter((a) => {
//     const code = a.codeArticle?.toLowerCase() || "";
//     const nom = a.nomArticle?.toLowerCase() || "";
//     const s = searchArticle.toLowerCase();
//     return code.includes(s) || nom.includes(s);
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedDepot || !selectedArticle) {
//       setMessage({ type: "error", text: "Veuillez choisir un dépôt et un article." });
//       return;
//     }

//     const dataToSend = {
//       codeDepot: selectedDepot.codeDepot,
//       codeArticle: selectedArticle.codeArticle,
//       quantiteStockee: 0,
//       stockMax: 0,
//       stockAlert: 0,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/depot/affecter-article", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(dataToSend),
//       });
//       const data = await res.json();
//       if (res.ok) setMessage({ type: "success", text: data.message || "Succès !" });
//       else setMessage({ type: "error", text: data.message || "Erreur serveur" });
//     } catch {
//       setMessage({ type: "error", text: "Erreur réseau lors de l’envoi." });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-6 p-4 border rounded shadow relative">
//       <h2 className="text-xl font-semibold mb-4">Affecter un article à un dépôt</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Dépôt sélectionné (affichage uniquement) + bouton pour ouvrir liste */}
//         <div>
//           <label className="block mb-1 font-medium">Dépôt sélectionné :</label>
//           <input
//             type="text"
//             readOnly
//             value={
//               selectedDepot
//                 ? `${selectedDepot.codeDepot} - ${selectedDepot.nomDepot}`
//                 : ""
//             }
//             placeholder="Aucun dépôt sélectionné"
//             className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//           />
//           <button
//             type="button"
//             onClick={() => setShowDepotList(true)}
//             className="mt-2 text-blue-600 underline"
//           >
//             Choisir un dépôt
//           </button>
//         </div>

//         {/* Article sélectionné (affichage uniquement) + bouton pour ouvrir liste */}
//         <div>
//           <label className="block mb-1 font-medium">Article sélectionné :</label>
//           <input
//             type="text"
//             readOnly
//             value={
//               selectedArticle
//                 ? `${selectedArticle.codeArticle} - ${selectedArticle.nomArticle}`
//                 : ""
//             }
//             placeholder="Aucun article sélectionné"
//             className="w-full border p-2 rounded bg-gray-100 cursor-not-allowed"
//           />
//           <button
//             type="button"
//             onClick={() => setShowArticleList(true)}
//             className="mt-2 text-blue-600 underline"
//           >
//             Choisir un article
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//         >
//           Affecter
//         </button>

//         {message && (
//           <div
//             className={`mt-3 p-2 rounded text-white ${
//               message.type === "success" ? "bg-green-500" : "bg-red-500"
//             }`}
//           >
//             {message.text}
//           </div>
//         )}
//       </form>

//       {/* Modal liste dépôts */}
//       {showDepotList && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
//           onClick={() => setShowDepotList(false)}
//         >
//           <div
//             className="bg-white rounded p-4 max-w-lg w-full max-h-[80vh] overflow-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold">Liste des dépôts</h3>
//               <button
//                 className="text-red-600 font-bold"
//                 onClick={() => setShowDepotList(false)}
//               >
//                 X
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder="Rechercher par code, nom, région ou wilaya..."
//               className="w-full mb-3 p-2 border rounded"
//               value={searchDepot}
//               onChange={(e) => setSearchDepot(e.target.value)}
//             />

//             {filteredDepots.length === 0 ? (
//               <p>Aucun dépôt trouvé.</p>
//             ) : (
//               filteredDepots.map((d) => (
//                 <div
//                   key={d.codeDepot}
//                   className="flex justify-between items-center border-b py-1 cursor-pointer hover:bg-blue-50"
//                 >
//                   <div>
//                     <strong>{d.codeDepot}</strong> - {d.nomDepot} | Région: {d.region} | Wilaya: {d.wilaya}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSelectedDepot(d);
//                       setShowDepotList(false);
//                       setSearchDepot("");
//                     }}
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     Choisir
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}

//       {/* Modal liste articles */}
//       {showArticleList && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
//           onClick={() => setShowArticleList(false)}
//         >
//           <div
//             className="bg-white rounded p-4 max-w-lg w-full max-h-[80vh] overflow-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-lg font-semibold">Liste des articles</h3>
//               <button
//                 className="text-red-600 font-bold"
//                 onClick={() => setShowArticleList(false)}
//               >
//                 X
//               </button>
//             </div>
//             <input
//               type="text"
//               placeholder="Rechercher par code ou nom..."
//               className="w-full mb-3 p-2 border rounded"
//               value={searchArticle}
//               onChange={(e) => setSearchArticle(e.target.value)}
//             />

//             {filteredArticles.length === 0 ? (
//               <p>Aucun article trouvé.</p>
//             ) : (
//               filteredArticles.map((a) => (
//                 <div
//                   key={a.codeArticle}
//                   className="flex justify-between items-center border-b py-1 cursor-pointer hover:bg-blue-50"
//                 >
//                   <div>
//                     <strong>{a.codeArticle}</strong> - {a.nomArticle}
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSelectedArticle(a);
//                       setShowArticleList(false);
//                       setSearchArticle("");
//                     }}
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     Choisir
//                   </button>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AffectationSimple;






// import React, { useState, useEffect } from "react";

// const AffectationMultiple = () => {
//   const [depots, setDepots] = useState([]);
//   const [articles, setArticles] = useState([]);

//   // Sélection multiple en stockant les codes sélectionnés
//   const [selectedDepots, setSelectedDepots] = useState([]);
//   const [selectedArticles, setSelectedArticles] = useState([]);

//   const [message, setMessage] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/depot/")
//       .then(res => res.json())
//       .then(data => setDepots(data.data || data || []))
//       .catch(() => setDepots([]));
//   }, []);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/articles/")
//       .then(res => res.json())
//       .then(data => setArticles(data.data || data || []))
//       .catch(() => setArticles([]));
//   }, []);

//   // Gérer la sélection multiple pour les dépôts
//   const toggleDepotSelection = (codeDepot) => {
//     setSelectedDepots(prev => 
//       prev.includes(codeDepot)
//         ? prev.filter(c => c !== codeDepot)
//         : [...prev, codeDepot]
//     );
//   };

//   // Gérer la sélection multiple pour les articles
//   const toggleArticleSelection = (codeArticle) => {
//     setSelectedArticles(prev =>
//       prev.includes(codeArticle)
//         ? prev.filter(c => c !== codeArticle)
//         : [...prev, codeArticle]
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (selectedDepots.length === 0 || selectedArticles.length === 0) {
//       setMessage({ type: "error", text: "Veuillez sélectionner au moins un dépôt et un article." });
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/depot/affecter-article", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ codeDepots: selectedDepots, codeArticles: selectedArticles }),
//       });

//       const data = await res.json();

//       if (res.ok) setMessage({ type: "success", text: data.message || "Affectations réussies !" });
//       else setMessage({ type: "error", text: data.message || "Erreur serveur" });
//     } catch {
//       setMessage({ type: "error", text: "Erreur réseau lors de l’envoi." });
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-6 p-4 border rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Affecter des articles à des dépôts</h2>
//       <form onSubmit={handleSubmit}>

//         <div>
//           <label className="block font-medium mb-1">Sélectionnez les dépôts :</label>
//           <div className="max-h-40 overflow-auto border p-2 rounded">
//             {depots.length === 0 ? "Aucun dépôt" : depots.map(d => (
//               <label key={d.codeDepot} className="block">
//                 <input
//                   type="checkbox"
//                   value={d.codeDepot}
//                   checked={selectedDepots.includes(d.codeDepot)}
//                   onChange={() => toggleDepotSelection(d.codeDepot)}
//                 />{" "}
//                 {d.codeDepot} - {d.nomDepot}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="mt-4">
//           <label className="block font-medium mb-1">Sélectionnez les articles :</label>
//           <div className="max-h-40 overflow-auto border p-2 rounded">
//             {articles.length === 0 ? "Aucun article" : articles.map(a => (
//               <label key={a.codeArticle} className="block">
//                 <input
//                   type="checkbox"
//                   value={a.codeArticle}
//                   checked={selectedArticles.includes(a.codeArticle)}
//                   onChange={() => toggleArticleSelection(a.codeArticle)}
//                 />{" "}
//                 {a.codeArticle} - {a.nomArticle}
//               </label>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="mt-4 w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Affecter
//         </button>

//         {message && (
//           <div className={`mt-3 p-2 rounded text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
//             {message.text}
//           </div>
//         )}

//       </form>
//     </div>
//   );
// };

// export default AffectationMultiple;










































//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (selectedDepots.length === 0 || selectedArticles.length === 0) {
//             setMessage({ type: "error", text: "Veuillez choisir au moins un dépôt et un article." });
//             return;
//         }

//         // Construire toutes les combinaisons dépôt-article pour envoyer au backend
//         // Exemple : [{codeDepot, codeArticle}, ...]
//         // const affectations = [];

//         // selectedDepots.forEach((codeDepot) => {
//         //   selectedArticles.forEach((codeArticle) => {
//         //     affectations.push({ codeDepot, codeArticle, quantiteStockee: 0, stockMax: 0, stockAlert: 0 });
//         //   });
//         // });

//         const affectations = [];

//         // Construire toutes les combinaisons
//         selectedDepots.forEach(codeDepot => {
//             selectedArticles.forEach(codeArticle => {
//                 affectations.push({ codeDepot, codeArticle });
//             });
//         });

//     //     try {
//     //         const res = await fetch("http://localhost:5000/depot/affecter-article", {
//     //             method: "POST",
//     //             headers: { "Content-Type": "application/json" },
//     //             body: JSON.stringify({ affectations }),
//     //         });

//     //         const data = await res.json();

//     //         if (res.ok) {
//     //             setMessage({ type: "success", text: data.message || "Affectations réussies !" });
//     //             // reset sélection
//     //             setSelectedDepots([]);
//     //             setSelectedArticles([]);
//     //         } else {
//     //             setMessage({ type: "error", text: data.message || "Erreur serveur" });
//     //         }
//     //     } catch {
//     //         setMessage({ type: "error", text: "Erreur réseau lors de l’envoi." });
//     //     }
//     // };

// try {
//   const res = await fetch("http://localhost:5000/depot/affecter-article", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(affectations),  // on envoie le tableau directement
//   });

//   const data = await res.json();

//   if (res.ok) {
//     setMessage({ type: "success", text: data.message || "Affectations réussies !" });
//     // reset sélection
//     setSelectedDepots([]);
//     setSelectedArticles([]);
//   } else {
//     setMessage({ type: "error", text: data.message || "Erreur serveur" });
//   }
// } catch {
//   setMessage({ type: "error", text: "Erreur réseau lors de l’envoi." });
// },






























import React, { useState, useEffect } from "react";

const AffectationMultiple = () => {
    const [depots, setDepots] = useState([]);
    const [articles, setArticles] = useState([]);

    // Dépôts sélectionnés (array)
    const [selectedDepots, setSelectedDepots] = useState([]);
    // Articles sélectionnés (array)
    const [selectedArticles, setSelectedArticles] = useState([]);

    const [showDepotList, setShowDepotList] = useState(false);
    const [showArticleList, setShowArticleList] = useState(false);

    const [searchDepot, setSearchDepot] = useState("");
    const [searchArticle, setSearchArticle] = useState("");

    const [message, setMessage] = useState(null);



    const [articlesParDepot, setArticlesParDepot] = useState({});
    const [depotOuvert, setDepotOuvert] = useState(null); // codeDepot actuellement ouvert


    const fetchArticlesPourDepot = async (codeDepot) => {
        if (articlesParDepot[codeDepot]) {
            // Si déjà chargé, on affiche juste
            setDepotOuvert(codeDepot);
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`);
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setArticlesParDepot((prev) => ({ ...prev, [codeDepot]: data }));
                setDepotOuvert(codeDepot);
            } else {
                setArticlesParDepot((prev) => ({ ...prev, [codeDepot]: [] }));
                setDepotOuvert(codeDepot);
            }
        } catch {
            setArticlesParDepot((prev) => ({ ...prev, [codeDepot]: [] }));
            setDepotOuvert(codeDepot);
        }
    };


    // Fetch dépôts
    useEffect(() => {
        fetch("http://localhost:5000/depot/")
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.data)) setDepots(data.data);
                else if (Array.isArray(data)) setDepots(data);
                else setDepots([]);
            })
            .catch(() => setDepots([]));
    }, []);

    // Fetch articles
    useEffect(() => {
        fetch("http://localhost:5000/api/articles/")
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.data)) setArticles(data.data);
                else if (Array.isArray(data)) setArticles(data);
                else setArticles([]);
            })
            .catch(() => setArticles([]));
    }, []);

    // Filtrer dépôts selon recherche
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

    // Filtrer articles selon recherche
    const filteredArticles = articles.filter((a) => {
        const code = a.codeArticle?.toLowerCase() || "";
        const nom = a.nomArticle?.toLowerCase() || "";
        const s = searchArticle.toLowerCase();
        return code.includes(s) || nom.includes(s);
    });

    // Gérer sélection simple/multiple dépôts
    const toggleDepotSelection = (codeDepot) => {
        setSelectedDepots((prev) =>
            prev.includes(codeDepot)
                ? prev.filter((c) => c !== codeDepot)
                : [...prev, codeDepot]
        );
    };

    // Tout sélectionner / désélectionner pour les dépôts
    const toggleSelectAllDepots = () => {
        if (selectedDepots.length === filteredDepots.length) {
            setSelectedDepots([]);
        } else {
            setSelectedDepots(filteredDepots.map((d) => d.codeDepot));
        }
    };

    // Gérer sélection simple/multiple articles
    const toggleArticleSelection = (codeArticle) => {
        setSelectedArticles((prev) =>
            prev.includes(codeArticle)
                ? prev.filter((c) => c !== codeArticle)
                : [...prev, codeArticle]
        );
    };

    // Tout sélectionner / désélectionner pour les articles
    const toggleSelectAllArticles = () => {
        if (selectedArticles.length === filteredArticles.length) {
            setSelectedArticles([]);
        } else {
            setSelectedArticles(filteredArticles.map((a) => a.codeArticle));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedDepots.length === 0 || selectedArticles.length === 0) {
            setMessage({ type: "error", text: "Veuillez choisir au moins un dépôt et un article." });
            return;
        }

        const affectations = [];

        selectedDepots.forEach(codeDepot => {
            selectedArticles.forEach(codeArticle => {
                affectations.push({ codeDepot, codeArticle });
            });
        });



        try {
            const res = await fetch("http://localhost:5000/depot/affecter-article", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    codeArticles: selectedArticles, // tableau d'articles
                    codeDepots: selectedDepots      // tableau de dépôts
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: data.message || "Affectations réussies !" });
                setSelectedDepots([]);
                setSelectedArticles([]);
            } else {
                setMessage({ type: "error", text: data.message || "Erreur serveur" });
            }
        } catch {
            setMessage({ type: "error", text: "Erreur réseau lors de l’envoi." });
        }

    };

    return (
        <div className="max-w-xl mx-auto mt-6 p-4 border rounded shadow relative">
            <h2 className="text-xl font-semibold mb-4">Affecter un ou plusieurs articles à un ou plusieurs dépôts</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dépôts sélectionnés */}
                <div>
                    <label className="block mb-1 font-medium">Dépôts sélectionnés :</label>
                    <div className="mb-2 min-h-[50px] border p-2 rounded bg-gray-50">
                        {selectedDepots.length === 0 ? (
                            <span className="text-gray-500">Aucun dépôt sélectionné</span>
                        ) : (
                            selectedDepots.map((codeDepot) => {
                                const depot = depots.find((d) => d.codeDepot === codeDepot);
                                return (
                                    <span
                                        key={codeDepot}
                                        className="inline-block mr-2 mb-1 px-2 py-1 bg-blue-200 text-blue-900 rounded cursor-pointer"
                                        onClick={() => toggleDepotSelection(codeDepot)}
                                        title="Cliquez pour désélectionner"
                                    >
                                        {depot ? `${depot.codeDepot} - ${depot.nomDepot}` : codeDepot} &times;
                                    </span>
                                );
                            })
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowDepotList(true)}
                        className="text-blue-600 underline"
                    >
                        Choisir un ou plusieurs dépôts
                    </button>
                </div>

                {/* Articles sélectionnés */}
                <div>
                    <label className="block mb-1 font-medium">Articles sélectionnés :</label>
                    <div className="mb-2 min-h-[50px] border p-2 rounded bg-gray-50">
                        {selectedArticles.length === 0 ? (
                            <span className="text-gray-500">Aucun article sélectionné</span>
                        ) : (
                            selectedArticles.map((codeArticle) => {
                                const article = articles.find((a) => a.codeArticle === codeArticle);
                                return (
                                    <span
                                        key={codeArticle}
                                        className="inline-block mr-2 mb-1 px-2 py-1 bg-green-200 text-green-900 rounded cursor-pointer"
                                        onClick={() => toggleArticleSelection(codeArticle)}
                                        title="Cliquez pour désélectionner"
                                    >
                                        {article ? `${article.codeArticle} - ${article.nomArticle}` : codeArticle} &times;
                                    </span>
                                );
                            })
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowArticleList(true)}
                        className="text-green-600 underline"
                    >
                        Choisir un ou plusieurs articles
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-700 text-white p-2 rounded hover:bg-blue-800"
                >
                    Affecter
                </button>

                {message && (
                    <div
                        className={`mt-3 p-2 rounded text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"
                            }`}
                    >
                        {message.text}
                    </div>
                )}
            </form>






            {/* Liste des dépôts avec possibilité de voir les articles affectés */}
            <div className="mt-8">
                <h3 className="text-lg font-bold mb-2">Afficher les dépôts et leurs articles affectés</h3>
                {depots.map((depot) => (
                    <div key={depot.codeDepot} className="mb-2 border rounded p-3 bg-gray-50">
                        {/* <button
                            onClick={() => fetchArticlesPourDepot(depot.codeDepot)}
                            className="text-left w-full text-blue-700 font-semibold"
                        >
                            {depot.codeDepot} - {depot.nomDepot}
                        </button> */}

                        <button
                            onClick={() => fetchArticlesPourDepot(depot.codeDepot)}
                            className="text-left w-full text-blue-700 font-semibold"
                        >
                            {depot.codeDepot} - {depot.nomDepot}
                            {articlesParDepot[depot.codeDepot] && (
                                <span className="ml-2 text-sm text-gray-600">
                                    ({articlesParDepot[depot.codeDepot].length} article{articlesParDepot[depot.codeDepot].length > 1 ? 's' : ''})
                                </span>
                            )}
                        </button>

                        {depotOuvert === depot.codeDepot && (
                            <div className="mt-2 ml-4">
                                {articlesParDepot[depot.codeDepot]?.length > 0 ? (
                                    <ul className="list-disc list-inside text-sm text-gray-700">
                                        {articlesParDepot[depot.codeDepot].map((a) => (
                                            <li key={a.codeArticle}>
                                                {a.codeArticle} - {a.nomArticle}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 italic">Aucun article affecté.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>





            {/* Modal dépôts */}
            {showDepotList && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                    onClick={() => setShowDepotList(false)}
                >
                    <div
                        className="bg-white rounded p-4 max-w-lg w-full max-h-[80vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">Liste des dépôts</h3>
                            <button
                                className="text-red-600 font-bold"
                                onClick={() => setShowDepotList(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <input
                                type="text"
                                placeholder="Rechercher par code, nom, région ou wilaya..."
                                className="w-full p-2 border rounded mr-2"
                                value={searchDepot}
                                onChange={(e) => setSearchDepot(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={toggleSelectAllDepots}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 whitespace-nowrap"
                            >
                                {selectedDepots.length === filteredDepots.length ? "Désélectionner tout" : "Sélectionner tout"}
                            </button>
                        </div>

                        {filteredDepots.length === 0 ? (
                            <p>Aucun dépôt trouvé.</p>
                        ) : (
                            filteredDepots.map((d) => (
                                <div
                                    key={d.codeDepot}
                                    className="flex justify-between items-center border-b py-1 cursor-pointer hover:bg-blue-50"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleDepotSelection(d.codeDepot)}
                                        className={`mr-3 w-5 h-5 rounded border ${selectedDepots.includes(d.codeDepot) ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
                                            }`}
                                        aria-label={`Sélectionner dépôt ${d.codeDepot}`}
                                    />
                                    <div>
                                        <strong>{d.codeDepot}</strong> - {d.nomDepot} | Région: {d.region} | Wilaya: {d.wilaya}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Modal articles */}
            {showArticleList && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                    onClick={() => setShowArticleList(false)}
                >
                    <div
                        className="bg-white rounded p-4 max-w-lg w-full max-h-[80vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">Liste des articles</h3>
                            <button
                                className="text-red-600 font-bold"
                                onClick={() => setShowArticleList(false)}
                            >
                                X
                            </button>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <input
                                type="text"
                                placeholder="Rechercher par code ou nom..."
                                className="w-full p-2 border rounded mr-2"
                                value={searchArticle}
                                onChange={(e) => setSearchArticle(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={toggleSelectAllArticles}
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 whitespace-nowrap"
                            >
                                {selectedArticles.length === filteredArticles.length ? "Désélectionner tout" : "Sélectionner tout"}
                            </button>
                        </div>

                        {filteredArticles.length === 0 ? (
                            <p>Aucun article trouvé.</p>
                        ) : (
                            filteredArticles.map((a) => (
                                <div
                                    key={a.codeArticle}
                                    className="flex justify-between items-center border-b py-1 cursor-pointer hover:bg-green-50"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleArticleSelection(a.codeArticle)}
                                        className={`mr-3 w-5 h-5 rounded border ${selectedArticles.includes(a.codeArticle) ? "bg-green-600 border-green-600" : "bg-white border-gray-400"
                                            }`}
                                        aria-label={`Sélectionner article ${a.codeArticle}`}
                                    />
                                    <div>
                                        <strong>{a.codeArticle}</strong> - {a.nomArticle}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AffectationMultiple;













