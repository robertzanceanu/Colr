const collectionsPage = document.getElementById('collections-page-wrapper')

const getCollections = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection`, {
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
    collections && collections.length > 0 
    && collections.forEach((collection) => {
        const date = new Date(collection.startingYear)
        const formattedDate=`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
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
})
