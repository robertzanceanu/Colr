const artefactsController = require('../controllers/artefactsController/getArtefactsController')

module.exports = (request,response,routes,body) => {
    if(request.method === 'GET') {
        if(routes[2] === 'infos'){
            artefactsController(request,response, body)
        }
    } 

}