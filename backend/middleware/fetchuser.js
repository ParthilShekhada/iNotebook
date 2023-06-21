const jwt = require('jsonwebtoken')
const JWT_SECERET = "Parthilisgoodboy"

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        res.status.json({ status: "failed", message: "plz authinticate using valid token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECERET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).json({ status: "failed", message: "plz authinticate using valid token" })

    }

}

module.exports = fetchuser