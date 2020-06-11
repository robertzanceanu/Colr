const addButton = document.getElementById('add-button')
const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://localhost:8081/api/collection/add`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
        const json = await response.json()
        return json

    } catch (err) {
        console.log(err)
    }
}

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

addButton.addEventListener('click', async () => {
    let formValues = {}
    let name = document.getElementById('name').value
    let description = document.getElementById('description').value
    let data = document.getElementById('startingYear').value
    let collectionType = document.getElementById("dropdown").value
    
    const fieldErrorName = document.getElementById('field-error-name')
    let valid = true
    if(name === '') {
        valid=false
        fieldErrorName.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorName.innerHTML = ''
    }

    const fieldErrorDescription = document.getElementById('field-error-description')
    if(description === '') {
        valid=false     
        fieldErrorDescription.innerHTML = 'Obligatoriu'   
    } else {
        fieldErrorDescription.innerHTML = ''
    }
    const fieldErrorDate = document.getElementById('field-error-date')
    if(data === '') {
        valid = false
        fieldErrorDate.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorDate.innerHTML = ''
    }
    const fieldErrorCollection= document.getElementById('field-error-collectionType')
    if(collectionType === '') {
        valid = false
        fieldErrorCollection.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorCollection.innerHTML = ''
    }
    if(valid) {
        formValues = {
            name,
            description,
            data,
            collectionType,
            userId: localStorage.getItem('id')
        }
        let response = await onSubmit(formValues)
        window.location.href ='/collections'
    }

})
window.addEventListener('DOMContentLoaded', async (event) => {
    let collectionTypes = await getCollectionTypes()
    let selectElement = document.getElementById('dropdown')
    let selectText = ``
    collectionTypes.map((type,index) =>{
            var opt = document.createElement('option');
            opt.value = type._id;
            opt.innerHTML = type.name;
            selectElement.appendChild(opt);
    }) 

    
})