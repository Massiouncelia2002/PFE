import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";

const EntreeStock = () => {
    const [depots, setDepots] = useState([]);
    const [selectedDepot, setSelectedDepot] = useState(null);
    const [articles, setArticles] = useState([]);
    const [entrees, setEntrees] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDepots();
    }, []);

    const fetchDepots = async () => {
        try {
            const res = await axios.get("http://localhost:5000/depot/");
            setDepots(res.data);
        } catch (err) {
            console.error("Erreur récupération dépôts :", err);
        }
    };

    const fetchArticles = async (codeDepot) => {
        try {
            const res = await axios.get(`http://localhost:5000/articleDepot/depots/${codeDepot}/articles`);
            setArticles(res.data);
        } catch (err) {
            console.error("Erreur récupération articles :", err);
        }
    };

    const handleDepotChange = (e) => {
        const depotCode = e.target.value;
        const depot = depots.find(d => d.codeDepot === depotCode);
        setSelectedDepot(depot);
        setArticles([]);
        setEntrees({});
        if (depot) fetchArticles(depot.codeDepot);
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

    // const handleEntree = async (article) => {
    //     const { quantiteEntree, dateEntree, commentaire } = entrees[article.codeArticle] || {};

    //     if (!quantiteEntree || !dateEntree || isNaN(parseFloat(quantiteEntree))) {
    //         alert("Veuillez remplir la quantité et la date.");
    //         return;
    //     }

    //     const confirmed = window.confirm(`Confirmer l'entrée de ${quantiteEntree} pour ${article.designation} ?`);
    //     if (!confirmed) return;

    //     setLoading(true);

    //     try {
    //         await axios.post(`http://localhost:5000/entree/entrees`, {
    //             codeDepot: selectedDepot.codeDepot,
    //             codeArticle: article.codeArticle,
    //             quantiteEntree: parseFloat(quantiteEntree),
    //             dateEntree,
    //             commentaire
    //         });

    //         alert("Entrée enregistrée !");
    //         setEntrees({ ...entrees, [article.codeArticle]: {} });
    //     } catch (err) {
    //         console.error("Erreur lors de l’entrée :", err);
    //         alert("Erreur lors de l’enregistrement.");
    //     }

    //     setLoading(false);
    // };


    const handleEntree = async (article) => {
        const { quantiteEntree, dateEntree, commentaire } = entrees[article.codeArticle] || {};

        const quantite = parseFloat(quantiteEntree);
        const dateNow = new Date();
        const dateChoisie = new Date(dateEntree);

        // Vérifications d’intégrité
        if (!quantiteEntree || isNaN(quantite) || quantite <= 0) {
            alert("Veuillez saisir une quantité valide (positive).");
            return;
        }

        if (!dateEntree) {
            alert("La date d'entrée est obligatoire.");
            return;
        }

        if (dateChoisie > dateNow) {
            alert("La date d'entrée ne peut pas être dans le futur.");
            return;
        }

        const confirmed = window.confirm(`Confirmer l'entrée de ${quantite} palettes pour ${article.designation} ?`);
        if (!confirmed) return;

        setLoading(true);

        try {
            await axios.post(`http://localhost:5000/entree/entrees`, {
                codeDepot: selectedDepot.codeDepot,
                codeArticle: article.codeArticle,
                quantiteEntree: quantite,
                dateEntree,
                commentaire
            });

            alert("Entrée enregistrée !");
            setEntrees({ ...entrees, [article.codeArticle]: {} });
        } catch (err) {
            console.error("Erreur lors de l’entrée :", err);
            alert("Erreur lors de l’enregistrement.");
        }

        setLoading(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Affecter une Entrée de Stock</h2>

            <div className="mb-4">
                <label className="block mb-2">Sélectionnez un dépôt :</label>
                <select className="border rounded p-2" onChange={handleDepotChange} value={selectedDepot?.codeDepot || ""}>
                    <option value="">-- Choisir un dépôt --</option>
                    {depots.map((d) => (
                        <option key={d.codeDepot} value={d.codeDepot}>
                            {d.nomDepot} - {d.codeDepot}
                        </option>
                    ))}
                </select>
            </div>

            {selectedDepot && articles.length === 0 && (
                <p className="text-gray-500">Aucun article trouvé pour ce dépôt.</p>
            )}

            {articles.length > 0 && (
                <div className="grid gap-4">
                    {articles.map((article) => {
                        const entry = entrees[article.codeArticle] || {};
                        return (
                            <div key={article.codeArticle} className="p-4 bg-white shadow rounded border">
                                <h3 className="font-semibold">{article.designation} ({article.codeArticle})</h3>
                                <div className="flex flex-col gap-2 mt-2">
                                    <Input
                                        type="number"
                                        placeholder="Quantité à ajouter"
                                        value={entry.quantiteEntree || ""}
                                        onChange={(e) => handleChange(e, article.codeArticle, "quantiteEntree")}
                                        className="w-48"
                                    />
                                    <Input
                                        type="date"
                                        value={entry.dateEntree || ""}
                                        onChange={(e) => handleChange(e, article.codeArticle, "dateEntree")}
                                        className="w-48"
                                    />
                                    <textarea
                                        placeholder="Commentaire (optionnel)"
                                        value={entry.commentaire || ""}
                                        onChange={(e) => handleChange(e, article.codeArticle, "commentaire")}
                                        className="border p-2 rounded w-full h-20"
                                    />
                                    <Button onClick={() => handleEntree(article)} disabled={loading}>
                                        Enregistrer Entrée
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default EntreeStock;
