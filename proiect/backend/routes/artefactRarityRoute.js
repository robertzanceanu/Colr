const getRarity = require('../controllers/getArtefactRarity/getArtefactRarity')

module.exports = (request,response,routes) => {
    if(request.method === 'GET') {
        if(!routes[2]) {
            getRarity(request,response)
        }
    }
}