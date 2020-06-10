const Artefact = require('../../model/artefactsModel')
const Rarity = require('../../model/rarityModel')
const Condition = require('../../model/conditionModel')
const fs = require('fs')
const path = require('path')
const Like = require('../../model/likesModel')


const getArtefactRarity = async (artefact) => {

    return new Promise(async (resolve) => {
        const artefactRarity = await Rarity.findOne({
            _id: artefact.rarity
        })
        resolve(artefactRarity)
    })
}

const getArtefactCondition = async (artefact) => {

    return new Promise(async (resolve) => {
        const artefactCondition = await Condition.findOne({
            _id: artefact.condition
        })
        resolve(artefactCondition)
    })
}

module.exports = async (reqeust, response, userId, artefactId) => {
    const artefact = await Artefact.findOne({ _id: artefactId })
    const collectionsArtefacts = await Artefact.find({ artefactId })
    const rarity = await getArtefactRarity(artefact)
    const condition = await getArtefactCondition(artefact)
    const numberOfLikes = await Like.find({ artefactId: artefactId })
    let photos = []
        if (artefact.photos && artefact.photos.length > 0) {
            photos = [...photos, ...artefact.photos]
        }
    const photosToSend = []
    photos && photos.length > 0 && photos.map(async (photo) => {
        let image = fs.readFileSync(path.resolve(path.dirname(__filename), `../../${photo.logoPath}`))
        image = Buffer.from(image, 'base64')
        photosToSend.push({
            image: `data:${photo.imgType};base64,` + image.toString('base64')
        })
    })
    const infosToSend = {
        _id: artefact._id,
        name: artefact.name,
        description: artefact.description,
        year: artefact.year,
        value: artefact.value,
        rarity,
        condition,
        numberOfLikes: numberOfLikes.length,
        country: artefact.country,
        usageHistory: artefact.usageHistory,
        photos: photosToSend
    }
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(infosToSend))
    response.end()
}