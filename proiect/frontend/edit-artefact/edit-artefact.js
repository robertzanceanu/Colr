const submitButton = document.getElementById('submit-button')
const getCondition = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/condition`, {
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
const getRarity = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/rarity`, {
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

const updateArtefact = async (data,locationId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/update-artefact/${locationId}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
        const json = await response.json()
        return json
    } catch (err) {
        console.log(err)
    }
}

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
window.addEventListener('DOMContentLoaded' , async (event) =>{
    const locationArray = location.pathname.split('/')
    const artefactDetails = await getArtefactById(locationArray[2])
    let conditionType = await getCondition()
    let selectElement = document.getElementById('dropdownCondiție')
    conditionType.map((type,index) =>{

            var opt = document.createElement('option');
            opt.value = type._id;
            opt.innerHTML = type.name;
            selectElement.appendChild(opt);
    }) 

    let rarityType = await getRarity()

    let selectElement1 = document.getElementById('dropdownRaritate')
    rarityType.map((type,index) =>{

            var opt = document.createElement('option');
            opt.value = type._id;
            opt.innerHTML = type.name;
            selectElement1.appendChild(opt);
    })
    let name = document.getElementById('name')
    let value = document.getElementById('value')
    let rarity = selectElement1
    let condition = document.getElementById('dropdownCondiție')
    let description = document.getElementById('description')
    let country = document.getElementById('country')
    let usageHistory = document.getElementById('usageHistory')
    
    name.value = artefactDetails.name
    value.value = artefactDetails.value
    rarity.value = artefactDetails.rarity
    condition.value = artefactDetails.condition
    description.value = artefactDetails.description
    country.value = artefactDetails.country
    usageHistory.value = artefactDetails.usageHistory
    
      
})

submitButton.addEventListener('click', async () => {
    const locationArray = location.pathname.split('/')
    let name = document.getElementById('name')
    let value = document.getElementById('value')
    let rarity = document.getElementById('dropdownRaritate')
    let condition = document.getElementById('dropdownCondiție')
    let description = document.getElementById('description')
    let country = document.getElementById('country')
    let usageHistory = document.getElementById('usageHistory') 
    const data ={
        name:name.value,
        value:value.value,
        rarity:rarity.value,
        condition:condition.value,
        description:description.value,
        country:country.value,
        usageHistory:usageHistory.value
    }
    const response = await updateArtefact(data,locationArray[2])
    if(response)
    {
        if(response.ok)
        {
            window.location.href ='/collections'
        }
    }
})