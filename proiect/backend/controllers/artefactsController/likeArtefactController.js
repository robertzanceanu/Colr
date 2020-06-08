const Like = require('../../model/likesModel')

module.exports = async (request, response, userId, artefactId) => {
    const alreadyLiked = await Like.findOne({
        userId,
        artefactId
    })
    const newLike = new Like({
        userId,
        artefactId
    })
    if (alreadyLiked) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: 'Deja ai dat like'
        }))
        response.end()
        return
    }
    try {
        const saveNewLike = await newLike.save()
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(saveNewLike))
        response.end()
    } catch (err) {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: err
        }))
        response.end()
    }
}