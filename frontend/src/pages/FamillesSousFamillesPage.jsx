import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import AdminLayout from "./AdminLayout";
import { Edit3, Trash2, Plus, X, ChevronRight, Folder, FolderOpen } from "lucide-react";

// Composant Card optimisé
const Card = React.memo(({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </div>
));

const FamillesSousFamillesPage = () => {
  // États initiaux
  const [familles, setFamilles] = useState([]);
  const [allSousFamilles, setAllSousFamilles] = useState([]);
  const [selectedFamille, setSelectedFamille] = useState(null);
  const [familleForm, setFamilleForm] = useState({ nomFamille: "" });
  const [sousFamilleForm, setSousFamilleForm] = useState({ nomSousFamille: "" });
  const [editingFamille, setEditingFamille] = useState(null);
  const [editingSousFamille, setEditingSousFamille] = useState(null);

  // Sous-familles filtrées mémoïsées
  const sousFamilles = useMemo(() => {
    return selectedFamille 
      ? allSousFamilles.filter(sf => sf.codeFamille === selectedFamille.codeFamille)
      : [];
  }, [selectedFamille, allSousFamilles]);

  // Chargement des données
  const fetchData = useCallback(async () => {
    try {
      const [famillesRes, sousFamillesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/familles"),
        axios.get("http://localhost:5000/api/sous-familles")
      ]);
      setFamilles(famillesRes.data);
      setAllSousFamilles(sousFamillesRes.data);
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Gestion des familles
  const handleFamilleSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (editingFamille) {
        const hasSousFamilles = allSousFamilles.some(sf => sf.codeFamille === editingFamille.codeFamille);
        if (hasSousFamilles) {
          alert("Impossible de modifier une famille avec des sous-familles");
          return;
        }

        const res = await axios.put(
          `http://localhost:5000/api/familles/${editingFamille.codeFamille}`,
          { nomFamille: familleForm.nomFamille }
        );
        setFamilles(prev =>
          prev.map(f => f.codeFamille === res.data.codeFamille ? res.data : f)
        );
        setEditingFamille(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/familles",
          familleForm
        );
        setFamilles(prev => [...prev, res.data]);
      }
      setFamilleForm({ nomFamille: "" });
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
    }
  }, [editingFamille, familleForm, allSousFamilles]);

  // Gestion des sous-familles
  const handleSousFamilleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!selectedFamille) return;

    try {
      const payload = {
        nomSousFamille: sousFamilleForm.nomSousFamille,
        codeFamille: selectedFamille.codeFamille
      };

      if (editingSousFamille) {
        const res = await axios.put(
          `http://localhost:5000/api/sous-familles/${editingSousFamille.codeSousFamille}`,
          payload
        );
        setAllSousFamilles(prev =>
          prev.map(sf => sf.codeSousFamille === res.data.codeSousFamille ? res.data : sf)
        );
        setEditingSousFamille(null);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/sous-familles",
          payload
        );
        setAllSousFamilles(prev => [...prev, res.data]);
      }
      setSousFamilleForm({ nomSousFamille: "" });
    } catch (error) {
      console.error("Erreur :", error.response?.data || error.message);
    }
  }, [selectedFamille, sousFamilleForm, editingSousFamille]);

  // Suppression d'une famille
  const handleDeleteFamille = useCallback(async (famille) => {
    if (!window.confirm(`Supprimer la famille ${famille.nomFamille} ?`)) return;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/familles/${famille.codeFamille}`
      );

      if (response.data.success) {
        setFamilles(prev => prev.filter(f => f.codeFamille !== famille.codeFamille));
        setSelectedFamille(prev =>
          prev?.codeFamille === famille.codeFamille ? null : prev
        );
        alert(response.data.message);
      }
    } catch (error) {
      let errorMessage = "Erreur lors de la suppression";

      if (error.response) {
        errorMessage = `
          Code: ${error.response.status}
          Message: ${error.response.data.message || 'Erreur inconnue'}
          ${error.response.data.details ? `Détails: ${error.response.data.details}` : ''}
        `;
      }

      alert(errorMessage);
      console.error("Erreur détaillée:", error);
    }
  }, []);

  // Suppression d'une sous-famille
  const handleDeleteSousFamille = useCallback(async (sousFamille) => {
    if (!window.confirm("Supprimer cette sous-famille ?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/sous-familles/${sousFamille.codeSousFamille}`);
      setAllSousFamilles(prev => prev.filter(sf => sf.codeSousFamille !== sousFamille.codeSousFamille));
    } catch (error) {
      console.error("Erreur suppression sous-famille :", error.response?.data || error.message);
    }
  }, []);

  // Gestion de la sélection de famille
  const handleSelectFamille = useCallback((famille) => {
    setSelectedFamille(famille);
    setEditingFamille(null);
    setFamilleForm({ nomFamille: "" });
  }, []);

  // Gestion de l'édition de famille
  const handleEditFamille = useCallback((famille, e) => {
    e.stopPropagation();
    const sousFamilleCount = allSousFamilles.filter(sf => sf.codeFamille === famille.codeFamille).length;
    if (sousFamilleCount === 0) {
      setEditingFamille(famille);
      setFamilleForm({ nomFamille: famille.nomFamille });
    }
  }, [allSousFamilles]);

  // Gestion de l'édition de sous-famille
  const handleEditSousFamille = useCallback((sousFamille) => {
    setEditingSousFamille(sousFamille);
    setSousFamilleForm({ nomSousFamille: sousFamille.nomSousFamille });
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Gestion des Familles & Sous-Familles
            </h1>
            <p className="text-gray-600 text-lg">
              Organisez et gérez vos catégories de produits de manière intuitive
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Section Familles */}
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Folder className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Familles</h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    key="famille-input"
                    placeholder="Nom de la famille"
                    value={familleForm.nomFamille}
                    onChange={(e) => setFamilleForm({ nomFamille: e.target.value })}
                    required
                    className="flex-1"
                    autoComplete="new-password"
                  />
                  <Button 
                    onClick={handleFamilleSubmit}
                    size="md"
                    disabled={!familleForm.nomFamille.trim()}
                  >
                    {editingFamille ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {editingFamille ? "Modifier" : "Ajouter"}
                  </Button>
                  {editingFamille && (
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => {
                        setEditingFamille(null);
                        setFamilleForm({ nomFamille: "" });
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                {familles.map(famille => {
                  const sousFamilleCount = allSousFamilles.filter(sf => sf.codeFamille === famille.codeFamille).length;
                  const isSelected = selectedFamille?.codeFamille === famille.codeFamille;
                  
                  return (
                    <div
                      key={`famille-${famille.codeFamille}`}
                      className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-md' 
                          : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                      }`}
                      onClick={() => handleSelectFamille(famille)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isSelected ? (
                            <FolderOpen className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Folder className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                          )}
                          <div>
                            <h3 className="font-medium text-gray-900">{famille.nomFamille}</h3>
                            <p className="text-sm text-gray-500">Code: {famille.codeFamille}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {sousFamilleCount > 0 && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                              {sousFamilleCount}
                            </span>
                          )}
                          
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => handleEditFamille(famille, e)}
                              className={`p-2 rounded-lg transition-colors ${
                                sousFamilleCount > 0 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-blue-600 hover:bg-blue-100'
                              }`}
                              disabled={sousFamilleCount > 0}
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFamille(famille);
                              }}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Section Sous-Familles */}
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FolderOpen className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Sous-Familles</h2>
              </div>

              {selectedFamille ? (
                <>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div>
                      <h3 className="font-medium text-blue-900">{selectedFamille.nomFamille}</h3>
                      <p className="text-sm text-blue-600">Famille sélectionnée</p>
                    </div>
                    <button
                      onClick={() => setSelectedFamille(null)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        key="sous-famille-input"
                        placeholder="Nom de la sous-famille"
                        value={sousFamilleForm.nomSousFamille}
                        onChange={(e) => setSousFamilleForm({ nomSousFamille: e.target.value })}
                        required
                        className="flex-1"
                        autoComplete="new-password"
                      />
                      <Button 
                        onClick={handleSousFamilleSubmit}
                        size="md"
                        disabled={!sousFamilleForm.nomSousFamille.trim()}
                      >
                        {editingSousFamille ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        {editingSousFamille ? "Modifier" : "Ajouter"}
                      </Button>
                      {editingSousFamille && (
                        <Button
                          variant="ghost"
                          size="md"
                          onClick={() => {
                            setEditingSousFamille(null);
                            setSousFamilleForm({ nomSousFamille: "" });
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {sousFamilles.map(sousFamille => (
                      <div
                        key={`sous-famille-${sousFamille.codeSousFamille}`}
                        className="group p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{sousFamille.nomSousFamille}</h4>
                            <p className="text-sm text-gray-500">Code: {sousFamille.codeSousFamille}</p>
                          </div>
                          
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditSousFamille(sousFamille)}
                              className="p-2 rounded-lg text-blue-600 hover:bg-blue-100 transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSousFamille(sousFamille)}
                              className="p-2 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Folder className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Sélectionnez une famille</p>
                  <p className="text-sm text-gray-400 mt-1">pour gérer ses sous-familles</p>
                </div>
              )}
            </Card>

            {/* Tableau Récapitulatif */}
            <Card className="p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FolderOpen className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Vue d'ensemble</h2>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {familles.map(famille => {
                  const familleChildren = allSousFamilles.filter(sf => sf.codeFamille === famille.codeFamille);
                  
                  return (
                    <div key={`overview-${famille.codeFamille}`} className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <Folder className="w-5 h-5 text-blue-600" />
                          <div>
                            <h3 className="font-semibold text-gray-900">{famille.nomFamille}</h3>
                            <p className="text-sm text-gray-600">Code: {famille.codeFamille}</p>
                          </div>
                          <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {familleChildren.length} sous-famille{familleChildren.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>
                      
                      {familleChildren.length > 0 && (
                        <div className="p-4 space-y-2">
                          {familleChildren.map(sf => (
                            <div
                              key={`overview-sf-${sf.codeSousFamille}`}
                              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-800">{sf.nomSousFamille}</p>
                                <p className="text-sm text-gray-500">Code: {sf.codeSousFamille}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default React.memo(FamillesSousFamillesPage);