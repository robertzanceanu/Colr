const Artefacts = require('../../model/artefactsModel') 
const Collections = require('../../model/collectionsModel')
const ArtefactRarity = require('../../model/rarityModel')
const ArtefactCondition = require('../../model/conditionModel')

const getArtefactRarity = async (artefact) => {

    return new Promise (async (resolve) => {
        const artefactRarity =  await ArtefactRarity.find({
            _id: artefact.rarity
        })
        resolve(artefactRarity[0])
    })
}
const getArtefactCondition = async (artefact) => {

    return new Promise (async (resolve) => {
        const artefactCondition =  await ArtefactCondition.find({
            _id: artefact.condition
        })
        resolve(artefactCondition[0])
    })
}
const getCollection = async (artefacts)=>{

    return new Promise(async(resolve)=>{
        const collection = await Collections.find({
        _id :artefacts.collectionId
    })
        resolve(collection[0])
    })
}
module.exports = async (request,response,userId)=> {
        let artefacts = await Artefacts.find({userId:userId})
        let artefactsToSend =[]
        await Promise.all(artefacts.map(async(artefact)=>{
            collection = await getCollection(artefact)
            rarity = await getArtefactRarity(artefact)
            condition = await getArtefactCondition(artefact)
            artefactsToSend.push({
                _id:artefacts._id,
                collection,
                name:artefact.name,
                year:artefact.year,
                value:artefact.value,
                rarity,
                condition,
                description:artefact.description,
                photos:artefact.photos,
                numberOfLikes:artefact.numberOfLikes,
                country:artefact.country,
                usageHistory:artefact.usageHistory
            })
        }))
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(artefactsToSend))
        response.end()
}