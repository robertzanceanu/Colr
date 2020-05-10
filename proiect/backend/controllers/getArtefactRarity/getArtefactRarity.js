const artefactRarity = require('../../model/rarityModel')

module.exports = async (request, response, body) => {
    const types = await artefactRarity.find({})
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(types))
    response.end()
}