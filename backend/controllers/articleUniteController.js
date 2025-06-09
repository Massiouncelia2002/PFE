const Article = require("../models/Article");
const UniteDeMesure = require("../models/UniteDeMesure");
const ArticleUnite = require("../models/ArticleUnite");

exports.ajouterArticleUnites = async (req, res) => {
  try {
    const { articleCode, unites } = req.body;

    // Validation basique
    if (!articleCode || !unites || !Array.isArray(unites)) {
      return res.status(400).json({ message: "Données manquantes ou invalides." });
    }

    // Supprimer les anciennes associations (optionnel)
    await ArticleUnite.destroy({ where: { articleCode } });

    // Créer les nouvelles associations
    for (const unite of unites) {
      const { uniteId, facteur,typeConversion, estUniteDeBase } = unite;

      await ArticleUnite.create({
        articleCode,
        uniteId,
        facteur,
        typeConversion,
        estUniteDeBase: estUniteDeBase || false,
      });
    }

    res.status(201).json({ message: "Unités associées avec succès." });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

exports.listerArticlesAvecUnites = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: {
        model: ArticleUnite,
        include: [UniteDeMesure],
      },
    });

    res.status(200).json(articles);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ message: "Erreur lors du chargement." });
  }
};
