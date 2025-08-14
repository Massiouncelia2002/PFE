import React, { useState } from "react";
import { ArrowLeft, Building, Box, Ruler, MapPin, FileText, Check } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";
import { useNavigate } from "react-router-dom";

const wilayasByRegion = {
  "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
  "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
  "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
  "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
};

const ModifierDepotForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomDepot: "",
    typeDepot: "",
    capaciteDepot: "",
    description: "",
    region: "",
    wilaya: "",
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value, 10) || "" : value,
      ...(name === "region" ? { wilaya: "" } : {}),
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = ({ nomDepot, typeDepot, capaciteDepot, region, wilaya }) => {
    const nomRegex = /^(?=.*[a-zA-ZÀ-ÿ])[a-zA-ZÀ-ÿ0-9\s\-']+$/;
    const newErrors = {};

    if (!nomDepot || nomDepot.trim() === "") {
      newErrors.nomDepot = "Le champ 'Nom du dépôt' est obligatoire.";
    } else if (!nomRegex.test(nomDepot.trim())) {
      newErrors.nomDepot = "Le nom du dépôt est invalide. Il doit contenir au moins une lettre.";
    }

    if (!typeDepot || typeDepot.trim() === "") {
      newErrors.typeDepot = "Le champ 'Type de dépôt' est obligatoire.";
    }

    if (!capaciteDepot || String(capaciteDepot).trim() === "") {
      newErrors.capaciteDepot = "Le champ 'Capacité du dépôt' est obligatoire.";
    } else if (isNaN(Number(capaciteDepot))) {
      newErrors.capaciteDepot = "La capacité doit être un nombre valide.";
    } else if (Number(capaciteDepot) <= 0) {
      newErrors.capaciteDepot = "La capacité doit être supérieure à zéro.";
    }

    if (!region || region.trim() === "") {
      newErrors.region = "Le champ 'Région' est obligatoire.";
    }

    if (!wilaya || wilaya.trim() === "") {
      newErrors.wilaya = "Le champ 'Wilaya' est obligatoire.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      setMessage("✅ Dépôt mis à jour avec succès !");
    } catch (error) {
      setMessage("❌ Une erreur est survenue lors de la mise à jour");
    }
    setIsSubmitting(false);
  };

  const handleBack = () => {
    navigate("/depots");
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
              <Building className="w-4 h-4" />
              <span>Gestion des dépôts</span>
            </div>
          </div>

          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
         
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Modifier le dépôt</h2>
                  <p className="text-blue-100 text-sm">Mettez à jour les informations du dépôt</p>
                </div>
              </div>
            </div>

        
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-500" />
                      <span>Nom du dépôt</span>
                    </label>
                    <input
                      type="text"
                      name="nomDepot"
                      value={formData.nomDepot}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.nomDepot ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="Entrez le nom du dépôt"
                    />
                    {errors.nomDepot && (
                      <p className="mt-2 text-sm text-red-600">{errors.nomDepot}</p>
                    )}
                  </div>

                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Box className="w-4 h-4 text-blue-500" />
                      <span>Type de dépôt</span>
                    </label>
                    <select
                      name="typeDepot"
                      value={formData.typeDepot}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer ${
                        errors.typeDepot ? 'border-red-500' : 'border-slate-200'
                      }`}
                    >
                      <option value="">-- Sélectionner un type --</option>
                      <option value="C">CLR</option>
                    </select>
                    {errors.typeDepot && (
                      <p className="mt-2 text-sm text-red-600">{errors.typeDepot}</p>
                    )}
                  </div>

                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Ruler className="w-4 h-4 text-blue-500" />
                      <span>Capacité</span>
                    </label>
                    <input
                      type="number"
                      name="capaciteDepot"
                      value={formData.capaciteDepot}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.capaciteDepot ? 'border-red-500' : 'border-slate-200'
                      }`}
                      placeholder="Entrez la capacité"
                    />
                    {errors.capaciteDepot && (
                      <p className="mt-2 text-sm text-red-600">{errors.capaciteDepot}</p>
                    )}
                  </div>

                 
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>Description</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
                      placeholder="Entrez une description"
                    />
                  </div>

                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>Région</span>
                    </label>
                    <select
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer ${
                        errors.region ? 'border-red-500' : 'border-slate-200'
                      }`}
                    >
                      <option value="">-- Sélectionner une région --</option>
                      {Object.keys(wilayasByRegion).map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <p className="mt-2 text-sm text-red-600">{errors.region}</p>
                    )}
                  </div>

                 
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>Wilaya</span>
                    </label>
                    <select
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={handleChange}
                      required
                      disabled={!formData.region}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer ${
                        errors.wilaya ? 'border-red-500' : 'border-slate-200'
                      } ${!formData.region ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                    >
                      <option value="">-- Sélectionner une wilaya --</option>
                      {formData.region &&
                        wilayasByRegion[formData.region].map((wilaya) => (
                          <option key={wilaya} value={wilaya}>
                            {wilaya}
                          </option>
                        ))}
                    </select>
                    {errors.wilaya && (
                      <p className="mt-2 text-sm text-red-600">{errors.wilaya}</p>
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
                <div className={`mt-6 p-4 rounded-xl animate-in slide-in-from-top-4 duration-300 ${
                  message.startsWith("✅") 
                    ? "bg-green-50 border border-green-200 text-green-800" 
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}>
                  <p className="font-medium text-center">{message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ModifierDepotForm;


