const Artefact = require('../../model/artefactsModel')

const getArtefacts = async (artefact) => {

    return new Promise (async (resolve) => {
        const all_artefacts =  await Artefact.find({
            userId: artefact.userId,
            collectionId: artefact.collectionId,
            name: artefact.name,
            year: artefact.year,
            value: artefact.value,
            rarity: artefact.rarity,
            condition: artefact.condition,
            description: artefact.description,
            //photos: artefact.photos,
            numberOfLikes: artefact.numberOfLikes,
            country: artefact.country,
            usageHistory: artefact.usageHistory
        })
        resolve(all_artefacts[0])
    })
}

module.exports = async (request, response, userId) => {
    let artefact = await Artefact.find({userId:userId})
    console.log("merge?", artefact)
    let artefactToSend = []
    await Promise.all(artefact.map(async(artefact) => {
        let artefacts = await getArtefacts(artefact)
        console.log("ceva", artefacts)
        artefactToSend.push({
            userId: artefacts.userId,
            collectionId: artefacts.collectionId,
            name: artefacts.name,
            year: artefacts.year,
            value: artefacts.value,
            rarity: artefacts.rarity,
            condition: artefacts.condition,
            description: artefacts.description,
            //photos,
            numberOfLikes: artefacts.numberOfLikes,
            country: artefacts.country,
            usageHistory: artefacts.usageHistory
        })
    }))

    let csvContent = "data:text/csv;charset=utf-8,";
    console.log("altceva", artefactToSend)
    artefactToSend.forEach(function(rowArray) {
        console.log(rowArray)
        // rowArray = [rowArray]
        let row = ''
        Object.keys(rowArray).forEach((key,value) => {
            console.log("hahahae",key,rowArray[key])
            row = `${rowArray[key]},`
            csvContent += row + "\r\n";
        })
        // let row = rowArray.join(",");
        console.log("ceva"+row)
    });

    response.writeHead(200, { "Content-Type": "application/json" })
    response.write(csvContent)
    response.end()
}