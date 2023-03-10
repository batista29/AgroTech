const urlManutencao = 'http://localhost:3000/manutencao';

const principalSuperior = document.querySelector('.read');
const listaRead = document.querySelector('.superior');
const listaManutencoes = document.querySelector('.readManutencoes');

function carregar() {
    const options = { method: 'GET' };

    fetch(urlManutencao, options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {

                let tabela = listaRead.cloneNode(true)
                tabela.classList.remove("model")
                tabela.querySelector('#id').innerHTML = 'ID: ' + dados.id
                tabela.querySelector('#descricao').innerHTML = 'Descrição: ' + dados.descricao
                tabela.querySelector('#valor').innerHTML = 'Valor: ' + dados.valor

                var dateInicio = new Date(dados.data_inicio);
                let dataInicioFormatada = dateInicio.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                var dateFim = new Date(dados.data_fim);
                let dataFimFormatada = dateFim.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                tabela.querySelector('#data-inicio').innerHTML = 'Data-inicio: ' + dataInicioFormatada
                if (dados.data_fim == null) {
                    tabela.querySelector('#data-fim').innerHTML = 'Data- fim: Ainda em execução.'
                } else {
                    tabela.querySelector('#data-fim').innerHTML = 'Data-fim: ' + dataFimFormatada
                }
                principalSuperior.appendChild(tabela)
            });
        })
        .catch(err => console.error(err));
}


function adicionar() {

    var descricao = document.querySelector('#submitDescricao');
    var valor = document.querySelector('#submitValor');
    var data_inicio = document.querySelector('#submitData_inicio');
    var data_fim = document.querySelector('#submitData_fim');
    var frotaId = document.querySelector('#submitFotaId');

    var data_inicioSubmit = data_inicio.value + "T00:00:00.000Z"
    var data_fimSubmit = data_fim.value + "T00:00:00.000Z"

    let dados = {
        descricao: descricao.value,
        valor: parseFloat(valor.value),
        data_inicio: data_inicioSubmit,
        data_fim: data_fimSubmit,
        frotaId: Number(frotaId.value)
    }

    if (dados.descricao && dados.valor && dados.data_inicio && dados.data_fim && dados.frotaId !== "" || null) {

        let token = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        console.log(options)

        fetch('http://localhost:3000/manutencao', options)
            .then(res => {
                if (res.status === 200) {
                    alert('MANUTENÇÃO ADICIONADA COM SUCESSO')
                    abrirModal2()
                } else if (res.status === 404) {
                    alert("ALGO DEU ERRADO, FAÇA LOGIN NOVAMENTE E VERIFIQUE AS SUAS PERMISSÕES PERMISSÕES")
                    alert("VERIFIQUE SE A FROTA DE ID " + dados.frotaId + " EXISTE")
                    abrirModal2()
                }
            })
            .then(response => console.log("A resposata foi: ", response))
            .catch(err => {
                if (err == 'Failed to fetch') {
                    alert('Falha nas informações, coloque números válidos')
                } else {
                    alert("Falha ao enviar")
                }
            });
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

//update

function abrirModal3(id) {
    let modalAparecer = document.querySelector(".editarInferior");
    modalAparecer.classList.add("modelModal3")
    var idEditar = id.parentNode.children[1].innerHTML.split(" ")[1];
    localStorage.setItem('id_frotas', JSON.stringify({ "id": idEditar }));
}


function editar() {
    var editDescricao = document.querySelector('#editDescricao');
    var editValor = document.querySelector('#editValor');

    const date = new Date();
    let ISO = date.toISOString();

    let id = JSON.parse(localStorage.getItem('id_frotas'));

    let dados = {
        id: Number(id.id),
        descricao: editDescricao.value,
        valor:Number(editValor.value),
        data_retorno: ISO,
    }

    if (dados.descricao && dados.data_retorno && dados.valor !== "" || null) {

        let token = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/manutencao/', options)
            .then(res => {
                if (res.status === 200) {
                    alert('MANUTENÇÃO ALTERADA COM SUCESSO')
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