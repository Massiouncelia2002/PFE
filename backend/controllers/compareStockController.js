const { ArticleDepot, ArticleCommandeClient, sequelize } = require("../models");

exports.getComparaisonStockDemandes = async (req, res) => {
  try {
    const stocks = await ArticleDepot.findAll();

    const demandes = await ArticleCommandeClient.findAll({
      attributes: [
        "codeArticle",
        [sequelize.fn("SUM", sequelize.col("quantiteDemandee")), "totalDemandee"],
      ],
      group: ["codeArticle"],
    });

    const demandesMap = {};
    demandes.forEach((d) => {
      demandesMap[d.codeArticle] = parseInt(d.get("totalDemandee"));
    });

    const result = stocks.map((stock) => ({
      codeArticle: stock.codeArticle,
      codeDepot: stock.codeDepot,
      quantiteStockee: stock.quantiteStockee,
      quantiteDemandee: demandesMap[stock.codeArticle] || 0,
    }));

    res.json(result);
  } catch (err) {
    console.error("Erreur:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


