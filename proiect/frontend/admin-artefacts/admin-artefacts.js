const tableBody = document.getElementById('table-body')

const getArtefacts = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/get-artefacts`, {
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
let artefacts = []
window.addEventListener('DOMContentLoaded', async (event) => {
    artefacts = await getArtefacts()
    artefacts && artefacts.length > 0 && artefacts.forEach((artefact,index) => {
        tableBody.innerHTML = `
            ${tableBody.innerHTML}
            <tr>
                <td data-column="Nume artefact">${artefact.name}</td>
                <td data-column="Nume colectie">${artefact.collection.name}</td>
                <td data-column="User email">${artefact.user.email}</td>
                <td data-column="Sterge">
                    <button id="delete-artefact-${index}">Sterge artefactul</button>
                </td>
            </tr>
        `
    })
})

const deleteArtefact = async (artefactId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/${artefactId}`, {
            method: 'delete',
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

tableBody.addEventListener('click', async (e) => {
    if(e.target.id.indexOf('delete-artefact') !== -1) {
        const deleteIndex = e.target.id.split('-')[2]
        console.log(artefacts[deleteIndex])
        const deleteMessage = await deleteArtefact(artefacts[deleteIndex]._id)
        if(deleteMessage) {
            if(deleteMessage.ok) {
                // collections = await getCollections()
                location.reload()
            } else {
    
            }
        }
    }
})
