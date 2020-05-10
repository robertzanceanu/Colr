const addCollectionController = require('../controllers/collectionController/addCollectionController')
const getCollectionsController = require('../controllers/collectionController/getCollectionsController')

module.exports = (request,response, routes, body) => {
    if(request.method === 'POST' && routes[2] === 'add') {
        addCollectionController(request,response, body);
    }
    if(request.method === 'GET') {
        if(!routes[2]) {
            getCollectionsController(request,response,body)
        }
    }
}
