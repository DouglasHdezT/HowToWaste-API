/*
Copyright (c) 2020 AKHeroes.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, subject
to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
*/

const tfNode = require('@tensorflow/tfjs-node');
const fs = require('fs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const { Mongoose } = require('mongoose');


const controller = {};

controller.test = async (req, res) => {
	const { file } = req;
	
	try {
		const model = await mobilenet.load();
		const classifier = await knnClassifier.create();

		const buffer = fs.readFileSync(file.path);
		const tfImage = tfNode.node.decodeImage(buffer);

		const activation =  await model.infer(tfImage, "conv_preds");

		classifier.addExample(activation, "Coca cola");

		const predictions = await classifier.predictClass(activation);

		console.log(JSON.stringify(classifier.getClassifierDataset()));

		res.status(200).json({message: predictions});
	}catch(e){
		console.log(e);
		
		res.status(500).json({message: e});
	}
}

controller.save = (req, res) => {

}

module.exports = controller;