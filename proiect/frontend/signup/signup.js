const submitButton = document.getElementById('submit-button')

const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/signup/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

submitButton.addEventListener('click', async () => {
    let formValues = {}

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let repeatPassword = document.getElementById('repeat-password').value
    let firstName = document.getElementById('first-name').value
    let lastName = document.getElementById('last-name').value
    formValues = {
        email,
        password,
        firstName,
        lastName,
        role: 'user'
    }
    let response = await onSubmit(formValues)
    if (!response.error) {
        window.location.href = '/login'
    }
})