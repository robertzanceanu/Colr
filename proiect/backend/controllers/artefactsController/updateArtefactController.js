const Artefacts = require('../../model/artefactsModel')

module.exports = async (request, response,artefactId, body) =>{
    const artefact = await Artefacts.updateOne({_id:artefactId},body)
    if(artefact.ok)
    {
        response.writeHead(200,{"Content-Type": "application/json"})
        response.write(JSON.stringify({
            ok: true
        }))
        response.end()
    }else {
        response.writeHead(400, { "Content-Type": "application/json" })
        response.write(JSON.stringify({
            error: "Nu s-a putut efectua modificarea"
        }))
        response.end()
    }
}