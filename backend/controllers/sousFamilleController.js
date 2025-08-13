// const { SousFamille, Famille } = require("../models");

// exports.getSousFamilles = async (req, res) => {
//   try {
//     const sousFamilles = await SousFamille.findAll({ include: { model: Famille } });
//     res.json(sousFamilles);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur", error });
//   }
// };

// exports.createSousFamille = async (req, res) => {
//   try {
//     const { nomSousFamille, idFamille } = req.body;

    
//     if (!nomSousFamille?.trim() || !Number.isInteger(idFamille)) {
//       return res.status(400).json({
//         message: "Le nom de la sous-famille et l'ID famille valide sont requis",
//         details: {
//           reçu: { nomSousFamille, idFamille },
//           attendu: { nomSousFamille: "string", idFamille: "number" }
//         }
//       });
//     }

//     // Conversion explicite en nombre
//     const familleId = parseInt(idFamille, 10);
    
//     // Vérification de l'existence de la famille
//     const famille = await Famille.findByPk(familleId);
//     if (!famille) {
//       return res.status(404).json({ 
//         message: `Aucune famille trouvée avec l'ID ${familleId}`
//       });
//     }

//     // Création de la sous-famille
//     const nouvelleSousFamille = await SousFamille.create({
//       nomSousFamille: nomSousFamille.trim(),
//       idFamille: familleId
//     });

//     res.status(201).json(nouvelleSousFamille);

//   } catch (error) {
//     console.error("Erreur complète :", error);
//     res.status(500).json({
//       message: "Erreur critique du serveur",
//       error: error.message
//     });
//   }
// };


// exports.getSousFamilleById = async (req, res) => {
//   try {
//     const sousFamille = await SousFamille.findByPk(req.params.id, {
//       include: { model: Famille }
//     });
//     if (!sousFamille) return res.status(404).json({ message: "Sous-famille non trouvée" });
//     res.json(sousFamille);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur serveur", error });
//   }
// };


// // exports.updateSousFamille (CORRIGÉ)
// exports.updateSousFamille = async (req, res) => {
//   try {
//     const { nomSousFamille } = req.body;
//     const sousFamille = await SousFamille.findByPk(req.params.id);
//     if (!sousFamille) return res.status(404).json({ message: "Sous-famille non trouvée" });

//     await sousFamille.update({ nomSousFamille });

//     const famille = await Famille.findByPk(sousFamille.idFamille); // Recherche par ID
//     if (famille) {
//       const nomFamille = famille.nomFamille.replace(/\s+/g, '').toUpperCase();
//       const nomSous = nomSousFamille.replace(/\s+/g, '').toUpperCase();
//       const code = `SF-${sousFamille.idSousFamille}-${nomFamille}-${nomSous}`;
//       await sousFamille.update({ codeSousFamille: code });
//     }

//     res.json(sousFamille);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur mise à jour sous-famille", error });
//   }
// };


// exports.deleteSousFamille = async (req, res) => {
//   try {
//     const sousFamille = await SousFamille.findByPk(req.params.id);
//     if (!sousFamille) return res.status(404).json({ message: "Sous-famille non trouvée" });

//     await sousFamille.destroy();
//     res.json({ message: "Sous-famille supprimée avec succès" });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur suppression sous-famille", error });
//   }
// };










const { SousFamille, Famille } = require("../models");

// GET : Récupérer toutes les sous-familles avec leurs familles
exports.getSousFamilles = async (req, res) => {
  try {
    const sousFamilles = await SousFamille.findAll({
      include: { model: Famille }
    });
    res.json(sousFamilles);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// // POST : Créer une nouvelle sous-famille
// exports.createSousFamille = async (req, res) => {
//   try {
//     const { nomSousFamille, codeFamille } = req.body;

//     if (!nomSousFamille?.trim() || !codeFamille?.trim()) {
//       return res.status(400).json({
//         message: "Le nom de la sous-famille et le code famille sont requis",
//         reçu: { nomSousFamille, codeFamille }
//       });
//     }

//     const famille = await Famille.findByPk(codeFamille.trim());
//     if (!famille) {
//       return res.status(404).json({
//         message: `Aucune famille trouvée avec le code ${codeFamille}`
//       });
//     }

//     const nomSous = nomSousFamille.trim().replace(/\s+/g, '').toUpperCase();
//     const nomFamille = famille.nomFamille.replace(/\s+/g, '').toUpperCase();
//     const codeSousFamille = `SF-${codeFamille.trim().toUpperCase()}-${nomSous}`;

//     const existante = await SousFamille.findByPk(codeSousFamille);
//     if (existante) {
//       return res.status(409).json({
//         message: `Une sous-famille avec le code ${codeSousFamille} existe déjà`
//       });
//     }

//     const nouvelleSousFamille = await SousFamille.create({
//       codeSousFamille,
//       nomSousFamille: nomSousFamille.trim(),
//       codeFamille: codeFamille.trim()
//     });

//     res.status(201).json(nouvelleSousFamille);
//   } catch (error) {
//     res.status(500).json({
//       message: "Erreur lors de la création de la sous-famille",
//       error: error.message
//     });
//   }
// };



exports.createSousFamille = async (req, res) => {
  try {
    const { nomSousFamille, codeFamille } = req.body;

    if (!nomSousFamille?.trim() || !codeFamille?.trim()) {
      return res.status(400).json({
        message: "Le nom de la sous-famille et le code famille sont requis",
        reçu: { nomSousFamille, codeFamille }
      });
    }

    if (!/[a-zA-ZÀ-ÿ]/.test(nomSousFamille)) {
      return res.status(400).json({
        message: "Le nom de la sous-famille doit contenir au moins une lettre"
      });
    }

    const famille = await Famille.findByPk(codeFamille.trim());
    if (!famille) {
      return res.status(404).json({
        message: `Aucune famille trouvée avec le code ${codeFamille}`
      });
    }

    const nomSous = nomSousFamille.trim().replace(/\s+/g, '').toUpperCase();
    const codeSousFamille = `SF-${codeFamille.trim().toUpperCase()}-${nomSous}`;

    const existante = await SousFamille.findByPk(codeSousFamille);
    if (existante) {
      return res.status(409).json({
        message: `Une sous-famille avec le code ${codeSousFamille} existe déjà`
      });
    }

    const nouvelleSousFamille = await SousFamille.create({
      codeSousFamille,
      nomSousFamille: nomSousFamille.trim(),
      codeFamille: codeFamille.trim()
    });

    res.status(201).json(nouvelleSousFamille);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la sous-famille",
      error: error.message
    });
  }
};




// GET : Récupérer une sous-famille par son code
exports.getSousFamilleById = async (req, res) => {
  try {
    const code = req.params.code;
    const sousFamille = await SousFamille.findByPk(code, {
      include: { model: Famille }
    });

    if (!sousFamille) {
      return res.status(404).json({ message: "Sous-famille non trouvée" });
    }

    res.json(sousFamille);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// // PUT : Mettre à jour une sous-famille par son code
// exports.updateSousFamille = async (req, res) => {
//   try {
//     const code = req.params.code;
//     const { nomSousFamille } = req.body;

//     if (!nomSousFamille?.trim()) {
//       return res.status(400).json({ message: "Le nom de la sous-famille est requis" });
//     }

//     const sousFamille = await SousFamille.findByPk(code);
//     if (!sousFamille) {
//       return res.status(404).json({ message: "Sous-famille non trouvée" });
//     }

//     const famille = await Famille.findByPk(sousFamille.codeFamille);
//     if (!famille) {
//       return res.status(404).json({ message: "Famille associée introuvable" });
//     }

//     const nomSous = nomSousFamille.trim().replace(/\s+/g, '').toUpperCase();
//     const nomFamille = famille.nomFamille.replace(/\s+/g, '').toUpperCase();
//     const nouveauCode = `SF-${sousFamille.codeFamille}-${nomSous}`;

//     // Vérifie si un code similaire existe déjà (évite les doublons)
//     if (nouveauCode !== code) {
//       const existe = await SousFamille.findByPk(nouveauCode);
//       if (existe) {
//         return res.status(409).json({
//           message: `Une autre sous-famille avec le code ${nouveauCode} existe déjà`
//         });
//       }
//     }

//     // Mise à jour : on supprime l'ancienne (si on change la clé primaire) et on crée la nouvelle
//     await sousFamille.destroy();

//     const nouvelleSousFamille = await SousFamille.create({
//       codeSousFamille: nouveauCode,
//       nomSousFamille: nomSousFamille.trim(),
//       codeFamille: sousFamille.codeFamille
//     });

//     res.json(nouvelleSousFamille);
//   } catch (error) {
//     res.status(500).json({ message: "Erreur mise à jour sous-famille", error: error.message });
//   }
// // };

// exports.updateSousFamille = async (req, res) => {
//   try {
//     const oldCode = req.params.code;
//     const { nomSousFamille } = req.body;

//     if (!nomSousFamille?.trim()) {
//       return res.status(400).json({ message: "Le nom de la sous-famille est requis" });
//     }

//     if (!/[a-zA-ZÀ-ÿ]/.test(nomSousFamille)) {
//       return res.status(400).json({ message: "Le nom doit contenir au moins une lettre" });
//     }

//     const sousFamille = await SousFamille.findByPk(oldCode);
//     if (!sousFamille) {
//       return res.status(404).json({ message: "Sous-famille non trouvée" });
//     }

//     const famille = await Famille.findByPk(sousFamille.codeFamille);
//     if (!famille) {
//       return res.status(404).json({ message: "Famille associée introuvable" });
//     }

//     const nomSous = nomSousFamille.trim().replace(/\s+/g, '').toUpperCase();
//     const nouveauCode = `SF-${sousFamille.codeFamille}-${nomSous}`;

//     // Si le code ne change pas → mise à jour directe
//     if (nouveauCode === oldCode) {
//       await sousFamille.update({ nomSousFamille: nomSousFamille.trim() });
//       return res.status(200).json(sousFamille);
//     }

//     // Sinon → vérifier doublon
//     const existante = await SousFamille.findByPk(nouveauCode);
//     if (existante) {
//       return res.status(409).json({
//         message: `Une autre sous-famille avec le code ${nouveauCode} existe déjà`
//       });
//     }

//     // Création du nouveau et suppression de l’ancien
//     const nouvelleSousFamille = await SousFamille.create({
//       codeSousFamille: nouveauCode,
//       nomSousFamille: nomSousFamille.trim(),
//       codeFamille: sousFamille.codeFamille
//     });

//     await sousFamille.destroy(); // supprimer l'ancien après création réussie

//     res.status(200).json(nouvelleSousFamille);

//   } catch (error) {
//     res.status(500).json({
//       message: "Erreur lors de la mise à jour de la sous-famille",
//       error: error.message
//     });
//   }
// };



exports.updateSousFamille = async (req, res) => {
  try {
    const code = req.params.code;
    const { nomSousFamille, codeFamille } = req.body;

    if (!nomSousFamille || !/[a-zA-Z]/.test(nomSousFamille)) {
      return res.status(400).json({ message: "Le nom est requis et doit contenir au moins une lettre." });
    }

    const sousFamille = await SousFamille.findByPk(code);
    if (!sousFamille) {
      return res.status(404).json({ message: "Sous-famille non trouvée" });
    }

    const nomFormate = nomSousFamille.replace(/\s+/g, "").toUpperCase();
    const nouveauCode = `SF-${codeFamille || sousFamille.codeFamille}-${nomFormate}`;

    if (nouveauCode !== sousFamille.codeSousFamille) {
      const existe = await SousFamille.findByPk(nouveauCode);
      if (existe) {
        return res.status(409).json({ message: "Un autre code existe déjà avec ce nom" });
      }

      // Supprimer l'ancien et recréer proprement (si tu acceptes cette solution)
      await sousFamille.destroy();
      const nouvelleSousFamille = await SousFamille.create({
        codeSousFamille: nouveauCode,
        nomSousFamille: nomSousFamille,
        codeFamille: codeFamille || sousFamille.codeFamille,
      });

      return res.status(200).json(nouvelleSousFamille);
    } else {
      // Code ne change pas, juste mise à jour du nom
      await sousFamille.update({ nomSousFamille: nomSousFamille });
      return res.status(200).json(sousFamille);
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la sous-famille :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};





// DELETE : Supprimer une sous-famille
exports.deleteSousFamille = async (req, res) => {
  try {
    const code = req.params.code;
    const sousFamille = await SousFamille.findByPk(code);

    if (!sousFamille) {
      return res.status(404).json({ message: "Sous-famille non trouvée" });
    }

    await sousFamille.destroy();
    res.json({ message: "Sous-famille supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression sous-famille", error: error.message });
  }
};
