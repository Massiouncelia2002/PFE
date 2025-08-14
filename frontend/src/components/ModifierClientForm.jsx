import React, { useEffect, useState } from "react";
import AdminLayout from "../pages/AdminLayout";
import { ArrowLeft, User, Mail, MapPin, Phone, Warehouse, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ModifierClientForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomClient: "",
    email: "",
    adress: "",
    tel: "",
    telType: "cellulaire",
    codeDepot: "",
    ...initialData,
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [depots, setDepots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetch("/depot")
      .then((res) => res.json())
      .then((data) => setDepots(data))
      .catch((err) => console.error("Erreur lors du chargement des dépôts :", err));
  }, []);

  useEffect(() => {
    if (formData.adress && depots.length > 0) {
      const wilaya = extractWilayaFromAddress(formData.adress);
      const depotParWilaya = getDepotByWilaya(wilaya);
      if (depotParWilaya) {
        setFormData((prev) => ({
          ...prev,
          codeDepot: depotParWilaya.codeDepot,
        }));
      }
    }
  }, [formData.adress, depots]);

  const extractWilayaFromAddress = (address) => {
    const wilayas = depots.map((depot) => depot.wilaya);
    for (let wilaya of wilayas) {
      if (address.toLowerCase().includes(wilaya.toLowerCase())) {
        return wilaya;
      }
    }
    return "";
  };

  const getDepotByWilaya = (wilaya) => {
    return depots.find((depot) => depot.wilaya.toLowerCase() === wilaya.toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};


    if (!formData.nomClient.trim()) {
      newErrors.nomClient = "Le nom du client est obligatoire";
    } else if (!/^[a-zA-Z\sÀ-ÿ-]+$/.test(formData.nomClient)) {
      newErrors.nomClient = "Le nom ne doit contenir que des lettres";
    }

    
    if (!formData.email.trim()) {
      newErrors.email = "L'email est obligatoire";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.adress.trim()) {
      newErrors.adress = "L'adresse est obligatoire";
    } else if (!/[a-zA-ZÀ-ÿ]/.test(formData.adress)) {
      newErrors.adress = "L'adresse doit contenir au moins une lettre";
    }


    if (!formData.tel.trim()) {
      newErrors.tel = "Le téléphone est obligatoire";
    } else if (formData.telType === "cellulaire") {
      if (!/^0[567]\d{8}$/.test(formData.tel)) {
        newErrors.tel = "Numéro cellulaire invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres";
      }
    } else {
      if (!/^\d{9}$/.test(formData.tel)) {
        newErrors.tel = "Numéro fixe invalide. Doit contenir exactement 9 chiffres";
      }
    }

   
    if (!formData.codeDepot) {
      newErrors.codeDepot = "Le dépôt est obligatoire";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(`/client/${initialData.codeClient}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const backendErrors = {};
          data.errors.forEach(err => {
            const field = err.path || 'global';
            backendErrors[field] = err.message;
          });
          setErrors(backendErrors);
        }
        throw new Error(data.message || "Erreur lors de la modification du client");
      }

      setShowSuccess(true);
      setMessage(data.message || "✅ Client mis à jour avec succès !");
      setErrors({});
      
      setTimeout(() => {
        setShowSuccess(false);
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/clients");
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBack}
              className="group flex items-center space-x-2 text-slate-600 hover:text-blue-600 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium">Retour à la liste</span>
            </button>
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <User className="w-4 h-4" />
              <span>Gestion des clients</span>
            </div>
          </div>

          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Modifier le client</h2>
                  <p className="text-blue-100 text-sm">Mettez à jour les informations du client</p>
                </div>
              </div>
            </div>

            
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>Nom du client</span>
                    </label>
                    <input
                      type="text"
                      name="nomClient"
                      value={formData.nomClient}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.nomClient ? "border-red-300" : "border-slate-200"
                      }`}
                      placeholder="Entrez le nom du client"
                    />
                    {errors.nomClient && (
                      <p className="mt-1 text-sm text-red-500">{errors.nomClient}</p>
                    )}
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.email ? "border-red-300" : "border-slate-200"
                      }`}
                      placeholder="Entrez l'email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>Adresse</span>
                    </label>
                    <input
                      type="text"
                      name="adress"
                      value={formData.adress}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.adress ? "border-red-300" : "border-slate-200"
                      }`}
                      placeholder="Entrez l'adresse"
                    />
                    {errors.adress && (
                      <p className="mt-1 text-sm text-red-500">{errors.adress}</p>
                    )}
                  </div>

                 
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span>Type de téléphone</span>
                    </label>
                    <select
                      name="telType"
                      value={formData.telType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer"
                    >
                      <option value="cellulaire">Cellulaire</option>
                      <option value="fixe">Fixe</option>
                    </select>
                  </div>

                  
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span>Téléphone</span>
                    </label>
                    <input
                      type="text"
                      name="tel"
                      value={formData.tel}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg ${
                        errors.tel ? "border-red-300" : "border-slate-200"
                      }`}
                      placeholder="Entrez le numéro de téléphone"
                    />
                    {errors.tel && (
                      <p className="mt-1 text-sm text-red-500">{errors.tel}</p>
                    )}
                  </div>

                  
                  <div className="group col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Warehouse className="w-4 h-4 text-blue-500" />
                      <span>Sélectionner le dépôt</span>
                    </label>
                    <select
                      name="codeDepot"
                      value={formData.codeDepot}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer ${
                        errors.codeDepot ? "border-red-300" : "border-slate-200"
                      }`}
                    >
                      <option value="">-- Sélectionnez un dépôt --</option>
                      {depots.map((depot) => (
                        <option key={depot.codeDepot} value={depot.codeDepot}>
                          {depot.nomDepot} - {depot.wilaya}
                        </option>
                      ))}
                    </select>
                    {errors.codeDepot && (
                      <p className="mt-1 text-sm text-red-500">{errors.codeDepot}</p>
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

              {showSuccess && message && (
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

export default ModifierClientForm;