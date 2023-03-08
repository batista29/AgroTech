const urlUsuarios = 'http://localhost:3000/usuario';

const principalSuperior = document.querySelector('.read');
const listaRead = document.querySelector('.superior');
const listaServicos = document.querySelector('.readServicos');

function carregar() {
    const options = { method: 'GET' };

    fetch(urlUsuarios, options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {

                let tabela = listaRead.cloneNode(true)
                tabela.classList.remove("model")

                tabela.querySelector('#nome').innerHTML = 'Nome: ' + dados.nome
                tabela.querySelector('#cargo').innerHTML = 'Cargo: ' + dados.cargo

                principalSuperior.appendChild(tabela)
            });
        })
        .catch(err => console.error(err));
}

function adicionar() {

    var submitNome = document.querySelector('#nomeSubmit');
    var submitEmail = document.querySelector('#emailSubmit');
    var submitSenha = document.querySelector('#senhaSubmit');
    var submitSenhaConfirm = document.querySelector('#senhaConfirmSubmit');
    var submitCargo = document.querySelector('#cargoSubmit');

    if (submitSenhaConfirm.value === submitSenha.value) {
        let dados = {
            nome: submitNome.value,
            email: submitEmail.value,
            senha: submitSenha.value,
            cargo: submitCargo.value
        }

        if (dados.nome && dados.email && dados.senha && dados.cargo !== "" || null) {
            
            let token = JSON.parse(localStorage.getItem('user'));

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: token.token
                },
                body: JSON.stringify(dados)
            };

            fetch('http://localhost:3000/usuario', options)
                .then(res => {
                    if (res.status === 200) {
                        alert('USUÁRIO(A) ADICIONADA COM SUCESSO')
                        abrirModal2()
                    } else {
                        alert("ALGO DEU ERRADO, FAÇA LOGIN NOVAMENTE, VERIFIQUE SE VOCÊ TEM AS PERMISSÕES NECESSÁRIAS E AVERIGUE SE OS DADOS ENTÃO ESCRITOS CORRETAMENTE.")
                        alert("CASO NÃO FUNCIONE, LIGUE PARA A EQUIPE DE TI.")
                    }
                })
                .then(response => console.log("A resposata foi: ", response))
                .catch(err => console.error(err));
        } else {
            console.log("Errado", dados)
            alert("Insira os dados pedidos")
            abrirModal()
        }
    } else {
        alert("Senhas não compativeis")
        abrirModal()
    }
}

function abrirModal() {
    let modalAparecer = document.querySelector(".readInferior");
    modalAparecer.classList.add("modelModal")
}

function fecharModal() {
    let modalAparecer = document.querySelector(".readInferior");
    modalAparecer.classList.remove("modelModal")
}

function abrirModal2() {
    let modalAparecer = document.querySelector(".confirmar");
    modalAparecer.classList.add("modelModal2")
}

function adicionarMais() {
    let modalAparecer = document.querySelector(".confirmar");
    modalAparecer.classList.remove("modelModal2")
}

function recarregar() {
    window.location.reload()
}