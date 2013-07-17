//Works with Node
var tmpl = require('./tmpl.js').tmpl;

var easyTemplate = "Some <b>words</b> with {{nested.vars}}, this is the {{simple}} case.";
var easyData =  { "vars": "giraffe", "simple": "elephant", "nested": {"vars": "zebra"} };

console.log(tmpl(easyTemplate));
console.log(tmpl(easyTemplate,easyData));