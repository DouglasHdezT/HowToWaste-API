const express = require("express");
const router = express.Router();

const tensorController = require("../../controllers/api/testTensorFlow");

router.get("/test", tensorController.test);

module.exports = router;