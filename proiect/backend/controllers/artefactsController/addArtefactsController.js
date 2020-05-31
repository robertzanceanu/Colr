const Artefact = require('../../model/artefactsModel')



module.exports = async (request, response, body) => {
    const artefact = await Artefact.findOne({
        name: body.name,
        userId: body.userId
    })
    const newArtefact = new Artefact({
        userId: body.userId,
        collectionId: body.collectionId,
        name: body.name,
        year: body.year,
        value: Number(body.value),
        rarity: body.rarity,
        condition: body.condition,
        description: body.description,
        numberOfLikes: body.numberOfLikes,
        country: body.country,
        usageHistory: body.usageHistory,
        photos: body.photos
    })
    if (artefact) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: 'Mai ai un artefact cu acelasi nume'
        }))
        response.end()
        return
    }
    try {
        const saveArtefact = await newArtefact.save()
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(saveArtefact))
        response.end()
    } catch (err) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: err
        }))
        response.end()
    }

}