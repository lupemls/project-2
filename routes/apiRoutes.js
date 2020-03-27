// var Sequelize = require("sequelize");
var db = require("../models");



module.exports = function(app) {
 
  
//Post - user info/github account
//Post - getting info out of opponents table
//Post - wins/losses 
//GET - random?
//PUT - updates results
//POST - storing user info/points?

  app.get('/api/randomopponent', function(req, res) {
    db.Opponent.findOne({order: db.sequelize.random()}).then(result => {
      res.json(result);
      
    })

  
  });

  app.put('/api/winincrement', function(req, res) {
    const currentOp = req.body.id;
    console.log('testing', currentOp);

    db.Opponent.increment('wins', { by: 1, where: { id: currentOp}});
    res.send('done')
  });

  app.put('/api/lossincrement', function(req, res) {
    const currentOp = req.body.id;
    console.log('testing', currentOp);

    db.Opponent.increment('losses', { by: 1, where: { id: currentOp}});
    res.send('done')
  });

  // app.put('/api/lossesincrement', function(req, res) {

  // })

  // app.get("/api/rankboard/:id", function(req, res) {
  //   db.Users.findAll({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [db.User]
  //   }).then(function(dbRanksResult) {
  //     res.json(dbRanksResult);
  //   });
  // });

  // // This can be edited to suit the Github account login
  // app.post("/api/login", function(req, res) {
  //   console.log("Logging in user ");
  //   db.User.findOne({
  //     where: {
  //       username: req.body.email,
  //       password: req.body.password
  //     }
  //   }).then(function(dbUserResult) {
  //     if (dbUserResult === null) {
  //       res.json({ status: "error" });
  //     } else {
  //       var userData = {
  //         id: dbUserResult.id,
  //         username: dbUserResult.username
  //       };
  //       res.json(userData);
  //     }
  //   });
  // });

  // //picking Rock function
  // app.put("/api/decision/rock", function(req, res) {
  //   var columnName = req.body.?????.toLowerCase() + "rock";
  //   var data = {};

  //   data[columnName] = setupLike(columnName);
  //   db.User.update(data, { where: { id: req.body.id } })
  //     .then(
  //       db.rps_db.create({
  //         ???:
  //       })
  //     )
  //     .then(function(dbUpdateResult) {
  //       res.json(dbUpdateResult);
  //     });
  // });

  // app.put("/api/decision/paper", function(req, res) {
  //   var columnName = req.body.??????.toLowerCase() + "paper";
  //   var data = {};

  //   data[columnName] = setupLike(columnName);
  //   db.User.update(data, { where: { id: req.body.id } })
  //     .then(
  //       db.rps_db.create({
  //         ???:
  //       })
  //     )
  //     .then(function(dbUpdateResult) {
  //       res.json(dbUpdateResult);
  //     });
  // });

  // app.put("/api/decision/scissors", function(req, res) {
  //   var columnName = req.body.??????.toLowerCase() + "scissors";
  //   var data = {};

  //   data[columnName] = setupLike(columnName);
  //   db.User.update(data, { where: { id: req.body.id } })
  //     .then(
  //       db.rps_db.create({
  //         ???:
  //       })
  //     )
  //     .then(function(dbUpdateResult) {
  //       res.json(dbUpdateResult);
  //     });
  // });



  // // Update the user with a +1 if they win the round
  // app.put("/api/start/win", function(req, res) {
  //   var columnName = req.body.?????? + "Win";
  //   var data = {};

  //   data[columnName] = setupLike(columnName);

  //   db.User.update(data, { where: { id: req.body.id } }).then(function(
  //     dbUpdateResult
  //   ) {
  //     res.json(dbUpdateResult);
  //   });
  // });

  // //Post to user for a loss of point
  // app.put("/api/decision/loss", function(req, res) {
  //   var columnName = req.body.genre.toLowerCase() + "Los";
  //   var data = {};

  //   data[columnName] = setupDislike(columnName);

  //   db.User.update(data, { where: { id: req.body.id } })
  //     .then(
  //       db.??????.create({
  //         ????:
  //       })
  //     )
  //     .then(function(dbUpdateResult) {
  //       res.json(dbUpdateResult);
  //     });
  // });



  // // randomizer??
  // app.get("/api/random", function(req, res) {
  //   ///not sure what to put here
  // });

  
  // // Post method for creating a login and storing the information in our database.
  // app.post("/", function(req, res) {
  //   db.User.create({
  //     username: req.body.email,
  //     password: req.body.password
  //   }).then(function(newUser) {
  //     res.json(newUser);
  //   });
  // });
}