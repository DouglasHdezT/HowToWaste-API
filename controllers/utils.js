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