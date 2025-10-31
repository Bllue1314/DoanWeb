const login = document.querySelector('.login');
const btnLogin = document.getElementById('btn-login');

btnLogin.addEventListener('click', () => {
    login.classList.add('active');
});

login.addEventListener('click', (e) => {
    if (e.target === login) {
        login.classList.remove('active');
    }
});
