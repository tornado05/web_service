var express = require('express');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3002, function () {
  console.log('Log service, port: 3002');
});