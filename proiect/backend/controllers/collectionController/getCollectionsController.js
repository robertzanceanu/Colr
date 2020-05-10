const Collections = require('../../model/collectionsModel')

module.exports = async (request,response, routes, body) => {
    const collections = await Collections.find({})
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(collections))
    response.end()
}