const submitButton = document.getElementById('submit-button')

const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
            },
            body: values
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
submitButton.addEventListener('click', async () => {
    let formValues = {}

    let name = document.getElementById('name').value
    let collectionId = document.getElementById('dropdownCollection').value
    let year = document.getElementById('year').value
    let value = document.getElementById('value').value
    let rarity = document.getElementById('dropdownRaritate').value
    let condition = document.getElementById('dropdownCondiție').value
    let description = document.getElementById('description').value
    let country = document.getElementById('country').value
    let usageHistory = document.getElementById('usageHistory').value
    let photos = document.getElementById('photos').files
    photos = Array.from(photos)
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
        collectionId,
        numberOfLikes: 0,
        photos
    }

    const data = new FormData()
    for ( var key in formValues ) {
        if(key === 'photos') {
            formValues.photos && formValues.photos.length > 0 &&
            formValues.photos.forEach((photo,index) => data.append(`${key}[${index}]`, photo))
        } else {
            data.append(key, formValues[key]);
        }
    }
    let response = await onSubmit(data)
    // if (!response.error) {
    //     window.location.href = '/artefacts'
    // }
})
window.addEventListener('DOMContentLoaded', async (event) => {
    let collection = await getCollection()
    let rarity = await getRarity()
    let condition = await getCondition()
    let selectElement = document.getElementById('dropdownCollection')
    collection.map((type,index) =>{

            var opt = document.createElement('option');
            opt.value = type._id;
            opt.innerHTML = type.name;
            selectElement.appendChild(opt);
    }) 
    let selectElement1 = document.getElementById('dropdownRaritate')
    rarity.map((type,index) =>{

            var opt = document.createElement('option');
            opt.value = type._id;
            opt.innerHTML = type.name;
            selectElement1.appendChild(opt);
    })
    let selectElement2 = document.getElementById('dropdownCondiție')
    condition.map((type,index) =>{

            var opt = document.createElement('option');
            opt.value = type._id;
            opt.innerHTML = type.name;
            selectElement2.appendChild(opt);
    })   
})