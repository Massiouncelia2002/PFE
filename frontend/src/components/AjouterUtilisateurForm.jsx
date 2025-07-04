import React, { useState, useCallback, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { User, Mail, Briefcase, Building, Calendar, Upload, Users, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Composant InputField optimisé
const InputField = React.memo(({ icon: Icon, error, label, className = "", ...props }) => {
  const inputRef = useRef(null);
  
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <Icon className="inline mr-2 w-4 h-4" />
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          {...props}
          autoComplete="new-password"
          className={`w-full pl-4 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            hover:border-gray-300 transition-all duration-200 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        />
      </div>
      {error && (
        <div className="flex items-center mt-2 text-red-500 text-sm animate-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
});

// Composant SelectField optimisé
const SelectField = React.memo(({ icon: Icon, error, label, children, ...props }) => {
  const selectRef = useRef(null);

  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        <Icon className="inline mr-2 w-4 h-4" />
        {label}
      </label>
      <div className="relative">
        <select
          ref={selectRef}
          {...props}
          autoComplete="off"
          className={`w-full pl-4 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            hover:border-gray-300 transition-all duration-200 appearance-none cursor-pointer
            ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <div className="flex items-center mt-2 text-red-500 text-sm animate-in slide-in-from-top-2 duration-200">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
});

const AjouterUtilisateurForm = React.memo(({ onSubmit }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // État initial mémoïsé
  const initialFormData = React.useMemo(() => ({
    nom: "",
    prenom: "",
    email: "",
    posteTravail: "",
    brancheFonction: "",
    dateFin: null,
    statut: true,
    role: "",
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Validation mémoïsée
  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.nom) errors.nom = "Le nom est obligatoire.";
    if (!formData.prenom) errors.prenom = "Le prénom est obligatoire.";
    if (!formData.email) errors.email = "L'email est obligatoire.";
    if (!formData.role) errors.role = "Le rôle est obligatoire.";
    setErreurs(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  // Gestion des changements optimisée
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (erreurs[name]) {
      setErreurs(prev => ({ ...prev, [name]: "" }));
    }
  }, [erreurs]);

  // Soumission du formulaire
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        await onSubmit({
          ...formData,
          dateFin: null,
          statut: true
        });
        
        setShowSuccess(true);
        setErreurs({});
        setFormData(initialFormData);
        
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        if (error.response?.data) {
          const { message, erreurs } = error.response.data;
          if (erreurs?.email) {
            setErreurs({ email: erreurs.email });
          } else {
            setErrorMessage(message || "Une erreur est survenue.");
            setErreurs(erreurs || {});
          }
        } else {
          setErrorMessage("Une erreur réseau est survenue.");
        }
      }
    }
    setIsSubmitting(false);
  }, [formData, initialFormData, onSubmit, validateForm]);

  // Gestion du fichier Excel
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      onSubmit({
        utilisateurs: jsonData.map(row => ({
          nom: row.nom || "",
          prenom: row.prenom || "",
          email: row.email || "",
          posteTravail: row.posteTravail || "",
          brancheFonction: row.brancheFonction || "",
          dateFin: null,
          statut: true,
          role: row.role || "",
        })),
      })
      .then(() => {
        setMessage(`${jsonData.length} utilisateurs importés avec succès.`);
        setErreurs({});
      })
      .catch((error) => {
        setMessage("");
        if (error.response?.data?.erreurs) {
          setErreurs(error.response.data.erreurs);
        } else {
          setErrorMessage("Erreur lors de l'importation.");
        }
      });
    };
    reader.readAsArrayBuffer(file);
  }, [onSubmit]);

  // Bouton réutilisable
  const Button = React.memo(({ variant = "primary", className = "", children, ...props }) => {
    const baseClasses = "px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 active:scale-95";
    const variants = {
      primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
      secondary: "bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50",
      upload: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl"
    };
    
    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  });

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un utilisateur</h1>
            <p className="text-gray-600">Créez un nouveau compte utilisateur pour votre organisation</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-green-800">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Utilisateur créé avec succès !</span>
              </div>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="nom-field"
                  icon={User}
                  label="Nom"
                  name="nom"
                  placeholder="Nom de famille"
                  value={formData.nom}
                  onChange={handleChange}
                  error={erreurs.nom}
                  required
                />
                
                <InputField
                  key="prenom-field"
                  icon={User}
                  label="Prénom"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  error={erreurs.prenom}
                  required
                />
              </div>

              {/* Contact & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="email-field"
                  icon={Mail}
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Adresse email"
                  value={formData.email}
                  onChange={handleChange}
                  error={erreurs.email}
                  required
                />
                
                <SelectField
                  key="role-field"
                  icon={Briefcase}
                  label="Rôle"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  error={erreurs.role}
                  required
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="Admin Fonctionnel">Admin Fonctionnel</option>
                  <option value="Planificateur">Planificateur</option>
                  <option value="Admin Dépôt">Admin Dépôt</option>
                </SelectField>
              </div>

              {/* Work Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="poste-field"
                  icon={Briefcase}
                  label="Poste de travail"
                  name="posteTravail"
                  placeholder="Poste de travail"
                  value={formData.posteTravail}
                  onChange={handleChange}
                />
                
                <InputField
                  key="branche-field"
                  icon={Building}
                  label="Branche fonction"
                  name="brancheFonction"
                  placeholder="Branche fonction"
                  value={formData.brancheFonction}
                  onChange={handleChange}
                />
              </div>

              {/* Statut (affiché mais non modifiable) */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="statut"
                    checked={true}
                    readOnly
                    className="sr-only"
                  />
                  <div className="w-12 h-6 rounded-full transition-all duration-200 bg-green-500 cursor-not-allowed">
                    <div className="w-5 h-5 bg-white rounded-full shadow-md transform translate-x-6 mt-0.5 ml-0.5" />
                  </div>
                </div>
                <label className="text-sm font-medium text-gray-700">
                  <Check className="inline mr-2 w-4 h-4" />
                  Statut: Actif
                </label>
              </div>

              {/* Champ dateFin caché */}
              <input type="hidden" name="dateFin" value={formData.dateFin || ''} />

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enregistrement...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Enregistrer l'utilisateur</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Import Excel Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Import Excel</h3>
                  <p className="text-sm text-gray-600">Importez plusieurs utilisateurs</p>
                </div>
              </div>
              <Button 
                variant="upload" 
                className="w-full"
                onClick={() => document.getElementById("excelInput").click()}
              >
                <Upload className="w-5 h-5" />
                <span>Choisir un fichier Excel</span>
              </Button>
              <input
                type="file"
                id="excelInput"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* View Users Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Gérer les utilisateurs</h3>
                  <p className="text-sm text-gray-600">Voir tous les utilisateurs</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate("/utilisateurs")}
              >
                <Users className="w-5 h-5" />
                <span>Afficher les utilisateurs</span>
              </Button>
            </div>
          </div>

          {/* Messages */}
          {message && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-blue-800">
                <Check className="w-5 h-5 mr-2" />
                <span>{message}</span>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-red-800">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
});

export default AjouterUtilisateurForm;


































