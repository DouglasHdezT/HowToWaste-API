const Material = require('../../models/Material');

const controller = {}

controller.dumpAll = (req, res) => { 
	
}

controller.insert = (req, res) => { 

}

controller.getAll = (req, res) => { 
	Material.find({},(err, mats)=>{
		if(err) return res.status(500).json({message:`Error interno ${err}`})
		if(!mats) return res.status(404).json({message:"Post no existente"})
		res.status(200).json({mats})
	});
}

controller.getOneByID = (req, res) => { 
	
}

controller.update = (req, res) => { 
	
}

module.exports = controller;