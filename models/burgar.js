var orm = require("../config/orm");

var burger = {
    //Select all burgers from the database
    all: function(cb) {
      orm.all("burgers", function(res) {
          cb(res);
      });
    },

    //Create function to add a burger
    //variables cols and vals are arrays
    create: function (cols, vals, cb) { 
        orm.create("burgers", cols, vals, function(res) {
            cb(res);
        });
     },

     //Update the burger devoured state
     update: function(objColVals, condition, cb) {
         orm.update("burgers", objColVals, condition, function(res) {
            cb(res);
         });
     },

     //Delete the devoured burgers
     delete: function (condition, cb) { 
         orm.delete("burgers", condition, function(res) {
             cb(res);
         });
      }
};

//Export the database functions to the controllers (burger_controller.js)
module.exports = burger;