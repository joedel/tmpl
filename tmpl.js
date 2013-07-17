//for easy web console testing
// this.easyTemplate = "Some <b>words</b> with {{nested.vars}}, this is the {{simple}} case.";
// this.easyData =  { "vars": "giraffe", "simple": "elephant", "nested": {"vars": "zebra"} };
//tmpl(easyTemplate,easyData) returns processed template 
//tmpl(easyTemplate) returns a fn(), you can pass data to

;(function(exports) {
	var tmpl = function() {
		var OPENKEY = "{{",
		    CLOSEKEY = "}}",
		    KEYLEN = 2;

		function _templateToArray(template, parse) {
			var parse = parse || [];
			var chunk = _parseNext(template);
			if (chunk.length === 3 && chunk instanceof Array) {
				parse.push(_strToString(chunk[0]),_varToString("obj", chunk[1]));
				parse = _templateToArray(chunk[2], parse);
			} else {
				parse.push(_strToString(chunk));
			}
			return parse;
		}

		function _varToString(obj, str) {
			return "+("+ obj + "." + str + ")+";
		}

		function _strToString(str) {
			return "'" + str + "'";
		}

		function _parseNext(str) {
			var parseArr = [],
				openIndex = str.search(OPENKEY),
				closeIndex = str.search(CLOSEKEY);

			if (openIndex !== -1 && closeIndex !== -1) {
				parseArr.push(str.substring(0,openIndex)); //str before open tag
				parseArr.push(str.slice(openIndex + KEYLEN, closeIndex)); //var
				parseArr.push(str.slice(closeIndex + KEYLEN)); //remainder
				return parseArr;
			} else {
				return str; //could not find open and closing tags
			}
		}

		function _compileFn(parsed, data) {
			var str = parsed.join("");
			var compiledFn = new Function("obj", "var template="+str+"; return template;")
			if (data) {
				return compiledFn(data);
			} else {
				return compiledFn;
			}
		}

		function create(template, data) {
			var template = template.replace(/(\r\n|\n|\r)/gm,""); //removes newlines
      		var parsed = _templateToArray(template);
			return _compileFn(parsed, data);
		}
		return create;
	}

	exports.tmpl = tmpl();

})(typeof exports === 'undefined' ? this : exports);