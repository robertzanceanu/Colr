const updateUserDetails = async (data) => {
    try {
        const response = await fetch(`http://localhost:8081/api/users/update-details`, {
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

window.addEventListener('DOMContentLoaded', async (event) => {
    let userDetails = await getUserDetails()
    let email = document.getElementById('email')
    let firstName = document.getElementById('firstName')
    let lastName = document.getElementById('lastName')
    email.value = userDetails.email
    firstName.value = userDetails.firstName
    lastName.value = userDetails.lastName
    // if (response.status === 401) {
    //     window.location.href = '/login'
    // }
})

const sumbitButton = document.getElementById("submit-button")

sumbitButton.addEventListener('click', async () => {
    let email = document.getElementById('email')
    let firstName = document.getElementById('firstName')
    let lastName = document.getElementById('lastName')
    const data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
    }
    const response = await updateUserDetails(data)
    if(response) {
        if(response.ok) {
            window.location.href = '/collections'
        }
    }
})
