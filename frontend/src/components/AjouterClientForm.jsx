import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { User, Mail, MapPin, Phone, Truck, Check, AlertCircle, Upload, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const AjouterClientForm = React.memo(({ onSubmit }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // État initial mémoïsé
  const initialFormData = useMemo(() => ({
    nomClient: "",
    email: "",
    adress: "",
    tel: "",
    telType: "cellulaire",
    codeDepot: "",
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [depots, setDepots] = useState([]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Récupération des dépôts
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

  // Détection automatique du dépôt
  useEffect(() => {
    if (formData.adress && depots.length > 0) {
      const wilaya = extractWilayaFromAddress(formData.adress);
      const depotParWilaya = getDepotByWilaya(wilaya);
      if (depotParWilaya) {
        setFormData(prev => ({
          ...prev,
          codeDepot: depotParWilaya.codeDepot,
        }));
      }
    }
  }, [formData.adress, depots]);

  const extractWilayaFromAddress = useCallback((address) => {
    const wilayas = depots.map((depot) => depot.wilaya);
    for (let wilaya of wilayas) {
      if (address.toLowerCase().includes(wilaya.toLowerCase())) {
        return wilaya;
      }
    }
    return "";
  }, [depots]);

  const getDepotByWilaya = useCallback((wilaya) => {
    return depots.find((depot) => depot.wilaya.toLowerCase() === wilaya.toLowerCase());
  }, [depots]);

  // Validation mémoïsée
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.nomClient.trim()) {
      newErrors.nomClient = "Le nom est requis.";
    } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(formData.nomClient)) {
      newErrors.nomClient = "Le nom doit contenir uniquement des lettres.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide.";
    }

    if (!formData.adress.trim()) {
      newErrors.adress = "L'adresse est requise.";
    } 

    if (!formData.tel.trim()) {
      newErrors.tel = "Le numéro de téléphone est requis.";
    } else if (formData.telType === "cellulaire") {
      if (!/^0[567]\d{8}$/.test(formData.tel)) {
        newErrors.tel = "Numéro cellulaire invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres.";
      }
    } else {
      if (!/^\d{9}$/.test(formData.tel)) {
        newErrors.tel = "Numéro fixe invalide. Doit contenir exactement 9 chiffres.";
      }
    }

    setErreurs(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Gestion des changements optimisée
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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
        await onSubmit(formData);
        
        setShowSuccess(true);
        setErreurs({});
        setFormData(initialFormData);
        
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        if (error.response?.data) {
          const { message, erreurs } = error.response.data;
          setErrorMessage(message || "Une erreur est survenue.");
          setErreurs(erreurs || {});
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
        clients: jsonData.map((row) => ({
          nomClient: row.nomClient || "",
          email: row.email || "",
          adress: row.adress || "",
          tel: row.tel || "",
          telType: row.telType || "cellulaire",
          codeDepot: row.codeDepot || "",
        })),
      })
        .then(() => {
          setMessage(`${jsonData.length} clients importés avec succès.`);
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un client</h1>
            <p className="text-gray-600">Créez un nouveau compte client pour votre organisation</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-green-800">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Client créé avec succès !</span>
              </div>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="nomClient-field"
                  icon={User}
                  label="Nom du client"
                  name="nomClient"
                  placeholder="Nom du client"
                  value={formData.nomClient}
                  onChange={handleChange}
                  error={erreurs.nomClient}
                  required
                />
                
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
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="adress-field"
                  icon={MapPin}
                  label="Adresse"
                  name="adress"
                  placeholder="Adresse complète"
                  value={formData.adress}
                  onChange={handleChange}
                  error={erreurs.adress}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <SelectField
                    key="telType-field"
                    icon={Phone}
                    label="Type de téléphone"
                    name="telType"
                    value={formData.telType}
                    onChange={handleChange}
                  >
                    <option value="cellulaire">Cellulaire</option>
                    <option value="fixe">Fixe</option>
                  </SelectField>
                  
                  <InputField
                    key="tel-field"
                    icon={Phone}
                    label="Numéro de téléphone"
                    name="tel"
                    placeholder="Numéro de téléphone"
                    value={formData.tel}
                    onChange={handleChange}
                    error={erreurs.tel}
                    required
                  />
                </div>
              </div>

              {/* Depot Selection */}
              <SelectField
                key="codeDepot-field"
                icon={Truck}
                label="Dépôt associé"
                name="codeDepot"
                value={formData.codeDepot}
                onChange={handleChange}
                error={erreurs.codeDepot}
              >
                <option value="">Sélectionner un dépôt</option>
                {depots.map((depot) => (
                  <option key={depot.codeDepot} value={depot.codeDepot}>
                    {depot.nomDepot} - {depot.wilaya}
                  </option>
                ))}
              </SelectField>

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
                      <span>Enregistrer le client</span>
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
                  <p className="text-sm text-gray-600">Importez plusieurs clients</p>
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

            {/* View Clients Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Gérer les clients</h3>
                  <p className="text-sm text-gray-600">Voir tous les clients</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate("/clients")}
              >
                <Users className="w-5 h-5" />
                <span>Afficher les clients</span>
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

export default AjouterClientForm;