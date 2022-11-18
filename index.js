// importing the libraries
const express = require("express");
const cors = require("cors");

// importing the connection
const connect = require("./config/connection");


// creating the server
const app = express();

// the connection function
connect();

app.listen(4000, () => {
    console.log(`Your server is listening on port ${4000}`)
})









app.listen()
