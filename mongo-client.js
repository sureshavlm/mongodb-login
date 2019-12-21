const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/evs';

MongoClient.connect(url, (err, db) => {

	if(err){
		console.log('Error while connecting to DB');
	}
	else {
		console.log('DB connected successfully!');
		var collection = db.collection('loginusers');

		collection.insert({ "name" : "Jogi", "password": "jogi123", "admin": true }, function(err, result) {

			if(err){
				console.log('Insertion failed');
			}
			else {
				console.log('successfully inserted');
			}
		});

		/*collection.find((error, data) => {
			if(error){
				console.log('Error while connecting to loginusers collection');
			}
			else {
				console.log('Data received from loginusers collection');
				console.log(data);
			}
		});*/
	}

});