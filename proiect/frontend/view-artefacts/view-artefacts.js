const ArtefactContent = document.getElementById('infos')

const getArtefactById = async(locationId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/view-artefacts/${locationId}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        return json
    }catch (err) {
        console.log(err)
    }
}
window.addEventListener('DOMContentLoaded', async (event) => {
    const locationArray = location.pathname.split('/')
    console.log(locationArray)
    const artefactInfos = await getArtefactById(locationArray[2])
    console.log(artefactInfos)
    if (artefactInfos.status === 401) {
        window.location.href = '/login'
    } else {
        const date = new Date(artefactInfos.year)
        const formattedDate = `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`

        ArtefactContent.innerHTML = `
        <div class="page__content__text">
        <div class="page-content-photos">
        <ul>
        ${artefactInfos.photos && artefactInfos.photos.length > 0 && artefactInfos.photos.map((photo) =>{
            return `
                <li><img src="${photo.image}"/></li>
            `
        })}
        </ul>
        </div>
        <h1>Artefact:</h1>
        <br>
        <h2>${artefactInfos.name}</h2>
        <br>
        <ul>
        <li class="still_row">
        <h1>Data artefact:</h1>
        <p>${formattedDate}</p>
    </li>
    <li class="still_row">
        <h1>Stare:</h1>
        <p>${artefactInfos.condition.name}</p>
    </li>
    <li class="still_row">
    <h1>Istoric:</h1>
    <p>${artefactInfos.usageHistory}</p>
    </li>
    <li class="still_row">
    <h1>Tara:</h1>
    <p>${artefactInfos.country}</p>
    </li>
    <li class="still_row">
        <h1>Raritate:</h1>
        <p>${artefactInfos.rarity.name}</p>
    </li>
    <li class="still_row">
    <h1>Valoare:</h1>
    <p>${artefactInfos.value} RON</p>
    </li>
    <li class="still_row">
    <h1>Numar aprecieri:</h1>
    <p>${artefactInfos.numberOfLikes}</p>
    </li>
    </ul>
    <p>${artefactInfos.description}</p>
               
    </div>
    <a href="/add-artefacts" class="btn">Adaugare artefact in colectie</a>
        `
    }
})