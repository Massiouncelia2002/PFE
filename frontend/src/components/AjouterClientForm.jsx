import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import * as XLSX from "xlsx";
import AdminLayout from "../pages/AdminLayout";
import { User, Mail, MapPin, Phone, Truck, Check, AlertCircle, Upload, Users, X } from "lucide-react";
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

const AjouterClientForm = React.memo(({ onSubmit }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);

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
  const [importErrors, setImportErrors] = useState([]);
  const [addedLines, setAddedLines] = useState([]);

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

  const validateForm = useCallback(() => {
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

    setErreurs(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setMessage("");
    setIsSubmitting(true);

    if (validateForm()) {
      try {
        const response = await fetch("/client", {
          method: "POST",
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
            setErreurs(backendErrors);
          }
          throw new Error(data.message || "Erreur lors de la création du client");
        }

        setShowSuccess(true);
        setErreurs({});
        setFormData(initialFormData);
        setMessage(data.message || "Client créé avec succès");
        
        setTimeout(() => {
          setShowSuccess(false);
          setMessage("");
        }, 3000);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    setIsSubmitting(false);
  }, [formData, initialFormData, validateForm]);

const handleFileUpload = useCallback(async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setMessage("");
  setErrorMessage("");
  setImportErrors([]);
  setAddedLines([]);

  // Vérifier l'extension du fichier
  const fileExtension = file.name.split('.').pop().toLowerCase();
  if (!['xlsx', 'xls'].includes(fileExtension)) {
    setErrorMessage("Format de fichier non supporté. Veuillez importer un fichier Excel (.xlsx ou .xls)");
    return;
  }

  const reader = new FileReader();

  reader.onload = async (event) => {
    try {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      if (workbook.SheetNames.length === 0) {
        setErrorMessage("Le fichier Excel ne contient aucune feuille de calcul");
        return;
      }

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      if (jsonData.length === 0) {
        setErrorMessage("La feuille Excel est vide");
        return;
      }

      const validationErrors = validateExcelData(jsonData);
      if (validationErrors.length > 0) {
        setImportErrors(validationErrors);
        setErrorMessage(`Erreurs de validation dans le fichier Excel (${validationErrors.length} erreurs)`);
        return;
      }

      // Envoi fichier au backend
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:5000/client/import/excel", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.detailedErrors) {
          setImportErrors(result.detailedErrors);
        }
        throw new Error(result.message || "Erreur lors de l'importation");
      }

      // ✅ Déduction des lignes insérées avec succès
      const totalLines = jsonData.length;
      const failedLines = (result.detailedErrors || []).map(err => err.line);
      const successfulLines = [];

      for (let i = 2; i < totalLines + 2; i++) {
        if (!failedLines.includes(i)) {
          successfulLines.push(i);
        }
      }

      if (successfulLines.length > 0) {
        setMessage(`Import réussi : lignes ajoutées ${successfulLines.join(", ")}`);
      }

      if (result.detailedErrors?.length) {
        setImportErrors(result.detailedErrors);
        setErrorMessage(`Import partiel : ${result.detailedErrors.length} erreurs`);
      }
    } catch (error) {
      setErrorMessage(error.message || "Une erreur est survenue lors de l'importation");
    }
  };

  reader.onerror = () => {
    setErrorMessage("Erreur lors de la lecture du fichier");
  };

  reader.readAsArrayBuffer(file);
}, []);





// Fonction de validation des données Excel
const validateExcelData = useCallback((data) => {
  const errors = [];
  
  data.forEach((row, index) => {
    const lineNumber = index + 2; // +2 car l'index commence à 0 et on compte l'en-tête
    
    if (!row.nomClient) {
      errors.push({
        line: lineNumber,
        message: "Le nom du client est obligatoire",
        details: row
      });
    }
    
    if (row.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
      errors.push({
        line: lineNumber,
        message: "Format d'email invalide",
        details: row
      });
    }
    
    if (!row.adress) {
      errors.push({
        line: lineNumber,
        message: "L'adresse est obligatoire",
        details: row
      });
    }
    
    if (!row.tel) {
      errors.push({
        line: lineNumber,
        message: "Le téléphone est obligatoire",
        details: row
      });
    } else if (row.telType === "cellulaire" && !/^0[567]\d{8}$/.test(row.tel)) {
      errors.push({
        line: lineNumber,
        message: "Numéro cellulaire invalide. Doit commencer par 05, 06 ou 07 et contenir 10 chiffres",
        details: row
      });
    } else if (row.telType === "fixe" && !/^\d{9}$/.test(row.tel)) {
      errors.push({
        line: lineNumber,
        message: "Numéro fixe invalide. Doit contenir exactement 9 chiffres",
        details: row
      });
    }
  });
  
  return errors;
}, []);







  const ImportErrorsList = () => {
  if (importErrors.length === 0) return null;

  return (
    <div className="mt-6 bg-red-50 border border-red-200 rounded-xl overflow-hidden">
      <div className="p-4 bg-red-100 border-b border-red-200 flex items-center">
        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
        <h3 className="font-medium text-red-800">
          Erreurs lors de l'import ({importErrors.length} ligne(s) en erreur)
        </h3>
      </div>
      <div className="max-h-64 overflow-y-auto">
        {importErrors.map((error, index) => (
          <div key={index} className="p-3 border-b border-red-100 last:border-b-0 hover:bg-red-50">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <X className="w-4 h-4 text-red-500" />
              </div>
              <div className="ml-2">
                <p className="text-sm font-medium text-red-800">
                  Ligne {error.line}: {error.message}
                </p>
                {error.details && (
                  <div className="text-xs text-red-600 mt-1 space-y-1">
                    {error.details.nomClient && <div>Nom: {error.details.nomClient}</div>}
                    {error.details.email && <div>Email: {error.details.email}</div>}
                    {error.details.tel && <div>Téléphone: {error.details.tel}</div>}
                    {error.details.adress && <div>Adresse: {error.details.adress}</div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};





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
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajouter un client</h1>
            <p className="text-gray-600">Créez un nouveau compte client pour votre organisation</p>
          </div>

          {showSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-in slide-in-from-top-4 duration-300">
              <div className="flex items-center text-green-800">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">{message || "Client créé avec succès !"}</span>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
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

              <SelectField
                icon={Truck}
                label="Dépôt associé"
                name="codeDepot"
                value={formData.codeDepot}
                onChange={handleChange}
                error={erreurs.codeDepot}
                required
              >
                <option value="">Sélectionner un dépôt</option>
                {depots.map((depot) => (
                  <option key={depot.codeDepot} value={depot.codeDepot}>
                    {depot.nomDepot} - {depot.wilaya}
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
                      <span>Enregistrer le client</span>
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

          {message && !showSuccess && (
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

          <ImportErrorsList />
        </div>
      </div>
    </AdminLayout>
  );
});

export default AjouterClientForm;