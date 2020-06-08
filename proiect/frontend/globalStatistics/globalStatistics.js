const artefactsPage = document.getElementById('item1')
const artefactsPage1 = document.getElementById('item2')
const artefactsPage2 = document.getElementById('item3')


const getStatistics = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/globalStatistics`, {
            method: 'GET',
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

window.addEventListener('DOMContentLoaded',async (event) =>{
    const number = await getStatistics()
    artefactsPage2.innerHTML=`${artefactsPage2.innerHTML}<p class="number3">${number[0].artefact}</p>
                            <p class="label">Artefacte</p>
                            <a href="../artefacts/artefacts.html">Sari la Artefacte</a>`
    artefactsPage1.innerHTML=`${artefactsPage1.innerHTML}<p class="number2">${number[0].collection}</p>
                            <p class="label">Colectii</p>
                            <a href="../collections/collections.html">Sari la Colectii</a>`                        
    artefactsPage.innerHTML=`${artefactsPage.innerHTML}<p class="number1">${number[0].users}</p>
                            <p class="label">Useri</p>
                            <a href="../myAccount/myAccount.html">Sari la Contul tau</a>` 
                        })