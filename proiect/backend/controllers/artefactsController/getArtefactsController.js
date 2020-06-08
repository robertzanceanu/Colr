const Artefacts = require('../../model/artefactsModel')
const Collections = require('../../model/collectionsModel')
const ArtefactRarity = require('../../model/rarityModel')
const ArtefactCondition = require('../../model/conditionModel')

const getArtefactRarity = async (artefact) => {

    return new Promise(async (resolve) => {
        const artefactRarity = await ArtefactRarity.find({
            _id: artefact.rarity
        })
        resolve(artefactRarity[0])
    })
}
const getArtefactCondition = async (artefact) => {

    return new Promise(async (resolve) => {
        const artefactCondition = await ArtefactCondition.find({
            _id: artefact.condition
        })
        resolve(artefactCondition[0])
    })
}
const getCollection = async (artefacts) => {

    return new Promise(async (resolve) => {
        const collection = await Collections.findOne({
            _id: artefacts.collectionId
        })
        resolve(collection)
    })
}
module.exports = async (request, response, userId, queryParams) => {
    let filters = {}
    if (queryParams.collectionId) {
        filters.collectionId = queryParams.collectionId
    }
    if (queryParams.rarityId) {
        filters.rarity = queryParams.rarityId
    }
    if (queryParams.conditionId) {
        filters.condition = queryParams.conditionId
    }
    console.log(queryParams.rarityId, filters)

    let artefacts = await Artefacts.find(filters)
    let artefactsToSend = []
    await Promise.all(artefacts.map(async (artefact) => {
        const collection = await getCollection(artefact)
        const rarity = await getArtefactRarity(artefact)
        const condition = await getArtefactCondition(artefact)
        artefactsToSend.push({
            _id: artefact._id,
            collection: collection,
            name: artefact.name,
            year: artefact.year,
            value: artefact.value,
            rarity,
            condition,
            description: artefact.description,
            photos: artefact.photos,
            numberOfLikes: artefact.numberOfLikes,
            country: artefact.country,
            usageHistory: artefact.usageHistory
        })
    }))
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(artefactsToSend))
    response.end()
}