const Users = require('../../model/usersModel')

module.exports = async (request, response, userId, body) => {
    const user = await Users.updateOne({ _id: userId }, body)
    if (user.ok) {
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            ok: true
        }))
        response.end()
    } else {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: "Nu s-a putut efectua modificarea"
        }))
        response.end()
    }
}