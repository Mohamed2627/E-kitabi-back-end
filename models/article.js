const mongoose = require("mongoose");

const article = mongoose.Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    description: {
        type: String
    },
    categoryName: {
        type: String
    },
    keywords: [{
        type: String
    }],
    links: [{
        type: Object
    }],
    cover: [{
        type: String
    }]
    
}, {
    versionKey:false,
    strict:false,
    timestamps: true
});

module.exports = mongoose.model("article", article);