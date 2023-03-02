const urlFrotas = 'http://localhost:3000/frotas';
const urlServicos = 'http://localhost:3000/servicos';
const urlMotorista = 'http://localhost:3000/motorista';

const principalSuperior = document.querySelector('.readSuperior');
const listaFrotas = document.querySelector('.readFrotas');
const listaMotoristas = document.querySelector('.readMotoristas');

const principalInferior = document.querySelector('.readInferior');
const listaServicos = document.querySelector('.readServicos');
const listaManutencao = document.querySelector('.readManutencao');

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

    console.log(dados)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5vbWUiOiJKQU8iLCJlbWFpbCI6Ijg5MEBnbWFpbC5jb20iLCJzZW5oYSI6IiQyYSQxMCQ0ckx4ZmdrVWxLb1hodnllSXdOc28uRGRRemZDV0dsc2dyQm96Vk9mWi5TaHhqekFHcGFuRyIsImNhcmdvIjoiR0VSRU5URSIsImlhdCI6MTY3Nzc2NDgyNCwiZXhwIjoxNjc3ODAwODI0fQ.cg8rVeYbFAQt8YW8fH2cxwZaAmMyVuL5T7-LoGUBui4'
        },
        body: JSON.stringify(dados)
    };

    fetch('http://localhost:3000/frotas', options)
        .then(res => {
            if (res.status === 200) {
                alert('ADICIONADO')
                window.location.reload()
            } else {
                alert("ALGO DEU ERRADO")
            }
        })
        .then(response => console.log("A resposata foi: ", response))
        .catch(err => console.error(err));
}