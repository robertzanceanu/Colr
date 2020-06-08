const mongoose = require('mongoose')

const likesSchema = new mongoose.Schema({
    artefactId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Likes', likesSchema)