const submitButton = document.getElementById('submit-button')

const getCollectionTypes = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/collectionTypes`, {
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

const updateColection = async (data, locationId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection/edit-colection/${locationId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const json = await response.json()
        return json
    } catch (err) {
        console.log(err)
    }
}

const getCollectionById = async (locationId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection/${locationId}`, {
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
    const locationArray = location.pathname.split('/')
    const colectionDetail = await getCollectionById(locationArray[2])
    let colectionType = await getCollectionTypes()
    let selectElement = document.getElementById('dropdown')
    colectionType.map((type, index) => {

        var opt = document.createElement('option');
        opt.value = type._id;
        opt.innerHTML = type.name;
        selectElement.appendChild(opt);
    })
    let name = document.getElementById('name')
    let description = document.getElementById('description')
    colectionType = document.getElementById('dropdown')

    name.value = colectionDetail.name
    description.value = colectionDetail.description
    colectionType.value = colectionDetail.colectionType
})

submitButton.addEventListener('click', async () => {
    const locationArray = location.pathname.split('/')
    let name = document.getElementById('name').value
    let description = document.getElementById('description').value
    let colectionType = document.getElementById('dropdown').value
    const fieldErrorName = document.getElementById('field-error-name')
    
    let valid = true
    if (name === '') {
        valid = false
        fieldErrorName.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorName.innerHTML = ''
    }

    const fieldErrorDescription = document.getElementById('field-error-description')
    if (description === '') {
        valid = false
        fieldErrorDescription.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorDescription.innerHTML = ''
    }
    const fieldErrorCollection = document.getElementById('field-error-collectionType')
    if (colectionType === '') {
        valid = false
        fieldErrorCollection.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorCollection.innerHTML = ''
    }
    if (valid) {
        const data = {
            name: name,
            description: description,
            colectionType: colectionType
        }
        const response = await updateColection(data, locationArray[2])
        if (response) {
            if (response.ok) {
                window.location.href = '/collections'
            }
        }
    }

})