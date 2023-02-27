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
            console.log(res)
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

    //Servicos
    // const optionsServicos = { method: 'GET' };

    // fetch(urlServicos, optionsServicos)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    //Motorista
    // const optionsMotorista = { method: 'GET' };

    // fetch(urlMotorista, optionsMotorista)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
}