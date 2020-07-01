const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');

const controller = {};

controller.test = async (req, res) => {
	console.log(req);

	try {
		const model = await mobilenet.load();
		res.status(200).json({message: "Se cargo"});
	}catch(e){
		res.status(500).json({message: e});
	}
}

module.exports = controller;