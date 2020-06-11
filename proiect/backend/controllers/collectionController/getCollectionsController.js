const Collections = require('../../model/collectionsModel')
const CollectionTypes = require('../../model/collectionTypesModel')
const Users = require('../../model/usersModel')

const getCollectionType = async (collection) => {

    return new Promise(async (resolve) => {
        const collectionType = await CollectionTypes.find({
            _id: collection.collectionTypeId
        })
        resolve(collectionType[0])
    })
}

const getUser = async (collection) => {

    return new Promise(async (resolve) => {
        const user = await Users.findOne({
            _id: collection.userId
        })
        resolve(user)
    })
}


module.exports = async (request, response, userId, queryParams) => {
    let collectionFilters = {
        userId
    }

    if (queryParams) {
        if (queryParams.getAll === 'true') {
            collectionFilters = {}
        }
    }
    collections = await Collections.find(collectionFilters)

    let collectionsToSend = []
    await Promise.all(collections.map(async (collection) => {
        collectionType = await getCollectionType(collection)
        const user =  await getUser(collection)
        collectionsToSend.push({
            _id: collection._id,
            collectionTypeId: collection.collectionTypeId,
            description: collection.description,
            name: collection.name,
            startingYear: collection.startingYear,
            collectionType,
            user
        })
    }))
    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(JSON.stringify(collectionsToSend))
    response.end()
}