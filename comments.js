// Create web server
// Create a web server that can respond to requests for /comments.json
// with a JSON-encoded array of comments taken from the file comments.json.
// Assume comments.json is an array of objects with the following format:
// { "name" : "Some Name", "comment" : "Some comment" }
// Here's an example response:
// [ { "name" : "Some Name", "comment" : "Some comment" }, { "name" : "Some
// Other Name", "comment" : "Some other comment" } ]
// -----------------------------------------------------------------------------

var express = require('express');
var fs = require('fs');
var app = express();

app.get('/comments.json', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    }
  });
});

app.listen(3000);

// -----------------------------------------------------------------------------
// Path: comments.html
// Create a web server
// Create a web server that can respond to requests for /comments.html with a
// page containing an HTML form.
// The form should have one field called "comment" and a submit button.
// When the submit button is pressed, the comment should be saved to
// comments.json and the user should be redirected to /comments.html.
// -----------------------------------------------------------------------------

var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.html', function(req, res) {
  fs.readFile('comments.html', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.send(data);
    }
  });
});

app.post('/comments.html', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.log(err);
    } else {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/comments.html');
        }
      });
    }
  });
});

app.listen(3000);

// -----------------------------------------------------------------------------
// Path: comments.js