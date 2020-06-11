const addArtefactsController = require('../controllers/artefactsController/addArtefactsController.js')
const getArtefactController = require('../controllers/artefactsController/getArtefactsController')
const getArtefactById = require('../controllers/artefactsController/getArtefactById.js')
const updateArtefactController = require('../controllers/artefactsController/updateArtefactController')
const getArtefactControllerExport = require('../controllers/artefactsController/getArtefactControllerExport')
const exportPdfController = require('../controllers/artefactsController/artefactExportPdfController')
const likeArtefactController = require('../controllers/artefactsController/likeArtefactController')
const importCsvArtefactController = require('../controllers/artefactsController/importCsvArtefactController')
const deleteArtefactController = require('../controllers/artefactsController/deleteArtefactController')
const formidable = require('formidable')
const queryString = require('query-string')
const multiparty = require('multiparty');
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

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
const readCsv = async (filePath) => {
    let infos = {}
    const response = await fs.readFileSync(filePath, { encoding: "utf8" })
    const dataElements = response.split(',')
    infos = {
        name: dataElements[0],
        collection: dataElements[1],
        year: dataElements[2],
        value: dataElements[3],
        rarity: dataElements[4],
        condition: dataElements[5],
        description: dataElements[6],
        country: dataElements[7],
        history: dataElements[8]
    }
    //         return artefactInfos
    //     })
    console.log(infos)
    return infos
}
const getData = async (request) => {
    const form = new formidable({ multiples: true })
    let artefactInfos = {}
    await request.on('data', async data => {
        const lines = data.toString().split('\r\n')
        const csvText = lines[4].split(',')
        artefactInfos = {
            name: csvText[0].replace(/^\s+/g, ''),
            collectionName: csvText[1].replace(/^\s+/g, ''),
            year: csvText[2].replace(/^\s+/g, ''),
            value: csvText[3].replace(/^\s+/g, ''),
            rarity: csvText[4].replace(/^\s+/g, ''),
            condition: csvText[5].replace(/^\s+/g, ''),
            description: csvText[6].replace(/^\s+/g, ''),
            country: csvText[7].replace(/^\s+/g, ''),
            history: csvText[8].replace(/^\s+/g, '')
        }
    })

    return artefactInfos
}
module.exports = async (request, response, routes, userId) => {
    if (request.method === 'POST') {
        let body = {}
        if (routes[2] === 'add') {
            body = await getFormData(request)
            addArtefactsController(request, response, body)
        }
        if (routes[2] === 'like') {
            body = await getFormData(request)
            likeArtefactController(request, response, userId, routes[3])
        }
        if (routes[2] === 'import-csv') {
            body = await getData(request)
            importCsvArtefactController(request, response, body, userId)
        }
    }
    if (request.method === 'GET') {
        if (routes[2].split('?')[0] === 'get-artefacts') {
            const routeFilters = routes[2].split('?')[1]
            const queryParams = queryString.parse(routeFilters)
            getArtefactController(request, response, userId, queryParams)
        }
        if (routes[2] === 'view-artefacts') {
            getArtefactById(request, response, userId, routes[3])
        }
        if (routes[2] === 'export-csv') {
            getArtefactControllerExport(request, response, userId)
        }
        if (routes[2] === 'export-pdf') {
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
    if(request.method === 'DELETE') {
        deleteArtefactController(request,response,userId,routes[2])
    }
}