var fs = require("fs");

var ooc = fs.readFileSync("ooc.txt", "utf8");
var out = fs.createWriteStream("quotes.txt");

var q = "";
var a = "";

ooc.split("\n").forEach(function(line){
  if(line.substr(0,2) == ">>"){
    out.write(q + a + "\n");
    a = "- " + line.substr(2).replace(/\[.+\]/g, "").replace(/[^a-zA-Z0-9_-]/g, "") + "\n";
    q = "";
  } else {
    q += line.replace(/\-/g, "\\-") + "\n";
  }
});

out.write(q + a);
