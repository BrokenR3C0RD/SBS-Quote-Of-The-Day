var pug = require("pug");
var quotes = require("./quotes.js")(process.argv[2] || "../quotes.txt");
var fs = require("fs");

fs.writeFileSync("output.html", pug.renderFile("q2h.temp.pug", {
  quotes: quotes.quotes,
  amount: quotes.amount,
  pretty: true
}));
