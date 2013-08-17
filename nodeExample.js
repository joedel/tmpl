var tmpl = require('./tmpl.js').tmpl,
    http = require("http");

var app = http.createServer(function (req, res) {
	res.write(header);
	
  for (var i = 0; i<data.length; i++) {
		res.write(compiledTemplate(data[i]));
	}
	
  res.write(footer);
	res.end();

}).listen(3000,"localhost");

console.log("server running on http://localhost:3000");

var header = "<!doctype HTML><html><head></head><body>",
    footer = "</body></html>",
    template = "<h1>{{name}}</h1><p>{{address}}</p><p>Rating: {{rating}}</p>",
    compiledTemplate = tmpl(template);
    data = [
      {
        "id": 1,
        "name": "Best Pizza",
        "address": "2780 Stillwell Ave",
        "rating": "C",
        "date": "2013-6-05"
      },
      {
        "id": 2,
        "name": "Dollar Pizza",
        "address": "423 Somewhere Lane",
        "rating": "A",
        "date": "2013-7-24"
      },
      {
        "id": 3,
        "name": "Big Italy",
        "address": "3 Varick St",
        "rating": "A",
        "date": "2013-7-24"
      },
      {
        "id": 4,
        "name": "Second Restaurant",
        "address": "54 Divide Dr",
        "rating": "A",
        "date": "2013-7-24"
      },
      {
        "id": 5,
        "name": "Phil's",
        "address": "42 Bliss Dr",
        "rating": "B",
        "date": "2013-7-24"
      }
    ];