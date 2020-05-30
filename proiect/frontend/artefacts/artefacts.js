const artefactsPage = document.getElementById('artefacts-page-wrapper')

const getArtefacts = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts`, {
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