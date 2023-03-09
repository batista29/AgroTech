const urlFrotas = 'http://localhost:3000/frotas';

const principalSuperior = document.querySelector('.readSuperior');
const listaFrotas = document.querySelector('.readFrotas');
const listaMotoristas = document.querySelector('.readMotoristas');

function carregar() {
    //frotas
    const optionsFrotas = { method: 'GET' };

    fetch(urlFrotas, optionsFrotas)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {
                let tabela = listaFrotas.cloneNode(true)
                tabela.classList.remove("model")
                tabela.querySelector('.idFrota').innerHTML = 'Id: ' + dados.id
                tabela.querySelector('.marcaFrota').innerHTML = 'Marca: ' + dados.marca
                tabela.querySelector('.modeloFrota').innerHTML = 'Modelo: ' + dados.modelo
                tabela.querySelector('.placaFrota').innerHTML = 'Placa: ' + dados.placa
                principalSuperior.appendChild(tabela)
            });
        })
        .catch(err => console.error(err));
}

function adicionar() {

    var marca = document.querySelector('#marca');
    var modelo = document.querySelector('#modelo');
    var placa = document.querySelector('#placa');

    let dados = {
        marca: marca.value,
        modelo: modelo.value,
        placa: placa.value
    }

    if (dados.marca && dados.modelo && dados.placa !== "" || null) {

        let token = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/frotas', options)
            .then(res => {
                if (res.status === 200) {
                    alert('FROTA ADICIONADA COM SUCESSO')
                    abrirModal2()
                } else {
                    alert("ALGO DEU ERRADO, FAÇA LOGIN NOVAMENTE, VERIFIQUE SE VOCÊ TEM AS PERMISSÕES NECESSÁRIAS E AVERIGUE SE OS DADOS ENTÃO ESCRITOS CORRETAMENTE.")
                    alert("CASO NÃO FUNCIONE, LIGUE PARA A EQUIPE DE TI.")
                }
            })
            .then(response => { return response })
            .catch(err => console.error(err));
    } else {
        console.log("Errado", dados)
        alert("Insira os dados pedidos")
        window.location.reload()
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

function abrirModal3(id) {
    let modalAparecer = document.querySelector(".editarInferior");
    modalAparecer.classList.add("modelModal3")
    var idEditar = id.parentNode.children[1].innerHTML.split(" ")[1]
    localStorage.setItem('id_frotas', JSON.stringify({ "id": idEditar }));
}


function editar() {
    var marcaEdit = document.querySelector('#editMarca');
    var modeloEdit = document.querySelector('#editModelo');
    var placaEdit = document.querySelector('#editPlaca');

    let id = JSON.parse(localStorage.getItem('id_frotas'));

    console.log(id.id)

    let dados = {
        id: Number(id.id),
        marca: marcaEdit.value,
        modelo: modeloEdit.value,
        placa: placaEdit.value
    }

    if (dados.marca && dados.modelo && dados.placa !== "" || null) {

        let token = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/frotas/', options)
            .then(res => {
                if (res.status === 200) {
                    alert('FROTA ALTERADA COM SUCESSO')
                    window.location.reload()
                } else {
                    alert("ALGO DEU ERRADO")
                }
            })
            .then(response => { return response })
            .catch(err => console.error(err));
    } else {
        console.log("Errado", dados)
        alert("Insira os dados pedidos")
    }
}


function fecharModalEditar() {
    let modalDesaparecer = document.querySelector(".editarInferior");
    modalDesaparecer.classList.remove("modelModal3")
}