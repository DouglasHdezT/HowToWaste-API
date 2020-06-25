const express = require("express");
const router = express.Router();

const utilsController = require("../controllers/utils");

router.get("/updateSource", utilsController.updateGet);
router.post("/updateSource", utilsController.updatePost);

module.exports = router;