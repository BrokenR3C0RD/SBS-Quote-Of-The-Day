// QotD Job

var fs = require("fs");
var request = require("request");
var parseQuotes = require("./quotes.js");
var template = require("string-template");

// Edit here
const USERNAME = "USERNAME";
const PASSWORD = "MD5_HASH_0F_PASSWORD";

const URL = "https://smilebasicsource.com";

var quotes = parseQuotes("quotes.txt");

var pmTemplate = fs.readFileSync("congrats.template", "utf8");
var profileTemplate = fs.readFileSync("profile.template", "utf8");

// Let's choose everything now
var tmp = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
var meta = tmp.meta;
var quote = tmp.quotes[Math.floor(Math.random() * tmp.quotes.length)];

var templateData = {
  user:        meta.from,
  date:        meta.date,
  description: meta.description,
  quote:       quote.quote,
  quoteBy:     quote.from,
  numQuotes:   quotes.amount,
  id:          quote.id,
  botUser:     username
};

var pm = template(pmTemplate, templateData);
var profile = template(profileTemplate, templateData);

request.post({
  url: URL + "/query/submit/login",
  form: {
    username: USERNAME,
    password: PASSWORD
  }
}, function(err, resp, body){
  var session = JSON.parse(body).result;

  request.post({
    url: URL + "/query/submit/preferences",
    form: {
      about: profile
    },
    qs: {
      session: session
    }
  }, function(err, resp, body){
    console.log("About - Result: " + JSON.parse(body).result);
  });
  request.get({
    url: URL + "/query/request/user",
    qs: {
      username: meta.from
    }
  }, function(err, resp, body){
    var uid = JSON.parse(body).result.uid;

    request.post({
      url: URL + "/query/submit/message",
      form: {
        content: pm,
        recipients: uid
      },
      qs: {
        session: session
      }
    }, function(err, resp, body){
      console.log("Message - Result: " + JSON.parse(body).result);
    });
  });
});

