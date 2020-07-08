const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: '../../public/uploads' });
const { check } = require('express-validator');


const objectClassifierController = require('../../controllers/api/objectClassifier');

router.get("/getAll", objectClassifierController.getAllTensors);
//router.get("/dropAll", objectClassifierController.dropCollection);
router.post("/saveModel", upload.single("image"), [check("materialID").notEmpty().isMongoId()], objectClassifierController.saveObject);
router.post("/classify", upload.single("image"), objectClassifierController.classifyObject);

module.exports = router;