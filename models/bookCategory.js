const mongoose = require("mongoose");

const bookCategory = mongoose.Schema({
    title: {
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

module.exports = mongoose.model("bookCategory", bookCategory);