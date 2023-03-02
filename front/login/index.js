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
            console.log(res)
            if (res.status === 404) {
                alert("Login deu errado")
            } else if (res.status === 202) {
                alert("Ok")
                window.location.href = '../principal/index.html'
            }
            else {
                alert("algo deu errado, tente novamente")
            }
        })
        .then(response => console.log(response))
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