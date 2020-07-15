const express = require("express");
const router = express.Router();

const recyclerPlaceRouter = require('./api/recyclerPlace');
const objectClassifier = require('./api/objectClassifier');
const material = require("./api/material");

router.use("/recyclerPlace", recyclerPlaceRouter);
router.use("/classifier", objectClassifier);
router.use("/material", material);

module.exports = router;