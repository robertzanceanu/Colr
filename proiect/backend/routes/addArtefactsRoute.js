const addArtefactsController = require('../controllers/artefactsController/addArtefactsController.js')
const getArtefactController = require('../controllers/artefactsController/getArtefactsController')
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
    else
        if(request.method === 'GET'){
            if(routes[2]==='get-artefacts')
            {
                getArtefactController(request,response,userId)
            }
        }
}