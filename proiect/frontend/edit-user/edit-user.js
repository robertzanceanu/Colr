const getCurrentUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:8081/api/users/all-users/${userId}`, {
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

const updateUser = async (userId, data) => {
    try {
        const response = await fetch(`http://localhost:8081/api/users/update-user/${userId}`, {
            method: 'put',
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

const submitButton = document.getElementById('submit-button')
let email = document.getElementById('email')
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let password = document.getElementById('password')

window.addEventListener('DOMContentLoaded', async (event) => {
    const userDetails = await getCurrentUser(location.pathname.split('/')[2])

    // let password = document.getElementById('password')
    email.value = userDetails.email
    firstName.value = userDetails.firstName
    lastName.value = userDetails.lastName
})

submitButton.addEventListener('click', async () => {
    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password:password.value
    }
    const response = await updateUser(location.pathname.split('/')[2], data)
    if(response) {
        if(response.ok) {
            window.location.href = '/all-users'
        }
    }

})

const onDeleteUser = async userId => {
    try {
        const response = await fetch(`http://localhost:8081/api/users/${userId}`, {
            method: 'delete',
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

const deleteUser = document.getElementById('delete-user')
deleteUser.addEventListener('click', async () => {
    const response = await onDeleteUser(location.pathname.split('/')[2])
    if(response) {
        if(response.ok) {
            window.location.href = '/all-users'
        }
    }
})