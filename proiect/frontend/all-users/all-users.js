const tableBody = document.getElementById('table-body')

const getAllUsers = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/users/all-users`, {
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
    const users = await getAllUsers()
    console.log('agwg', users)
    users && users.length > 0 && users.forEach((user) => {
        tableBody.innerHTML = `
            ${tableBody.innerHTML}
            <tr>
                <td data-column="Nume">${user.firstName}</td>
                <td data-column="Prenume">${user.lastName}</td>
                <td data-column="Emai">${user.email}</td>
                <td data-column="Rol">${user.role}</td>
                <td data-column="Vezi detalii">
                    <a href="/edit-user/${user._id}">Vezi detalii</a>
                </td>
            </tr>
        `
    })
})
