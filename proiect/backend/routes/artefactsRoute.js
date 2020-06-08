const addArtefactsController = require('../controllers/artefactsController/addArtefactsController.js')
const getArtefactController = require('../controllers/artefactsController/getArtefactsController')
const getArtefactById = require('../controllers/artefactsController/getArtefactById.js')
const updateArtefactController = require('../controllers/artefactsController/updateArtefactController')
const getArtefactControllerExport = require('../controllers/artefactsController/getArtefactControllerExport')
const exportPdfController = require('../controllers/artefactsController/artefactExportPdfController')
const queryString = require('query-string')

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

module.exports = async (request, response, routes, userId) => {
    if (request.method === 'POST') {
        const body = await getFormData(request)
        if (routes[2] === 'add') {
            addArtefactsController(request, response, body)
        }

    }
    if (request.method === 'GET') {
        if (routes[2].split('?')[0] === 'get-artefacts') {
            const routeFilters = routes[2].split('?')[1]
            const queryParams = queryString.parse(routeFilters)
            getArtefactController(request, response, userId,queryParams)
        }
        if (routes[2] === 'view-artefacts') {
            getArtefactById(request, response, userId, routes[3])
        }
        if (routes[2] === 'export-csv') {
            getArtefactControllerExport(request, response, userId)
        }
        if(routes[2] === 'export-pdf') {
            exportPdfController(request, response, userId)
        }
    }
    if (request.method == 'PUT') {
        if (routes[2] === 'update-artefact') {
            let body = {}
            await request.on('data', async data => {
                body = JSON.parse(data)
            })
            updateArtefactController(request, response, routes[3], body)
        }
    }
}