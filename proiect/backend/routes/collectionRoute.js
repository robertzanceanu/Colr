const addCollectionController = require('../controllers/collectionController/addCollectionController')
const getCollectionsController = require('../controllers/collectionController/getCollectionsController')
const getCollectionById = require('../controllers/collectionController/getCollectionById')
const updateColection = require('../controllers/collectionController/updateColectionController')
const queryString = require('query-string')

module.exports = async (request, response, routes, userId) => {
    if (request.method === 'POST' && routes[2] === 'add') {
        let body = {}
        await request.on('data', async data => {
            body = JSON.parse(data)
        })
        addCollectionController(request, response, body, userId);
    }
    if (request.method === 'GET') {
        if (!routes[2]) {
            const routeFilters = routes[1].split('?')[1]
            const queryParams = queryString.parse(routeFilters)
            getCollectionsController(request, response, userId, queryParams)
        } else {
            getCollectionById(request, response, userId, routes[2])
        }
    }
    if (request.method === 'PUT') {
         if (routes[2] === 'edit-colection') {
            let body = {}
            await request.on('data', async data => {
                body = JSON.parse(data)
            })
            updateColection(request, response, routes[3], body)
        }
    }
}
