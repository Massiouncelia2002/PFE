import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";

const ListeArticles = () => {
  const [articles, setArticles] = useState([]);
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

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Liste des articles</h2>
        <div className="overflow-auto rounded-lg shadow border">
          <table className="min-w-full bg-white text-sm text-left">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Code Article</th>
                <th className="px-6 py-3">Désignation</th>
                <th className="px-6 py-3">Famille</th>
                <th className="px-6 py-3">Sous-Famille</th>
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr
                  key={article.codeArticle}
                  className="border-t hover:bg-gray-50 group transition"
                >
                  <td className="px-6 py-4">{article.codeArticle}</td>
                  <td className="px-6 py-4">{article.designation}</td>
                  <td className="px-6 py-4">{article.famille?.nomFamille || "—"}</td>
                  <td className="px-6 py-4">{article.sousFamille?.nomSousFamille || "—"}</td>
                  <td className="px-6 py-4">{article.statut ? "Actif" : "Inactif"}</td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <Pencil
                      className="h-5 w-5 text-blue-600 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleEdit(article.codeArticle)}
                    />
                    <Trash2
                      className="h-5 w-5 text-red-600 cursor-pointer opacity-0 group-hover:opacity-100 transition"
                      onClick={() => handleDelete(article.codeArticle)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListeArticles;