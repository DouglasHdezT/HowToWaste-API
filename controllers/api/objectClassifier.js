const tfNode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const TensorStringModel = require('../../models/TensorString');
const Material = require('../../models/Material');

const controller = {}

controller.saveObject = async (req, res) => {
	const { file } = req;
	const { materialID, item } = req.body;

	if(file && item && materialID){
		try {
			const model = await mobilenet.load();

			const buffer = fs.readFileSync(file.path);
			const tfImage = tfNode.node.decodeImage(buffer);

			const activation = await model.infer(tfImage, "conv_preds");
			
			const material = await Material.findById(materialID).exec();
			if (!material) return res.status(404).json({ message: "Material not found" });
			
			const itemIndex = material.items.findIndex(itemA => itemA === item);
			if(itemIndex < 0) return res.status(404).json({ message: "Item not found" });

			const tensorStringDoc = new TensorStringModel({
				key: item,
				material: material.name,
				content: JSON.stringify(activation.arraySync()),
			});

			const tensorDoc = await tensorStringDoc.save();
			
			return res.status(200).json({message: "Model saved Successfully"});
		} catch (error) {
			console.log(error);
			return res.status(500).json({message: "Internal server error"});
		}
	}else{
		return res.status(400).json({message: "Bad Request!"});
	}
}

controller.classifyObject = async (req, res) => {
	const { file } = req;

	if(file){
		try {
			const model = await mobilenet.load();
			const classifier = knnClassifier.create();

			const tensorStringDocs = await TensorStringModel.find({}).exec();

			tensorStringDocs.forEach(tensorString => {
				classifier.addExample(tfNode.tensor(JSON.parse(tensorString.content)), `${tensorString.key}|${tensorString.material}`);
			});

			const buffer = fs.readFileSync(file.path);
			const tfImage = tfNode.node.decodeImage(buffer);

			const activation =  model.infer(tfImage, "conv_preds");

			const predictions = await classifier.predictClass(activation, 15);
			const probability = predictions.confidences[predictions.label];
			console.log(`Probabilidad: ${probability}\n${probability > 0.75 ? "Aceptable" : "No aceptable"}`);

			const isAcceptable = probability >= 0.75;

			if (isAcceptable) {
				return res.status(200).json({
					type: predictions.label.split("|")[0],
					material: predictions.label.split("|")[1],
					probability
				});
			} else { 
				return res.status(404).json({message: "I dont know what is it"});
			}

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

controller.dropCollection = (req, res) => {
	TensorStringModel.deleteMany({}, (err) => {
		if(err) return res.status(500).json({message: "Internal server error"});

		return res.status(200).json({message: "Dropped"});
	})
}

module.exports = controller;