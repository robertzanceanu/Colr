let http = require('http')
let mongoose = require('mongoose')
const dotenv = require('dotenv')

const renderContent = require('./utils/renderContent')
const router = require('./routes/router')
const { createCollections } = require('./utils/functions')
const { createRarity } = require('./utils/functions')
const { createCondition } = require('./utils/functions')

const PORT = 8081


//Aici se face conexiunea la bd: COLRSuperUser - numele userului, superuser1 - parola
mongoose.connect('mongodb+srv://COLRSuperUser:superuser1@twproject2020-fdksh.mongodb.net/COLR?retryWrites=true&w=majority', { useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.error("Could not connect to MongoDB...", err))

dotenv.config()

//rutele acceptate
const routes = [
    'collections',
    'login',
    'add-artefacts',
    'add-collection',
    'globalStatistics',
    'myAccount',
    'rankings',
    'signup',
    'view-artefacts',
    'view-collection',
    'artefacts',
    'edit-artefact',
    'edit-colection',
    'all-users',
    'edit-user',
    'admin-collections',
    'admin-artefacts',
	'rss'
]
http.createServer(function (request, response) {
    //aici o sa imi explic in cuvinte logica
    let requestPages = request.url.split('/')
    requestPages.shift()
    const mainPage = requestPages[0].split('.')[0]
    const requestMime = requestPages[requestPages.length - 1].split('.')[1]
    //daca ruta are pe pozitia 1 in request api, inseamna ca call-ul este facut de pe front prin fetch deci mergem la router, 
    // altfel inseamna ca este ceva de tipul html, css ... si se duce pe citirea lor
    createCollections()
    createRarity()
    createCondition()

    if (requestPages[0] === 'api') {
        router(request, response, requestPages)
    }
    else {
        //aici voi explica in cuvinte
        let filePath = '../frontend'

        if (routes.indexOf(mainPage) > -1) {
            filePath = `${filePath}/${mainPage}/${mainPage}`
            if (!requestMime) {
                filePath = `${filePath}.html`
                renderContent(filePath, 'html', response)
            } else {
                filePath = `${filePath}.${requestMime}`
                renderContent(filePath, requestMime, response)
            }
        } else {
            if(request.url === '/404.css') {
                renderContent(`../frontend/404/404.css`, 'css', response)
            } else {
                const reqMt = request.url.split('.')
                filePath = `${filePath}${request.url}`
                renderContent(filePath, reqMt[1], response)
            }
            
        }
    }
}).listen(PORT)

console.log(`Server running at http://localhost:${PORT}/`)

