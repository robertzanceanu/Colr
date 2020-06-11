window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('auth-token')) {
        window.location.href = '/dashboard'
    }
})

const submitButton = document.getElementById('submit-button')

const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://localhost:8081/api/signup/register`, {
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
    let valid = true
    const fieldErrorEmail = document.getElementById('field-error-email')
    if (email === '') {
        valid = false
        fieldErrorEmail.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorEmail.innerHTML = ''
    }
    const fiedErrorLastName = document.getElementById('field-error-lastName')
    if (lastName === '') {
        valid = false
        fiedErrorLastName.innerHTML = 'Obligatoriu'
    } else {
        fiedErrorLastName.innerHTML = ''
    }
    const fieldErrorFirstName = document.getElementById('field-error-firstName')
    if (firstName === '') {
        valid = false
        fieldErrorFirstName.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorFirstName.innerHTML = ''
    }
    const fieldErrorPassword = document.getElementById('field-error-password')
    if(password === '') {
        valid=false
        fieldErrorPassword.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorPassword.innerHTML = ''
    }
    const fieldErrorRepeatPassword = document.getElementById('field-error-repeatPassword')
    if(repeatPassword === '') {
        valid=false
        fieldErrorRepeatPassword.innerHTML = 'Obligatoriu'
    } else if(repeatPassword !== password) {
        valid=false
        fieldErrorRepeatPassword.innerHTML = 'Parolele nu coincid'
    } else {
        fieldErrorRepeatPassword.innerHTML = ''
    }
    if (valid) {
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
    }

})