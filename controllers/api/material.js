const Material = require('../../models/Material');

const controller = {}

controller.dumpAll = (req, res) => { 
	
}

controller.insert = (req, res) => { 

}

controller.getAll = (req, res) => { 
	
}

controller.getOneByID = (req, res) => { 
	
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