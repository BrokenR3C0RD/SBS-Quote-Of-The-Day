var parseQuotes = require("./quotes");

var quotes = parseQuotes(process.argv[2] || "../quotes.txt");

console.log(quotes.amount + " quotes total");
