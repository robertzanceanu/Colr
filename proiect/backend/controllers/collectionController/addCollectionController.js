const Collection = require('../../model/collectionsModel')

module.exports = async (request,response,body) =>{
    const colection = await Collection.findOne({
        name : body.name,
        userId: body.userId
    })
    const newCollection = new Collection({
        userId : body.userId,
        name : body.name,
        description : body.description,
        startingYear : body.data,
        collectionTypeId : body.collectionType
    })
    if(colection)
    {
        response.writeHead(400, {"Content-Type":"application/json"})
        response.write(JSON.stringify({
            error:'Mai ai o colectie cu acelasi nume'
        }))
        response.end()
        return
    }
    try {
        const saveCollection = await newCollection.save()
        response.writeHead(200, {"Content-Type":"application/json"})
        response.write(JSON.stringify(saveCollection))
        response.end()
    } catch(err) {
        response.writeHead(400, {"Content-Type":"application/json"})
        response.write(JSON.stringify({
            error:err
        }))
        response.end()
    }

}
