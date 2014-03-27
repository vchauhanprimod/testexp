var config = require('./../config.js');
var mysql = require('mysql');

connection = mysql.createConnection(config.dbconfig);
connection.query('USE express');

exports.list = function(req, res) {
        connection.query('SELECT * FROM users', function(err, rows) {
            console.log(rows);
            res.json({users: rows});
        });
    
};
exports.update = function(req, res) {
    if (typeof (req.param("user")) !== 'undefined' && typeof (req.param("id")) !== 'undefined' && req.param("user") !== '' && req.param("id") !== '') {
        connection.query("UPDATE users1 SET user_name='" + req.param("user") + "' WHERE id='" + req.param("id") + "'", function(err, result, field){
           if(err){
               console.log("not connected")
           }
           else{
               res.json({message:'updated successfully'});
           }
       });
       
       
    }
};


exports.delete = function(req, res) {
    if (typeof (req.params.id) !== 'undefined' && req.params.id !== '') {
        connection.query("DELETE FROM users WHERE id='" + req.params.id + "'");
        res.json({message:'deleted successfully'});
    }
};


exports.add_user = function(req, res) {
    if (req.param("user") !== '') {
        connection.query("INSERT INTO users (user_name) VALUES ('" + req.param("user") + "')");
        res.json({message:'saved successfully'});
    }
    

};