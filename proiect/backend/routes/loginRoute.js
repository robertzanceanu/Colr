const authController = require('../controllers/loginController/authController')

module.exports = (request,response, routes, body) => {
    if(request.method === 'POST' && routes[2] === 'auth') {
        authController(request,response, body)
    }
}