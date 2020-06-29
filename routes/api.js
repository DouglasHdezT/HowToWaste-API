const express = require("express");
const router = express.Router();
const recyclerPlaceRouter = require('./api/recyclerPlace');

router.use("/recyclerPlace", recyclerPlaceRouter);

module.exports = router;