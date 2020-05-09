const CollectionTypes = require('../model/collectionTypesModel')

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

module.exports = {
    createCollections: () => createCollectionTypes()
}