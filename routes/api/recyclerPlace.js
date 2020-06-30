const express = require("express");
const router = express.Router();

const recyclerPlaceController = require("../../controllers/api/recyclerPlace");

//router.get("/dumpData", recyclerPlaceController.dumpRecyclerPlaces);
router.get("/getAll", recyclerPlaceController.getAll);
router.get("/one/:id", recyclerPlaceController.getOneByID);
router.get("/getDirections", recyclerPlaceController.getDirections);
module.exports = router; 