const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const TesorStringSchema = new Schema({
	key: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	material: {
		type: String,
		required: true
	}
});

module.exports = Mongoose.model("tensorString", TesorStringSchema);