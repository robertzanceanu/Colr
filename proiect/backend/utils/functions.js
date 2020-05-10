const CollectionTypes = require('../model/collectionTypesModel')
const ArtefactRarity = require('../model/rarityModel')
const AretfactCondition = require('../model/conditionModel')

const createCollectionTypes = () => {
    const types = [
        {
            name: 'Capac'
        },
        {
            name: 'Eticheta'
        },
        {
            name: 'Dopuri'
        }
    ]

    types.map(async (type) => {
        const newType = new CollectionTypes(type)
        const typeFound = await CollectionTypes.findOne({ name: type.name })
        if (!typeFound) {
            newType.save()
        }
    })
}
const createRarity = ()=>{
    const types = [
        {
            name: 'Comun'
        },
        {
            name: 'Rar'
        },
        {
            name: 'Foarte Rar'
        }
    ]

    types.map(async (type) => {
        const newRarity = new ArtefactRarity(type)
        const rarityFound = await ArtefactRarity.findOne({ name: type.name })
        if (!rarityFound) {
            newRarity.save()
        }
    })

}
const createCondition = ()=>{
    const types = [
        {
            name: 'Stare buna'
        },
        {
            name: 'Excelenta'
        },
        {
            name: 'Uzat'
        }
    ]

    types.map(async (type) => {
        const newCondition = new AretfactCondition(type)
        const conditionFound = await AretfactCondition.findOne({ name: type.name })
        if (!conditionFound) {
            newCondition.save()
        }
    })
}
module.exports = {
    createCollections: () => createCollectionTypes(),
    createRarity:() => createRarity() ,
    createCondition:() => createCondition()
}