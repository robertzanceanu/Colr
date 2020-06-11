window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('auth-token')) {
        window.location.href = '/collections'
    }
})

const loginButton = document.getElementById('login-button')
const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://localhost:8081/api/login/auth`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
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

loginButton.addEventListener('click', async () => {
    let formValues = {}
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let valid = true

    const fieldErrorEmail = document.getElementById('field-error-email')
    const fieldErrorPassword = document.getElementById('field-error-password')

    if (email === '') {
        valid = false
        fieldErrorEmail.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorEmail.innerHTML = ''
    }
    if (password === '') {
        valid = false
        fieldErrorPassword.innerHTML = 'Obligatoriu'
    } else {
        fieldErrorPassword.innerHTML = ''
    }

    if (valid) {
        formValues = {
            email,
            password,
        }
        let response = await onSubmit(formValues)
        if (!response.error) {
            localStorage.setItem('auth-token', response.token)
            localStorage.setItem('id', response.id)
            window.location.href = '/collections'
        }
    }

})
