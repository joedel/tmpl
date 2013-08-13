;(function(exports) {
	var tmpl = function() {
		var OPENKEY = "{{",
			CLOSEKEY = "}}",
			KEYLEN = 2;

		function templateToArray(template, parse) {
			var parse = parse || [],
				chunk = parseNext(template);
			
			if (chunk.length === 3 && chunk instanceof Array) {
				parse.push(strToString(chunk[0]),varToString("data", chunk[1]));
				parse = templateToArray(chunk[2], parse);
			} else {
				parse.push(strToString(chunk));
			}
			return parse;
		}

		function varToString(obj, str) {
			return "+("+ obj + "." + str + ")+";
		}

		function strToString(str) {
			return "'" + str + "'";
		}

		function parseNext(str) {
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

		function compileFn(parsed, data) {
			var str = parsed.join(""),
				compiledFn = new Function("data", "var template="+str+"; return template;");
			
			if (data) {
				return compiledFn(data);
			} else {
				return compiledFn;
			}
		}

		function create(template, data) {
			var template = template.replace(/(\r\n|\n|\r)/gm,""), //removes newlines
				parsed = templateToArray(template);

			return compileFn(parsed, data);
		}
		return create;
	};

	exports.tmpl = tmpl();

})(typeof exports === 'undefined' ? this : exports);