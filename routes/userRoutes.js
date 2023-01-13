const express = require('express')
require('dotenv').config()
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/usersmodel')
const jwt = require('jsonwebtoken')

userRouter.get("/", (req, res) => {
    res.send("WELCOME")
})

userRouter.post("/register", async (req, res) => {
    const { name, email, password, age } = req.body
    try {
        bcrypt.hash(password, process.env.times, async (err, hash) => {
            if (err) {
                console.log("unable to hash password", err)
            }
            const user = new UserModel({ name, email, password: hash, age })
            await user.save()
            res.send("resgistered")
        });

    } catch (error) {
        res.send("error in registering user")
    }

})


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.find({ email })
        console.log(user)

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'masai');
                    // const token = jwt.sign({ payload }, 'key'); 
                    console.log(`logged in, welcome :  ${user[0].name} ,\n token : ${token}`)
                    res.send({ "msg": "logged in", "token": `${token}` })
                } else {
                    res.send("wrong credentials")
                }
            });

        } else {
            res.send("register first")
        }

    } catch (error) {
        res.send("error in logining user")
    }

})

userRouter.get("/about", (req, res) => {
    res.send("about page")
})

userRouter.get("/data", (req, res) => {
    const token = req.query.token;
    // verify a token symmetric
    jwt.verify(token, 'masai', (err, decoded) => {
        if (err) {
            res.send("login first, inavalid token")
        } else {
            res.send("data...")
        }

    });
})

userRouter.get("/cart", (req, res) => {
    const token = req.headers.auth;
    console.log(token)
    // verify a token symmetric
    jwt.verify(token, 'masai', (err, decoded) => {
        if (err) {
            res.send("login first, inavalid token")
        } else {
            res.send("cart page...")
        }

    });
})

module.exports = { userRouter }
