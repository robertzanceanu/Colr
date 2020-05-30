const Artefacts = require('../../model/artefactsModel') 
const Collections = require('../../model/collectionsModel')
const CollectionTypes = require('../../model/collectionTypesModel')

const getCollectionType = async (collection) => {

    return new Promise (async (resolve) => {
        const collectionType =  await CollectionTypes.find({
            _id: collection.collectionTypeId
        })
        resolve(collectionType[0])
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
            artefactsToSend.push({
                _id:artefacts._id,
                collection,
                name:artefacts.name,
                year:artefacts.year,
                value:artefacts.value,
                rarity:artefacts.rarity,
                condition:artefacts.condition,
                description:artefacts.description,
                photos:artefacts.photos,
                numberOfLikes:artefacts.numberOfLikes,
                country:artefacts.country,
                usageHistory:artefacts.usageHistory
            })
        }))
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(artefactsToSend))
        response.end()
}