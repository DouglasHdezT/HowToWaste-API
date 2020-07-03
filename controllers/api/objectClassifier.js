const tfNode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const TensorStringModel = require('../../models/TensorString');

const controller = {}

//TODO: Add middleware multer
controller.saveObject = async (req, res) => {
	const { file } = req;
	const { name, material } = req.body;

	if(file && name && material){
		try {
			const model = await mobilenet.load();

			const buffer = fs.readFileSync(file.path);
			const tfImage = tfNode.node.decodeImage(buffer);

			const activation =  await model.infer(tfImage, "conv_preds");

			const tensorStringDoc = new TensorStringModel({
				key: name,
				material: material,
				content: JSON.stringify(activation)
			});
		} catch (error) {
			return res.status(500).json({message: "Internal server error"})
		}
	}else{
		return res.status(400).json({message: "Bad Request!"})
	}
}

module.exports = controller;