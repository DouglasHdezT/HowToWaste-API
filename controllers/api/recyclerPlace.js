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
	console.log(id)
	RecyclerPlace.findById(id,(err, place)=>{
    if (err) return res.status(500).json({message: `Error interno ${err}`})
    if(!place) return res.status(404).json({message:"No existente"})
    res.status(200).json({place})
})
}

module.exports = controller;
