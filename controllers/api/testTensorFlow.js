const tfNode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');


const controller = {};

controller.test = async (req, res) => {
	const { file } = req;
	
	try {
		const model = await mobilenet.load();
		const classifier = await knnClassifier.create();

		const buffer = fs.readFileSync(file.path);
		const tfImage = tfNode.node.decodeImage(buffer);

		const activation =  await model.infer(tfImage, "conv_preds");

		classifier.addExample(activation, "Página de papel");

		const predictions = await classifier.predictClass(activation);

		console.log(activation);

		res.status(200).json({message: predictions});
	}catch(e){
		console.log(e);
		
		res.status(500).json({message: e});
	}
}

module.exports = controller;