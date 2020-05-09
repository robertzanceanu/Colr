let burgerMenu = document.getElementById('show-menu');
let navigation = document.getElementById('navigation');
let hideMenu = document.getElementById('hide-menu');

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
