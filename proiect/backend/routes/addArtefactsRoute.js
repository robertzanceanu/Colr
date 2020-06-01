const addArtefactsController = require('../controllers/artefactsController/addArtefactsController.js')
const getArtefactController = require('../controllers/artefactsController/getArtefactsController')
const getArtefactById = require('../controllers/artefactsController/getArtefactById.js')
const updateArtefactController = require('../controllers/artefactsController/updateArtefactController')

const multiparty = require('multiparty');
const fs = require('fs')
const path = require('path')

const getFormData = (request) => {
    let form = new multiparty.Form();
    return new Promise(async resolve => {
        form.parse(request, function (err, fields, files) {
            let body = {}

            fields && Object.keys(fields).forEach((key, value) => {
                body[`${key}`] = String(fields[key])
            });
            body.photos = []
            files && Object.keys(files).forEach(async (key, value) => {
                if (!fs.existsSync(path.resolve(path.dirname(__filename), '../uploads'))) {
                    await fs.mkdir(path.resolve(path.dirname(__filename), '../uploads'), (err) => {
                        if (err) {
                            return console.error(err)
                        }
                    })
                }
                fs.renameSync(files[key][0]['path'],
                    path.resolve(`${path.resolve(path.dirname(__filename), '../uploads/file')}` + body.collectionId + '-pictures' + files[key][0]['originalFilename']))
                body.photos.push({
                    logoPath: '/uploads/file' + body.collectionId + '-pictures' + files[key][0]['originalFilename'],
                    imgType: files[key][0]['headers']['content-type']
                })
            })
            resolve(body)
        });
    })
}

module.exports = async (request, response, routes,userId) => {
    if (request.method === 'POST') {
        const body = await getFormData(request)
        if (routes[2] === 'add') {
            addArtefactsController(request, response, body)
        }
        
    }
    if(request.method === 'GET'){
            console.log(routes)
            if(routes[2]==='get-artefacts')
            {
                getArtefactController(request,response,userId)
            }
            if (routes[2]==='view-artefacts')
            {
                getArtefactById(request,response,userId,routes[3])
            }
    }
    if(request.method == 'PUT'){
        if (routes[2] === 'update-artefact') {
            let body = {}
            await request.on('data', async data => {
                body = JSON.parse(data)
            })
            updateArtefactController(request, response, routes[3], body)
        }
    }
}