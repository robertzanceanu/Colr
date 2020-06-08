const Artefact = require('../../model/artefactsModel')
const ArtefactRarity = require('../../model/rarityModel')
const ArtefactCondition = require('../../model/conditionModel')
const Collection = require('../../model/collectionsModel')
const Users = require('../../model/usersModel')
const fs = require("fs")
const PDFDocument = require("pdfkit")
const path = require('path')
const generateHeader = require('../../utils/pdf/generateHeader')
const generateFooter = require('../../utils/pdf/generateFooter')
const generateUserInfosPdf = require('../../utils/pdf/generateUserInfos')

const getUser = userId => {
    return new Promise(async (resolve) => {
        const user = await Users.findOne({ _id: userId })
        resolve(user)
    })
}
const getArtefactCollection = collectionId => {
    return new Promise(async (resolve) => {

        const collection = await Collection.findOne({ _id: collectionId })
        resolve(collection)
    })
}
const getArtefactCondition = (conditionId) => {
    return new Promise(async (resolve) => {
        const artefactCondition = await ArtefactCondition.findOne({ _id: conditionId })
        resolve(artefactCondition)
    })
}
const getArtefactRarity = rarityId => {
    return new Promise(async (resolve) => {
        const artefactRarity = await ArtefactRarity.findOne({ _id: rarityId })
        resolve(artefactRarity)
    })
}
generateTableRow = (doc, y, c1, c2, c3, c4, c5, c6,c7) => {
    doc
        .fontSize(10)
        .text(c1, 50, y)
        .text(c2, 160, y)
        .text(c3, 250, y)
        .text(c4, 350, y)
        .text(c5, 400, y)
        .text(c6, 450, y)
        .text(c7, 510, y)
}
const pdfTable = (doc, infos) => {
    let i,
        tableTop = 330;

    infos && infos.length > 0 && infos.forEach((item,index) => {
        const position = tableTop + (index+1)*30
        const date = new Date(item.year)
        const formattedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

        generateTableRow(
            doc,
            position,
            `${item.name.slice(0, 20)}...`,
            `${item.collection.slice(0,17)}...`,
            formattedDate,
            `${item.value.toString().slice(0, 10)}...`,
            item.rarity,
            item.condition,
            item.numberOfLikes
        )
    })
}
const generatePdf = async (artefacts) => {
    let doc = new PDFDocument({ margin: 30 })

    generateHeader(doc)
    const userInfos = {
        firstName: artefacts[0].userFirstName,
        lastName: artefacts[0].userLastName,
        email: artefacts[0].userEmail,
        role: artefacts[0].userRole
    }
    generateUserInfosPdf(doc, userInfos);
    const tableHeaders = [
        'Nume artefact',
        'Nume colectie',
        'Data de provenienta',
        'Valoarea',
        'Raritatea',
        'Starea',
        'Aprecieri'
    ]
    generateTableRow(
        doc,
        330,
        tableHeaders[0],
        tableHeaders[1],
        tableHeaders[2],
        tableHeaders[3],
        tableHeaders[4],
        tableHeaders[5],
        tableHeaders[6]
    )
    pdfTable(doc, artefacts);
    generateFooter(doc);
    if (!fs.existsSync(path.resolve(path.dirname(__filename), '../../exports'))) {
        await fs.mkdir(path.resolve(path.dirname(__filename), '../../exports'), (err) => {
            if (err) {
                return console.error(err)
            }
        })
    }
    if (!fs.existsSync(path.resolve(path.dirname(__filename), '../../exports/pdfs'))) {
        await fs.mkdir(path.resolve(path.dirname(__filename), '../../exports/pdfs'), (err) => {
            if (err) {
                return console.error(err)
            }
        })
    }
    doc.end();
    doc.pipe(fs.createWriteStream(path.resolve(path.dirname(__filename), `../../exports/pdfs/pdf-${artefacts[0].userFirstName}${artefacts[0].userLastName}-${artefacts[0].userId}.pdf`)));
}

module.exports = async (request, response, userId) => {
    let artefacts = await Artefact.find({ userId: userId })
    let artefactsToSend = []
    await Promise.all(artefacts.map(async (artefact) => {
        try {
            const artefactRarity = await getArtefactRarity(artefact.rarity)
            const artefactCondition = await getArtefactCondition(artefact.condition)
            const collection = await getArtefactCollection(artefact.collectionId)
            const user = await getUser(artefact.userId)
            artefactsToSend.push({
                userFirstName: user.firstName,
                userLastName: user.lastName,
                userId: artefact.userId,
                userEmail: user.email,
                userRole: user.role,
                collection: collection.name,
                name: artefact.name,
                year: artefact.year,
                value: artefact.value,
                rarity: artefactRarity.name,
                condition: artefactCondition.name,
                description: artefact.description,
                country: artefact.country,
                usageHistory: artefact.usageHistory,
                numberOfLikes: artefact.numberOfLikes
            })
        } catch (err) {
            console.log(err)
        }
    }))
    await generatePdf(artefactsToSend)
    let pdfFile = fs.readFileSync(path.resolve(path.dirname(__filename), `../../exports/pdfs/pdf-${artefactsToSend[0].userFirstName}${artefactsToSend[0].userLastName}-${artefactsToSend[0].userId}.pdf`))
    // const pdfStat = fs.statSync(path.resolve(path.dirname(__filename), `../../exports/pdfs/pdf-${artefactsToSend[0].userFirstName}${artefactsToSend[0].userLastName}-${artefactsToSend[0].userId}.pdf`))
    // response.setHeader('Content-Length', pdfStat.size)
    // response.setHeader('Content-disposition', 'attachment; filename=artefacts.pdf')
    // response.write(pdf)
    // response.end()
    
    // pdfFile.pipe(response, 'binary')
    pdfFile = Buffer.from(pdfFile, 'base64')
    pdfFile = `data:application/pdf;base64,` + pdfFile.toString('base64')
    response.writeHead(200, { "Content-Type": 'application/pdf' })
    response.write(pdfFile)
    response.end()
}