const mongoose = require("mongoose");

const book = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    categoryName: {
        type: String
    },
    keywords: {
        type: Array
    },
    link: {
        type: String
    },
    cover: {
        type: String
    }
    
}, {
    versionKey:false,
    strict:false,
    timestamps: true
});

module.exports = mongoose.model("book", book);