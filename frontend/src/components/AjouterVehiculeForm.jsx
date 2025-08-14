import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { Car, Gauge, CheckCircle, Upload, AlertCircle, Check, List, Warehouse } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const AjouterVehiculeForm = React.memo(({ onSubmit }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const statuts = useMemo(() => ["disponible", "non-disponible"], []);
  const [depots, setDepots] = useState([]);

  const initialFormData = useMemo(() => ({
    matricule: "",
    capaciteVehicule: "",
    statut: "disponible",
    codeDepot: ""
  }), []);

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [erreurs, setErreurs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const validateForm = useCallback(() => {
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

    if (!formData.codeDepot) {
      newErrors.codeDepot = "Le dépôt est requis.";
    }

    setErreurs(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await onSubmit(formData);

        if (response?.errors) {
          setErreurs(response.errors);
          if (response.errors.matricule) {
            setErrorMessage(response.errors.matricule);
          } else if (response.errors.capaciteVehicule) {
            setErrorMessage(response.errors.capaciteVehicule);
          } else if (response.errors.statut) {
            setErrorMessage(response.errors.statut);
          } else if (response.errors.codeDepot) {
            setErrorMessage(response.errors.codeDepot);
          }
        } else {
          setShowSuccess(true);
          setErreurs({});
          setFormData(initialFormData);

          setTimeout(() => setShowSuccess(false), 3000);
        }
      } catch (error) {
        if (error.response?.data?.errors) {
          setErreurs(error.response.data.errors);
        }
        setErrorMessage(error.response?.data?.message || "Une erreur est survenue lors de l'ajout du véhicule.");
      }
    }
    setIsSubmitting(false);
  }, [formData, initialFormData, onSubmit, validateForm]);

 

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); 

    fetch("http://localhost:5000/vehicules/import/excel", {
      method: "POST",
      body: formData,
    })

      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw result;

        setMessage(`${result.message || "Importation réussie"}`);
        setErreurs({});
      })
      

      .catch((error) => {
        console.error("Erreur d'importation:", error);

        if (Array.isArray(error?.details)) {
         
          const lignes = error.details.map(
            (e) => `Ligne ${e.ligne} : ${e.erreurs.join(", ")}`
          );

          setErreurs({ import: lignes });
          setErrorMessage(error.message || "Certaines lignes du fichier Excel sont incorrectes.");
        } else if (typeof error?.details === "string") {
        
          setErrorMessage("Erreur interne : " + error.details);
          setErreurs({});
        } else {
     
          setErrorMessage(error.message || "Erreur lors de l'importation.");
          setErreurs({});
        }
      });


  }, []);



  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un véhicule</h1>
            <p className="text-gray-600">Enregistrez un nouveau véhicule dans votre flotte</p>
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-green-800">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Véhicule créé avec succès !</span>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  key="matricule-field"
                  icon={Car}
                  label="Matricule"
                  name="matricule"
                  placeholder="Ex: 12345678901"
                  value={formData.matricule}
                  onChange={handleChange}
                  error={erreurs.matricule}
                  required
                />

                <InputField
                  key="capacite-field"
                  icon={Gauge}
                  label="Capacité (Palette)"
                  type="number"
                  name="capaciteVehicule"
                  placeholder="Capacité en Palette"
                  value={formData.capaciteVehicule}
                  onChange={handleChange}
                  error={erreurs.capaciteVehicule}
                  required
                />
              </div>

              <SelectField
                key="statut-field"
                icon={CheckCircle}
                label="Statut"
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                error={erreurs.statut}
                required
              >
                {statuts.map((s, idx) => (
                  <option key={idx} value={s}>{s}</option>
                ))}
              </SelectField>

              <SelectField
                key="depot-field"
                icon={Warehouse}
                label="Dépôt"
                name="codeDepot"
                value={formData.codeDepot}
                onChange={handleChange}
                error={erreurs.codeDepot}
                required
              >
                <option value="">-- Sélectionnez un dépôt --</option>
                {depots.map((depot) => (
                  <option key={depot.codeDepot} value={depot.codeDepot}>
                    {depot.nomDepot} ({depot.codeDepot})
                  </option>
                ))}
              </SelectField>

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
                      <span>Enregistrer le véhicule</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Import Excel</h3>
                  <p className="text-sm text-gray-600">Importez plusieurs véhicules</p>
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

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-200 hover:scale-105">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                  <List className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Gérer les véhicules</h3>
                  <p className="text-sm text-gray-600">Voir tous les véhicules</p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => navigate("/vehicules")}
              >
                <List className="w-5 h-5" />
                <span>Afficher les véhicules</span>
              </Button>
            </div>
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

          {erreurs.import && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex flex-col space-y-2 text-red-800">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">Erreurs dans le fichier Excel :</span>
                </div>
                <ul className="list-disc pl-5 space-y-1">
                  {Array.isArray(erreurs.import) ? (
                    erreurs.import.map((err, index) => (
                      <li key={index}>{err}</li>
                    ))
                  ) : (
                    <li>{erreurs.import}</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
});

export default AjouterVehiculeForm;