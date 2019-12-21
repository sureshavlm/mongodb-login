const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/evs');

mongoose.connection.on('connected', () => {
	console.log('DB connected successfully!');
});

mongoose.connection.on('error', () => {
	console.log('Error while connecting to DB');
});


mongoose.connection.on('disconnected', () => {
	console.log('DB disconnectedß');
});