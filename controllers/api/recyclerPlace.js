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

const recyclerPlacesData = require('../../assets/json/recyclerData.json');

const RecyclerPlace = require('../../models/RecyclerPlace');
const controller = {};

controller.dumpRecyclerPlaces = (req, res) => {
	const recyclerPlacesDocs = recyclerPlacesData
		.map(place => (new RecyclerPlace(place)));
	
	RecyclerPlace.create(recyclerPlacesDocs, (err, docs) => {
		if(err){
			console.log(err);
			return res.status(500).json({message: "An error ocurred"})
		}

		res.status(200).json({message: "All data dumped"})
	});
}

controller.getAll = (req, res) => {
	RecyclerPlace.find({},(err, places)=>{
		if(err) return res.status(500).json({message:`Error interno ${err}`})
		if(!places) return res.status(404).json({message:"Post no existente"})
		res.status(200).json({places})
	});
}

controller.getDirections = (req, res) => {
	RecyclerPlace.find({}," _id name directions ", (err, places)=>{
		if(err) return res.status(500).json({message:`Error interno ${err}`})
		if(!places) return res.status(404).json({message:"Post no existente"})
		res.status(200).json({places})
	});
}

controller.getOneByID = (req, res) => {
	const id = req.params.id

	RecyclerPlace.findById(id,(err, place)=>{
    if (err) return res.status(500).json({message: `Error interno ${err}`})
    if(!place) return res.status(404).json({message:"No existente"})
    res.status(200).json({place})
})
}

module.exports = controller;
