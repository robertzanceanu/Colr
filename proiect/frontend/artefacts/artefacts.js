const artefactsPage = document.getElementById('artefacts-page-wrapper')

const getArtefacts = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/get-artefacts`,{
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
    let artefacts = await getArtefacts()
    console.log("ana are mere",artefacts)
    artefacts && artefacts.length > 0 
    && artefacts.forEach((artefact) => {
        const date = new Date(artefact.year)
        const formattedDate=`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
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
    if (response.status === 401) {
        window.location.href = '/login'
    }
})