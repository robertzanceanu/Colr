const Users = require('../../model/usersModel')

module.exports = async (request, response, userId) => {
    const user = await Users.findOne({ _id: userId })
    const infosToSend = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
    }
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(infosToSend))
    response.end()
} 