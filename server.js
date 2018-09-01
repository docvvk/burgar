//Dependencies
var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

//Serve static content of the app from the "public directory"
app.use(express.static(__dirname + '/public'));

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

//Parse application/json
app.use(bodyParser.json());

//Set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Import routes from the controllers
var routes = require("./controllers/burgers_controller");

app.use(routes);

//App is listening...
app.listen(PORT, function() {
    console.log("App is listening at http://localserver:" + PORT);
});