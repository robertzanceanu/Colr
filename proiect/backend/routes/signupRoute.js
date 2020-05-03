const registerController = require('../controllers/signupController/registerController')

module.exports = (request,response, routes, body) => {
    if(request.method === 'POST' && routes[2] === 'register') {
        registerController(request,response, body)
    }
}