//for easy console testing
this.easyTemplate = "Some <b>words</b> with {{vars}}, this is the {{simple}} case";
this.easyData =  { "vars": "giraffe", "simple": "elephant" };

//Tmpl.create(easyTemplate,easyData) returns processed template 
//Tmpl.create(easyTemplate) returns a fn(), you can pass data to

;(function(exports) {
	var Tmpl = {
		OPENKEY: "{{",
		CLOSEKEY: "}}",
		KEYLEN: 2,
		PARSED: [],

		create: function(template, data) {
			var parsed = [];
			this._templateToArray(template, parsed);
			return this._compileFunction(parsed, data);
		},

		_templateToArray: function(template, parseArray) {
			var chunk = this._parseChunk(template);
			if (chunk.length === 3 && chunk instanceof Array) {
				parseArray.push(chunk[0],"VAR:"+chunk[1]);
				this._templateToArray(chunk[2], parseArray);
			} else {
				parseArray.push(chunk);
			}
		},
		_parseChunk: function(str) {
			var parseArr = [];
			var openIndex = str.search(this.OPENKEY);
			var closeIndex = str.search(this.CLOSEKEY);
			if (openIndex !== -1 && closeIndex !== -1) {
				parseArr.push(str.substring(0,openIndex));
				parseArr.push(str.slice(openIndex + this.KEYLEN, closeIndex));
				parseArr.push(str.slice(closeIndex + this.KEYLEN));
				return parseArr;
			} else {
				return str;
			}
		},
		_compileFunction: function(parsed, data) {
			var str = "";
			for (var i=0; i<parsed.length; i++) {
				if (parsed[i].substring(0,4) === "VAR:") {
					str += "+(obj."+parsed[i].slice(4)+")+";
				} else {
					str += "'" + parsed[i] + "'";
				}
			}
			var compiledFn = new Function("obj", "var out="+str+"; return out;")
			if (data) {
				return compiledFn(data);
			} else {
				return compiledFn;	
			}
		}
	}
	exports.Tmpl = Tmpl;

})(this);