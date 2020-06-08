const addCollectionController = require('../controllers/collectionController/addCollectionController')
const getCollectionsController = require('../controllers/collectionController/getCollectionsController')
const getCollectionById = require('../controllers/collectionController/getCollectionById')
const updateColection = require('../controllers/collectionController/updateColectionController')

module.exports = async (request,response, routes,userId) => {
    if(request.method === 'POST' && routes[2] === 'add') {
        let body = {}
        await request.on('data', async data => {
            // form.parse(request, function (err, fields, files) {
            //     console.log('abcde', fields, files)
            //     if (fields || files) {
            //         console.log('griaj')
            //     } else {
            //         body = JSON.parse(data)
            //     }
            // });
            // console.log('data', data)
            body = JSON.parse(data)
        })
        addCollectionController(request,response, body, userId);
    }
    if(request.method === 'GET') {
        if(!routes[2]) {
            getCollectionsController(request,response, userId)
        } else {
            getCollectionById(request,response,userId,routes[2])
        }
    }
    if(request.method === 'put'){
        if (routes[2] === 'edit-colection') {
            let body = {}
            await request.on('data', async data => {
                body = JSON.parse(data)
            })
            updateArtefactController(request, response, routes[3], body)
        }
    }
}
