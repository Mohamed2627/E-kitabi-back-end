// import Router function 
const route = require("express").Router();

// import multer
const multer = require('multer');

// import models
const Category = require('../models/bookCategory');


// storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images")
    },
    filename: (req, file, cb) => {

        cb(null, file.originalname);
    }
})

const multerFilter = function (req, file, cb) {
    if (file.mimetype.split("/")[0] == "image") {
        cb(null, true)
    }
    else {
        cb(new Error("Not image"), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


// Making a new category for the books    {title: ""} and the name of the input file must be "categoryImage"
route.post("/newcategory", upload.single("categoryImage"), async (req, res) => {
    try {
        // creating the document
        const category = await Category.create({...req.body});

        // Saving the image
        let pathLink = "http://localhost:4000/images/";
        category.cover = pathLink + req.file.originalname;
        
        category.save();

        res.status(200).json({ success: true, message: "New category for books has been created"})

    } catch(err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on creating new category for books" })
    }
    
})


// Getting all the categories
route.get("/all", async (req, res) => {

    try {
        const category = await Category.find({})

        res.status(200).json({ success: true, message: "You got all the categories of books", data: category})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting all the categories" })
    }
})



module.exports = route;
