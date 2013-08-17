;(function(exports) {
  var tmpl = function() {
    var openKey = "{{",
        closeKey = "}}",
        keyLen = 2;

    function templateToArray(template, parse) {
      var chunk = parseNext(template);
      parse = parse || [];

      if (chunk.length === 3 && chunk instanceof Array) {
        parse.push(strToString(chunk[0]),varToString("data", chunk[1]));
        templateToArray(chunk[2], parse);
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
          openIndex = str.search(openKey),
          closeIndex = str.search(closeKey);

      if (openIndex !== -1 && closeIndex !== -1) {
        parseArr.push(str.substring(0,openIndex));
        parseArr.push(str.slice(openIndex + keyLen, closeIndex));
        parseArr.push(str.slice(closeIndex + keyLen));
        
        return parseArr;

      } else {
        //No matches
        return str;
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
      template = template.replace(/(\r\n|\n|\r)/gm,""); //remove newlines
      var parsed = templateToArray(template);

      return compileFn(parsed, data);
    }
    return create;
  };

	exports.tmpl = tmpl();

})(typeof exports === 'undefined' ? this : exports);