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

const Material = require('../../models/Material');
const materialData = require("../../assets/json/materialData.json");

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

			if(item.indexOf("|") > 0) return res.status(400).json({ message: "Bad request!" });

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
    Material.findByIdAndUpdate(req.body._id,{name, items },(err,uPost)=>{
        if(err) return res.status(500).json({message:"Error interno del servidor "})
        if(!uPost) return res.status(404).json({message:"Post no existente"})
        res.status(200).json({message:'Post updated'})
    })
}

module.exports = controller;