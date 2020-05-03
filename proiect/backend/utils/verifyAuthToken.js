const jwt = require('jsonwebtoken')
let fs = require('fs')

module.exports = (request, response) => {
    const token = request.headers['auth-token']

    if (!token) {
        response.writeHead(401, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            status: 401,
            error: 'Emailul nu exista'
        }))
        response.end()
        return
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        request.user = verified
        return true
    } catch (err) {
        response.writeHead(401, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            status: 401,
            error: 'Emailul nu exista'
        }))
        response.end()
    }
}