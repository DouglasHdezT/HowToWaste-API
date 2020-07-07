const Material = require('../../models/Material');

const controller = {}

controller.dumpAll = (req, res) => { 
	
}

controller.insert = (req, res) => { 

}

controller.getAll = (req, res) => { 
	
}

controller.getOneByID = (req, res) => {
    const id = req.params.id

    material.findById(id,(err, material)=>{
        if (err) return res.status(500).json({message: `Error interno ${err}`})
        if(!material) return res.status(404).json({message:"No existente"})
        res.status(200).json({material: material})
    })
}

controller.update = (req, res) => { 
	
}

module.exports = controller;