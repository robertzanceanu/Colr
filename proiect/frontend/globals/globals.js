let burgerMenu = document.getElementById('show-menu')
let navigation = document.getElementById('navigation')
let hideMenu = document.getElementById('hide-menu')
let logoutButtons = document.getElementsByClassName('page-logout')

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
