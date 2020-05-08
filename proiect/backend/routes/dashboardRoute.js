const dashboardInfosController = require('../controllers/dashboardController/dashboardInfosController')

module.exports = (request,response,routes,body) => {
    if(request.method === 'GET') {
        if(routes[2] === 'infos'){
            dashboardInfosController(request,response, body)
        }
    }
}