const express = require("express");
const router = express.Router();

const recyclerPlaceRouter = require('./api/recyclerPlace');
const testTensorFlow = require('./api/testTensorFlow');
const objectClassifier = require('./api/objectClassifier');
const material = require("./api/material");

router.use("/recyclerPlace", recyclerPlaceRouter);
router.use("/tensor", testTensorFlow);
router.use("/classifier", objectClassifier);
router.use("/material", material);

module.exports = router;