const getRankings = require('../controllers/rankingsController/rankingsController')


module.exports = (request,response,routes) =>{
    if(request.method === 'GET') {
        if(!routes[2]) {
            getRankings(request,response)
        }
    }
}