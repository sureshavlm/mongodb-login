const express = require('express');
const bodyParser = require('body-parser');
var db = require('./db');
var user = require('./model/user');

const expressGraphQL = require('express-graphql');

var userRouter = require('./router/user');
var productsRouter = require('./router/products');
var ordersRouter = require('./router/orders');

isUserLoggedIn = false;

const app = express();

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/login.html');
});

//middle ware or tunnel
app.use((req, res) => {

	console.log(new Date());
});

app.use('/graphql', expressGraphQL({
	graphql: true
}));

app.get('/products', [
					function(req, res, next) {
						if(role == "manager")
							next();
						else
							res.json({ "status": 401, "message": "Unauthroized Error"});
					}, 
					function(req, res) { 
						var userId = req.params.userId;
						console.log("********* ", userId);
						user.find((err, data) => {
							res.json(data);
						});
					}]
);

app.use('/users', userRouter);

app.use('/products', productsRouter);
app.use('/orders', ordersRouter);


app.listen(port, () => {
	console.log('Server started on port %s', port);
});
