const getRarity = require('../controllers/getArtefactRarity/getArtefactRarity')

module.exports = (request,response,routes,body) => {
    if(request.method === 'GET') {
        if(!routes[2]) {
            getRarity(request,response,body)
        }
    }
}