const Users = require('../../model/usersModel')

module.exports = async (request, response, loggedInUserId, userId) => {
    const loggedInUser = await Users.findOne({ _id: loggedInUserId })
    if (loggedInUser.role === 'admin') {
        const userInfos = await Users.findOne({ _id: userId })
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(userInfos))
        response.end()
    } else {
        response.writeHead(401, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: "Nu aveti dreptul de a efectua aceasta actiune"
        }))
        response.end()
    }
}