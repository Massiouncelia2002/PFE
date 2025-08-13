






// import React, { useState, useEffect } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { Button } from "../components/ui/Button";
// import Input from "../components/ui/Input";

// const ModifierVehiculeForm = ({ onSubmit, initialData = {}, onShowVehicules }) => {
//   const [formData, setFormData] = useState({
//     matricule: "",
//     // typeVehicule: "",
//     capaciteVehicule: "",
//     statut: "",
//     ...initialData,
//   });

//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   // const typesVehicules = ["Numilog_Camions", "Semi-remorques", "Camion léger"];
//   const statuts = ["Disponible", "Non disponible", "En maintenance"];

//   // Handle the change of input fields
//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "number" ? parseInt(value, 10) || "" : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation des données avant d'envoyer la requête
//     const newErrors = {};

//     // Validation du matricule (obligatoire et format valide)
//     if (!formData.matricule) {
//       newErrors.matricule = "Le matricule est requis.";
//     } else if (!/^[A-Za-z0-9]+$/.test(formData.matricule)) {
//       newErrors.matricule = "Le matricule doit être alphanumérique.";
//     }

//     // Validation de la capacité du véhicule (obligatoire et positive)
//     if (!formData.capaciteVehicule) {
//       newErrors.capaciteVehicule = "La capacité du véhicule est requise.";
//     } else if (formData.capaciteVehicule <= 0) {
//       newErrors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
//     }

   
//     // Validation du statut (obligatoire)
//     if (!formData.statut) {
//       newErrors.statut = "Le statut est requis.";
//     }

//     // Si des erreurs existent, on les affiche
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     // Si pas d'erreurs, on envoie les données de modification
//     try {
//       const response = await onSubmit(formData);

//       if (response.message && response.vehicule) {
//         setMessage(`✅ Véhicule modifié avec succès !`);
//         setFormData({
//           matricule: "",
//           // typeVehicule: "",
//           capaciteVehicule: "",
//           statut: "",
//         });
//         setErrors({}); // Réinitialiser les erreurs
//       } else if (response.error) {
//         setMessage(response.error); // Affichage des erreurs de contrainte d'intégrité (par ex. matricule déjà pris)
//       } else {
//         setMessage("❌ Le véhicule n'a pas pu être modifié.");
//       }
//     } catch (error) {
//       setMessage("❌ Une erreur est survenue lors de la modification.");
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold">Modifier le véhicule</h2>

//         {message && <div className="text-green-600 font-medium">{message}</div>}
//         {Object.keys(errors).length > 0 && (
//           <div className="text-red-600 font-medium">
//             <ul>
//               {Object.values(errors).map((error, index) => (
//                 <li key={index}>{error}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 max-w-3xl">
//           <Input
//             name="matricule"
//             placeholder="Matricule du véhicule"
//             value={formData.matricule}
//             onChange={handleChange}
//             required
//           />
        
//           <Input
//             type="number"
//             name="capaciteVehicule"
//             placeholder="Capacité du véhicule"
//             value={formData.capaciteVehicule}
//             onChange={handleChange}
//             required
//           />
//           <div>
//             <label htmlFor="statut" className="block">Statut</label>
//             <select
//               name="statut"
//               value={formData.statut}
//               onChange={handleChange}
//               required
//               className="w-full p-2 border"
//             >
//               <option value="">Sélectionner un statut</option>
//               {statuts.map((status, index) => (
//                 <option key={index} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="col-span-2 flex space-x-4">
//             <Button type="submit">Mettre à jour</Button>
//             <Button variant="outline" onClick={onShowVehicules}>
//               Retour à la liste
//             </Button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ModifierVehiculeForm;




// import React, { useState, useEffect } from "react";
// import AdminLayout from "../pages/AdminLayout";
// import { ArrowLeft, Truck, Gauge, CheckCircle, XCircle, Check } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ModifierVehiculeForm = ({ onSubmit, initialData = {} }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     matricule: "",
//     capaciteVehicule: "",
//     statut: "",
//     ...initialData,
//   });

//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const statuts = ["Disponible", "Non disponible", "En maintenance"];

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "number" ? parseInt(value, 10) || "" : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Validation des données
//     const newErrors = {};

//     if (!formData.matricule) {
//       newErrors.matricule = "Le matricule est requis.";
//     } else if (!/^[A-Za-z0-9]+$/.test(formData.matricule)) {
//       newErrors.matricule = "Le matricule doit être alphanumérique.";
//     }

//     if (!formData.capaciteVehicule) {
//       newErrors.capaciteVehicule = "La capacité du véhicule est requise.";
//     } else if (formData.capaciteVehicule <= 0) {
//       newErrors.capaciteVehicule = "La capacité doit être un nombre positif.";
//     }

//     if (!formData.statut) {
//       newErrors.statut = "Le statut est requis.";
//     }

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await onSubmit(formData);
//       if (response.message && response.vehicule) {
//         setMessage("✅ Véhicule modifié avec succès !");
//         setErrors({});
//       } else if (response.error) {
//         setMessage(response.error);
//       } else {
//         setMessage("❌ Le véhicule n'a pas pu être modifié.");
//       }
//     } catch (error) {
//       setMessage("❌ Une erreur est survenue lors de la modification.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleBack = () => {
//     navigate("/vehicules");
//   };

//   return (
//     <AdminLayout>
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-8">
//             <button
//               onClick={handleBack}
//               className="group flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300"
//             >
//               <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//               <span className="font-medium">Retour à la liste</span>
//             </button>
//             <div className="flex items-center space-x-2 text-sm text-slate-500">
//               <Truck className="w-4 h-4" />
//               <span>Gestion des véhicules</span>
//             </div>
//           </div>

//           {/* Carte principale */}
//           <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
//             {/* Header de la carte */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
//                   <Truck className="w-6 h-6" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold">Modifier le véhicule</h2>
//                   <p className="text-blue-100 text-sm">Mettez à jour les informations du véhicule</p>
//                 </div>
//               </div>
//             </div>

//             {/* Formulaire */}
//             <div className="p-8">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Matricule */}
//                   <div className="group">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <Truck className="w-4 h-4 text-blue-500" />
//                       <span>Matricule</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="matricule"
//                       value={formData.matricule}
//                       onChange={handleChange}
//                       required
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
//                         errors.matricule ? "border-red-300" : "border-slate-200"
//                       }`}
//                       placeholder="Entrez le matricule"
//                     />
//                     {errors.matricule && (
//                       <p className="mt-1 text-sm text-red-500">{errors.matricule}</p>
//                     )}
//                   </div>

//                   {/* Capacité */}
//                   <div className="group">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <Gauge className="w-4 h-4 text-blue-500" />
//                       <span>Capacité (kg)</span>
//                     </label>
//                     <input
//                       type="number"
//                       name="capaciteVehicule"
//                       value={formData.capaciteVehicule}
//                       onChange={handleChange}
//                       required
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
//                         errors.capaciteVehicule ? "border-red-300" : "border-slate-200"
//                       }`}
//                       placeholder="Entrez la capacité"
//                     />
//                     {errors.capaciteVehicule && (
//                       <p className="mt-1 text-sm text-red-500">{errors.capaciteVehicule}</p>
//                     )}
//                   </div>

//                   {/* Statut */}
//                   <div className="group col-span-2">
//                     <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
//                       <CheckCircle className="w-4 h-4 text-blue-500" />
//                       <span>Statut</span>
//                     </label>
//                     <select
//                       name="statut"
//                       value={formData.statut}
//                       onChange={handleChange}
//                       required
//                       className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer ${
//                         errors.statut ? "border-red-300" : "border-slate-200"
//                       }`}
//                     >
//                       <option value="">-- Sélectionnez un statut --</option>
//                       {statuts.map((status, index) => (
//                         <option key={index} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                     {errors.statut && (
//                       <p className="mt-1 text-sm text-red-500">{errors.statut}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Boutons d'action */}
//                 <div className="flex flex-col sm:flex-row gap-4 pt-6">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="group relative flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
//                   >
//                     <span className="flex items-center justify-center space-x-2">
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                           <span>Mise à jour...</span>
//                         </>
//                       ) : (
//                         <>
//                           <Check className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
//                           <span>Mettre à jour</span>
//                         </>
//                       )}
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

//               {/* Message de succès */}
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

// export default ModifierVehiculeForm;




import React, { useState, useEffect } from "react";
import AdminLayout from "../pages/AdminLayout";
import { ArrowLeft, Truck, Gauge, CheckCircle, XCircle, Check, Warehouse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ModifierVehiculeForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matricule: "",
    capaciteVehicule: "",
    statut: "disponible",
    codeDepot: "",
    ...initialData,
  });

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [depots, setDepots] = useState([]);
  const statuts = ["disponible", "non-disponible"];

  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const response = await fetch("/depot");
        const data = await response.json();
        setDepots(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des dépôts:", err);
        setErrorMessage("Erreur lors du chargement des dépôts");
      }
    };
    fetchDepots();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || "" : value,
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear() % 100;
    const matriculeStr = formData.matricule?.toString().trim();

    if (!matriculeStr) {
      newErrors.matricule = "Le matricule est requis.";
    } else if (!/^\d{9,11}$/.test(matriculeStr)) {
      newErrors.matricule = "Le matricule doit contenir entre 9 et 11 chiffres.";
    } else {
      const wilayaCode = parseInt(matriculeStr.slice(-2));
      const yearCode = parseInt(matriculeStr.slice(-4, -2));
      const fifthLastDigit = parseInt(matriculeStr.slice(-5, -4));

      if (wilayaCode > 48 || wilayaCode === 0) {
        newErrors.matricule = "Le code wilaya (les deux derniers chiffres) doit être entre 01 et 48.";
      }

      if (yearCode > currentYear) {
        newErrors.matricule = `L'année (avant le code wilaya) ne peut pas dépasser ${currentYear}.`;
      }

      if (fifthLastDigit < 1 || fifthLastDigit > 5) {
        newErrors.matricule = "Le chiffre précédant l'année doit être entre 1 et 5.";
      }
    }

    if (!formData.capaciteVehicule || formData.capaciteVehicule <= 0) {
      newErrors.capaciteVehicule = "La capacité du véhicule doit être un nombre positif.";
    }

    if (!formData.statut || !statuts.includes(formData.statut)) {
      newErrors.statut = `Le statut doit être parmi : ${statuts.join(", ")}.`;
    }

    if (!formData.codeDepot) {
      newErrors.codeDepot = "Le dépôt est requis.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await onSubmit(formData);
        
        if (response?.errors) {
          setErrors(response.errors);
          if (response.errors.matricule) {
            setErrorMessage(response.errors.matricule);
          } else if (response.errors.capaciteVehicule) {
            setErrorMessage(response.errors.capaciteVehicule);
          } else if (response.errors.statut) {
            setErrorMessage(response.errors.statut);
          } else if (response.errors.codeDepot) {
            setErrorMessage(response.errors.codeDepot);
          }
        } else if (response?.message) {
          setMessage(response.message);
          setTimeout(() => navigate("/vehicules"), 2000);
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
        setErrorMessage(error.response?.data?.message || "Une erreur est survenue lors de la modification du véhicule.");
      }
    }
    setIsSubmitting(false);
  };

  const handleBack = () => {
    navigate("/vehicules");
  };

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
              <Truck className="w-4 h-4" />
              <span>Gestion des véhicules</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Modifier le véhicule</h2>
                  <p className="text-blue-100 text-sm">Mettez à jour les informations du véhicule</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-center text-red-800">
                      <XCircle className="w-5 h-5 mr-2" />
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Matricule</span>
                    </label>
                    <input
                      type="text"
                      name="matricule"
                      value={formData.matricule}
                      onChange={handleChange}
                      required
                      readOnly
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.matricule ? "border-red-300" : "border-slate-200"
                      } bg-gray-100 cursor-not-allowed`}
                      placeholder="Ex: 12345678901"
                    />
                    {errors.matricule && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.matricule}
                      </p>
                    )}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Gauge className="w-4 h-4 text-blue-500" />
                      <span>Capacité (Palettes)</span>
                    </label>
                    <input
                      type="number"
                      name="capaciteVehicule"
                      value={formData.capaciteVehicule}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.capaciteVehicule ? "border-red-300" : "border-slate-200"
                      }`}
                      placeholder="Entrez la capacité"
                    />
                    {errors.capaciteVehicule && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.capaciteVehicule}
                      </p>
                    )}
                  </div>

                  <div className="group col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Statut</span>
                    </label>
                    <select
                      name="statut"
                      value={formData.statut}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer ${
                        errors.statut ? "border-red-300" : "border-slate-200"
                      }`}
                    >
                      {statuts.map((status, index) => (
                        <option key={index} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    {errors.statut && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.statut}
                      </p>
                    )}
                  </div>

                  <div className="group col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Warehouse className="w-4 h-4 text-blue-500" />
                      <span>Dépôt</span>
                    </label>
                    <select
                      name="codeDepot"
                      value={formData.codeDepot}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer ${
                        errors.codeDepot ? "border-red-300" : "border-slate-200"
                      }`}
                    >
                      <option value="">-- Sélectionnez un dépôt --</option>
                      {depots.map((depot) => (
                        <option key={depot.codeDepot} value={depot.codeDepot}>
                          {depot.nomDepot} ({depot.codeDepot})
                        </option>
                      ))}
                    </select>
                    {errors.codeDepot && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <XCircle className="w-4 h-4 mr-1" />
                        {errors.codeDepot}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Mise à jour...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          <span>Mettre à jour</span>
                        </>
                      )}
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
                  <div className="flex items-center text-green-800 justify-center">
                    <Check className="w-5 h-5 mr-2" />
                    <p className="font-medium">{message}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ModifierVehiculeForm;