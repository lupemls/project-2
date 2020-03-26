var express = require("express");
var mysql = require("mysql");

var db = require("./models");
// var dbFill = require("./opponets");

var app = express();
var PORT = process.env.PORT || 3500;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

////??????
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}




// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    // dbFill.populate(rps_db);
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT
    );

    
  });
});

module.exports = app;