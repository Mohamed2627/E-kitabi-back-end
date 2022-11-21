const mongoose = require("mongoose");

const admin = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: "Email address is required",
        validate: {
            validator: function (val) {
                let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return pattern.test(val);
            },
            message: "Please fill a valid email address"
        }

    },
    token: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {
    versionKey: false,
    strict: false,
    timestamps: true
});

module.exports = mongoose.model("admin", admin);