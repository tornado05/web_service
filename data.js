var express = require('express');
var bodyParser = require("body-parser");
var http = require("http");
var querystring = require('querystring');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
	authenticate(function (result) {
		console.log(result);
		if (result.token) {
			res.send('Hello');
		} else {
			if (result.error === 1) {
				res.send('Shit happens');
			} else {
				res.send('I don\'t know you');
			}			
		}
	});	
});

app.listen(3001, function () {
  console.log('Data service, port: 3001');
});


function authenticate(executable) {
	var postData = querystring.stringify({
	  'login' : 'user',
	  'pw' : '1'
	});

	var options = {
	  hostname: 'localhost',
	  port: 3000,
	  path: '/auth',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': Buffer.byteLength(postData)
	  }
	};

	var req = http.request(options, (res) => {
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	  	executable(JSON.parse(chunk));
	  });
	  res.on('end', () => {
	    console.log('No more data in response.');
	  });
	});

	req.on('error', (e) => {
	  console.log(`problem with request: ${e.message}`);
	  executable({ error: 1 });
	});

	req.write(postData);
	req.end();
}