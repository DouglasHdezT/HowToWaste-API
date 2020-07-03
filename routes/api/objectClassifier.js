const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: '../../public/uploads'});

const objectClassifierController = require('../../controllers/api/objectClassifier');

router.post("/saveModel", upload.single("image"), objectClassifierController.saveObject);

module.exports = router;