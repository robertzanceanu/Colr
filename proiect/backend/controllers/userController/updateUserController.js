const Users = require('../../model/usersModel')
const bcrypt = require('bcryptjs')

module.exports = async (request, response, userId, body, userToUpdateId) => {
    const loggedInUser = await Users.findOne({ _id: userId })
    if (loggedInUser.role === 'admin') {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(body.password, salt)
        body.password = hashPassword
        const updateUser = await Users.updateOne({ _id: userToUpdateId }, body)
        if (updateUser.ok) {
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

    } else {
        response.writeHead(401, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: "Nu aveti dreptul de a efectua aceasta actiune"
        }))
        response.end()
    }
}