const getTypes = require('../controllers/collectionTypesController/getCollectionTypeControlle')

module.exports = (request,response,routes) => {
    if(request.method === 'GET') {
        if(!routes[2]) {
            getTypes(request,response)
        }
    }
}