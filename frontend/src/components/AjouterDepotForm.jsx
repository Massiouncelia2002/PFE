import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { Building, MapPin, Box, Ruler, FileText, Upload, List, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Liste wilayas par région
const wilayasByRegion = {
  "Centre": ["Alger", "Blida", "Boumerdes", "Tipaza", "Médéa"],
  "Est": ["Constantine", "Annaba", "Sétif", "Batna", "Béjaïa"],
  "Ouest": ["Oran", "Tlemcen", "Mostaganem", "Sidi Bel Abbès"],
  "Sud": ["Tamanrasset", "Adrar", "Ouargla", "Illizi", "Tindouf"]
};

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

const AjouterDepotForm = React.memo(({ onSubmit }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  // État initial mémoïsé
  const initialFormData = useMemo(() => ({
    nomDepot: "",
    typeDepot: "",
    capaciteDepot: "",
    description: "",
    region: "",
    wilaya: ""
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Gestion des changements optimisée
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setFormData(prev => {
      if (name === "region") {
        return {
          ...prev,
          region: value,
          wilaya: ""
        };
      }
      return {
        ...prev,
        [name]: value
      };
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);

  // Validation mémoïsée
  const validateForm = useCallback(({ nomDepot, typeDepot, capaciteDepot, region, wilaya }) => {
    const nomRegex = /^(?=.*[a-zA-ZÀ-ÿ])[a-zA-ZÀ-ÿ0-9\s\-']+$/;
    const newErrors = {};

    if (!nomDepot?.trim()) {
      newErrors.nomDepot = "Le champ 'Nom du dépôt' est obligatoire.";
    } else if (!nomRegex.test(nomDepot.trim())) {
      newErrors.nomDepot = "Le nom du dépôt est invalide. Il doit contenir au moins une lettre.";
    }

    if (!typeDepot?.trim()) {
      newErrors.typeDepot = "Le champ 'Type de dépôt' est obligatoire.";
    }

    if (!capaciteDepot || String(capaciteDepot).trim() === "") {
      newErrors.capaciteDepot = "Le champ 'Capacité du dépôt' est obligatoire.";
    } else if (isNaN(Number(capaciteDepot))) {
      newErrors.capaciteDepot = "La capacité doit être un nombre valide.";
    } else if (Number(capaciteDepot) <= 0) {
      newErrors.capaciteDepot = "La capacité doit être supérieure à zéro.";
    }

    if (!region?.trim()) {
      newErrors.region = "Le champ 'Région' est obligatoire.";
    }

    if (!wilaya?.trim()) {
      newErrors.wilaya = "Le champ 'Wilaya' est obligatoire.";
    }

    return newErrors;
  }, []);

  // Soumission du formulaire
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsSubmitting(true);

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit(formData);
      setShowSuccess(true);
      setErrors({});
      setFormData(initialFormData);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setErrorMessage("Une erreur est survenue lors de l'ajout du dépôt.");
      console.error(error);
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
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      let validCount = 0;
      jsonData.forEach((row) => {
        const rowData = {
          nomDepot: row.nomDepot || "",
          typeDepot: row.typeDepot || "",
          capaciteDepot: row.capaciteDepot || "",
          description: row.description || "",
          region: row.region || "",
          wilaya: row.wilaya || "",
        };

        const error = validateForm(rowData);
        if (Object.keys(error).length === 0) {
          onSubmit(rowData);
          validCount++;
        }
      });

      setMessage(`✅ ${validCount} dépôt(s) valides importé(s) depuis Excel.`);
    };
    reader.readAsArrayBuffer(file);
  }, [onSubmit, validateForm]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un dépôt</h1>
            <p className="text-gray-600">Créez un nouveau dépôt pour votre organisation</p>
          </div>

          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-green-800">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Dépôt créé avec succès !</span>
              </div>
            </div>
          )}

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Depot Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="nomDepot-field"
                  icon={Building}
                  label="Nom du dépôt"
                  name="nomDepot"
                  placeholder="Nom du dépôt"
                  value={formData.nomDepot}
                  onChange={handleChange}
                  error={errors.nomDepot}
                  required
                />
                
                <SelectField
                  key="typeDepot-field"
                  icon={Box}
                  label="Type de dépôt"
                  name="typeDepot"
                  value={formData.typeDepot}
                  onChange={handleChange}
                  error={errors.typeDepot}
                  required
                >
                  <option value="">Sélectionner un type</option>
                  <option value="C">CLR</option>
                </SelectField>
              </div>

              {/* Capacity & Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="capaciteDepot-field"
                  icon={Ruler}
                  label="Capacité du dépôt"
                  type="number"
                  name="capaciteDepot"
                  placeholder="Capacité en unités"
                  value={formData.capaciteDepot}
                  onChange={handleChange}
                  error={errors.capaciteDepot}
                  required
                />
                
                <InputField
                  key="description-field"
                  icon={FileText}
                  label="Description"
                  name="description"
                  placeholder="Description du dépôt"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  key="region-field"
                  icon={MapPin}
                  label="Région"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  error={errors.region}
                  required
                >
                  <option value="">Sélectionner une région</option>
                  {Object.keys(wilayasByRegion).map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </SelectField>
                
                <SelectField
                  key="wilaya-field"
                  icon={MapPin}
                  label="Wilaya"
                  name="wilaya"
                  value={formData.wilaya}
                  onChange={handleChange}
                  error={errors.wilaya}
                  required
                  disabled={!formData.region}
                >
                  <option value="">Sélectionner une wilaya</option>
                  {formData.region &&
                    wilayasByRegion[formData.region].map((wilaya) => (
                      <option key={wilaya} value={wilaya}>{wilaya}</option>
                    ))}
                </SelectField>
              </div>

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
                      <span>Enregistrer le dépôt</span>
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
                  <p className="text-sm text-gray-600">Importez plusieurs dépôts</p>
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

            {/* View Depots Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <List className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Gérer les dépôts</h3>
                  <p className="text-sm text-gray-600">Voir tous les dépôts</p>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => navigate("/depots")}
              >
                <List className="w-5 h-5" />
                <span>Afficher les dépôts</span>
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

export default AjouterDepotForm;