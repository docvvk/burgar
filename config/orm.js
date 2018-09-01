// need to require connection.js for ORM to communicate with the database
var connection = require("./connection");

// Helper function for SQL ssyntax
// Let's say we want to pass 3 values into mysql query
// In order to write the query we need 3 question marks
// The above helper function loops through and creates an array of question marks and turns it into string
// ["?", "?", "?"].toString => "?,?,?"
function printQuestionMarks(num) { 
    var arr = [];

    for (var i = 0; i < arr.length; i++) {
        arr.push("?");
    }
    return arr.toString;
 }
 
 // Helper function to convert object key/value pairs to SQL syntax
 function objToSql(ob) {
     var arr = [];

     // loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces - add quotation marks
            if ( typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to single comma seperated string
    return arr.toString();
 }

 // Object for all our SQL statement functions
 // create methods that will execute the necessary MySQL commands in the controllers
 // to retrieve ans store data in the database
 var orm = {
     // select all function/query
     all: function (tableInput, cb) { 
         var queryString = "SELECT * FROM " + tableInput + ";";
         connection.query(queryString, function(err, result) {
             if (err) {
                 throw err;
             }
             cb(result);
         });
      },

      // Create function/query
      create: function (table, cols, vals, cb) { 
          var queryString = "INSERT INTO " + table;

          queryString += " (";
          queryString += cols.toString();
          queryString += ") ";
          queryString += "VALUES (";
          queryString += printQuestionMarks(vals.length);
          queryString += ") ";

          console.log(queryString);

          connection.query(queryString, vals, function (err, result) { 
              if (err) {
                  throw err;
              }
              cb(result);
           });
       },

       //Update funcyion/query
       update: function (table, objColVals, condition, cb) { 
           var queryString = "UPDATE " + table;

           queryString += " SET";
           queryString += objToSql(objColVals);
           queryString += " WHERE";
           queryString += condition;

           console.log(queryString);
           connection.query(queryString, function(err, result) {
               if (err) {
                   throw err;
               }
               cb(result)
           });
        },

        //Delete function/query
        delete: function (table, condition, cb) { 
            var queryString = "DELETE FROM " + table;
            
            queryString += " WHERE ";
            queryString += condition;

            connection.query(queryString, function(err, result) {
                if (err) {
                    throw err;
                }
                cb(result);
            });
         }
 }

 //Export the orm object
 module.exports = orm;