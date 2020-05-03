module.exports = (request, response, body) => {
    response.writeHead(200, {
        "Content-Type":"application/json",
    })
    response.write(JSON.stringify({
        ok:'ok'
    }))
    response.end()
}