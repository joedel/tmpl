tmpl.js
====

Works in the browser or with Node.js. 

Pass data and a template and it returns a processed template. Pass just a template and it returns a function that can
be used with a data object later.

Ex:<br/>
    var template = "Some words with {{nested.vars}}, this is the {{simple}} case.";<br/>
    var data =  { "vars": "giraffe", "simple": "elephant", "nested": {"vars": "zebra"} };<br/>
    tmpl(easyTemplate,easyData) returns processed template<br/>
    tmpl(easyTemplate) returns a fn(), you can pass data into.
