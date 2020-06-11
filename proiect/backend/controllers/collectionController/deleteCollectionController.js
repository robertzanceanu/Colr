const Collections = require('../../model/collectionsModel')
const Artefacts = require('../../model/artefactsModel')
const Users = require('../../model/usersModel')

module.exports = async (request, response, userId, collectionId) => {
    const loggedInUser = await Users.findOne({ _id: userId })
    if (loggedInUser.role === 'admin') {
        const deleteArtefacts = await Artefacts.deleteMany({ collectionId: collectionId })
        if (deleteArtefacts.ok === 1) {
            const deleteCollection = await Collections.deleteOne({ _id: collectionId })
            if (deleteCollection.ok === 1) {
                response.writeHead(200, { "Content-Type": "application/json" })
                response.write(JSON.stringify({
                    ok: true
                }))
                response.end()
            } else {
                response.writeHead(400, { "Content-Type": "application/json" })
                response.write(JSON.stringify({
                    error: "Nu s-a putut sterge colectia"
                }))
                response.end()
            }
        } else {
            response.writeHead(400, { "Content-Type": "application/json" })
            response.write(JSON.stringify({
                error: "Nu s-au putut sterge artefactele"
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