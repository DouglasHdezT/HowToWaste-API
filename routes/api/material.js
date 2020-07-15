const express = require("express");
const router = express.Router();

const materialController = require("../../controllers/api/material");

//router.get("/dumpAll", materialController.dumpAll);
router.get("/getAll", materialController.getAll);
router.get("/one/:id", materialController.getOneByID);
router.post("/item", materialController.insert);
//router.put("/", materialController.update);

module.exports = router;