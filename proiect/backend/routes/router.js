const signupRoute = require('./signupRoute')
const loginRoute = require('./loginRoute')
const dashboardRoute = require('./dashboardRoute')
<<<<<<< HEAD
const addCollectionRoute = require('./addCollectionRoute')

=======
const collectionTypesRoute = require('./collectionTypesRoute')
>>>>>>> 0e64204a1c94c348d0c8c4619d338209153cc564
const verifyAuthToken = require('../utils/verifyAuthToken')

// routerul verifica ce pagina e in request si te trimite pe ruta ei.. la dashboard verific daca exista auth tokenul in headers deoarece 
// acela este un call privat.. cel mai probabil asa va fi la toate paginile mai putin login/signup deoarece la toate trebuie sa fii logat
// ca sa stim ce date sa aducem
module.exports = async (request, response, urlArray) => {
    let body = {}

    await request.on('data', data => {
        body = JSON.parse(data)
    })
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        /** add other headers as per requirement */
    };

    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers);
        response.end();
        return;
    } else {
        if (urlArray[1] === 'signup') {
            signupRoute(request, response, urlArray, body)
        }
        if (urlArray[1] === 'login') {
            loginRoute(request, response, urlArray, body)
        }
        if (urlArray[1] === 'dashboard') {
            if (verifyAuthToken(request, response)) {
                dashboardRoute(request, response, urlArray, body)
            }
        }
<<<<<<< HEAD
        if(urlArray[1] === 'collection')
        {
            if (verifyAuthToken(request, response)){
            addCollectionRoute(request, response, urlArray, body);
=======
        if (urlArray[1] === 'collectionTypes') {
            if (verifyAuthToken(request, response)) {
                collectionTypesRoute(request, response, urlArray, body)
>>>>>>> 0e64204a1c94c348d0c8c4619d338209153cc564
            }
        }
    }

}