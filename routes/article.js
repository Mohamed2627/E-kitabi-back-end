// import Router function 
const route = require("express").Router();

// import multer
const multer = require('multer');

// import models
const Article = require('../models/article');


// storage of the article images
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
// upload.array("articleImages", 5),



// When making new article           The name of the input file must be "articleImages"
route.post("/newarticle", upload.array("articleImages", 5), async (req, res) => {

    try {
        // Creating the new article
        const article = await Article.create({ ...req.body })
        // Adding the name of the images in the data base
        let pathLink = "http://localhost:4000/images/"
        for (let image of req.files) {
            article.cover.push(pathLink + image.originalname)
        }
        article.save();

        res.status(200).json({ success: true, message: "New article has been added"})
    } catch (err) {
        // console.log(err)
        res.status(500).json({ success: false, message: "error on creating new article" })
    }
})


// Getting all the articles
route.get("/all", async (req, res) => {

    try {
        const article = await Article.find({})

        res.status(200).json({ success: true, message: "You got all the articles", data: article})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting all the articles" })
    }
})


// Getting the articles by category name
route.get("/articles/:categoryName", async (req, res) => {
    try {
        const article = await Article.find({categoryName: req.params.categoryName});

        res.status(200).json({ success: true, message: `You got all the articles of ${req.params.categoryName}` , data: article})

    }catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: `error on getting the articles of ${req.params.categoryName}` })
    }
})



module.exports = route;
