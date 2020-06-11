const Artefacts = require('../../model/artefactsModel')
const Users = require('../../model/usersModel')

module.exports = async (request, response, userId, artefactId) => {
    const loggedInUser = await Users.findOne({ _id: userId })
    if (loggedInUser.role === 'admin') {
        const deleteArtefact = await Artefacts.deleteOne({ _id: artefactId })
        if (deleteArtefact.ok === 1) {
            response.writeHead(200, { "Content-Type": "application/json" })
            response.write(JSON.stringify({
                ok: true
            }))
            response.end()
        } else {
            response.writeHead(400, { "Content-Type": "application/json" })
            response.write(JSON.stringify({
                error: "Nu s-a putut sterge artefactul"
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