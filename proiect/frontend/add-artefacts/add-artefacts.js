const submitButton = document.getElementById('submit-button')
const sendCsv = document.getElementById('send-csv')

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
const onSubmitCsv = async values => {
    try {
        const response = await fetch(`http://localhost:8081/api/artefacts/import-csv`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                // 'Content-Type': 'multipart/form-data; charset=utf-8'
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
    let valid = true
    const fieldErrorName = document.getElementById('field-error-name')
    if (name === '') {
        valid = false
        fieldErrorName.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorName.innerHTML = ''
    }
    const fieldErrorCollection = document.getElementById('field-error-collection')
    if (collectionId === '') {
        valid = false
        fieldErrorCollection.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorCollection.innerHTML = ''
    }
    const fieldErrorYear = document.getElementById('field-error-year')
    if (year === '') {
        valid = false
        fieldErrorYear.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorYear.innerHTML = ''
    }
    const fieldErrorValue = document.getElementById('field-error-value')
    if (value === '') {
        valid = false
        fieldErrorValue.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorValue.innerHTML = ''
    }
    const fieldErrorRarity = document.getElementById('field-error-rarity')
    if (rarity === '') {
        valid = false
        fieldErrorRarity.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorRarity.innerHTML = ''
    }
    const fieldErrorCondition = document.getElementById('field-error-condition')
    if (condition === '') {
        valid = false
        fieldErrorCondition.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorCondition.innerHTML = ''
    }
    const fieldErrorDescription = document.getElementById('field-error-description')
    if (description === '') {
        valid = false
        fieldErrorDescription.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorDescription.innerHTML = ''
    }
    const fieldErrorCountry = document.getElementById('field-error-country')
    if (country === '') {
        valid = false
        fieldErrorCountry.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorCountry.innerHTML = ''
    }
    const fieldErrorHistory = document.getElementById('field-error-hisory')
    if (usageHistory === '') {
        valid = false
        fieldErrorHistory.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorHistory.innerHTML = ''
    }
    if (valid) {
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
        for (var key in formValues) {
            if (key === 'photos') {
                formValues.photos && formValues.photos.length > 0 &&
                    formValues.photos.forEach((photo, index) => data.append(`${key}[${index}]`, photo))
            } else {
                data.append(key, formValues[key]);
            }
        }
        let response = await onSubmit(data)
        if (!response.error) {
            window.location.href = '/artefacts'
        }
    }

})

sendCsv.addEventListener('click', async () => {
    let csvFile = document.getElementById('import-csv').files
    csvFile = Array.from(csvFile)
    const data = new FormData()
    data.append('csvFile', csvFile[0])
    await onSubmitCsv(data)
    if (response) {
        if (response.ok) {
            window.location.href = '/artefacts'
        }
    }
})

window.addEventListener('DOMContentLoaded', async (event) => {
    let collection = await getCollection()
    let rarity = await getRarity()
    let condition = await getCondition()
    let selectElement = document.getElementById('dropdownCollection')
    collection.map((type, index) => {

        var opt = document.createElement('option');
        opt.value = type._id;
        opt.innerHTML = type.name;
        selectElement.appendChild(opt);
    })
    let selectElement1 = document.getElementById('dropdownRaritate')
    rarity.map((type, index) => {

        var opt = document.createElement('option');
        opt.value = type._id;
        opt.innerHTML = type.name;
        selectElement1.appendChild(opt);
    })
    let selectElement2 = document.getElementById('dropdownCondiție')
    condition.map((type, index) => {

        var opt = document.createElement('option');
        opt.value = type._id;
        opt.innerHTML = type.name;
        selectElement2.appendChild(opt);
    })
})