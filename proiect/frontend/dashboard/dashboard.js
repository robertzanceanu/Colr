const getInfos = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/dashboard/infos`, {
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
        const response = await fetch(`http://localhost:8080/api/collectionTypes`, {
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
    let response = await getInfos()
    let collectionTypes = await getCollectionTypes()
    if (response.status === 401) {
        window.location.href = '/login'
    }
})


