const getStatistics = require('../controllers/globalStatisticsController/globalStatisticsController')

module.exports = (request,response,routes) => {
    if(request.method === 'GET') {
        if(!routes[2]) {
            getStatistics(request,response)
        }
    }
}