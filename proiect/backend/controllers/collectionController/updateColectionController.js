const Collection = require('../../model/collectionsModel')

module.exports = async (request, response, collectionId, body) => {
    const collection = await Collection.updateOne({_id: collectionId}, body)
    if (collection.ok) {
        response.writeHead(200, {"Content-Type": "application/json"})
        response.write(JSON.stringify({
            ok: true
        }))
        response.end()
    } else {
        response.writeHead(400, {"Content-Type": "application/json"})
        response.write(JSON.stringify({
            error: "Nu s-a putut efectua modificarea"
        }))
        response.end()
    }
}