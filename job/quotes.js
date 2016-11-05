// QotD file parser
// By BrokenR3C0RD

var fs = require("fs");

const PARSER_RE = /\s*(?:\#\|\s*(Date|From|Description)\:\s*(.*)|\#.*|\-\s(.+)|(.+)|)/i;

/*
      Parser fields:
      =============
   1, 2: Meta data field, value
      3: Person quoted
      4: Quote data
*/

var parse = function(file){
  var data = fs.readFileSync(file, "utf8");
  var tmp = {
    meta:   {},
    quotes: []
  };

  var done = false;

  var quote = {
    quote: "",
    from:  "",
    id: -1
  };

  var out = [];
  var numQuotes = 0;

  data.split("\n").forEach(function(line){
    var data = PARSER_RE.exec(line.trim());

    if(data == null)
      throw new Error("Something is wrong with the parser! It didn't handle a string properly!");

    if(data[1] != null){
      if(done){
        out.push(tmp);
        tmp = {
          meta:   {},
          quotes: []
        };
        done = false;
      }
      var field = data[1].toLowerCase();
      tmp.meta[field] = data[2].trim();
    } else if(data[3] != null && quote.quote !== ""){
      quote.from = data[3];
      quote.quote = quote.quote.trim();
      quote.id = numQuotes + 1;
      tmp.quotes.push(quote);
      quote = {
        quote: "",
        from:  "",
        id: -1
      };
      numQuotes++;
    } else if(data[4] != null){
      done = true;
      quote.quote += data[4] + "\n";
    }
  });
  out.push(tmp);
  return {
    quotes: out,
    amount: numQuotes
  };
};

module.exports = parse;
