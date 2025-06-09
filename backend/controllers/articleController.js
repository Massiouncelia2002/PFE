// const { Article, Famille, SousFamille } = require("../models");

// // Ajouter 
// exports.addArticle = async (req, res) => {
//   try {
//     const { codeArticle, designation, statut, um, idFamille, idSousFamille } = req.body;

//     const newArticle = await Article.create({
//       codeArticle,
//       designation,
//       statut,
//       um,
//       idFamille,
//       idSousFamille,
//     });

//     res.status(201).json(newArticle);
//   } catch (error) {
//     console.error("Erreur lors de la création de l'article :", error);
//     res.status(500).json({ error: "Erreur serveur lors de la création de l'article" });
//   }
// };

// // recuperer 
// exports.getArticles = async (req, res) => {
//   try {
//     const articles = await Article.findAll({
//       include: [
//         { model: Famille, as: "famille", attributes: ["nomFamille"] },
//         { model: SousFamille, as: "sousFamille", attributes: ["nomSousFamille"] },
//       ],
//     });

//     res.status(200).json(articles);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des articles :", error);
//     res.status(500).json({ error: "Erreur serveur lors de la récupération des articles" });
//   }
// };
// // recuperer par id
// exports.getArticleById = async (req, res) => {
//   try {
//     const article = await Article.findByPk(req.params.id, {
//       include: [
//         { model: Famille, as: "famille" },
//         { model: SousFamille, as: "sousFamille" }
//       ]
//     });
//     if (!article) return res.status(404).json({ message: 'Article non trouvé' });
//     res.json(article);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Supprimer 
// exports.deleteArticle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deleted = await Article.destroy({ where: { idArticle: id } });

//     if (!deleted) {
//       return res.status(404).json({ error: "Article non trouvé" });
//     }

//     res.status(200).json({ message: "Article supprimé avec succès" });
//   } catch (error) {
//     console.error("Erreur suppression :", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// };

// // Modifier 
// exports.updateArticle = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { codeArticle, designation, statut, um, idFamille, idSousFamille } = req.body;

//     const article = await Article.findByPk(id);
//     if (!article) {
//       return res.status(404).json({ error: "Article non trouvé" });
//     }

//     await article.update({ codeArticle, designation, statut, um, idFamille, idSousFamille });
//     res.status(200).json(article);
//   } catch (error) {
//     console.error("Erreur modification :", error);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// };











const { Article,Depot, Famille, SousFamille, ArticleDepot } = require("../models");

// Générer automatiquement le codeArticle
const generateCodeArticle = async (codeSousFamille) => {
  const lastArticle = await Article.findOne({
    where: { codeSousFamille },
    order: [['createdAt', 'DESC']],
  });

  let newNumber = 1;
  if (lastArticle) {
    const lastCode = lastArticle.codeArticle;
    const number = parseInt(lastCode.replace(codeSousFamille, ''));
    newNumber = isNaN(number) ? 1 : number + 1;
  }

  return `${codeSousFamille}${newNumber.toString().padStart(3, '0')}`;
};

// Ajouter un article
exports.addArticle = async (req, res) => {
  try {
    const { designation, statut, codeFamille, codeSousFamille } = req.body;

    // Vérification des codes Famille et SousFamille
    const famille = await Famille.findByPk(codeFamille);
    const sousFamille = await SousFamille.findByPk(codeSousFamille);

    if (!famille || !sousFamille) {
      return res.status(400).json({ error: "Famille ou Sous-Famille invalide" });
    }

    // Génération automatique du codeArticle
    const codeArticle = await generateCodeArticle(codeSousFamille);

    const newArticle = await Article.create({
      codeArticle,
      designation,
      statut,
      codeFamille,
      codeSousFamille,

    });
    await affecterArticleADepots(newArticle);

    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de l'article" });
  }
};

// Récupérer tous les articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      include: [
        { model: Famille, as: "famille", attributes: ["nomFamille"] },
        { model: SousFamille, as: "sousFamille", attributes: ["nomSousFamille"] },
      ],
    });

    res.status(200).json(articles);
  } catch (error) {
    console.error("Erreur lors de la récupération des articles :", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des articles" });
  }
};

// Récupérer un article par codeArticle
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.codeArticle, {
      include: [
        { model: Famille, as: "famille" },
        { model: SousFamille, as: "sousFamille" },
      ],
    });

    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un article par codeArticle
exports.deleteArticle = async (req, res) => {
  try {
    const { codeArticle } = req.params;
    const deleted = await Article.destroy({ where: { codeArticle } });

    if (!deleted) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    res.status(200).json({ message: "Article supprimé avec succès" });
  } catch (error) {
    console.error("Erreur suppression :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Modifier un article par codeArticle
exports.updateArticle = async (req, res) => {
  try {
    const { codeArticle } = req.params;
    const { designation, statut, codeFamille, codeSousFamille } = req.body;

    const article = await Article.findByPk(codeArticle);
    if (!article) {
      return res.status(404).json({ error: "Article non trouvé" });
    }

    await article.update({ designation, statut, codeFamille, codeSousFamille });
    res.status(200).json(article);
  } catch (error) {
    console.error("Erreur modification :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};





