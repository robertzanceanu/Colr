const mongoose = require('mongoose')

const artefactsSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
    },
    collectionId: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
        min:6
    },
    year: {
        type:Date,
        required:true,
    },
    value: {
        type:Number,
        required:true
    },
    rarity: {
        type:String,
        required:true
    },
    condition: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true,
        min:20
    },
    photos: {
        type:[Buffer],
        required:true
    },
    numberOfLikes: {
        type:Number,
        required:true
    },
    country: {
        type:Number,
        required:true
    },
    usageHistory: {
        type:String,
        required:true,
        min:20
    }
})

module.exports = mongoose.model('Artefacts',artefactsSchema)