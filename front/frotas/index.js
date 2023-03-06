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
        console.log("CERTO", dados)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5vbWUiOiJKQU8iLCJlbWFpbCI6Ijg5MEBnbWFpbC5jb20iLCJzZW5oYSI6IiQyYSQxMCQ0ckx4ZmdrVWxLb1hodnllSXdOc28uRGRRemZDV0dsc2dyQm96Vk9mWi5TaHhqekFHcGFuRyIsImNhcmdvIjoiR0VSRU5URSIsImlhdCI6MTY3Nzg0MTY0NiwiZXhwIjoxNjc3ODc3NjQ2fQ.7IZzu5AnS5khheqzXbquTPGsS-0TcyDnPCRVIfSrj3c'
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
            .then(response => console.log("A resposata foi: ", response))
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