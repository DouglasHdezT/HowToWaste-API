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

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const RecyletPlaceSchema = new Schema({
	name:{
		type: String,
		required: true,
	},
	phoneNumbers:{
		type: [{
			phoneType: String,
			phoneNumber: String,
		}],
		default: []
	},
	directions: {
		type: [{
			name: {
				type: String,
				default: ""
			},
			desc: String,
			latitude: {
				type: Number,
				required: true
			},
			longitude: {
				type: Number,
				required: true
			},
		}],	
		default: []
	},
	emails:{
		type: [String],
		default: []
	},
	webs:{
		type: [String],
		default: []
	},
	contactWith:{
		type: [String],
		default: []
	},
	services:{
		type: [String],
		default: []
	},
	materials:{
		type: [String],
		required: true
	},
});

module.exports = Mongoose.model("recyclerPlace", RecyletPlaceSchema);