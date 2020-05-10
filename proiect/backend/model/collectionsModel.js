const mongoose = require('mongoose')

const collectionsSchema = new mongoose.Schema({
    userId: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
        min:6
    },
    description: {
        type:String,
        required:true,
        min:20
    },
    startingYear: {
        type:Date,
        required:true,
    },
    collectionTypeId: {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Collections',collectionsSchema)