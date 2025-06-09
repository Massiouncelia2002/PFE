const Entree = require("../models/Entree");
const ArticleDepot = require("../models/ArticleDepot");

const ajouterEntree = async (req, res) => {
  try {
    const { codeArticle, codeDepot, quantiteEntree, dateEntree, commentaire } = req.body;

    // Vérifier que les champs nécessaires sont là
    if (!codeArticle || !codeDepot || !quantiteEntree || !dateEntree) {
      return res.status(400).json({ message: "Champs manquants." });
    }

    // 1. Créer l'entrée
    await Entree.create({
      codeArticle,
      codeDepot,
      quantiteEntree,
      dateEntree,
      commentaire
    });

    // 2. Mettre à jour quantiteStockee dans ArticleDepot
    const articleDepot = await ArticleDepot.findOne({
      where: { codeArticle, codeDepot }
    });

    if (!articleDepot) {
      return res.status(404).json({ message: "Article non trouvé dans ce dépôt." });
    }

    articleDepot.quantiteStockee += parseFloat(quantiteEntree);
    await articleDepot.save();

    res.status(201).json({ message: "Entrée ajoutée et stock mis à jour." });

  } catch (error) {
    console.error("Erreur ajout entrée :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = { ajouterEntree };
