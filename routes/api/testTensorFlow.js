const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '../../public/uploads'});

const tensorController = require("../../controllers/api/testTensorFlow");

router.post("/test", upload.single('image') ,tensorController.test);

module.exports = router;