import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Box, Search, List, Check, AlertCircle, Plus } from "lucide-react";


const InputField = React.memo(({ icon: Icon, error, label, className = "", ...props }) => {
  const inputRef = React.useRef(null);
  
  React.useEffect(() => {
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

const Articles = () => {
  const navigate = useNavigate();
  

  const initialFormData = useMemo(() => ({
    designation: "",
    codeFamille: "",
    codeSousFamille: "",
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [familles, setFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [filteredSousFamilles, setFilteredSousFamilles] = useState([]);
  const [selectedSousFamille, setSelectedSousFamille] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const fetchFamilles = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/familles/with-sous-familles");
      const famillesFormatted = res.data.map((f) => ({
        value: f.codeFamille,
        label: f.nomFamille,
        sousFamilles: f.SousFamilles.map((sf) => ({
          value: sf.codeSousFamille,
          label: sf.nomSousFamille,
        })),
      }));
      setFamilles(famillesFormatted);
    } catch (error) {
      console.error("Erreur récupération familles :", error);
      setErrorMessage("Erreur lors du chargement des familles");
    }
  }, []);

  useEffect(() => {
    fetchFamilles();
  }, [fetchFamilles]);

 
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  }, [errors]);


  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.designation) {
      newErrors.designation = "La désignation est requise.";
    } else if (!isNaN(formData.designation)) {
      newErrors.designation = "La désignation ne peut pas être uniquement des chiffres.";
    }

    if (!selectedFamille) {
      newErrors.codeFamille = "La famille est requise.";
    }

    if (!selectedSousFamille) {
      newErrors.codeSousFamille = "La sous-famille est requise.";
    }

    return newErrors;
  }, [formData.designation, selectedFamille, selectedSousFamille]);

  
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const data = {
      ...formData,
      codeFamille: selectedFamille?.value,
      codeSousFamille: selectedSousFamille?.value,
    };

    try {
      await axios.post("http://localhost:5000/api/articles", data);
      setShowSuccess(true);
      setFormData(initialFormData);
      setSelectedFamille(null);
      setSelectedSousFamille(null);
      setErrors({});
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur ajout article", error);
      setErrorMessage("Erreur lors de l'ajout de l'article");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, initialFormData, selectedFamille, selectedSousFamille, validateForm]);


  const handleFamilleChange = useCallback((option) => {
    setSelectedFamille(option);
    setFilteredSousFamilles(option?.sousFamilles || []);
    setSelectedSousFamille(null);
    
    if (errors.codeFamille) {
      setErrors(prev => ({ ...prev, codeFamille: "" }));
    }
  }, [errors.codeFamille]);

  
  const handleSousFamilleChange = useCallback((option) => {
    setSelectedSousFamille(option);
    
    if (errors.codeSousFamille) {
      setErrors(prev => ({ ...prev, codeSousFamille: "" }));
    }
  }, [errors.codeSousFamille]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
         
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <Box className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un article</h1>
            <p className="text-gray-600">Créez un nouvel article pour votre catalogue</p>
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-green-800">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Article ajouté avec succès !</span>
              </div>
            </div>
          )}

    
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
            
              <div className="grid grid-cols-1 gap-6">
                <InputField
                  key="designation-field"
                  icon={Box}
                  label="Désignation"
                  name="designation"
                  placeholder="Nom de l'article"
                  value={formData.designation}
                  onChange={handleChange}
                  error={errors.designation}
                  required
                />
              </div>

              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Search className="inline mr-2 w-4 h-4" />
                    Famille
                  </label>
                  <Select
                    key="famille-select"
                    options={familles}
                    value={selectedFamille}
                    onChange={handleFamilleChange}
                    placeholder="Rechercher une famille..."
                    isClearable
                    className={`react-select-container ${errors.codeFamille ? 'border-red-500' : ''}`}
                    classNamePrefix="react-select"
                  />
                  {errors.codeFamille && (
                    <div className="flex items-center mt-2 text-red-500 text-sm animate-in slide-in-from-top-2 duration-200">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.codeFamille}
                    </div>
                  )}
                </div>

                <div className="relative group">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Search className="inline mr-2 w-4 h-4" />
                    Sous-famille
                  </label>
                  <Select
                    key="sous-famille-select"
                    options={filteredSousFamilles}
                    value={selectedSousFamille}
                    onChange={handleSousFamilleChange}
                    placeholder="Rechercher une sous-famille..."
                    isDisabled={!selectedFamille}
                    isClearable
                    className={`react-select-container ${errors.codeSousFamille ? 'border-red-500' : ''}`}
                    classNamePrefix="react-select"
                  />
                  {errors.codeSousFamille && (
                    <div className="flex items-center mt-2 text-red-500 text-sm animate-in slide-in-from-top-2 duration-200">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.codeSousFamille}
                    </div>
                  )}
                </div>
              </div>

           
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
                      <Plus className="w-5 h-5" />
                      <span>Ajouter l'article</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <List className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gérer les articles</h3>
                <p className="text-sm text-gray-600">Voir tous les articles</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => navigate("/liste-articles")}
            >
              <List className="w-5 h-5" />
              <span>Afficher les articles</span>
            </Button>
          </div>

          
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
};

export default React.memo(Articles);