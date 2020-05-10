const submitButton = document.getElementById('submit-button')

const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const json = await response.json()
        return json

    } catch (err) {
        console.log(err)
    }
}
const getCollection = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection`, {
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

submitButton.addEventListener('click', async () => {
    let formValues = {}

    let name = document.getElementById('name').value
    let year = document.getElementById('year').value
    let value = document.getElementById('value').value
    let rarity = document.getElementById('rarity').value
    let condition = document.getElementById('condition').value
    let description = document.getElementById('description').value
    let country = document.getElementById('country').value
    let usageHistory = document.getElementById('usageHistory').value
    formValues = {
        name,
        year,
        value,
        rarity,
        condition,
        description,
        country,
        usageHistory,
        userId: localStorage.getItem('id'),
        collectionId: '123',
        numberOfLikes: 0
    }
    let response = await onSubmit(formValues)
    if (!response.error) {
        window.location.href = '/dashboard'
    }
})
window.addEventListener('DOMContentLoaded', async (event) => {
    let collection = await getCollection()
    let selectElement = document.getElementById('dropdownCollection')
    collection.map((type,index) =>{

            var opt = document.createElement('option');
            opt.value = type._id;
            opt.innerHTML = type.name;
            selectElement.appendChild(opt);
    }) 
        
    
    
})