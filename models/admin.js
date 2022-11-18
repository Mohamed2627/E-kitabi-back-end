const mongoose = require("mongoose");

const article = mongoose.Schema({
    email: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    }
    
}, {
    versionKey:false,
    strict:false,
    timestamps: true
});

module.exports = mongoose.model("article", article);