// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { importerCommandes } = require("../controllers/CommandeController");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
// });
// const upload = multer({ storage });

// router.post("/commandes", upload.single("file"), importerCommandes);
// router.get("/commandes", commandeController.getAllCommandes);
// module.exports = router;






// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// // ✅ IMPORT DU CONTROLLER
// const commandeController = require("../controllers/CommandeController");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage });

// // ✅ ROUTES
// router.post("/commandes", upload.single("file"), commandeController.importerCommandes);
// router.get("/commandes", commandeController.getAllCommandes);

// module.exports = router;





const express = require("express");
const router = express.Router();
const multer = require("multer");
const commandeController = require("../controllers/CommandeController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

router.post("/commandes", upload.single("file"), commandeController.importerCommandes);
router.get("/getcommandes", commandeController.getAllCommandes);
router.get("/getcommandesByDepot/:idUtilisateur", commandeController.getAllCommandes);

module.exports = router;