const express = require('express');
const router = express.Router();
var user = require('../model/user');


router.get('/:userId', (req, res) => {

	var userId = req.params.userId;
	console.log("********* ", userId);

	user.find((err, data) => {

		res.json(data);
	});

});

router.get('/register', (req, res) => {
	res.sendFile(__dirname + "/register.html");
});


router.post('/register', (req, res) => {

	console.log(req.body);
	var msg = "";

	var userCollection = new user(); //ORM -> loginusers table mapped with Schema or Model

	if(req.body.username == undefined){
		res.json({ "status": 500, "message": "Username is mandatory"});
	}

	userCollection.name = req.body.username;
	userCollection.password = req.body.password;
	userCollection.email = req.body.email;

	userCollection.save((err, data) => {
		if(err){
			console.log('Error while registering user');
			res.json({ "status": 500, "message": "Error while Registering a user."});
		}
		else {

			sgMail.send({
			    to: req.body.email,
			    from: 'xyz@edureka.co',
			    subject: 'Registration successful for ' + req.body.username,
			    text: 'welcome to Edureka'
			});

			res.json(data);
		}
	});

});


module.exports = router;