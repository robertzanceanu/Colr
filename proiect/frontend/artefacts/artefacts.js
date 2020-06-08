const artefactsPage = document.getElementById('artefacts-page-wrapper')
const selectCollection = document.getElementById('select-collection')
const selectRarity = document.getElementById('select-rarity')
const selectCondition = document.getElementById('select-condition')
const resetFiltersButton = document.getElementById('reset-filters')

let filters = ``

let filtersObject = {
    collectionId: null,
    rarityId: null,
    conditionId: null
}

const getArtefacts = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/get-artefacts${filters}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        return json
    } catch (err) {
        console.log(err)
    }
}


const getArtefactsCsv = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/export-csv`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            }
        })
        const resp = await response.text()
        return resp
    } catch (err) {
        console.log(err)
    }
}

const getArtefactsPdf = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/export-pdf`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/pdf'
            }
        })
        const resp = await response.text()
        return resp
    } catch (err) {
        console.log(err)
    }
}

const getCollections = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection?getAll=true`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        return json
    } catch (err) {
        console.log(err)
    }
}
const getRarities = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/rarity`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        return json
    } catch (err) {
        console.log(err)
    }
}
const getConditions = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/condition`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        return json
    } catch (err) {
        console.log(err)
    }
}

const renderArtefactsContent = artefacts => {
    artefacts && artefacts.length > 0
        && artefacts.forEach((artefact) => {
            const date = new Date(artefact.year)
            const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            artefactsPage.innerHTML = `
        ${artefactsPage.innerHTML}
        <div class="artefact-page-card-wrapper">
            <h1 class="artefact-page-card-name">
                ${artefact.name}
            </h1>
            <div class="artefact-infos-wrapper">
                <p class="artefact-info-text">
                   Raritate: ${artefact.rarity.name}
                </p>
                <p class="artefact-info-text">
                   Conditie: ${artefact.condition.name}
                </p>
                <p class="artefact-info-text">
                   Data: ${formattedDate}
                </p>
            </div>
            <p class="artefact-page-card-collection-description">
                ${artefact.description}
            </p>
            <a href="/view-artefacts/${artefact._id}" class="artefact-link">Vezi tot despre artefact</a>
        </div>
        `
        })
}

window.addEventListener('DOMContentLoaded', async (event) => {
    let artefacts = await getArtefacts()
    let collections = await getCollections()
    let rarities = await getRarities()
    let conditions = await getConditions()

    console.log(collections, rarities, conditions)
    collections.map((collection, index) => {
        let option = document.createElement('option')
        option.value = collection._id
        option.innerHTML = collection.name
        selectCollection.appendChild(option)
    })
    rarities.map((rarity, index) => {
        let option = document.createElement('option')
        option.value = rarity._id
        option.innerHTML = rarity.name
        selectRarity.appendChild(option)
    })
    conditions.map((condition) => {
        let option = document.createElement('option')
        option.value = condition._id
        option.innerHTML = condition.name
        selectCondition.appendChild(option)
    })
    renderArtefactsContent(artefacts)

})

const downloadCsv = document.getElementById('downloadCsv')
downloadCsv.addEventListener('click', async () => {
    const csv = await getArtefactsCsv()
    var hiddenElement = document.createElement('a')
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
    hiddenElement.target = '_blank'
    hiddenElement.download = 'artefacts.csv'
    hiddenElement.click()

})

const downloadPdf = document.getElementById('downloadPdf')
downloadPdf.addEventListener('click', async () => {
    let pdf = await getArtefactsPdf()
    let hiddenElement = document.createElement('a')
    hiddenElement.href = pdf
    hiddenElement.target = '_blank'
    hiddenElement.download = 'artefacts.pdf'
    hiddenElement.click()
})

const generateFilterString = () => {
    filters = ''
    let firstElement = true
    Object.keys(filtersObject).forEach((key, value) => {
        if (filtersObject[key]) {
            const toAddToFilter = `${key}=${filtersObject[key]}`
            if(firstElement) {
                filters=`?${toAddToFilter}`
                firstElement = false
            } else {
                filters=`${filters}&${toAddToFilter}`
            }
        }
    })

}

selectCollection.addEventListener('change', async (event, value) => {
    filtersObject.collectionId = selectCollection.value
    await generateFilterString()
    const newArtefacts = await getArtefacts()
    artefactsPage.innerHTML = ``
    renderArtefactsContent(newArtefacts)
})

selectRarity.addEventListener('change', async () => {
    filtersObject.rarityId = selectRarity.value
    await generateFilterString()
    const newArtefacts = await getArtefacts()
    artefactsPage.innerHTML = ``
    renderArtefactsContent(newArtefacts)
})

selectCondition.addEventListener('change', async () => {
    filtersObject.conditionId = selectCondition.value
    await generateFilterString()
    const newArtefacts = await getArtefacts()
    artefactsPage.innerHTML = ``
    renderArtefactsContent(newArtefacts)
})
resetFiltersButton.addEventListener('click', async () => {
    filtersObject = {}
    generateFilterString()
    const newArtefacts = await getArtefacts()
    artefactsPage.innerHTML = ``
    renderArtefactsContent(newArtefacts)
})