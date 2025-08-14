import React, { useEffect, useState } from "react";

export default function AssocierArticleUnites() {
  const [articles, setArticles] = useState([]);
  const [unites, setUnites] = useState([]);
  const [articleCode, setArticleCode] = useState("");
  const [associations, setAssociations] = useState([
    {
      uniteId: "",
      facteur: 1,
      typeConversion: "multiplication",
      estUniteDeBase: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData("articles", setArticles);
    fetchData("unites", setUnites);
  }, []);

  const fetchData = async (endpoint, setState) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`);
      if (!res.ok) throw new Error(`Erreur chargement ${endpoint}`);
      const data = await res.json();
      setState(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAssocChange = (index, field, value) => {
    const newAssociations = [...associations];
    if (field === "uniteId") {
      newAssociations[index].uniteId = value;
    } else if (field === "facteur") {
      newAssociations[index].facteur = parseFloat(value) || 0;
    } else {
      newAssociations[index][field] = value;
    }
    setAssociations(newAssociations);
  };

  const addAssocLine = () => {
    setAssociations([
      ...associations,
      {
        uniteId: "",
        facteur: 1,
        typeConversion: "multiplication",
        estUniteDeBase: false,
      },
    ]);
  };

  const removeAssocLine = (index) => {
    if (index === 0) {
      alert("Impossible de supprimer l’unité de base.");
      return;
    }
    const updated = [...associations];
    updated.splice(index, 1);
    setAssociations(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!articleCode) {
      alert("Veuillez sélectionner un article.");
      return;
    }
    for (const assoc of associations) {
      if (!assoc.uniteId || isNaN(assoc.facteur) || assoc.facteur <= 0) {
        alert("Vérifiez que tous les champs sont bien remplis.");
        return;
      }
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/articleUnites/article-unites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleCode, unites: associations }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement.");
      alert("Associations enregistrées avec succès !");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInterpretation = (index) => {
    const base = associations[0];
    if (!base || !base.uniteId) return "Sélectionnez une unité de base.";
    const baseUniteNom = unites.find((u) => u.id === base.uniteId)?.nom || "unité de base";

    const { uniteId, facteur, typeConversion } = associations[index];
    const unite = unites.find((u) => u.id === uniteId);
    const nomUnite = unite ? unite.nom : `Unité ${index + 1}`;

    if (!facteur || facteur <= 0) return "";

    if (index === 0) {
      return `1 ${nomUnite} = 1 ${nomUnite}`;
    } else {
      const value =
        typeConversion === "multiplication"
          ? facteur
          : (1 / facteur).toFixed(4);
      return `1 ${nomUnite} = ${facteur} × 1 ${baseUniteNom} = ${value} ${baseUniteNom}`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Associer des unités de mesure à un article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Article :</label>
          <select
            value={articleCode}
            onChange={(e) => setArticleCode(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">-- Sélectionnez un article --</option>
            {articles.map((art) => (
              <option key={art.codeArticle} value={art.codeArticle}>
                {art.designation} ({art.codeArticle})
              </option>
            ))}
          </select>
        </div>

        {associations.map((assoc, index) => {
          const isBase = index === 0;
          const filteredUnites = unites.filter(
            (u) => (isBase ? u.type === "base" : u.type === "conditionnement")
          );

          return (
            <div key={index} className="border border-gray-300 p-4 rounded-lg relative">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeAssocLine(index)}
                  className="absolute top-2 right-2 text-red-500 font-bold text-xl"
                  title="Supprimer cette unité"
                >
                  ×
                </button>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {isBase ? "Unité de base :" : "Unité de conditionnement :"}
                  </label>
                  <select
                    value={assoc.uniteId}
                    onChange={(e) => handleAssocChange(index, "uniteId", e.target.value)}
                    required
                    disabled={!isBase && assoc.uniteId === associations[0].uniteId}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="">-- Choisir unité --</option>
                    {filteredUnites.map((u) => (
                      <option
                        key={u.id}
                        value={u.id}
                        disabled={!isBase && u.id === associations[0].uniteId}
                      >
                        {u.nom} ({u.abreviation}) - ({u.type})
                      </option>
                    ))}
                  </select>
                </div>

                {!isBase && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Facteur :</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={assoc.facteur}
                        onChange={(e) => handleAssocChange(index, "facteur", e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type conversion :</label>
                      <select
                        value={assoc.typeConversion}
                        onChange={(e) => handleAssocChange(index, "typeConversion", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2"
                      >
                        <option value="multiplication">Multiplication</option>
                        <option value="division">Division</option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              <pre className="mt-4 text-sm text-gray-600 font-mono whitespace-pre-line">
                {getInterpretation(index)}
              </pre>
            </div>
          );
        })}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={addAssocLine}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            + Ajouter une unité de conditionnement
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Enregistrement..." : "Associer"}
          </button>
        </div>
      </form>
    </div>
  );
}
  

































































































