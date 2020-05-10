const CollectionTypes = require('../../model/collectionTypesModel')

module.exports = async (request, response, body) => {
    const types = await CollectionTypes.find({})
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(types))
    response.end()
}