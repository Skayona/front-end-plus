const express = require('express');
const app = express();
let bodyParser = require('body-parser');
const port = 3000;
let $routes = require('./routes/routes');


app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: 'application/json'
}));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.get('/', function (req, res) {

	return res.send(`
    <strong>'/user/:userId'</strong> - вернет user по 'id';
    <br />
    <strong>'/users'</strong> - вернет всех юзеров;
    <br />
    <strong>'/users/:action'</strong>, где 'action' может быть 'last', 'first', 'all'.
  `);
});

app.route('/users')
	.get($routes.routes);

app.route('/user/:user')
	.get($routes.routes);

app.route('/users/:first')
	.get($routes.routes);

app.route('^\/user\/:user')
	.get($routes.routes);

app.route('/users/:all')
  .get($routes.routes);

app.listen(port);
console.log(`Mock server listening on port ${port}`);

module.exports = {
	app
};