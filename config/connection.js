// Connecting to the database
const mongoose = require("mongoose");
// const url = "mongodb+srv://Mohamed:QdIvh69Gmq0QbVZN@e-kitabi-1.mlkqsar.mongodb.net/?retryWrites=true&w=majority"
const url = "mongodb://localhost:27017/E-kitabi"

const connect = async function() {
    await mongoose.connect(url);
    console.log("You are connected to your database");
}


module.exports = connect;