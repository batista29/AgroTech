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
        .then(response => {
            if (response.status == 404) {
                document.getElementById("error-message").style.display = "block"
            } if (response.status == 200) {
                window.location.href = "../principal/index.html"
            }
            return response.json()
        })
        .then(resp => {
            localStorage.setItem('user', JSON.stringify({ "id": resp.result.id, "nome": resp.result.nome, "cargo": resp.result.cargo, "token": resp.result.token }));
        })
}


btn.addEventListener('click', function () {
    let input = document.querySelector('#password');
    if (input.getAttribute('type') == 'password') {
        input.setAttribute('type', 'text');
    } else {
        input.setAttribute('type', 'password');
    }
});

document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault()
})