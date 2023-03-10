const urlMotorista = 'http://localhost:3000/motorista';

const principalSuperior = document.querySelector('.read');
const listaRead = document.querySelector('.superior');
const listaServicos = document.querySelector('.readServicos');

function carregar() {
    const options = { method: 'GET' };

    fetch(urlMotorista, options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {

                let tabela = listaRead.cloneNode(true)
                tabela.classList.remove("model")

                tabela.querySelector('#id').innerHTML = 'ID: ' + dados.id
                tabela.querySelector('#nome').innerHTML = 'Nome: ' + dados.nome
                tabela.querySelector('#cnh').innerHTML = 'CNH ' + dados.cnh
                tabela.querySelector('#cpf').innerHTML = 'CPF: ' + dados.cpf

                principalSuperior.appendChild(tabela)
            });
        })
        .catch(err => console.error(err));
}

function adicionar() {

    var nomeSubmit = document.querySelector('#nomeSubmit');
    var cnhSubmit = document.querySelector('#cnhSubmit');
    var cpfSubmit = document.querySelector('#cpfSubmit');

    let dados = {
        nome: nomeSubmit.value,
        cnh: Number(cnhSubmit.value),
        cpf: Number(cpfSubmit.value)
    }

    if (dados.nome && dados.cnh && dados.cpf != "" || null || 0) {

        let token = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/motorista', options)
            .then(res => {
                if (res.status === 200) {
                    alert('MOTORISTA ADICIONADO COM SUCESSO')
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

//update

function abrirModal3(id) {
    let modalAparecer = document.querySelector(".editarInferior");
    modalAparecer.classList.add("modelModal3");
    var idEditar = id.parentNode.children[1].children[0].innerHTML.split(" ")[1]
    localStorage.setItem('idMotorista', JSON.stringify({ "id": idEditar }));
}

function editar() {
    var editNome = document.querySelector('#editNome');
    var editCnh = document.querySelector('#editCnh');
    var editCpf = document.querySelector('#editCpf');

    let id = JSON.parse(localStorage.getItem('idMotorista'));

    let dados = {
        cpf: Number(editCpf.value),
        cnh: Number(editCnh.value),
        nome: editNome.value
    }

    if (dados.nome && dados.cnh && dados.cpf !== "" || null) {

        let token = JSON.parse(localStorage.getItem('user'));
        console.log(token.token)

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/motorista/' + id.id, options)
            .then(res => {
                console.log(res.json())
                if (res.status === 200) {
                    console.log(res)
                    alert('MOTORISTA ALTERADO COM SUCESSO')
                    window.location.reload()
                } else {
                    console.log(res)
                    alert("ALGO DEU ERRADO")
                }

                return res.json()
            })
            .then(response => { return console.log(response) })
    } else {
        console.log("Errado", dados)
        alert("Insira os dados pedidos")
    }
}

function fecharModalEditar() {
    let modalDesaparecer = document.querySelector(".editarInferior");
    modalDesaparecer.classList.remove("modelModal3")
}