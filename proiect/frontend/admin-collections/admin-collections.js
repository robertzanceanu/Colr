const tableBody = document.getElementById('table-body')

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

const deleteCollection = async (collectionId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection/${collectionId}`, {
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
let collections = []
window.addEventListener('DOMContentLoaded', async (event) => {
    collections = await getCollections()
    collections && collections.length > 0 && collections.forEach((collection,index) => {
        tableBody.innerHTML = `
            ${tableBody.innerHTML}
            <tr>
                <td data-column="Nume colectie">${collection.name}</td>
                <td data-column="Tip colectie">${collection.collectionType.name}</td>
                <td data-column="User email">${collection.user.email}</td>
                <td data-column="Sterge">
                    <button id="delete-collection-${index}">Sterge colectia</button>
                </td>
            </tr>
        `
    })
})
tableBody.addEventListener('click', async (e) => {
    if(e.target.id.indexOf('delete-collection') !== -1) {
        const deleteIndex = e.target.id.split('-')[2]
        const deleteMessage = await deleteCollection(collections[deleteIndex]._id)
        if(deleteMessage) {
            if(deleteMessage.ok) {
                // collections = await getCollections()
                location.reload()
            } else {
    
            }
        }
    }
})

