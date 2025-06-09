const express = require("express");
const router = express.Router();
const multer = require("multer");
const clientController = require("../controllers/clientController");


const upload = multer({ storage: multer.memoryStorage() });

router.post("/", clientController.createClient);
router.get("/", clientController.getClients);
router.get("/:codeClient", clientController.getClientById); 
router.put("/:codeClient", clientController.updateClient);  
router.delete("/:codeClient", clientController.deleteClient); 


router.post("/import/excel", upload.single("file"), clientController.importClientsFromExcel);

module.exports = router;
