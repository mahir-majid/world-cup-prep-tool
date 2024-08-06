const express = require( 'express');
const router = express.Router();

const {sign} = require( 'jsonwebtoken');

// instance of the Posts.js model
// variable name is based on what is in Posts.js
const { Users } = require('../models');
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Checks to see if username already exists
    userExists = await Users.findOne({ where: {username: username}});

    if (userExists){
        return res.json({ error: "User Already Exists"});
    };

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        return res.json(  'Successful Registration');
    });
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Checking if username actually exists
    const user = await Users.findOne({ where: {username: username}});

    if (!user){
        return res.json( {error: "User Does Not Exist"});
    }

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            return res.json({ error: "Wrong Username or Password" });
        } else {
            const accessToken = sign({username: user.username, id: user.id}, "importantsecret")
            return res.json(accessToken);
        }
    })
})

module.exports = router
