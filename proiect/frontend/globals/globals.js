let burgerMenu = document.getElementById('show-menu')
let navigation = document.getElementById('navigation')
let hideMenu = document.getElementById('hide-menu')
let logoutButtons = document.getElementsByClassName('page-logout')
const userName = document.getElementsByClassName('page-user-name')

burgerMenu.addEventListener('click', () => {
    if (!navigation.classList.contains('navigation-show')) {
        navigation.classList.add('navigation-show')
    }
})

hideMenu.addEventListener('click', () => {
    if (navigation.classList.contains('navigation-show')) {
        navigation.classList.remove('navigation-show')
    }
})

buttons = Array.from(logoutButtons)

buttons.map((button) => {
    button.addEventListener('click', () => {
        localStorage.removeItem('auth-token')
        window.location.href = '/login'
    })
})

const getUserDetails = async () => {
    try {
        const response = await fetch(`http://localhost:8081/api/users/user-details`, {
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
const adminRoutes = [
    'all-users',
    'edit-user',
    'admin-collections',
    'admin-artefacts'
]
window.addEventListener('DOMContentLoaded', async (event) => {
    if(!localStorage.getItem('auth-token')) {
        window.location.href = '/login'
    }
    const userInfos = await getUserDetails()
    const currentPage = location.pathname.split('/')[1]
    const inAdminRoutes = adminRoutes.find(route => route === currentPage)
    if(userInfos.role === 'admin') {
        if(!inAdminRoutes) {
            window.location.href = '/all-users'
        }
    } else {
        if(inAdminRoutes) {
            window.location.href = '/collections'
        }
    }
    let userNameArray = Array.from(userName)
    userNameArray && userNameArray.length > 0 &&
        userNameArray.map((element) =>
            element.innerHTML = `${userInfos.lastName} ${userInfos.firstName}`
        )
})
