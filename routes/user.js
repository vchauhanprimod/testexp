
/*
 * GET users listing.
 */
var config = require('./../config.js');
var mysql = require('mysql');

connection = mysql.createConnection(config.dbconfig);
connection.query('USE express');

exports.list = function(req, res) {
    //TODO:
    //1- CRUD based routes
    //2- 
    // In case any update request
    if (typeof (req.query) !== 'undefined' && typeof (req.query.update_name) !== 'undefined' && req.query.update_name !== '') {
        console.log(req.query.user_name);
        connection.query("UPDATE users SET user_name='" + req.query.user_name + "' WHERE id='" + req.query.update_name + "'");
        res.redirect('/users');
    }
    // In case any delete request
    else if (typeof (req.query) !== 'undefined' && typeof (req.query.delete_name) !== 'undefined' && req.query.delete_name !== '') {
        connection.query("DELETE FROM users WHERE id='" + req.query.delete_name + "'");
        res.redirect('/users');
    }
    // In case list-user
    else {
        connection.query('SELECT * FROM users', function(err, rows) {
            console.log(rows);
            res.render('users', {users: rows});
        });
    }
};
exports.add_user = function(req, res) {
    if (req.param("user") !== '') {
        connection.query("INSERT INTO users (user_name) VALUES ('" + req.param("user") + "')");
    }
    res.redirect('/users');

};
exports.delete_user = function(req, res) {
    // connection.query("DELETE FROM users WHERE user_name='"+req.param("user")+"'");
    console.log(req.query.delete_name);
    res.redirect('/users');
};