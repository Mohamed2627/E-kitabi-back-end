// import Router function
const route = require("express").Router();
// import Jsonwebtoken
const jwt = require("jsonwebtoken");
//import bcrypt 
const bcrypt = require('bcrypt');
// import models
const Admin = require("../models/admin");


// login
route.post("/login", async (req, res) => {
    try {
        const body = req.body;
        // // When creating the admin@gmai.com for the first time   (Must be deleted on production)
        // const cryptedPassword = await bcrypt.hash(body.password, 10);
        // const token = jwt.sign({ email: body.email }, "secret_key");
        // const admin = await Admin.create({ ...body, password: cryptedPassword, token: token });
        // res.status(200).json({ sucsess: true, message: "The account has been added" });
        

        // When logging in
        const admin = await Admin.findOne({email: body.email})
        if (admin) {
            
            const isValidPassword = await bcrypt.compare(body.password, admin.password);
            if (isValidPassword) {
                res.setHeader("authorization", admin.token);
                res.status(200).json({ sucsess: true, message: "Valid password & logged in" });
            }
            else {
                res.status(401).json({ sucsess: false, message: "invalid Password & can not login" });
            }

        }
        else {
            res.status(401).json({ sucsess: false, message: "This account is not found" });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: `There is wrong in email or password ` });
    }
})


// update           token is required
route.put("update", async (req, res) => {
    try {
        // get the current admin with token
        const currentToken = req.headers.authorization;
        const admin = await Admin.findOneAndUpdate({ token: currentToken }, {...req.body});
        res.status(200).json({ sucsess: true, message: "The account has been updated" });
    }catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: `There is wrong in email or password ` });
    }
})



module.exports = route;