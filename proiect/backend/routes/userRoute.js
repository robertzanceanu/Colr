const getUserByIdController = require('../controllers/userController/getUserByIdController')
const updateUserDetailsController = require('../controllers/userController/updateUserDetailsController')
const getUsersController = require('../controllers/userController/getUsersController')

module.exports = async (request, response, urlArray, userId) => {
    if (request.method === 'GET') {
        if (urlArray[2] === 'user-details') {
            getUserByIdController(request, response, userId)
        }
        else 
        if (urlArray[2] === 'user-detail') {
            getUsersController(request, response)
        }

    }
    if (request.method === 'PUT') {
        if (urlArray[2] === 'update-details') {
            let body = {}
            await request.on('data', async data => {
                body = JSON.parse(data)
            })
            updateUserDetailsController(request, response, userId, body)
        }
    }
}