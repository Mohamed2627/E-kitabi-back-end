const mongoose = require("mongoose");

const articleCategory = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    cover: {
        type: String
    }
    
}, {
    versionKey:false,
    strict:false,
    timestamps: true
});

module.exports = mongoose.model("articleCategory", articleCategory);