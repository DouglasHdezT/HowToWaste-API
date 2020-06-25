const express = require("express");
const router = express.Router();

const utilsController = require("../controllers/utils");

router.get("/updateSource", utilsController.updateGet);
router.post("/updateSource", utilsController.updatePost);

router.get("/test", (req, res) => {
	res.status(200).json({msg: "Prubea"});
})

module.exports = router;