const tf = require('@tensorflow/tfjs');
const tfNode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const cocossd = require('@tensorflow-models/coco-ssd');


const controller = {};

controller.test = async (req, res) => {
	const { file } = req;
	
	try {
		const model = await cocossd.load();		
		const buffer = fs.readFileSync(file.path);
		const tfImage = tfNode.node.decodeImage(buffer);

		const predictions = await model.detect(tfImage);

		res.status(200).json({message: predictions});
	}catch(e){
		res.status(500).json({message: e});
	}
}

module.exports = controller;