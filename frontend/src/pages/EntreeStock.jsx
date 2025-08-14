import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import AdminLayoutDepot from "./AdminLayoutDepot";
import Select from "react-select";
import { Package, Calendar, ShoppingCart, Save, Search, Plus, Trash2, Check, Upload, FileText, FileSpreadsheet, X } from "lucide-react";

const EntreeStock = () => {
    const [depots, setDepots] = useState([]);
    const [selectedDepot, setSelectedDepot] = useState(null);
    const [articles, setArticles] = useState([]);
    const [entrees, setEntrees] = useState({});
    const [dateEntree, setDateEntree] = useState("");
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showImportOptions, setShowImportOptions] = useState(false);
    const [importFile, setImportFile] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [importPreview, setImportPreview] = useState([]);
    const [showPreview, setShowPreview] = useState(false);

    const filteredArticles = articles.filter((article) =>
        article.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.codeArticle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectArticle = (article) => {
        const exists = selectedArticles.find(a => a.codeArticle === article.codeArticle);
        if (!exists) {
            setSelectedArticles([...selectedArticles, { ...article, quantiteEntree: "", commentaire: "" }]);
        }
    };

    useEffect(() => {
        fetchDepots();
    }, []);

    useEffect(() => {
        if (selectedDepot) {
            fetchArticles(selectedDepot.codeDepot);
        }
    }, [selectedDepot]);

    const fetchDepots = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/depot/mes-depots", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDepots(res.data);
            if (res.data.length === 1) {
                setSelectedDepot(res.data[0]);
            }
        } catch (err) {
            console.error("Erreur récupération dépôts :", err);
        }
    };

    const fetchArticles = async (codeDepot) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setArticles(res.data);
        } catch (err) {
            console.error("Erreur récupération des articles :", err);
        }
    };

    const handleChange = (e, codeArticle, field) => {
        setEntrees({
            ...entrees,
            [codeArticle]: {
                ...entrees[codeArticle],
                [field]: e.target.value
            }
        });
    };

    const handleSaveEntree = async () => {
        const dateNow = new Date();
        const dateChoisie = new Date(dateEntree);

        if (!dateEntree) {
            alert("La date d'entrée est obligatoire.");
            return;
        }

        if (dateChoisie > dateNow) {
            alert("La date d'entrée ne peut pas être dans le futur.");
            return;
        }

        const articlesPayload = Object.entries(entrees)
            .filter(([_, entry]) => parseFloat(entry.quantiteEntree) > 0)
            .map(([codeArticle, entry]) => ({
                codeArticle,
                quantiteEntree: parseFloat(entry.quantiteEntree),
                commentaire: entry.commentaire?.trim() || ""
            }));

        if (articlesPayload.length === 0) {
            alert("Aucune entrée valide à enregistrer.");
            return;
        }

        const confirmed = window.confirm("Confirmer l'enregistrement de l'entrée pour les articles sélectionnés ?");
        if (!confirmed) return;

        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            await axios.post("http://localhost:5000/entree/entrees", {
                codeDepot: selectedDepot.codeDepot,
                dateEntree,
                articles: articlesPayload
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            setShowSuccess(true);
            setEntrees({});
            setDateEntree("");
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error("❌ Erreur lors de l'enregistrement :", err);
            const msg = err.response?.data?.message || "Erreur lors de l'enregistrement.";
            alert("Erreur : " + msg);
        }

        setLoading(false);
    };

    const removeArticleEntry = (codeArticle) => {
        const newEntrees = { ...entrees };
        delete newEntrees[codeArticle];
        setEntrees(newEntrees);
    };

    const hasValidEntries = Object.values(entrees).some(entry => parseFloat(entry.quantiteEntree) > 0);

    
    const handleFileSelect = (file) => {
        setImportFile(file);
        if (file) {
            if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
                parseCSVFile(file);
            } else {
                alert('Veuillez sélectionner un fichier CSV');
                setImportFile(null);
            }
        }
    };

    const parseCSVFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const lines = text.split('\n').filter(line => line.trim());
                const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
                
                const expectedHeaders = ['Code Article', 'Quantité', 'Commentaire'];
                const hasValidHeaders = expectedHeaders.every(h => 
                    headers.some(header => header.toLowerCase().includes(h.toLowerCase()))
                );

                if (!hasValidHeaders) {
                    alert('Format CSV invalide. Colonnes attendues: Code Article, Quantité, Commentaire');
                    return;
                }

                const data = lines.slice(1).map(line => {
                    const values = line.split(',').map(v => v.replace(/"/g, '').trim());
                    const codeArticleIndex = headers.findIndex(h => h.toLowerCase().includes('code'));
                    const quantiteIndex = headers.findIndex(h => h.toLowerCase().includes('quantité') || h.toLowerCase().includes('quantite'));
                    const commentaireIndex = headers.findIndex(h => h.toLowerCase().includes('commentaire'));

                    return {
                        codeArticle: values[codeArticleIndex] || '',
                        quantiteEntree: values[quantiteIndex] || '',
                        commentaire: values[commentaireIndex] || ''
                    };
                }).filter(item => item.codeArticle && item.quantiteEntree);

                setImportPreview(data);
                setShowPreview(true);
            } catch (error) {
                alert('Erreur lors de la lecture du fichier CSV');
                console.error(error);
            }
        };
        reader.readAsText(file);
    };

    const applyImport = () => {
        const newEntrees = { ...entrees };
        let appliedCount = 0;

        importPreview.forEach(item => {
            const articleExists = articles.find(a => a.codeArticle === item.codeArticle);
            if (articleExists && parseFloat(item.quantiteEntree) > 0) {
                newEntrees[item.codeArticle] = {
                    quantiteEntree: item.quantiteEntree,
                    commentaire: item.commentaire || ''
                };
                appliedCount++;
            }
        });

        setEntrees(newEntrees);
        setShowPreview(false);
        setImportFile(null);
        setShowImportOptions(false);
        
        alert(`Import réussi ! ${appliedCount} entrées ont été appliquées.`);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    return (
        <AdminLayoutDepot
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        >
          
            {showImportOptions && (
                <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowImportOptions(false)}
                ></div>
            )}

            
            {showPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Prévisualisation de l'import
                                </h3>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                {importPreview.length} entrées détectées
                            </p>
                        </div>
                        
                        <div className="p-6 overflow-y-auto max-h-96">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 dark:bg-gray-700">
                                            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Code Article
                                            </th>
                                            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Quantité
                                            </th>
                                            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Commentaire
                                            </th>
                                            <th className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300">
                                                Statut
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {importPreview.map((item, index) => {
                                            const articleExists = articles.find(a => a.codeArticle === item.codeArticle);
                                            const isValid = articleExists && parseFloat(item.quantiteEntree) > 0;
                                            
                                            return (
                                                <tr key={index} className={`${isValid ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                                                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-white">
                                                        {item.codeArticle}
                                                    </td>
                                                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-white">
                                                        {item.quantiteEntree}
                                                    </td>
                                                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-white">
                                                        {item.commentaire || '-'}
                                                    </td>
                                                    <td className="border border-gray-200 dark:border-gray-600 px-4 py-2">
                                                        {isValid ? (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200">
                                                                <Check className="w-3 h-3 mr-1" />
                                                                Valide
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                                                                <X className="w-3 h-3 mr-1" />
                                                                {!articleExists ? 'Article introuvable' : 'Quantité invalide'}
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                            <Button
                                variant="secondary"
                                onClick={() => setShowPreview(false)}
                            >
                                Annuler
                            </Button>
                            <Button
                                onClick={applyImport}
                                disabled={importPreview.filter(item => {
                                    const articleExists = articles.find(a => a.codeArticle === item.codeArticle);
                                    return articleExists && parseFloat(item.quantiteEntree) > 0;
                                }).length === 0}
                            >
                                Appliquer l'import
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccess && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-2">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">Entrée enregistrée avec succès!</span>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto p-6">
                
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 shadow-xl">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Gestion des Entrées de Stock
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Gérez vos entrées de stock  
                    </p>
                </div>

               
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 mb-8 hover:shadow-3xl transition-all duration-500">
                    
                  
                    <div className="mb-8">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50">
                            <div className="flex items-center space-x-3 mb-2">
                                <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                <label className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Dépôt affecté
                                </label>
                            </div>
                            <div className="bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 dark:border-gray-600/50">
                                <span className="text-xl font-bold text-gray-800 dark:text-white">
                                    {selectedDepot?.nomDepot || "Aucun dépôt sélectionné"}
                                </span>
                                {selectedDepot && (
                                    <span className="ml-3 px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                        {selectedDepot.codeDepot}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                   
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                <label className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Date d'entrée (commune à tous les articles)
                                </label>
                            </div>
                            <Input
                                type="date"
                                value={dateEntree}
                                onChange={(e) => setDateEntree(e.target.value)}
                                className="text-lg"
                            />
                        </div>

                    
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <Upload className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                <label className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Importer les données
                                </label>
                            </div>
                            <div className="relative">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowImportOptions(!showImportOptions)}
                                    className="w-full justify-between text-lg"
                                >
                                    <div className="flex items-center space-x-2">
                                        <Upload className="w-5 h-5" />
                                        <span>Importer</span>
                                    </div>
                                    <div className={`transform transition-transform duration-300 ${showImportOptions ? 'rotate-180' : ''}`}>
                                        ▼
                                    </div>
                                </Button>

                               
                                {showImportOptions && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-600 z-20 overflow-hidden">
                                        <div className="p-4">
                                           
                                            <div
                                                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                                                    dragOver 
                                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                                                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                                                }`}
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={handleDrop}
                                            >
                                                <div className="flex flex-col items-center space-y-3">
                                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                        <FileSpreadsheet className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                                            Glissez votre fichier CSV ici
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            ou cliquez pour sélectionner
                                                        </p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        accept=".csv"
                                                        onChange={(e) => handleFileSelect(e.target.files[0])}
                                                        className="hidden"
                                                        id="csvInput"
                                                    />
                                                    <Button
                                                        variant="secondary"
                                                        onClick={() => document.getElementById('csvInput').click()}
                                                        className="mt-2"
                                                    >
                                                        Sélectionner un fichier
                                                    </Button>
                                                </div>
                                            </div>

                                        
                                            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Format CSV attendu :
                                                </p>
                                                <code className="text-xs bg-white dark:bg-gray-800 p-2 rounded block">
                                                    Code Article,Quantité,Commentaire<br/>
                                                    ART001,10,Nouvelle livraison<br/>
                                                    ART002,5,Stock de sécurité
                                                </code>
                                            </div>

                                            {importFile && (
                                                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <Check className="w-5 h-5 text-green-600" />
                                                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                                                {importFile.name}
                                                            </span>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setImportFile(null);
                                                                setImportPreview([]);
                                                                setShowPreview(false);
                                                            }}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                  
                    <div className="mb-8">
                        <div className="relative max-w-md">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Rechercher un article..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12"
                            />
                        </div>
                    </div>

            
                    {filteredArticles.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-xl text-gray-500 dark:text-gray-400">
                                Aucun article trouvé
                            </p>
                        </div>
                    )}

                    {filteredArticles.length > 0 && (
                        <div className="space-y-6">
                            {filteredArticles.map((article, index) => {
                                const entry = entrees[article.codeArticle] || {};
                                const hasEntry = parseFloat(entry.quantiteEntree) > 0;
                                
                                return (
                                    <div
                                        key={article.codeArticle}
                                        className={`group relative bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${
                                            hasEntry 
                                                ? 'border-green-300 dark:border-green-600 shadow-lg shadow-green-100 dark:shadow-green-900/20' 
                                                : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                                        }`}
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                       
                                        {hasEntry && (
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full p-2 shadow-lg">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}

                                        
                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                                                    {article.designation}
                                                </h3>
                                                <div className="flex items-center space-x-2">
                                                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                                                        {article.codeArticle}
                                                    </span>
                                                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                                                        {article.codeDepot}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            {hasEntry && (
                                                <Button
                                                    variant="danger"
                                                    onClick={() => removeArticleEntry(article.codeArticle)}
                                                    className="p-2 min-w-0"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>

                                      
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                            <div className="lg:col-span-1">
                                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Quantité à ajouter
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        type="number"
                                                        value={entry.quantiteEntree || ""}
                                                        onChange={(e) => handleChange(e, article.codeArticle, "quantiteEntree")}
                                                        className="text-center text-lg font-bold"
                                                        placeholder="0"
                                                        min="0"
                                                        step="1"
                                                    />
                                                    <Plus className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                </div>
                                            </div>
                                            <div className="lg:col-span-2">
                                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Commentaire (optionnel)
                                                </label>
                                                <textarea
                                                    placeholder="Ajoutez un commentaire sur cette entrée..."
                                                    value={entry.commentaire || ""}
                                                    onChange={(e) => handleChange(e, article.codeArticle, "commentaire")}
                                                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-gray-700 dark:text-white placeholder-gray-400 shadow-sm hover:shadow-md focus:shadow-lg resize-none h-24"
                                                />
                                            </div>
                                        </div>

                                     
                                        <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-700 ${
                                                    hasEntry 
                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 w-full' 
                                                        : 'bg-gradient-to-r from-blue-500 to-purple-500 w-0'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                          
                            <div className="flex justify-center pt-8">
                                <Button
                                    onClick={handleSaveEntree}
                                    disabled={loading || !hasValidEntries || !dateEntree}
                                    className={`text-lg px-12 py-4 ${loading ? 'animate-pulse' : ''}`}
                                >
                                    {loading ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Enregistrement...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Save className="w-5 h-5" />
                                            <span>Enregistrer l'entrée globale</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

             
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Articles totaux</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">{articles.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Entrées saisies</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {Object.values(entrees).filter(entry => parseFloat(entry.quantiteEntree) > 0).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                                <Plus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Quantité totale</p>
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                                    {Object.values(entrees).reduce((sum, entry) => sum + (parseFloat(entry.quantiteEntree) || 0), 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out;
                }
                
                .hover\\:shadow-3xl:hover {
                    box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
                }
            `}</style>
        </AdminLayoutDepot>
    );
};

export default EntreeStock;