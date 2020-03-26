var db = require("../models");

module.exports = function(app) {
  // Load index page

  app.get("/", function(req, res) {
    res.render("login", {});
  });
  
  app.get("/main", function(req, res) {
    res.render("index", {
      msg: "?????????????????????"
    });




   
  });

};