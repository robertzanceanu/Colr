const getCondition = require('../controllers/getArtefactCondition/getArtefactCondition')

module.exports = (request,response,routes,body) => {
    if(request.method === 'GET') {
        if(!routes[2]) {
            getCondition(request,response,body)
        }
    }
}