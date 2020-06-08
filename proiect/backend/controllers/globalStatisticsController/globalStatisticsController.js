const Artefacts = require('../../model/artefactsModel')
const Collection = require('../../model/collectionsModel')
const Users = require('../../model/usersModel')

module.exports = async (request, response, userId)=>{
    let list_tosend = []
    let artefacts = await Artefacts.find({})
    let collections =await  Collection.find({})
    let users = await Users.find({})
    let artefacts_count = artefacts.length
    let collections_count = collections.length
    let users_count = users.length
    list_tosend.push({
        artefact:artefacts_count,
        collection:collections_count,
        users:users_count
    })
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(list_tosend))
    response.end()
}