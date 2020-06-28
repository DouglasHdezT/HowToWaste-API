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