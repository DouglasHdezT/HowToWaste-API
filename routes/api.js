const express = require("express");
const router = express.Router();
const recyclerPlaceRouter = require('./api/recyclerPlace');
const testTensorFlow = require('./api/testTensorFlow');

router.use("/recyclerPlace", recyclerPlaceRouter);
router.use("/tensor", testTensorFlow);

module.exports = router;