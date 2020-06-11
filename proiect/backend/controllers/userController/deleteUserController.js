const Users = require('../../model/usersModel')
const Collections = require('../../model/collectionsModel')
const Artefacts = require('../../model/artefactsModel')

module.exports = async (request, response, userId, userToDeleteId) => {
    console.log('dadadada')
    const loggedInUser = await Users.findOne({ _id: userId })
    if (loggedInUser.role === 'admin') {
        const deleteArtefacts = await Artefacts.deleteMany({ userId: userToDeleteId })
        if (deleteArtefacts.ok === 1) {
            const deleteCollections = await Collections.deleteMany({ userId: userToDeleteId })
            if (deleteCollections.ok === 1) {
                const deleteUser = await Users.deleteOne({ _id: userToDeleteId })
                if (deleteUser.ok === 1) {
                    response.writeHead(200, { "Content-Type": "application/json" })
                    response.write(JSON.stringify({
                        ok: true
                    }))
                    response.end()
                } else {
                    response.writeHead(400, { "Content-Type": "application/json" })
                    response.write(JSON.stringify({
                        error: "Nu s-a putut sterge utilizatorul"
                    }))
                    response.end()
                }
            } else {
                response.writeHead(400, { "Content-Type": "application/json" })
                response.write(JSON.stringify({
                    error: "Nu s-au putut sterge colectiile"
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