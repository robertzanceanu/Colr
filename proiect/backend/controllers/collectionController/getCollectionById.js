const Collections = require('../../model/collectionsModel')
const CollectionTypes = require('../../model/collectionTypesModel')
const Artefact = require('../../model/artefactsModel')
const fs = require('fs')
const path = require('path')

const getCollectionType = async (collection) => {

    return new Promise(async (resolve) => {
        const collectionType = await CollectionTypes.findOne({
            _id: collection.collectionTypeId
        })
        resolve(collectionType)
    })
}

module.exports = async (reqeust, response, userId, collectionId) => {
    const collection = await Collections.findOne({ _id: collectionId, userId })
    const collectionsArtefacts = await Artefact.find({ collectionId })
    const collectionType = await getCollectionType(collection)
    let photos = []
    let mostExpensiveArtefact = {}
    let biggestValue = 0
    collectionsArtefacts.forEach((artefact) => {
        if (Number(artefact.value) > biggestValue) {
            biggestValue = Number(artefact.value)
            mostExpensiveArtefact = artefact
        }
        if (artefact.photos && artefact.photos.length > 0) {
            photos = [...photos, ...artefact.photos]

        }
    })
    const photosToSend = []
    photos && photos.length > 0 && photos.map(async (photo) => {
        let image = fs.readFileSync(path.resolve(path.dirname(__filename),`../../${photo.logoPath}`))
        image = Buffer.from(image, 'base64')
        photosToSend.push({
            image: `data:${photo.imgType};base64,` + image.toString('base64')
        })
    })
    const infosToSend = {
        _id: collection._id,
        name: collection.name,
        description: collection.description,
        startingYear: collection.startingYear,
        collectionType: collectionType,
        numberOfArtefacts: collectionsArtefacts.length,
        mostExpensiveArtefact: mostExpensiveArtefact,
        artefacts: collectionsArtefacts,
        photos: photosToSend
    }
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(infosToSend))
    response.end()
}