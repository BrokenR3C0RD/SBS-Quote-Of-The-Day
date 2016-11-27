var fs = require("fs");


var inp = fs.readFileSync("keyreq.txt", "utf8").split("\n");
var out = fs.createWriteStream("keyreq-quotes.txt");

inp.forEach(function(quote){
  out.write(quote.replace(/\\n/g, "\n"));
  out.write("\n- A Miiverse user\n\n");
});
