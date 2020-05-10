const ArtefactCondition = require('../../model/conditionModel')

module.exports = async (request, response, body) => {
    const types = await ArtefactCondition.find({})
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(types))
    response.end()
}