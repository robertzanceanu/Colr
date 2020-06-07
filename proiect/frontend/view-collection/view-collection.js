const collectionContent = document.getElementById('page-content-colectie')

const getCollectionById = async (locationId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection/${locationId}`, {
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
    const locationArray = location.pathname.split('/')
    const collectionInfos = await getCollectionById(locationArray[2])
    if (collectionInfos.status === 401) {
        window.location.href = '/login'
    } else {
        const date = new Date(collectionInfos.startingYear)
        const formattedDate=`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
       
        collectionContent.innerHTML = `
        <div class="page__content__text">
        <div class="page-content-photos">
        <ul>
            ${collectionInfos.photos && collectionInfos.photos.length > 0 && collectionInfos.photos.map((photo) =>{
                return `
                    <li><img src="${photo.image}"/></li>
                `
            })}
        </ul>
    </div>
            <h1>Colectia:</h1>
            <br>
            <h2>${collectionInfos.name}</h2>
            <br>
            <ul>
                <li class="still_row">
                    <h1>Data a inceperii colectiei:</h1>
                    <p>${formattedDate}</p>
                </li>
                <li class="still_row">
                    <h1>Numar elemente:</h1>
                    <p>${collectionInfos.numberOfArtefacts}</p>
                </li>
                <li class="still_row">
                    <h1>Cel mai valoros artefact:</h1>
                    <p>${collectionInfos.mostExpensiveArtefact.value} EUR</p>
                </li>
                <li class="still_row">
                    <h1>Numele celui mai valoros artefact:</h1>
                    <p>${collectionInfos.mostExpensiveArtefact.name}</p>
                </li>
            </ul>
            <p>${collectionInfos.description}</p>
               
        </div>
        <div class="simple-table">
        ${
            collectionInfos && collectionInfos.artefacts && 
            collectionInfos.artefacts.map((artefact) => `
                <div class="simple-table-row">
                    <div class="simple-table-row-name">${artefact.name}</div>
                    <a class="simple-table-row-link" href="/view-artefacts/${artefact._id}">Vezi artefactul</a>
                </div>
            `)
        }
        </div>
        <div class ="buttons">
        <a href="/add-artefacts" class="btn">Adaugare artefact in colectie</a>
        
        <a href="/edit-colection/${collectionInfos._id}" class="btn-edit">Editeaza Colectia Actuala</a>
        </div>
        `
        
    }
})
