const { execFile } = require("child_process");

const  controller = {}

controller.updateGet = (req, res) => {
	execFile("sh", [`${process.env.EXECPATH}/exec.sh`], (err) => {
		if(err) return res.status(500).json({message: "Unexpexted error"});

		res.status(200).json({message: "Update completed"})
	})	
}

controller.updatePost = (req, res) => {
	const ref = JSON.parse(req.body.payload).ref;

	if (ref === "refs/heads/master"){
		execFile("sh", [`${process.env.EXECPATH}/exec.sh`], (err) => {
			if(err) return res.status(500).json({});
	
			res.status(200).json({});
		})
	} else{
		res.status(200).json({});
	} 
}

module.exports = controller;