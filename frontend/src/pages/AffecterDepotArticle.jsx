import React, { useState, useEffect } from "react";
import { Search, Plus, X, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import AdminLayout from "./AdminLayout";

const AffectationMultiple = () => {
    const [depots, setDepots] = useState([]);
    const [articles, setArticles] = useState([]);
    const [selectedDepots, setSelectedDepots] = useState([]);
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [showDepotList, setShowDepotList] = useState(false);
    const [showArticleList, setShowArticleList] = useState(false);
    const [searchDepot, setSearchDepot] = useState("");
    const [searchArticle, setSearchArticle] = useState("");
    const [message, setMessage] = useState(null);
    const [articlesParDepot, setArticlesParDepot] = useState({});
    const [depotOuvert, setDepotOuvert] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchArticlesPourDepot = async (codeDepot) => {
        if (articlesParDepot[codeDepot]) {
            setDepotOuvert(depotOuvert === codeDepot ? null : codeDepot);
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`);
            const data = await res.json();
            if (res.ok && Array.isArray(data)) {
                setArticlesParDepot((prev) => ({ ...prev, [codeDepot]: data }));
                setDepotOuvert(codeDepot);
            } else {
                setArticlesParDepot((prev) => ({ ...prev, [codeDepot]: [] }));
                setDepotOuvert(codeDepot);
            }
        } catch {
            setArticlesParDepot((prev) => ({ ...prev, [codeDepot]: [] }));
            setDepotOuvert(codeDepot);
        }
    };


    useEffect(() => {
        fetch("http://localhost:5000/depot/")
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.data)) setDepots(data.data);
                else if (Array.isArray(data)) setDepots(data);
                else setDepots([]);
            })
            .catch(() => setDepots([]));
    }, []);

   
    useEffect(() => {
        fetch("http://localhost:5000/api/articles/")
            .then((res) => res.json())
            .then((data) => {
                if (data && Array.isArray(data.data)) setArticles(data.data);
                else if (Array.isArray(data)) setArticles(data);
                else setArticles([]);
            })
            .catch(() => setArticles([]));
    }, []);

   
    const filteredDepots = depots.filter((d) => {
        const code = d.codeDepot?.toLowerCase() || "";
        const nom = d.nomDepot?.toLowerCase() || "";
        const region = d.region?.toLowerCase() || "";
        const wilaya = d.wilaya?.toLowerCase() || "";
        const s = searchDepot.toLowerCase();
        return (
            code.includes(s) || nom.includes(s) || region.includes(s) || wilaya.includes(s)
        );
    });

    
    const filteredArticles = articles.filter((a) => {
        const code = a.codeArticle?.toLowerCase() || "";
        const nom = a.nomArticle?.toLowerCase() || "";
        const s = searchArticle.toLowerCase();
        return code.includes(s) || nom.includes(s);
    });

    
    const toggleDepotSelection = (codeDepot) => {
        setSelectedDepots((prev) =>
            prev.includes(codeDepot)
                ? prev.filter((c) => c !== codeDepot)
                : [...prev, codeDepot]
        );
    };

   
    const toggleSelectAllDepots = () => {
        if (selectedDepots.length === filteredDepots.length) {
            setSelectedDepots([]);
        } else {
            setSelectedDepots(filteredDepots.map((d) => d.codeDepot));
        }
    };

    
    const toggleArticleSelection = (codeArticle) => {
        setSelectedArticles((prev) =>
            prev.includes(codeArticle)
                ? prev.filter((c) => c !== codeArticle)
                : [...prev, codeArticle]
        );
    };

    
    const toggleSelectAllArticles = () => {
        if (selectedArticles.length === filteredArticles.length) {
            setSelectedArticles([]);
        } else {
            setSelectedArticles(filteredArticles.map((a) => a.codeArticle));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (selectedDepots.length === 0 || selectedArticles.length === 0) {
            setMessage({ type: "error", text: "Veuillez choisir au moins un dépôt et un article." });
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/depot/affecter-article", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    codeArticles: selectedArticles,
                    codeDepots: selectedDepots
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: "success", text: data.message || "Affectations réussies !" });
                setSelectedDepots([]);
                setSelectedArticles([]);
            } else {
                setMessage({ type: "error", text: data.message || "Erreur serveur" });
            }
        } catch {
            setMessage({ type: "error", text: "Erreur réseau lors de l'envoi." });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
 <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">
                        Gestion des Affectations
                    </h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Affectez facilement vos articles aux différents dépôts avec notre interface moderne et intuitive
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                            <Plus className="mr-3 text-blue-600" size={28} />
                            Nouvelle Affectation
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Dépôts sélectionnés
                                </label>
                                <div className="min-h-[80px] border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 transition-all duration-200 hover:border-blue-300">
                                    {selectedDepots.length === 0 ? (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <span>Aucun dépôt sélectionné</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedDepots.map((codeDepot) => {
                                                const depot = depots.find((d) => d.codeDepot === codeDepot);
                                                return (
                                                    <span
                                                        key={codeDepot}
                                                        className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors duration-200 group"
                                                        onClick={() => toggleDepotSelection(codeDepot)}
                                                        title="Cliquez pour désélectionner"
                                                    >
                                                        {depot ? `${depot.codeDepot} - ${depot.nomDepot}` : codeDepot}
                                                        <X className="ml-2 w-4 h-4 group-hover:text-blue-600" />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowDepotList(true)}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    <Plus className="mr-2 w-4 h-4" />
                                    Choisir des dépôts
                                </button>
                            </div>

                          
                            <div className="space-y-3">
                                <label className="block text-sm font-semibold text-slate-700">
                                    Articles sélectionnés
                                </label>
                                <div className="min-h-[80px] border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50 transition-all duration-200 hover:border-green-300">
                                    {selectedArticles.length === 0 ? (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <span>Aucun article sélectionné</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedArticles.map((codeArticle) => {
                                                const article = articles.find((a) => a.codeArticle === codeArticle);
                                                return (
                                                    <span
                                                        key={codeArticle}
                                                        className="inline-flex items-center px-3 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium cursor-pointer hover:bg-green-200 transition-colors duration-200 group"
                                                        onClick={() => toggleArticleSelection(codeArticle)}
                                                        title="Cliquez pour désélectionner"
                                                    >
                                                        {article ? `${article.codeArticle} - ${article.nomArticle}` : codeArticle}
                                                        <X className="ml-2 w-4 h-4 group-hover:text-green-600" />
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowArticleList(true)}
                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    <Plus className="mr-2 w-4 h-4" />
                                    Choisir des articles
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Affectation en cours...
                                    </div>
                                ) : (
                                    "Affecter les articles"
                                )}
                            </button>
                        </form>
                    </div>

                   
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">
                            Dépôts et Articles Affectés
                        </h3>
                        <div className="space-y-3 max-h-[600px] overflow-y-auto">
                            {depots.map((depot) => (
                                <div key={depot.codeDepot} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                                    <button
                                        onClick={() => fetchArticlesPourDepot(depot.codeDepot)}
                                        className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 transition-colors duration-200 flex items-center justify-between"
                                    >
                                        <div>
                                            <div className="font-semibold text-slate-800">
                                                {depot.codeDepot} - {depot.nomDepot}
                                            </div>
                                            <div className="text-sm text-slate-600">
                                                {depot.region} • {depot.wilaya}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {articlesParDepot[depot.codeDepot] && (
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {articlesParDepot[depot.codeDepot].length} article{articlesParDepot[depot.codeDepot].length > 1 ? 's' : ''}
                                                </span>
                                            )}
                                            {depotOuvert === depot.codeDepot ? (
                                                <ChevronUp className="w-5 h-5 text-slate-400" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-slate-400" />
                                            )}
                                        </div>
                                    </button>

                                    {depotOuvert === depot.codeDepot && (
                                        <div className="p-4 bg-white border-t border-slate-200">
                                            {articlesParDepot[depot.codeDepot]?.length > 0 ? (
                                                <div className="space-y-2">
                                                    {articlesParDepot[depot.codeDepot].map((a) => (
                                                        <div key={a.codeArticle} className="flex items-center p-3 bg-slate-50 rounded-lg">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                                            <div>
                                                                <div className="font-medium text-slate-800">{a.codeArticle}</div>
                                                                <div className="text-sm text-slate-600">{a.nomArticle}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-center text-slate-500 py-4 italic">
                                                    Aucun article affecté
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

               
                {message && (
                    <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg transform transition-all duration-300 ${
                        message.type === "success" 
                            ? "bg-green-500 text-white" 
                            : "bg-red-500 text-white"
                    }`}>
                        <div className="flex items-center">
                            {message.type === "success" ? (
                                <CheckCircle className="w-5 h-5 mr-2" />
                            ) : (
                                <AlertCircle className="w-5 h-5 mr-2" />
                            )}
                            {message.text}
                        </div>
                    </div>
                )}

               
                {showDepotList && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-slate-800">Sélectionner les dépôts</h3>
                                    <button
                                        className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                                        onClick={() => setShowDepotList(false)}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Rechercher par code, nom, région ou wilaya..."
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            value={searchDepot}
                                            onChange={(e) => setSearchDepot(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleSelectAllDepots}
                                        className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
                                    >
                                        {selectedDepots.length === filteredDepots.length ? "Tout désélectionner" : "Tout sélectionner"}
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                {filteredDepots.length === 0 ? (
                                    <p className="text-center text-slate-500 py-8">Aucun dépôt trouvé.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {filteredDepots.map((d) => (
                                            <div
                                                key={d.codeDepot}
                                                className="flex items-center p-4 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 cursor-pointer"
                                                onClick={() => toggleDepotSelection(d.codeDepot)}
                                            >
                                                <div className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center ${
                                                    selectedDepots.includes(d.codeDepot) 
                                                        ? "bg-blue-600 border-blue-600" 
                                                        : "border-slate-300"
                                                }`}>
                                                    {selectedDepots.includes(d.codeDepot) && (
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-slate-800">
                                                        {d.codeDepot} - {d.nomDepot}
                                                    </div>
                                                    <div className="text-sm text-slate-600">
                                                        Région: {d.region} • Wilaya: {d.wilaya}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                
                {showArticleList && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                            <div className="p-6 border-b border-slate-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold text-slate-800">Sélectionner les articles</h3>
                                    <button
                                        className="text-slate-400 hover:text-slate-600 transition-colors p-2"
                                        onClick={() => setShowArticleList(false)}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Rechercher par code ou nom..."
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            value={searchArticle}
                                            onChange={(e) => setSearchArticle(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={toggleSelectAllArticles}
                                        className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap"
                                    >
                                        {selectedArticles.length === filteredArticles.length ? "Tout désélectionner" : "Tout sélectionner"}
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 overflow-y-auto max-h-[60vh]">
                                {filteredArticles.length === 0 ? (
                                    <p className="text-center text-slate-500 py-8">Aucun article trouvé.</p>
                                ) : (
                                    <div className="space-y-2">
                                        {filteredArticles.map((a) => (
                                            <div
                                                key={a.codeArticle}
                                                className="flex items-center p-4 border border-slate-200 rounded-xl hover:bg-green-50 hover:border-green-300 transition-all duration-200 cursor-pointer"
                                                onClick={() => toggleArticleSelection(a.codeArticle)}
                                            >
                                                <div className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center ${
                                                    selectedArticles.includes(a.codeArticle) 
                                                        ? "bg-green-600 border-green-600" 
                                                        : "border-slate-300"
                                                }`}>
                                                    {selectedArticles.includes(a.codeArticle) && (
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-slate-800">
                                                        {a.codeArticle} - {a.nomArticle}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
         </AdminLayout>
    );
};

export default AffectationMultiple;