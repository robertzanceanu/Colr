const addButton = document.getElementById('add-button')
const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://localhost:8080/api/collection/add`, {
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
addButton.addEventListener('click', async () => {
    let formValues = {}
    let name = document.getElementById('name').value
    let description = document.getElementById('description').value
    let data = document.getElementById('startingYear').value
    let collectionType = document.getElementById("collectionType").value
    

    formValues = {
        name,
        description,
        data,
        collectionType,
        userId: localStorage.getItem('id')
    }
    let response = await onSubmit(formValues)
    if (!response.error) {
        localStorage.setItem('auth-token', response.token)
        localStorage.setItem('id', response.id)
        window.location.href = '/dashboard'
    }
})
