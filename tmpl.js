//for easy web console testing
this.easyTemplate = "Some <b>words</b> with {{nested.vars}}, this is the {{simple}} case.";
this.easyData =  { "vars": "giraffe", "simple": "elephant", "nested": {"vars": "zebra"} };

//tmpl(easyTemplate,easyData) returns processed template 
//tmpl(easyTemplate) returns a fn(), you can pass data to

;(function(exports) {
	var tmpl = function() {
		var OPENKEY = "{{",
			CLOSEKEY = "}}",
			KEYLEN = 2;

		function _templateToArray(template, parse) {
			var chunk = _parseNext(template);
			if (chunk.length === 3 && chunk instanceof Array) {
				parse.push(chunk[0],"VAR:"+chunk[1]);
				_templateToArray(chunk[2], parse);
			} else {
				parse.push(chunk);
			}
		}

		function _parseNext(str) {
			var parseArr = [];
			var openIndex = str.search(OPENKEY);
			var closeIndex = str.search(CLOSEKEY);
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
			var str = "";
			for (var i=0; i<parsed.length; i++) {
				if (parsed[i].substring(0,4) === "VAR:") {
					str += "+(obj."+parsed[i].slice(4)+")+";
				} else {
					str += "'" + parsed[i] + "'";
				}
			}
			var compiledFn = new Function("obj", "var template="+str+"; return template;")
			
			if (data) {
				return compiledFn(data);
			} else {
				return compiledFn;	
			}
		}

		function create(template, data) {
			template = template.replace(/(\r\n|\n|\r)/gm,""); //removes newlines
			var parsed = [];
			_templateToArray(template, parsed);
			return _compileFn(parsed, data);
		}

		return {create: create}
	}
	exports.tmpl = tmpl().create;

})(this);