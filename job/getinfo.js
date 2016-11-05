var parseQuotes = require("./quotes");

var quotes = parseQuotes("../quotes.txt");

console.log(quotes.amount + " quotes total");
