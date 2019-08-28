/******************************************************************************
 *  Compilation:  nodemon server.js
 *  Execution:    nodemon server.js 
 *  
 *  Purpose:  Server is created to connect with frontend and getting/sending 
 *            request/response to user.
 *
 *  @author  Anuja Shette
 *  @version 1.0
 *  @since   21-07-2019
 *
 ******************************************************************************/

 /*
  * Importing all required packages
  */
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/router/router.js");
var expressValidator = require("express-validator");
var app = express();
const mongoose = require('./app/mongoose/mongoose.connect')
 redis = require('redis')
require('dotenv').config()

 /*
  * Body Parser is used to extract the entire body portion 
  * of an incoming request stream.
  */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Express validator validate request body used throughout application
 */
app.use(expressValidator());
app.use('/',routes)

/**
 * Redis client is created to store data in cache
 */
 client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});

/**
 * Event on method get confirmation of connection established with redis
 */
client.on("connect", function (res) {
    console.log("Connection established with redis");
});

/**
 * Listen method create listener on specific port
 */
var server = app.listen(process.env.port, function () {
    console.log("app running on port.",process.env.port);
});

/**
 * Exporting app for testing API's
 */
module.exports = app; 