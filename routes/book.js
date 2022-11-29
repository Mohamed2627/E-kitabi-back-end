// import Router function 
const route = require("express").Router();

// import multer
const multer = require('multer');

// import models
const Book = require('../models/book');

// storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "bookImage") {
            cb(null, "./public/images")
        }
        else if (file.fieldname === "bookFile") {
            cb(null, "./public/files")
        }

    },
    filename: (req, file, cb) => {
        if (file.fieldname === "bookImage") {
            cb(null, file.originalname);
        }
        else if (file.fieldname === "bookFile") {
            cb(null, file.originalname);
        }

    }
})

const multerFilter = function (req, file, cb) {
    if (file.fieldname === "bookImage") {
        if (file.mimetype.split("/")[0] == "image") {
            cb(null, true)
        }
        else {
            cb(new Error("Not image"), false)
        }
    }
    else if (file.fieldname === "bookFile") {
        if (file.mimetype.split("/")[1] === "pdf") {
            cb(null, true)
        }
        else {
            cb(new Error("Not pdf"), false)
        }
    }
    
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


// When uploading new book           "bookImage" for cover   and   "bookFile" for pdf
route.post("/newbook", upload.fields([
    { name: 'bookImage', maxCount: 1 },
    { name: 'bookFile', maxCount: 1 }]), async (req, res) => {

        try {
            // console.log(req.files)
            // Creating the new book
            const book = await Book.create({ ...req.body })
            // Adding the name of the image in the data base
            let imagePathLink = "http://localhost:4000/images/";
            book.cover = imagePathLink + req.files.bookImage[0].originalname;

            // Adding the name of the book in the data base
            let filePathLink = "http://localhost:4000/files/"
            book.link = filePathLink + req.files.bookFile[0].originalname

            book.save();

            res.status(200).json({ success: true, message: "New book has been uploaded" })
        } catch (err) {
            // console.log(err)
            res.status(500).json({ success: false, message: "error on uploading new book" })
        }
    })


// Getting all the books
route.get("/all", async (req, res) => {

    try {
        const book = await Book.find({})

        res.status(200).json({ success: true, message: "You got all the books", data: book })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting all the books" })
    }
})


// Pagination          .>>>>>>>  pageNumber is required
route.get("/paginate/:pageNumber", async (req, res) => {
    try {
        const pageNumber = Number(req.params.pageNumber);
        const allBooks = await Book.find({});
        const noOfPages = Math.ceil(allBooks.length / 10);
        const paginatedData = allBooks.slice((pageNumber - 1)*10, (pageNumber)*10)

        res.status(200).json({ success: true, message: "You got your pagination results", data: {paginatedData, noOfPages, pageNumber}})
    }catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting this paginated page number" })
    }
})


// Searching by the title of the book>>>>>>> {title: ""} is required
route.get("/search", async (req, res) => {

    try {
        const allBooks = await Book.find({})

        const searchResult = allBooks.filter((book) => book.title.includes(req.body.title))

        res.status(200).json({ success: true, message: "You got your search results", data: searchResult})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting your search results" })
    }
})


// Getting Book by id     >>>>> id of the book is required
route.get("/getbyid/:bookId", async (req, res) => {

    try {
        const book = await Book.findById(req.params.bookId)

        res.status(200).json({ success: true, message: "You got the book by id", data: book})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: "error on getting this book by id" })
    }
})


// Getting the books by category name
route.get("/books/:categoryName", async (req, res) => {
    try {
        const book = await Book.find({ categoryName: req.params.categoryName });

        res.status(200).json({ success: true, message: `You got all the books of ${req.params.categoryName}`, data: book })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: `error on getting the books of ${req.params.categoryName}` })
    }
})

// Delete the book by id      >>>>     id of the book is required
route.delete("/delete/:bookId", async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);

        res.status(200).json({ success: true, message: `This book has been deleted` })

    }catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: `error on deleting this book` })
    }
})


// Updating the book        >>>>>>  id of the book is required
route.put("/update/:bookId", upload.fields([
    { name: 'bookImage', maxCount: 1 },
    { name: 'bookFile', maxCount: 1 }]), async (req, res) => {
        try {
            const book = await Book.findByIdAndUpdate(req.params.bookId, {...req.body});

            // Adding the name of the image in the data base
            let imagePathLink = "http://localhost:4000/images/";
            book.cover = imagePathLink + req.files.bookImage[0].originalname;

            // Adding the name of the book in the data base
            let filePathLink = "http://localhost:4000/files/"
            book.link = filePathLink + req.files.bookFile[0].originalname

            book.save();

            res.status(200).json({ success: true, message: "This book has been updated" });
        }catch (err) {
            console.log(err);
        res.status(500).json({ success: false, message: `error on updating this book` });
        }
    })



module.exports = route;
