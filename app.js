const express = require('express');
const bodyParser = require('body-parser');
var db = require('./db');
var user = require('./model/user');
const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const app = express();

const port = process.env.PORT || 8080;

//Tunnels
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.listen(port, () => {
	console.log('Server running on port %s', port);
});

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/login.html');
});


app.post('/login', (req, res) => {

	//var userObj = new user(); //ORM 

	user.find({ "name": req.body.username }, (err, record) => {
		console.log(record[0].password);

		if(err)
			console.log("Error while logging In");
		else if(record == null) {
			console.log('No records found');
			res.json({ "message": "No records found", "status": 401});
		}

		else if(record[0].password != req.body.password){
			console.log("Username or password invalid");
			res.json({ "message": "Username or password invalid", "status": 401});
		}	
		else {
			console.log("User found");
			//res.json({ "message": "User found", "status": 200});
			res.sendFile(__dirname + '/home.html');
		}

	});

});

app.get('/register', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/users/:userId', (req, res) => {

	var userId = req.params.userId;
	console.log("********* ", userId);

	user.find((err, data) => {

		res.json(data);
	});

});

app.post('/register', (req, res) => {

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

			/*sgMail.send({
			    to: req.body.email,
			    from: 'xyz@edureka.co',
			    subject: 'Registration successful for ' + req.body.username,
			    text: 'welcome to Edureka'
			}))*/

			res.json(data);
		}

	});


});