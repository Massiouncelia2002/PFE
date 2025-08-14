import React, { useState, useEffect } from "react";
import { ArrowLeft, User, Mail, Briefcase, Building, Calendar, Shield, Check, X } from "lucide-react";
import AdminLayout from "../pages/AdminLayout";
import { useNavigate } from "react-router-dom";

const ModifierUtilisateurForm = ({ onSubmit, initialData }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    posteTravail: "",
    brancheFonction: "",
    dateFin: "",
    statut: true,
    role: "",
    ...initialData,
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formData.dateFin) {
      setFormData((prev) => ({ ...prev, statut: false }));
    } else {
      setFormData((prev) => ({ ...prev, statut: true }));
    }
  }, [formData.dateFin]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "dateFin" && value === ""
          ? null
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedData = {
      ...formData,
      dateFin: formData.dateFin === "" ? null : formData.dateFin,
    };
    
    onSubmit(updatedData);
    setMessage("✅ Utilisateur mis à jour avec succès !");
    setIsSubmitting(false);
  };

  const handleBack = () => {
    navigate("/utilisateurs");
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
              <User className="w-4 h-4" />
              <span>Gestion des utilisateurs</span>
            </div>
          </div>

          
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
           
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Modifier l'utilisateur</h2>
                  <p className="text-blue-100 text-sm">Mettez à jour les informations de l'utilisateur</p>
                </div>
              </div>
            </div>

            
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
              
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>Nom</span>
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
                      placeholder="Entrez le nom"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>Prénom</span>
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
                      placeholder="Entrez le prénom"
                    />
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
                      readOnly
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100/50 cursor-not-allowed"
                      placeholder="Email (non modifiable)"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      <span>Poste de travail</span>
                    </label>
                    <input
                      type="text"
                      name="posteTravail"
                      value={formData.posteTravail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
                      placeholder="Entrez le poste"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Building className="w-4 h-4 text-blue-500" />
                      <span>Branche fonction</span>
                    </label>
                    <input
                      type="text"
                      name="brancheFonction"
                      value={formData.brancheFonction}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
                      placeholder="Entrez la branche"
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span>Date de fin (optionnel)</span>
                    </label>
                    <input
                      type="date"
                      name="dateFin"
                      value={formData.dateFin || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg"
                    />
                  </div>
                </div>

              
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Rôle</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-slate-300 group-hover:shadow-lg appearance-none cursor-pointer"
                  >
                    <option value="">-- Sélectionner un rôle --</option>
                    <option value="Admin Fonctionnel">Admin Fonctionnel</option>
                    <option value="Planificateur">Planificateur</option>
                    <option value="Admin Dépôt">Admin Dépôt</option>
                  </select>
                </div>

                
                <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.statut ? 'bg-green-100' : 'bg-red-100'}`}>
                        {formData.statut ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <X className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-slate-700">Statut du compte</label>
                        <p className="text-xs text-slate-500">
                          {formData.statut ? 'Compte actif et opérationnel' : 'Compte désactivé'}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="statut"
                        checked={formData.statut}
                        onChange={handleChange}
                        disabled={!!formData.dateFin}
                        className="sr-only peer"
                      />
                      <div className={`w-14 h-8 rounded-full transition-all duration-300 cursor-pointer ${
                        formData.statut ? 'bg-green-500' : 'bg-slate-300'
                      } ${!!formData.dateFin ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}>
                        <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 mt-1 ${
                          formData.statut ? 'translate-x-7' : 'translate-x-1'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                  {formData.dateFin && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800">
                        ℹ️ Le statut est automatiquement désactivé car une date de fin est définie.
                      </p>
                    </div>
                  )}
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

export default ModifierUtilisateurForm;





