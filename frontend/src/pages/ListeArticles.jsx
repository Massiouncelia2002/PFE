// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Pencil, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import AdminLayout from "./AdminLayout";

// const ListeArticles = () => {
//   const [articles, setArticles] = useState([]);
//   const navigate = useNavigate();

//   const fetchArticles = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/articles");
//       setArticles(res.data);
//     } catch (error) {
//       toast.error("Erreur lors du chargement des articles");
//       console.error("Erreur fetch articles", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/articles/${id}`);
//         toast.success("Article supprimé avec succès");
//         fetchArticles();
//       } catch (error) {
//         toast.error("Échec de la suppression de l'article");
//         console.error("Erreur suppression article", error);
//       }
//     }
//   };

//   const handleEdit = (article) => {
//     navigate(`/articles/modifier-article/${article.codeArticle}`);
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   return (
//     <AdminLayout>
//       <div className="p-6 space-y-6">
//         <h2 className="text-2xl font-bold mb-4">Liste des articles</h2>
//         <div className="overflow-auto rounded-lg shadow border">
//           <table className="min-w-full bg-white text-sm text-left">
//             <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//               <tr>
//                 <th className="px-6 py-3">Code Article</th>
//                 <th className="px-6 py-3">Désignation</th>
//                 <th className="px-6 py-3">Famille</th>
//                 <th className="px-6 py-3">Sous-Famille</th>
//                 <th className="px-6 py-3">Unite Stockage</th>
//                 <th className="px-6 py-3 text-center"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {articles.map((article) => (
//                 <tr
//                   key={article.codeArticle}
//                   className="border-t hover:bg-gray-50 group transition"
//                 >
//                   <td className="px-6 py-4">{article.codeArticle}</td>
//                   <td className="px-6 py-4">{article.designation}</td>
//                   <td className="px-6 py-4">{article.famille?.nomFamille || "—"}</td>
//                   <td className="px-6 py-4">{article.sousFamille?.nomSousFamille || "—"}</td>
//                   <td className="px-6 py-4">{article.uniteStockage}</td>
//                   <td className="px-6 py-4 text-center flex justify-center gap-4">
//                     <Pencil
//                       className="h-5 w-5 text-blue-600 cursor-pointer opacity-0 group-hover:opacity-100 transition"
//                       onClick={() => handleEdit(article.codeArticle)}
//                     />
//                     <Trash2
//                       className="h-5 w-5 text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition"
//                       onClick={() => handleDelete(article.codeArticle)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default ListeArticles;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, Search, Filter, Download, Box } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";

const ListeArticles = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/articles");
      setArticles(res.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des articles");
      console.error("Erreur fetch articles", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        toast.success("Article supprimé avec succès");
        fetchArticles();
      } catch (error) {
        toast.error("Échec de la suppression de l'article");
        console.error("Erreur suppression article", error);
      }
    }
  };

  const handleEdit = (article) => {
    navigate(`/articles/modifier-article/${article.codeArticle}`);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    return (
      article.codeArticle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.famille?.nomFamille || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.sousFamille?.nomSousFamille || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const ActionButton = ({ icon: Icon, onClick, className, tooltip }) => (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${className}`}
      >
        <Icon className="w-4 h-4" />
      </button>
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        {tooltip}
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-4 sm:gap-0">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                  <Box className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des articles</h1>
                  <p className="text-sm sm:text-base text-gray-600">{filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} trouvé{filteredArticles.length > 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher par code, désignation ou famille..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => navigate("/articles")}
                    className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm sm:text-base">Ajouter article</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Désignation</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">Famille</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Sous-Famille</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">Unité</th>
                    <th className="px-3 sm:px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredArticles.map((article, index) => (
                    <tr
                      key={article.codeArticle}
                      className={`transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50/30' : 'bg-white'} hover:bg-blue-50`}
                    >
                      {/* Code */}
                      <td className="px-3 sm:px-6 py-4">
                        <span className="font-mono text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                          {article.codeArticle}
                        </span>
                      </td>

                      {/* Désignation */}
                      <td className="px-3 sm:px-6 py-4 font-medium text-gray-900">
                        {article.designation.length > 20 ? 
                          <span title={article.designation}>
                            {article.designation.substring(0, 20)}...
                          </span> : 
                          article.designation
                        }
                      </td>

                      {/* Famille - hidden on medium and small screens */}
                      <td className="px-3 sm:px-6 py-4 text-gray-600 hidden md:table-cell">
                        {article.famille?.nomFamille || "—"}
                      </td>

                      {/* Sous-Famille - hidden on large and smaller screens */}
                      <td className="px-3 sm:px-6 py-4 text-gray-600 hidden lg:table-cell">
                        {article.sousFamille?.nomSousFamille || "—"}
                      </td>

                      {/* Unité Stockage - hidden on small screens */}
                      <td className="px-3 sm:px-6 py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          {article.uniteStockage}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-3 sm:px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <ActionButton
                            icon={Pencil}
                            onClick={() => handleEdit(article)}
                            className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                            tooltip="Modifier"
                          />
                          <ActionButton
                            icon={Trash2}
                            onClick={() => handleDelete(article.codeArticle)}
                            className="bg-red-100 text-red-600 hover:bg-red-200"
                            tooltip="Supprimer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <Box className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-2">Aucun article trouvé</h3>
                <p className="text-sm sm:text-base text-gray-600">Essayez de modifier vos critères de recherche.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListeArticles;