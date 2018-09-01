var express = require("express");

//Import the model( burger.js ) to use its database functions
var burger = require("../models/burgar");

var router = express.Router();

//Routing 
//GET route to get burgers from database
router.get("/", function(req, res) {
    burger.all(function (data) { 
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject)
     })
})

//POST route to create/add burger
router.post("/api/burgers", function (req, res) { 
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) { 
        //Send back ID of new quote
        res.json({ id: result.insertId });
     });
 });

 //PUT route to update burger devoured state
 router.put("/api/burgers/: id", function (req, res) { 
     var condition = "id = " + req.params.id;

     console.log("condition", condition);

     burger.update({
         devoured: req.body.devoured
     }, condition, function(result) {
         if (result.changedRows == 0) {
             return res.status(404).end();
         } else {
             res.status(200).end();
         }
     });
  });

  //DELETE route to throw away a burger
  router.delete("/api/burger?:id", function(req,res) {
      var condition = "id = " + req.params.id;

      burger.delete(condition, function(result) {
          if (result.changedRows == 0) {
              return res.send(404).end();
          } else {
              res.status(200).end();
          }
      });
  });

//Exports routes to be used in server.js
module.exports = router;