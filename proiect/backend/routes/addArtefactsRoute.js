const addArtefactsController = require('../controllers/addArtefactsController/addArtefactsController.js')

module.exports = (request,response,routes,body) => {
    if(request.method === 'POST') {
        if(routes[2] === 'add'){
            addArtefactsController(request,response, body)
        }
    } 
}