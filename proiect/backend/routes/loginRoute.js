const authController = require('../controllers/loginController/authController')

module.exports = async (request,response, routes) => {
    if(request.method === 'POST' && routes[2] === 'auth') {
        let body = {}
        await request.on('data', async data => {
            body = JSON.parse(data)
        })
        authController(request,response, body)
    }
}