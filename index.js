// importing the libraries
const express = require("express");
const cors = require("cors");
const path = require('path');
// Setting the port
const port = process.env.port || 4000;

// importing the connection
const connect = require("./config/connection");

// importing the routes
const article = require("./routes/article");
const articleCategory = require("./routes/articleCategory");
const book = require("./routes/book");
const bookCategory = require("./routes/bookCategory")

// creating the server
const app = express();

// the connection function
connect();

// middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));

app.use(cors("*"));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.set("Access-Control-Expose-Headers", "*");
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});


// Routes middleware
app.use("/article", article);
app.use("/articlecate", articleCategory);
app.use("/book", book);
app.use("/bookcate", bookCategory);



app.listen(port, () => {
    console.log(`Your server is listening on port ${port}`)
})
