const fs = require('fs');
var express = require('express');
var spreedsheet = require('./api-spreedsheet-google.js');
var app = express();

var Mustache = require('mustache');

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('Hello World!' + spreedsheet.apiSpreedsheet());
});

app.get('/index', function (req, res) {
  let options = {
    chart: {
      type: 'line'
    },
    series: [{
      name: 'sales',
      data: [30,40,35,50,49]
    }],
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai']
    }
  };

  const output = Mustache.render(fs.readFile('view/index'), options);
  res.send(output);
});

app.listen(port, function () {
  console.log('Example app listening on port: ' + port);
});
