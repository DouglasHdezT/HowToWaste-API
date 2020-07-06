const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	items: [String]
});

module.exports = mongoose.model("material", MaterialSchema);