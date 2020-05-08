const loginButton = document.getElementById('login-button')

const onSubmit = async (values) => {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/login/auth`, {
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

loginButton.addEventListener('click', async () => {
    let formValues = {}
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    formValues = {
        email,
        password,
    }
    let response = await onSubmit(formValues)
    if (!response.error) {
        localStorage.setItem('auth-token', response.token)
        localStorage.setItem('id', response.id)
        window.location.href = '/dashboard'
    }
})