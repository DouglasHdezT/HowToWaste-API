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

		console.log(docs);
		res.status(200).json({message: "All data dumped"})
	});
}

controller.getAll = (req, res) => {
	RecyclerPlace.find({},(err,posts)=>{
		if(err) return res.status(500).json({message:`Error interno ${err}`})
		if(!posts) return res.status(404).json({message:"Post no existente"})
		res.status(200).json({posts})
	});
}

controller.getOneByID = (req, res) => {
	
}

module.exports = controller;