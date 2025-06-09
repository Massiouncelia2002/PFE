// const { Famille,SousFamille } = require("../models");

// exports.getFamilles = async (req, res) => {
//   try {
//     const familles = await Famille.findAll();
//     res.json(familles);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur", error });
//   }
// };

// exports.createFamille = async (req, res) => {
//   try {
//     const { nomFamille } = req.body;
//     const nouvelleFamille = await Famille.create({ nomFamille });
//     res.status(201).json(nouvelleFamille);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur ajout famille", error });
//   }
// };

// exports.getFamilleById = async (req, res) => {
//   try {
//     const famille = await Famille.findByPk(req.params.id);
//     if (!famille) return res.status(404).json({ message: "Famille non trouvée" });
//     res.json(famille);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur", error });
//   }
// };

// exports.updateFamille = async (req, res) => {
//   try {
//     const { nomFamille } = req.body;
//     const famille = await Famille.findByPk(req.params.id);
//     if (!famille) return res.status(404).json({ message: "Famille non trouvée" });

//     await famille.update({ nomFamille });

//     // Mise à jour du codeFamille
//     const code = `F-${famille.idFamille}-${nomFamille.replace(/\s+/g, '').toUpperCase()}`;
//     await famille.update({ codeFamille: code });

//     res.json(famille);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur mise à jour famille", error });
//   }
// };



// exports.deleteFamille = async (req, res) => {
//   try {
//     const id = req.params.id;
    
//     // Vérifier que l'ID est un nombre valide
//     if (isNaN(id)) {
//       return res.status(400).json({
//         success: false,
//         message: "ID de famille invalide"
//       });
//     }

//     const famille = await Famille.findByPk(id);
//     if (!famille) {
//       return res.status(404).json({ 
//         success: false,
//         message: "Famille non trouvée" 
//       });
//     }

//     const sousFamilles = await SousFamille.count({ where: { idFamille: id } });

//     if (sousFamilles > 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Suppression impossible",
//         details: `${sousFamilles} sous-famille(s) associée(s)`
//       });
//     }

//     await famille.destroy();
//     res.status(200).json({
//       success: true,
//       message: "Famille supprimée avec succès"
//     });

//   } catch (error) {
//     console.error("Erreur suppression famille:", error);
//     res.status(500).json({
//       success: false,
//       message: "Erreur serveur",
//       details: error.message
//     });
//   }
// };


// exports.getFamillesWithSousFamilles = async (req, res) => {
//   try {
//     const familles = await Famille.findAll({
//       include: [SousFamille], 
//     });
//     res.status(200).json(familles);
//   } catch (error) {
//     console.error("Erreur dans getFamillesWithSousFamilles :", error);
//     res.status(500).json({ message: "Erreur serveur", error: error.message });
//   }
// };









const { Famille, SousFamille } = require("../models");

exports.getFamilles = async (req, res) => {
  try {
    const familles = await Famille.findAll();
    res.json(familles);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.createFamille = async (req, res) => {
  try {
    const { nomFamille } = req.body;
    const nouvelleFamille = await Famille.create({ nomFamille });
    res.status(201).json(nouvelleFamille);
  } catch (error) {
    res.status(500).json({ message: "Erreur ajout famille", error });
  }
};

exports.getFamilleById = async (req, res) => {
  try {
    const codeFamille = req.params.code;
    const famille = await Famille.findByPk(codeFamille);
    if (!famille) return res.status(404).json({ message: "Famille non trouvée" });
    res.json(famille);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

exports.updateFamille = async (req, res) => {
  try {
    const codeFamille = req.params.code;
    const { nomFamille } = req.body;

    const famille = await Famille.findByPk(codeFamille);
    if (!famille) return res.status(404).json({ message: "Famille non trouvée" });

    // Met à jour le nom
    await famille.update({ nomFamille });

    // Regénère le codeFamille
    const randomNumber = String(Math.floor(100 + Math.random() * 900));
    const nouveauCode = `F-${randomNumber}-${nomFamille.replace(/\s+/g, '').toUpperCase()}`;
    
    await famille.update({ codeFamille: nouveauCode });

    res.json(famille);
  } catch (error) {
    res.status(500).json({ message: "Erreur mise à jour famille", error });
  }
};

exports.deleteFamille = async (req, res) => {
  try {
    const codeFamille = req.params.code;

    const famille = await Famille.findByPk(codeFamille);
    if (!famille) {
      return res.status(404).json({ 
        success: false,
        message: "Famille non trouvée" 
      });
    }

    const sousFamilles = await SousFamille.count({ where: { codeFamille } });

    if (sousFamilles > 0) {
      return res.status(400).json({
        success: false,
        message: "Suppression impossible",
        details: `${sousFamilles} sous-famille(s) associée(s)`
      });
    }

    await famille.destroy();
    res.status(200).json({
      success: true,
      message: "Famille supprimée avec succès"
    });

  } catch (error) {
    console.error("Erreur suppression famille:", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      details: error.message
    });
  }
};

exports.getFamillesWithSousFamilles = async (req, res) => {
  try {
    const familles = await Famille.findAll({
      include: [SousFamille],
    });
    res.status(200).json(familles);
  } catch (error) {
    console.error("Erreur dans getFamillesWithSousFamilles :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
