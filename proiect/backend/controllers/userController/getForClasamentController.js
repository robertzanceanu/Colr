const Users = require('../../model/usersModel')

module.exports = async (request, response, userId) => {
    const user = await Users.find({})
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(user))
    response.end()
} 