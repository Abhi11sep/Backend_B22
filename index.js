const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { connection } = require('./configs/db')
const { userRouter } = require('./routes/userRoutes')
const { noteRouter } = require('./routes/noteRoutes')
const { authenticate } = require('./middleware/auth')
const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use("/users", userRouter)
app.use(authenticate)
app.use("/notes", noteRouter)


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("error in connecting to db", error)
    }
    console.log('running on port 4500')
})