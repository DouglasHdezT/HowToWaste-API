const tfNode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const TensorStringModel = require('../../models/TensorString');

const controller = {}

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
				content: JSON.stringify(activation),
			});

			const tensorDoc = await tensorStringDoc.save();
			console.log(`Saved Tensor: ${tensorDoc}`);
			
			return res.status(200).json({message: "Model saved Successfully"});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: "Internal server error"});
		}
	}else{
		return res.status(400).json({message: "Bad Request!"});
	}
}

controller.getAllTensors = (req, res) => {
	TensorStringModel.find({}, (err, docs) => {
		if(err) return res.status(500).json({message: "Internal server error"});

		if(!docs) return res.status(404).json({message: "Not Found"});
		
		return res.status(200).json({tensors: docs});
	});
}

module.exports = controller;