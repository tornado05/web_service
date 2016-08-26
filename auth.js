var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/auth', function (req, res) {
	var session = {};
	if (req.body.login === "user" && req.body.pw === "1")  {
			session.token = "testtoken";					
	} else {
		session.error = "error";
	}
	res.send(session);
});

app.listen(3000, function () {
  console.log('Auth service, port: 3000');
});