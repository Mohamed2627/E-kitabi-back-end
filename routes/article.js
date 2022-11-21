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


// Searching by the title of the article
route.get("/search/:input", async (req, res) => {

    try {
        const allArticles = await Article.find({})

        const searchResult = allArticles.filter((article) => article.title.includes(req.params.input))

        res.status(200).json({ success: true, message: "You got your search results", data: searchResult})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting your search results" })
    }
})


// Getting article by id     >>>>> id of the article is required
route.get("/getbyid/:articleId", async (req, res) => {

    try {
        const article = await Article.findById(req.params.articleId)

        res.status(200).json({ success: true, message: "You got the article by id", data: article})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting this article by id" })
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

// Delete article by id       >>>>>>  the id of the article is required
route.delete("/delete/:articleId", async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.articleId);

        res.status(200).json({ success: true, message: `The article has been deleted`})
    }catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: `error on deleting this article` })
    }
})


// update the article       >>>>>>  the id of the article is required
route.put("/update/:articleId", upload.array("articleImages", 5), async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.articleId, {...req.body});
        // Adding the name of the images in the data base
        let pathLink = "http://localhost:4000/images/"
        let arr = []
        for (let image of req.files) {
            arr.push(pathLink + image.originalname)
        }
        article.cover = arr;
        article.save();

        res.status(200).json({ success: true, message: `The article has been updated`})
    }catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: `error on updating this article` })
    }
})






module.exports = route;
