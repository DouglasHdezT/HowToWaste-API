const Material = require('../../models/Material');
const materialData = require("../../assets/json/materialData.json")

const controller = {}

controller.dumpAll = (req, res) => { 
	const materialsDocs = materialData
		.map(material => new Material(material));
	
	Material.create(materialsDocs, (err, docs) => { 
		if(err){
			console.log(err);
			return res.status(500).json({message: "An error ocurred"})
		}

		res.status(200).json({message: "All data dumped"})
	});
}

controller.insert = async (req, res) => { 
	const { _id, item } = req.body;
	
	if (_id && item) {
		try {
			const material = await Material.findById(_id).exec();
			
			if (!material) { 
				return res.status(404).json({ message: "Not Found" });
			}

			material.items.push(item);
			material.save();

			return res.status(200).json({ message: "Item inserted" });
		} catch (error) {
			return res.status(500).json({ message: "An error ocurred" });
		}
	} else {
		res.status(400).json({ message: "Bad request!" });
	}
}

controller.getAll = (req, res) => { 
	Material.find({},(err, mats)=>{
		if(err) return res.status(500).json({message:`Error interno ${err}`})
		if(!mats) return res.status(404).json({message:"Post no existente"})
		res.status(200).json({materials: mats})
	});
}

controller.getOneByID = (req, res) => {
    const id = req.params.id

    Material.findById(id,(err, material)=>{
        if (err) return res.status(500).json({message: `Error interno ${err}`})
        if(!material) return res.status(404).json({message:"No existente"})
        res.status(200).json({material: material})
    })
}

controller.update = (req, res) => { 
	const {name, items} = req.body;
    Post.findByIdAndUpdate(req.body._id,{name, items },(err,uPost)=>{
        if(err) return res.status(500).json({message:"Error interno del servidor "})
        if(!uPost) return res.status(404).json({message:"Post no existente"})
        res.status(200).json({message:'Post updated'})
    })
}

module.exports = controller;