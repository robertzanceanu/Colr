const mongoose = require('mongoose')

const collectionTypesSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('CollectionTypes',collectionTypesSchema)

