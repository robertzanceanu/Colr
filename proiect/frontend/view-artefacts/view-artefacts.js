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

const likeArtefact = async(artefactId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/like/${artefactId}`, {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        return json
    } catch(err) {
        console.log(err)
    }
}
window.addEventListener('DOMContentLoaded', async (event) => {
    const locationArray = location.pathname.split('/')
    const artefactInfos = await getArtefactById(locationArray[2])
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
                <li><img src="${photo.image}" alt="img"/></li>
            `
        })}
        </ul>
        </div>
        <h1>Artefact:</h1>
        <br>
        <h2>${artefactInfos.name}</h2>
        <div class="like-button" id="like-button">
           <i class="fa fa-heart"></i>
        </div>
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
    <a href="/edit-artefact/${artefactInfos._id}" class="btn" id="submit-button">Editare artefact</a>

    `
    }
    const likeButton = document.getElementById('like-button')
    likeButton.addEventListener('click', async () => {
        if(!likeButton.classList.contains('liked')) {
            likeButton.classList.add('liked')
            const resp = await likeArtefact(locationArray[2])
            console.log(resp)
            if(!resp.error) {
                location.reload()
            }
        }
    })
})

