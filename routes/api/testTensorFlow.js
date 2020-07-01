const express = require("express");
const router = express.Router();

const tensorController = require("../../controllers/api/testTensorFlow");

router.post("/test", tensorController.test);

module.exports = router;