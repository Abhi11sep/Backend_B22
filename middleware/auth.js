const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.headers.auth;
    if (token) {
        const decoded = jwt.verify(token, 'masai')
        if (decoded) {
            const userID = decoded.userID
            console.log("decoded userID", userID)
            req.body.userID=userID
            next();
        } else {
            res.send({ "msg": "please login first" })
        }
    } else {
        res.send({ "msg": "enter token" })
    }

}

module.exports = { authenticate }