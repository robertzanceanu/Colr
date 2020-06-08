const artefactsController = require('../controllers/artefactsController/getArtefactsController')
const artefactControllerExport = require('../controllers/artefactsController/getArtefactControllerExport')

module.exports = (request,response,routes,body) => {
    if(request.method === 'GET') {
        if(routes[2] === 'infos'){
            artefactsController(request,response, body)
        } else
        if(routes[2] === 'export') {
            artefactControllerExport(request, response, body)
        }
    } 
}