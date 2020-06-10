const Artefact = require('../../model/artefactsModel')
const ArtefactRarity = require('../../model/rarityModel')
const ArtefactCondition = require('../../model/conditionModel')
const Collection = require('../../model/collectionsModel')
const Users = require('../../model/usersModel')

module.exports = async (request, response, body, userId) => {
    console.log('gagaga', body)
    let collection = await Collection.findOne({ name: body.collectionName, userId })
    let rarity = await ArtefactRarity.findOne({ name: body.rarity })
    let condition = await ArtefactCondition.findOne({ name: body.condition })
    if(!collection) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: 'Numele colectiei pe care l-ai introdus nu a fost gasit!'
        }))
        response.end()
        return
    } 
     if(!rarity) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: 'Raritatea nu a fost gasita!'
        }))
        response.end()
        return
    }
     if(!condition) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: 'Conditia nu a fost gasita'
        }))
        response.end()
        return
    }
    const newArtefact = new Artefact({
        userId,
        collectionId:collection && collection.id,
        name: body.name,
        year: body.year,
        value: Number(body.value),
        rarity: rarity && rarity.id,
        condition: condition && condition.id,
        description: body.description,
        numberOfLikes: 0,
        country: body.country,
        usageHistory: body.history
    })

    try {
        const saveNewArtefact = await newArtefact.save()
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(saveArtefact))
        response.end()
    } catch (err ) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: err
        }))
        response.end()
    }
    // console.log('ahgha',toAdd)
}