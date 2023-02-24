let btn = document.querySelector('.lnr-eye');

const urlLogin = 'http://localhost:3000/usuario/login'

function login() {
    let password = document.querySelector('#password').value
    let email = document.querySelector('#email').value

    let dados = {
        email: email,
        senha: password
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    };

    fetch(urlLogin, options)
        .then(res => {
            if (res.status === 202) {
                alert("Login successful")
                window.location.href = '../principal'
            } else {
                alert("algo deu errado, tente novamente")
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));

}

btn.addEventListener('click', function () {
    let input = document.querySelector('#password');
    if (input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'password');
    }
});