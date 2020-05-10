const addCollectionController = require('../controllers/addCollectionController/addCollectionController')

module.exports = (request,response, routes, body) => {
    if(request.method === 'POST' && routes[2] === 'add') {
        addCollectionController(request,response, body);
    }
}