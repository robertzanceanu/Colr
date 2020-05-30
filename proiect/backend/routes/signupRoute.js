const registerController = require('../controllers/signupController/registerController')

module.exports = async (request,response, routes, body) => {
    if(request.method === 'POST' && routes[2] === 'register') {
        let body = {}
        await request.on('data', async data => {
            body = JSON.parse(data)
        })
        registerController(request,response, body)
    }
}