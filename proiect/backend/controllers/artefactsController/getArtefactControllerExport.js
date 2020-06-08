const Artefact = require('../../model/artefactsModel')
const { Parser } = require('json2csv')
const ArtefactRarity = require('../../model/rarityModel')
const ArtefactCondition = require('../../model/conditionModel')
const Collection = require('../../model/collectionsModel')
const Users = require('../../model/usersModel')

const getUser = userId => {
    return new Promise(async(resolve) => {
        const user = await Users.findOne({_id:userId})
        resolve(user)
    })
}
const getArtefactCollection = collectionId => {
    return new Promise(async(resolve) => {
        
        const collection = await Collection.findOne({_id:collectionId})
        resolve(collection)
    })
}
const getArtefactCondition = (conditionId) => {
    return new Promise(async (resolve) => {
        const artefactCondition = await ArtefactCondition.findOne({ _id: conditionId })
        resolve(artefactCondition)
    })
}
const getArtefactRarity = rarityId => {
    return new Promise(async (resolve) => {
        const artefactRarity = await ArtefactRarity.findOne({ _id: rarityId })
        resolve(artefactRarity)
    })
}
module.exports = async (request, response, userId) => {
    let artefacts = await Artefact.find({ userId: userId })
    let artefactsToSend = []
    await Promise.all(artefacts.map(async (artefact) => {
        try {
            const artefactRarity = await getArtefactRarity(artefact.rarity)
            const artefactCondition = await getArtefactCondition(artefact.condition)
            const collection = await getArtefactCollection(artefact.collectionId)
            const user = await getUser(artefact.userId)
            artefactsToSend.push({
                user: `${user.lastName} ${user.firstName}`,
                collection:collection.name,
                name: artefact.name,
                year: artefact.year,
                value: artefact.value,
                rarity: artefactRarity.name,
                condition: artefactCondition.name,
                description: artefact.description,
                country: artefact.country,
                usageHistory: artefact.usageHistory,
                numberOfLikes: artefact.numberOfLikes
            })
        } catch (err) {
            console.log(err)
        }


    }))
    const json2CsvParser = new Parser()
    let csv = json2CsvParser.parse(artefactsToSend)

    response.setHeader('Content-disposition', 'attachment; filename=data.csv')
    response.writeHead(200, { "Content-Type": 'text/csv' })
    response.write(csv)
    response.end()
}