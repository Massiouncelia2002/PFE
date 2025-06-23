const express = require("express");
const router = express.Router();

// const path = require("path");
const { ajouterEntree } = require("../controllers/entreeController");


router.post("/entrees", ajouterEntree);


module.exports = router;
