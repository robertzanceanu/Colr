const mongoose = require('mongoose')

const artefactConditionSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    }
})

module.exports = mongoose.model('Condition',artefactConditionSchema)