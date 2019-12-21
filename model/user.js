var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: { type: String, unique: true},
	email: { type: String, unique: true},
	password: { type: String},
	admin: { type: Boolean}
});

//map this schema with mongodb collection
module.exports = mongoose.model('loginusers', userSchema);
