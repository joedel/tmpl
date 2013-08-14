var expect = require('expect.js');
var tmpl = require('../tmpl.js').tmpl;

describe('interpolate test suite', function() {
	var template,
		data,
		result;

	beforeEach(function() {
		template = "<h1>{{name}}</h1><p>{{address}}</p><p>Rating: {{rating}}</p>";
		data = {name: "Bob", address: "Varick", rating: "A"};
		result = "<h1>Bob</h1><p>Varick</p><p>Rating: A</p>";
	});
	
	it('should return a function if passed a template', function() {
		expect(tmpl(template)).to.be.a('function');
	});

	it('returned function should render template if passed data', function() {
		expect(tmpl(template)(data)).to.equal(result);
	});

	it('tmpl(tmp, data) should equal tmpl(tmp)(data)', function() {
		expect(tmpl(template, data)).to.equal(tmpl(template)(data));
	});

	it('should return a rendered if passed a template and data', function() {
		expect(tmpl(template,data)).to.equal(result);
	});
});

describe('iterate test suite', function() {
	var iterateTemplate = "<ul>{{#beatles}}<li>{{firstName}} {{lastName}}</li>{{/beatles}}",
		iterateResult = "<ul><li>John Lennon</li><li>Paul McCartney</li><li>George Harrison</li><li>Ringo Starr</li>",
		iterateData = {
			"beatles": [
				{ "firstName": "John", "lastName": "Lennon" },
				{ "firstName": "Paul", "lastName": "McCartney" },
				{ "firstName": "George", "lastName": "Harrison" },
				{ "firstName": "Ringo", "lastName": "Starr" }
			],
			"name": function () {
				return this.firstName + " " + this.lastName;
			}
		};

	it('should return a function', function() {
		expect(tmpl(iterateTemplate)).to.be.a('function');
	});

	it('returned function should render template if passed data', function() {
		expect(tmpl(iterateTemplate)(iterateData)).to.equal(iterateResult);
	});

	it('should render a template', function() {
		expect(tmpl(iterateTemplate, iterateData)).to.equal(iterateResult);
	});

	it('tmpl(tmp, data) should equal tmpl(tmp)(data)', function() {
		expect(tmpl(iterateTemplate, iterateData)).to.equal(tmpl(iterateTemplate)(iterateData));
	});
});




