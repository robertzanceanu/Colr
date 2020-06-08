const signupRoute = require('./signupRoute')
const loginRoute = require('./loginRoute')
const collectionsRoute = require('./collectionsRoute')
const collectionRoute = require('./collectionRoute')
const verifyAuthToken = require('../utils/verifyAuthToken')
const artefactsRoute = require("./artefactsRoute")
const artefactRarity = require('./artefactRarityRoute')
const artefactCondition = require('./artefactConditionRoute')
const collectionTypesRoute = require('./collectionTypesRoute')
const userRoute = require('./userRoute')

// routerul verifica ce pagina e in request si te trimite pe ruta ei.. la dashboard verific daca exista auth tokenul in headers deoarece 
// acela este un call privat.. cel mai probabil asa va fi la toate paginile mai putin login/signup deoarece la toate trebuie sa fii logat
// ca sa stim ce date sa aducem
module.exports = async (request, response, urlArray) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };
    let mainRoute = urlArray[1].split('?')[0]
    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers);
        response.end();
        return;
    } else {
        if (mainRoute === 'signup') {
            signupRoute(request, response, urlArray)
        } else if (mainRoute === 'login') {
            loginRoute(request, response, urlArray)
        } else {
            const verified = verifyAuthToken(request, response)
            if (verified) {
                if (mainRoute === 'collection') {
                    collectionRoute(request, response, urlArray, verified._id);
                }
                if (mainRoute === 'collectionTypes') {
                    collectionTypesRoute(request, response, urlArray)
                }
                if (mainRoute === 'artefacts') {
                    artefactsRoute(request, response, urlArray,verified._id);
                }
                if (mainRoute === 'rarity') {
                    artefactRarity(request, response, urlArray)
                }
                if (mainRoute === 'condition') {
                    artefactCondition(request, response, urlArray)
                }
                if (mainRoute === 'users') {
                    userRoute(request, response, urlArray, verified._id)
                }
            }
        }

    }
}

