const express = require("express");
const router = express.Router();

const recyclerPlaceController = require("../../controllers/api/recyclerPlace");

//router.get("/dumpData", recyclerPlaceController.dumpRecyclerPlaces);
router.get("/getAll", recyclerPlaceController.getAll);

module.exports = router; 