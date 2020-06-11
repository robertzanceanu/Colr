const collectionsPage = document.getElementById('collections-page-wrapper')
const selectCollection = document.getElementById('select-collection')
const resetFiltersButton = document.getElementById('reset-filters')

let filters = ``

let filtersObject = {
    collectionTypeId: null,
}
const getCollections = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection${filters}`, {
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

const getCollectionTypes = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/collectionTypes`, {
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

window.addEventListener('DOMContentLoaded', async (event) => {
    let collections = await getCollections()
    let collectionTypes = await getCollectionTypes()
    collectionTypes.map((collection, index) => {
        let option = document.createElement('option')
        option.value = collection._id
        option.innerHTML = collection.name
        selectCollection.appendChild(option)
    })

    renderCollections(collections)
})
const renderCollections = (collections) => {
    collections && collections.length > 0
        && collections.forEach((collection) => {
            const date = new Date(collection.startingYear)
            const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
            collectionsPage.innerHTML = `
        ${collectionsPage.innerHTML}
        <div class="collections-page-card-wrapper">
            <h1 class="collection-page-card-name">
                ${collection.name}
            </h1>
            <div class="collection-infos-wrapper">
                <p class="collection-info-text">
                   Tip: ${collection.collectionType.name}
                </p>
                <p class="collection-info-text">
                   Data: ${formattedDate}
                </p>
            </div>
            <p class="collection-page-card-collection-description">
                ${collection.description}
            </p>
            <a href="/view-collection/${collection._id}" class="collection-link">Vezi toata colectia</a>
        </div>
        `
        })
}

const generateFilterString = () => {
    filters = ''
    let firstElement = true
    Object.keys(filtersObject).forEach((key, value) => {
        if (filtersObject[key]) {
            const toAddToFilter = `${key}=${filtersObject[key]}`
            if (firstElement) {
                filters = `?${toAddToFilter}`
                firstElement = false
            } else {
                filters = `${filters}&${toAddToFilter}`
            }
        }
    })

}

selectCollection.addEventListener('change', async (event, value) => {
    filtersObject.collectionTypeId = selectCollection.value
    await generateFilterString()
    const newCollections = await getCollections()
    collectionsPage.innerHTML = ``
    renderCollections(newCollections)
})

resetFiltersButton.addEventListener('click', async () => {
    filtersObject = {}
    generateFilterString()
    const newArtefacts = await getArtefacts()
    artefactsPage.innerHTML = ``
    renderArtefactsContent(newArtefacts)
})
