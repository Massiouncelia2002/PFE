import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Package, TrendingUp, AlertTriangle, CheckCircle, Calendar, BarChart3 } from "lucide-react";
import AdminLayoutPlannificateur from './AdminLayoutPlannificateur'; 

const PlanifierMesDepots = () => {
  const navigate = useNavigate();
  const [depots, setDepots] = useState([]);
  const [selectedDepot, setSelectedDepot] = useState(null);
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };


  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const res = await axios.get("http://localhost:5000/depot/mes-depots", { headers });
        setDepots(res.data);
        if (res.data.length === 1) {
          setSelectedDepot(res.data[0]);
        }
      } catch (err) {
        console.error(err);
        setMessage("Erreur lors de la récupération des dépôts.");
      }
    };
    fetchDepots();
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDepot) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/articleDepot/demandes/${selectedDepot.codeDepot}`,
          { headers }
        );
        setArticles(res.data);
      } catch (err) {
        console.error(err);
        setMessage("Erreur lors de la récupération des données du dépôt.");
      }
    };

    fetchData();
  }, [selectedDepot]);

  const handlePlanifier = () => {
    navigate("/AfficherCommandesParClient", {
      state: {
        articles,
        codeDepot: selectedDepot.codeDepot
      },
    });
  };

  

  const getStockStatus = (article) => {
    const ok = article.quantiteDemandeeTotale <= article.quantiteStockee;
    const isLowStock = article.quantiteStockee <= article.stockAlert;
    
    if (!ok) return { status: "insufficient", label: "Stock insuffisant", color: "text-red-500", bgColor: "bg-red-50", borderColor: "border-red-200" };
    if (isLowStock) return { status: "warning", label: "Stock faible", color: "text-amber-500", bgColor: "bg-amber-50", borderColor: "border-amber-200" };
    return { status: "sufficient", label: "Stock suffisant", color: "text-emerald-500", bgColor: "bg-emerald-50", borderColor: "border-emerald-200" };
  };

  const getStockIcon = (status) => {
    switch (status) {
      case "insufficient": return <AlertTriangle className="w-4 h-4" />;
      case "warning": return <TrendingUp className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const totalArticles = articles.length;
  const articlesOk = articles.filter(a => a.quantiteDemandeeTotale <= a.quantiteStockee).length;
  const articlesWarning = articles.filter(a => a.quantiteStockee <= a.stockAlert && a.quantiteDemandeeTotale <= a.quantiteStockee).length;

  return (
    <AdminLayoutPlannificateur>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
     
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Planification des Commandes
              </h1>
              <p className="text-indigo-100 mt-1 text-lg">
                Gestion intelligente de vos stocks par dépôt
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl shadow-sm">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
              <p className="text-red-700 font-medium">{message}</p>
            </div>
          </div>
        )}

       
        {depots.length > 1 && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 backdrop-blur-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Package className="w-4 h-4 mr-2 text-indigo-500" />
                Sélectionner un dépôt
              </label>
              <div className="relative">
                <select
                  className="w-full appearance-none bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl px-4 py-3 pr-10 text-gray-900 font-medium focus:outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 hover:border-indigo-300 cursor-pointer"
                  value={selectedDepot?.codeDepot || ""}
                  onChange={(e) =>
                    setSelectedDepot(depots.find((d) => d.codeDepot === e.target.value))
                  }
                >
                  <option value="">-- Choisir un dépôt --</option>
                  {depots.map((d) => (
                    <option key={d.codeDepot} value={d.codeDepot}>
                      {d.nom} ({d.codeDepot})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        )}

        {selectedDepot && articles.length > 0 && (
          <>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Articles</p>
                    <p className="text-3xl font-bold text-gray-900">{totalArticles}</p>
                  </div>
                  <div className="bg-blue-100 rounded-xl p-3">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Stock Suffisant</p>
                    <p className="text-3xl font-bold text-emerald-600">{articlesOk}</p>
                  </div>
                  <div className="bg-emerald-100 rounded-xl p-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Alertes</p>
                    <p className="text-3xl font-bold text-amber-600">{articlesWarning}</p>
                  </div>
                  <div className="bg-amber-100 rounded-xl p-3">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>

     
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Article
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Demandé
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        En Stock
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                        Stock Max
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                        Seuil Alerte
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {articles.map((article) => {
                      const stockInfo = getStockStatus(article);
                      return (
                        <tr 
                          key={article.codeArticle} 
                          className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="bg-indigo-100 rounded-lg p-2 group-hover:bg-indigo-200 transition-colors duration-300">
                                <Package className="w-4 h-4 text-indigo-600" />
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {article.designation}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {article.codeArticle}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                              {article.quantiteDemandeeTotale}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                              {article.quantiteStockee}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 hidden sm:table-cell">
                            {article.stockMax}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-gray-600 hidden sm:table-cell">
                            {article.stockAlert}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${stockInfo.bgColor} ${stockInfo.color} ${stockInfo.borderColor} border`}>
                              {getStockIcon(stockInfo.status)}
                              <span className="ml-1">{stockInfo.label}</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <div className="flex justify-end">
                  <button
                    onClick={handlePlanifier}
                    className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Calendar className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Planifier tous les articles</span>
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedDepot && articles.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-500">Ce dépôt ne contient aucun article pour le moment.</p>
          </div>
        )}
      </div>
    </div>
    </AdminLayoutPlannificateur>
  );
};

export default PlanifierMesDepots;
