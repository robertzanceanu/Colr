const getUserByIdController = require('../controllers/userController/getUserByIdController')
const updateUserDetailsController = require('../controllers/userController/updateUserDetailsController')
const getUsersController = require('../controllers/userController/getUsersController')
const getUserInfos = require('../controllers/userController/getUserInfosController')
const updateUserController = require('../controllers/userController/updateUserController')
const deleteUserController = require('../controllers/userController/deleteUserController')

module.exports = async (request, response, urlArray, userId) => {
    if (request.method === 'GET') {
        if (urlArray[2] === 'user-details') {
            getUserByIdController(request, response, userId)
        }
        else if (urlArray[2] === 'all-users') {
            if(!urlArray[3]) {
                getUsersController(request, response)
            } else {
                getUserInfos(request,response, userId, urlArray[3])
            }
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
        if(urlArray[2] === 'update-user') {
            let body = {}
            await request.on('data', async data => {
                body = JSON.parse(data)
            })
            updateUserController(request, response, userId, body, urlArray[3])
        
        }
    }
    if(request.method === 'DELETE') {
        deleteUserController(request,response,userId, urlArray[2])
    }
}