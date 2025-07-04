// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminLayout from "./AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import Select from "react-select";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ModifierArticle = () => {
//   const { id } = useParams(); // Changé de codeArticle à id
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     codeArticle: "",
//     designation: "",
//     statut: true,
//     um: "",
//   });
//   const [familles, setFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
//   const [selectedSousFamille, setSelectedSousFamille] = useState(null);

//   const fetchFamilles = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/familles/with-sous-familles");
//       const famillesFormatted = res.data.map((f) => ({
//         value: f.codeFamille,
//         label: f.nomFamille,
//         sousFamilles: f.SousFamilles.map((sf) => ({
//           value: sf.codSousFamille,
//           label: sf.nomSousFamille,
//         })),
//       }));
//       setFamilles(famillesFormatted);
//     } catch (error) {
//       toast.error("Erreur lors du chargement des familles");
//     }
//   };

//   const fetchArticle = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/articles/${id}`); 
//       const article = res.data;

//       setFormData({
//         codeArticle: article.codeArticle,
//         designation: article.designation,
//         statut: article.statut,
//         um: article.um,
//       });

//       const familleMatch = familles.find((f) => f.value === article.codeFamille);
//       setSelectedFamille(familleMatch);
//       setFilteredSousFamilles(familleMatch?.sousFamilles || []);

//       const sousFamilleMatch = familleMatch?.sousFamilles.find(
//         (sf) => sf.value === article.codeSousFamille
//       );
//       setSelectedSousFamille(sousFamilleMatch || null);
//     } catch (error) {
//       toast.error("Article non trouvé");
//       navigate("/articles");
//     }
//   };

//   useEffect(() => {
//     fetchFamilles();
//   }, []);

//   useEffect(() => {
//     if (familles.length > 0 && id) {
//       fetchArticle();
//     }
//   }, [familles, id]);

//   const handleChange = (e) => {
//     const value = e.target.name === "statut" ? e.target.value === "true" : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const handleFamilleChange = (option) => {
//     setSelectedFamille(option);
//     setFilteredSousFamilles(option?.sousFamilles || []);
//     setSelectedSousFamille(null);
//   };

//   const handleSousFamilleChange = (option) => {
//     setSelectedSousFamille(option);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       ...formData,
//       codeFamille: selectedFamille?.value,
//       codeSousFamille: selectedSousFamille?.value,
//     };

//     try {
//       await axios.put(`http://localhost:5000/api/articles/${id}`, data); // Utilisation de l'ID
//       toast.success("Article modifié avec succès");
//       navigate("/articles");
//     } catch (error) {
//       toast.error("Erreur lors de la modification");
//       console.error(error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier l'article</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
//           {/* <Input
//             name="codeArticle"
//             value={formData.codeArticle}
//             onChange={handleChange}
//             placeholder="Code"
//             disabled
//           /> */}
//           <Input
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             placeholder="Désignation"
//           />

//           <div>
//             <select
//               name="statut"
//               value={formData.statut}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value={true}>Actif</option>
//               <option value={false}>Inactif</option>
//             </select>
//           </div>

//           <Input
//             name="um"
//             value={formData.um}
//             onChange={handleChange}
//             placeholder="Unité"
//           />

//           <div>
//             <Select
//               options={familles}
//               value={selectedFamille}
//               onChange={handleFamilleChange}
//               placeholder="🔍 Rechercher une famille..."
//               className="react-select-container"
//               classNamePrefix="react-select"
//               isClearable
//             />
//           </div>

//           <div>
//             <Select
//               options={filteredSousFamilles}
//               value={selectedSousFamille}
//               onChange={handleSousFamilleChange}
//               placeholder="🔍 Rechercher une sous-famille..."
//               className="react-select-container"
//               classNamePrefix="react-select"
//               isClearable
//               isDisabled={!selectedFamille}
//             />
//           </div>

//           <div className="col-span-2">
//             <Button type="submit">Enregistrer les modifications</Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierArticle;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminLayout from "./AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";
// import Select from "react-select";
// import { useParams, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const ModifierArticle = () => {
//   const { codeArticle } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     codeArticle: "",
//     designation: "",
//     statut: true,
//     um: "",
//   });

//   const [familles, setFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
//   const [selectedSousFamille, setSelectedSousFamille] = useState(null);

//   const fetchFamilles = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/familles/with-sous-familles");
//       const formatted = res.data.map((f) => ({
//         value: f.codeFamille,
//         label: f.nomFamille,
//         sousFamilles: f.SousFamilles.map((sf) => ({
//           value: sf.codSousFamille,
//           label: sf.nomSousFamille,
//         })),
//       }));
//       setFamilles(formatted);
//     } catch (error) {
//       toast.error("❌ Erreur lors du chargement des familles.");
//     }
//   };

//   const fetchArticle = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/articles/${codeArticle}`);
//       const article = res.data;

//       setFormData({
//         codeArticle: article.codeArticle,
//         designation: article.designation,
        
        
//       });

//       const familleMatch = familles.find((f) => f.value === article.codeFamille);
//       setSelectedFamille(familleMatch || null);
//       setFilteredSousFamilles(familleMatch?.sousFamilles || []);

//       const sousFamilleMatch = familleMatch?.sousFamilles.find(
//         (sf) => sf.value === article.codeSousFamille
//       );
//       setSelectedSousFamille(sousFamilleMatch || null);
//     } catch (error) {
//       toast.error("❌ Article introuvable.");
//       navigate("/articles");
//     }
//   };

//   useEffect(() => {
//     fetchFamilles();
//   }, []);

//   useEffect(() => {
//     if (familles.length > 0 && codeArticle) {
//       fetchArticle();
//     }
//   }, [familles, codeArticle]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // setFormData({
//     //   ...formData,
//     //   [name]: name === "statut" ? value === "true" : value,
//     // });
//   };

//   const handleFamilleChange = (option) => {
//     setSelectedFamille(option);
//     setFilteredSousFamilles(option?.sousFamilles || []);
//     setSelectedSousFamille(null);
//   };

//   const handleSousFamilleChange = (option) => {
//     setSelectedSousFamille(option);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const dataToSend = {
//       ...formData,
//       codeFamille: selectedFamille?.value || null,
//       codeSousFamille: selectedSousFamille?.value || null,
//     };

//     try {
//       await axios.put(`http://localhost:5000/api/articles/${codeArticle}`, dataToSend);
//       toast.success("✅ Article modifié avec succès !");
//       navigate("/articles");
//     } catch (error) {
//       toast.error("❌ Erreur lors de la modification.");
//       console.error(error);
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier l'article</h2>
//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-2xl">
//           {/* Désignation */}
//           <Input
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             placeholder="Désignation"
//           />

//           {/* Statut */}
//           {/* <div>
//             <select
//               name="statut"
//               value={formData.statut ? "true" : "false"}
//               onChange={handleChange}
//               className="w-full p-2 border border-gray-300 rounded-md"
//             >
//               <option value="true">Actif</option>
//               <option value="false">Inactif</option>
//             </select>
//           </div> */}

//           {/* Unité de mesure */}
//           {/* <Input
//             name="um"
//             value={formData.um}
//             onChange={handleChange}
//             placeholder="Unité"
//           /> */}

//           {/* Famille */}
//           <div>
//             <Select
//               options={familles}
//               value={selectedFamille}
//               onChange={handleFamilleChange}
//               placeholder="🔍 Rechercher une famille..."
//               className="react-select-container"
//               classNamePrefix="react-select"
//               isClearable
//             />
//           </div>

//           {/* Sous-Famille */}
//           <div>
//             <Select
//               options={filteredSousFamilles}
//               value={selectedSousFamille}
//               onChange={handleSousFamilleChange}
//               placeholder="🔍 Rechercher une sous-famille..."
//               className="react-select-container"
//               classNamePrefix="react-select"
//               isClearable
//               isDisabled={!selectedFamille}
//             />
//           </div>

//           {/* Submit */}
//           <div className="col-span-2">
//             <Button type="submit">💾 Enregistrer les modifications</Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierArticle;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import AdminLayout from './AdminLayout';
// import { Button } from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import Select from 'react-select';

// const ModifierArticle = () => {
//   // Récupération du codeArticle avec vérification robuste
//   const { codeArticle } = useParams();
//   const navigate = useNavigate();

//   // Vérification initiale du paramètre
//   if (!codeArticle) {
//     toast.error('Code article manquant dans l\'URL');
//     navigate('/articles');
//     return null;
//   }

//   // États initiaux
//   const [formData, setFormData] = useState({
//     codeArticle: codeArticle, // Utilisation directe du paramètre
//     designation: '',
//     statut: true,
//     um: ''
//   });

//   const [familles, setFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
//   const [selectedSousFamille, setSelectedSousFamille] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Effet pour charger les données
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Chargement en parallèle
//         const [famillesResponse, articleResponse] = await Promise.all([
//           axios.get('http://localhost:5000/api/familles/with-sous-familles'),
//           axios.get(`http://localhost:5000/api/articles/${codeArticle}`)
//         ]);

//         // Formatage des familles
//         const formattedFamilles = famillesResponse.data.map(famille => ({
//           value: famille.codeFamille,
//           label: famille.nomFamille,
//           sousFamilles: famille.SousFamilles.map(sf => ({
//             value: sf.codSousFamille,
//             label: sf.nomSousFamille
//           }))
//         }));

//         setFamilles(formattedFamilles);

//         // Mise à jour des données de l'article
//         const article = articleResponse.data;
//         setFormData({
//           codeArticle: article.codeArticle,
//           designation: article.designation,
//           statut: article.statut,
//           um: article.um
//         });

//         // Sélection des familles correspondantes
//         const familleMatch = formattedFamilles.find(f => f.value === article.codeFamille);
//         if (familleMatch) {
//           setSelectedFamille(familleMatch);
//           setFilteredSousFamilles(familleMatch.sousFamilles);
          
//           const sousFamilleMatch = familleMatch.sousFamilles.find(
//             sf => sf.value === article.codeSousFamille
//           );
//           setSelectedSousFamille(sousFamilleMatch || null);
//         }
//       } catch (error) {
//         console.error('Erreur:', error);
//         toast.error(error.response?.data?.message || 'Erreur de chargement');
//         navigate('/articles');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [codeArticle, navigate]);

//   // Gestionnaires d'événements
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFamilleChange = (selectedOption) => {
//     setSelectedFamille(selectedOption);
//     setFilteredSousFamilles(selectedOption?.sousFamilles || []);
//     setSelectedSousFamille(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const payload = {
//         ...formData,
//         codeFamille: selectedFamille?.value || null,
//         codeSousFamille: selectedSousFamille?.value || null
//       };

//       await axios.put(`http://localhost:5000/api/articles/${codeArticle}`, payload);
//       toast.success('Article modifié avec succès!');
//       navigate('/articles');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Erreur lors de la modification');
//     }
//   };

//   if (loading) {
//     return (
//       <AdminLayout>
//         <div className="p-6">Chargement en cours...</div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier l'article {formData.codeArticle}</h2>
        
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
//           {/* Code Article (lecture seule) */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Code Article</label>
//             <Input
//               name="codeArticle"
//               value={formData.codeArticle}
//               disabled
//             />
//           </div>

//           {/* Désignation */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Désignation*</label>
//             <Input
//               name="designation"
//               value={formData.designation}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Statut */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
//             <div className="mt-1">
//               <label className="inline-flex items-center">
//                 <input
//                   type="checkbox"
//                   name="statut"
//                   checked={formData.statut}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <span className="ml-2">Actif</span>
//               </label>
//             </div>
//           </div>

//           {/* Unité de mesure */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Unité de mesure</label>
//             <Input
//               name="um"
//               value={formData.um}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Famille */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Famille</label>
//             <Select
//               options={familles}
//               value={selectedFamille}
//               onChange={handleFamilleChange}
//               placeholder="Sélectionner une famille..."
//               className="basic-single"
//               classNamePrefix="select"
//               isClearable
//             />
//           </div>

//           {/* Sous-Famille */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Sous-Famille</label>
//             <Select
//               options={filteredSousFamilles}
//               value={selectedSousFamille}
//               onChange={(option) => setSelectedSousFamille(option)}
//               placeholder="Sélectionner une sous-famille..."
//               className="basic-single"
//               classNamePrefix="select"
//               isClearable
//               isDisabled={!selectedFamille}
//             />
//           </div>

//           {/* Boutons */}
//           <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate('/articles')}
//             >
//               Annuler
//             </Button>
//             <Button type="submit">
//               Enregistrer
//             </Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierArticle;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { ArrowLeft, Box, Check, X, Package } from 'lucide-react';
// import AdminLayout from './AdminLayout';
// import Select from 'react-select';

// const ModifierArticle = () => {
//   const { codeArticle } = useParams();
//   const navigate = useNavigate();

//   // Hook pour redirection si codeArticle est absent
//   useEffect(() => {
//     if (!codeArticle) {
//       toast.error('Code article manquant dans l\'URL');
//       navigate('/articles');
//     }
//   }, [codeArticle, navigate]);

//   const [formData, setFormData] = useState({
//     codeArticle: codeArticle,
//     designation: '',
//     statut: true,
//     um: 'palette'
//   });

//   const [familles, setFamilles] = useState([]);
//   const [selectedFamille, setSelectedFamille] = useState(null);
//   const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
//   const [selectedSousFamille, setSelectedSousFamille] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const [famillesResponse, articleResponse] = await Promise.all([
//           axios.get('http://localhost:5000/api/familles/with-sous-familles'),
//           axios.get(`http://localhost:5000/api/articles/${codeArticle}`)
//         ]);

//         const formattedFamilles = famillesResponse.data.map(famille => ({
//           value: famille.codeFamille,
//           label: famille.nomFamille,
//           sousFamilles: famille.SousFamilles.map(sf => ({
//             value: sf.codSousFamille,
//             label: sf.nomSousFamille
//           }))
//         }));

//         setFamilles(formattedFamilles);

//         const article = articleResponse.data;
//         setFormData({
//           codeArticle: article.codeArticle,
//           designation: article.designation,
//           statut: article.statut,
//           um: article.um
//         });

//         const familleMatch = formattedFamilles.find(f => f.value === article.codeFamille);
//         if (familleMatch) {
//           setSelectedFamille(familleMatch);
//           setFilteredSousFamilles(familleMatch.sousFamilles);

//           const sousFamilleMatch = familleMatch.sousFamilles.find(
//             sf => sf.value === article.codeSousFamille
//           );
//           setSelectedSousFamille(sousFamilleMatch || null);
//         }
//       } catch (error) {
//         console.error('Erreur:', error);
//         toast.error(error.response?.data?.message || 'Erreur de chargement');
//         navigate('/articles');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (codeArticle) {
//       fetchData();
//     }
//   }, [codeArticle, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleFamilleChange = (selectedOption) => {
//     setSelectedFamille(selectedOption);
//     setFilteredSousFamilles(selectedOption?.sousFamilles || []);
//     setSelectedSousFamille(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const payload = {
//         ...formData,
//         codeFamille: selectedFamille?.value || null,
//         codeSousFamille: selectedSousFamille?.value || null
//       };

//       await axios.put(`http://localhost:5000/api/articles/${codeArticle}`, payload);
//       setMessage('✅ Article modifié avec succès !');
//       setTimeout(() => navigate('/articles'), 1500);
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Erreur lors de la modification');
//     }
//   };

//   const handleBack = () => {
//     navigate('/articles');
//   };

//   if (!codeArticle) return null;

//   if (loading) {
//     return (
//       <AdminLayout>
//         <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       </AdminLayout>
//     );
//   }

//   return (
//     <AdminLayout>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center justify-between mb-8">
//             <button
//               onClick={handleBack}
//               className="group flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300"
//             >
//               <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//               <span className="font-medium">Retour à la liste</span>
//             </button>
//             <div className="flex items-center space-x-2 text-sm text-slate-500">
//               <Box className="w-4 h-4" />
//               <span>Gestion des articles</span>
//             </div>
//           </div>

//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Box className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold">Modifier l'article</h2>
//                   <p className="text-blue-100 text-sm">Mettez à jour les informations de l'article</p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="group">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <Package className="w-4 h-4 text-blue-500" />
//                       <span>Code Article</span>
//                     </label>
//                     <input
//                       name="codeArticle"
//                       value={formData.codeArticle}
//                       disabled
//                       className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100/50 cursor-not-allowed"
//                     />
//                   </div>

//                   <div className="group">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <Package className="w-4 h-4 text-blue-500" />
//                       <span>Unité de mesure</span>
//                     </label>
//                     <input
//                       name="um"
//                       value={formData.um}
//                       disabled
//                       className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100/50 cursor-not-allowed"
//                     />
//                   </div>

//                   <div className="group md:col-span-2">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <Package className="w-4 h-4 text-blue-500" />
//                       <span>Désignation*</span>
//                     </label>
//                     <input
//                       name="designation"
//                       value={formData.designation}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
//                       placeholder="Entrez la désignation"
//                     />
//                   </div>

//                   <div className="group">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <Package className="w-4 h-4 text-blue-500" />
//                       <span>Famille</span>
//                     </label>
//                     <Select
//                       options={familles}
//                       value={selectedFamille}
//                       onChange={handleFamilleChange}
//                       placeholder="Sélectionner une famille..."
//                       className="react-select-container"
//                       classNamePrefix="react-select"
//                       isClearable
//                       styles={{
//                         control: (base) => ({
//                           ...base,
//                           minHeight: '48px',
//                           border: '2px solid #e2e8f0',
//                           borderRadius: '12px',
//                           '&:hover': { borderColor: '#cbd5e1' }
//                         })
//                       }}
//                     />
//                   </div>

//                   <div className="group">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <Package className="w-4 h-4 text-blue-500" />
//                       <span>Sous-Famille</span>
//                     </label>
//                     <Select
//                       options={filteredSousFamilles}
//                       value={selectedSousFamille}
//                       onChange={(option) => setSelectedSousFamille(option)}
//                       placeholder="Sélectionner une sous-famille..."
//                       className="react-select-container"
//                       classNamePrefix="react-select"
//                       isClearable
//                       isDisabled={!selectedFamille}
//                       styles={{
//                         control: (base) => ({
//                           ...base,
//                           minHeight: '48px',
//                           border: '2px solid #e2e8f0',
//                           borderRadius: '12px',
//                           '&:hover': { borderColor: '#cbd5e1' },
//                           backgroundColor: !selectedFamille
//                             ? 'rgba(241, 245, 249, 0.5)'
//                             : 'rgba(255, 255, 255, 0.5)'
//                         })
//                       }}
//                     />
//                   </div>

//                   <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200 md:col-span-2">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-3">
//                         <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.statut ? 'bg-green-100' : 'bg-red-100'}`}>
//                           {formData.statut ? (
//                             <Check className="w-5 h-5 text-green-600" />
//                           ) : (
//                             <X className="w-5 h-5 text-red-600" />
//                           )}
//                         </div>
//                         <div>
//                           <label className="text-sm font-semibold text-slate-700">Statut de l'article</label>
//                           <p className="text-xs text-slate-500">
//                             {formData.statut ? 'Article actif et disponible' : 'Article désactivé'}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="relative">
//                         <input
//                           type="checkbox"
//                           name="statut"
//                           checked={formData.statut}
//                           onChange={handleChange}
//                           className="sr-only peer"
//                         />
//                         <div className={`w-14 h-8 rounded-full transition-all duration-300 cursor-pointer ${
//                           formData.statut ? 'bg-green-500' : 'bg-slate-300'
//                         } hover:shadow-lg`}>
//                           <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-1 ${
//                             formData.statut ? 'translate-x-7' : 'translate-x-1'
//                           }`}></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                   <button
//                     type="submit"
//                     className="group relative flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
//                   >
//                     <span className="flex items-center justify-center space-x-2">
//                       <Check className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//                       <span>Mettre à jour</span>
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleBack}
//                     className="group flex-1 sm:flex-none bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:bg-slate-50"
//                   >
//                     <span className="flex items-center justify-center space-x-2">
//                       <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//                       <span>Annuler</span>
//                     </span>
//                   </button>
//                 </div>
//               </form>

//               {message && (
//                 <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
//                   <p className="text-green-800 font-medium text-center">{message}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierArticle;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft, Box, Check, X, Package } from 'lucide-react';
import AdminLayout from './AdminLayout';
import Select from 'react-select';

const ModifierArticle = () => {
  const { codeArticle } = useParams();
  const navigate = useNavigate();

  // Hook pour redirection si codeArticle est absent
  useEffect(() => {
    if (!codeArticle) {
      toast.error('Code article manquant dans l\'URL');
      navigate('/articles');
    }
  }, [codeArticle, navigate]);

  const [formData, setFormData] = useState({
    codeArticle: codeArticle,
    designation: '',
    um: 'PALETTE'
  });

  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
  const [selectedSousFamille, setSelectedSousFamille] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [famillesResponse, articleResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/familles/with-sous-familles'),
          axios.get(`http://localhost:5000/api/articles/${codeArticle}`)
        ]);

        const formattedFamilles = famillesResponse.data.map(famille => ({
          value: famille.codeFamille,
          label: famille.nomFamille,
          sousFamilles: famille.SousFamilles.map(sf => ({
            value: sf.codSousFamille,
            label: sf.nomSousFamille
          }))
        }));

        setFamilles(formattedFamilles);

        const article = articleResponse.data;
        setFormData({
          codeArticle: article.codeArticle,
          designation: article.designation,
          um: 'PALETTE'
        });

        const familleMatch = formattedFamilles.find(f => f.value === article.codeFamille);
        if (familleMatch) {
          setSelectedFamille(familleMatch);
          setFilteredSousFamilles(familleMatch.sousFamilles);

          const sousFamilleMatch = familleMatch.sousFamilles.find(
            sf => sf.value === article.codeSousFamille
          );
          setSelectedSousFamille(sousFamilleMatch || null);
        }
      } catch (error) {
        console.error('Erreur:', error);
        toast.error(error.response?.data?.message || 'Erreur de chargement');
        navigate('/articles');
      } finally {
        setLoading(false);
      }
    };

    if (codeArticle) {
      fetchData();
    }
  }, [codeArticle, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFamilleChange = (selectedOption) => {
    setSelectedFamille(selectedOption);
    setFilteredSousFamilles(selectedOption?.sousFamilles || []);
    setSelectedSousFamille(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        codeFamille: selectedFamille?.value || null,
        codeSousFamille: selectedSousFamille?.value || null
      };

      await axios.put(`http://localhost:5000/api/articles/${codeArticle}`, payload);
      setMessage('✅ Article modifié avec succès !');
      setTimeout(() => navigate('/articles'), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de la modification');
    }
  };

  const handleBack = () => {
    navigate('/articles');
  };

  if (!codeArticle) return null;

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="group flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Retour à la liste</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <Box className="w-4 h-4" />
              <span>Gestion des articles</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Box className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Modifier l'article</h2>
                  <p className="text-blue-100 text-sm">Mettez à jour les informations de l'article</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span>Code Article</span>
                    </label>
                    <input
                      name="codeArticle"
                      value={formData.codeArticle}
                      disabled
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100/50 cursor-not-allowed"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span>Unité de mesure</span>
                    </label>
                    <input
                      value={formData.um}
                      disabled
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100/50 cursor-not-allowed"
                    />
                  </div>

                  <div className="group md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span>Désignation*</span>
                    </label>
                    <input
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
                      placeholder="Entrez la désignation"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span>Famille</span>
                    </label>
                    <Select
                      options={familles}
                      value={selectedFamille}
                      onChange={handleFamilleChange}
                      placeholder="Sélectionner une famille..."
                      className="react-select-container"
                      classNamePrefix="react-select"
                      isClearable
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: '48px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          '&:hover': { borderColor: '#cbd5e1' }
                        })
                      }}
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Package className="w-4 h-4 text-blue-500" />
                      <span>Sous-Famille</span>
                    </label>
                    <Select
                      options={filteredSousFamilles}
                      value={selectedSousFamille}
                      onChange={(option) => setSelectedSousFamille(option)}
                      placeholder="Sélectionner une sous-famille..."
                      className="react-select-container"
                      classNamePrefix="react-select"
                      isClearable
                      isDisabled={!selectedFamille}
                      styles={{
                        control: (base) => ({
                          ...base,
                          minHeight: '48px',
                          border: '2px solid #e2e8f0',
                          borderRadius: '12px',
                          '&:hover': { borderColor: '#cbd5e1' },
                          backgroundColor: !selectedFamille
                            ? 'rgba(241, 245, 249, 0.5)'
                            : 'rgba(255, 255, 255, 0.5)'
                        })
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="group relative flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <Check className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Mettre à jour</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBack}
                    className="group flex-1 sm:flex-none bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border-2 border-slate-200 transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:bg-slate-50"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>Annuler</span>
                    </span>
                  </button>
                </div>
              </form>

              {message && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
                  <p className="text-green-800 font-medium text-center">{message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ModifierArticle;