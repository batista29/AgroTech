const urlServicos = 'http://localhost:3000/servicos';

const principalSuperior = document.querySelector('.read');
const listaRead = document.querySelector('.superior');
const listaServicos = document.querySelector('.readServicos');

function carregar() {
    const options = { method: 'GET' };

    fetch(urlServicos, options)
        .then(response => response.json())
        .then(res => {
            res.forEach(dados => {

                let tabela = listaRead.cloneNode(true)
                tabela.classList.remove("model")

                tabela.querySelector('#id').innerHTML = 'ID: ' + dados.id
                var dateSaida = new Date(dados.data_saida);
                let dataSaidaFormatada = dateSaida.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                var dateRetorno = new Date(dados.data_retorno);
                let dataRetornoFormatada = dateRetorno.toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                });

                tabela.querySelector('#data_saida').innerHTML = 'Data de saida: ' + dataSaidaFormatada
                if (dados.data_retorno == null) {
                    tabela.querySelector('#data_retorno').innerHTML = 'Data-retorno: Ainda em execução.'
                } else {
                    tabela.querySelector('#data_retorno').innerHTML = 'Data de retorno ' + dataRetornoFormatada
                }
                tabela.querySelector('#descricao').innerHTML = 'Descrição: ' + dados.descricao
                tabela.querySelector('#motoristaId').innerHTML = 'Motorista id: ' + dados.motoristaId

                principalSuperior.appendChild(tabela)
            });
        })
        .catch(err => console.error(err));
}

function adicionar() {

    var data_saida = document.querySelector('#submitData_saida');
    var data_retorno = document.querySelector('#submitData_retorno');
    var descricao = document.querySelector('#submitDescricao');
    var motoristaId = document.querySelector('#submitMotoristaId');
    var frotaId = document.querySelector('#submitFrotaId');

    var data_saidaSubmit = data_saida.value + "T00:00:00.000Z"

    console.log(data_retorno.value)

    if (data_retorno.value == null || undefined || "" || " ") {
        var data_retornoSubmit = null
    } else {
        var data_retornoSubmit = data_retorno.value + "T00:00:00.000Z"
    }

    let dados = {
        data_saida: data_saidaSubmit,
        data_retorno: data_retornoSubmit,
        descricao: descricao.value,
        motoristaId: Number(motoristaId.value),
        frotaId: Number(frotaId.value)
    }

    if (dados.data_saida && dados.descricao && dados.motoristaId && dados.frotaId !== "" || null) {
        
        let token = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/servicos', options)
            .then(res => {
                if (res.status === 200) {
                    alert('SERVIÇO ADICIONADA COM SUCESSO')
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
    modalAparecer.classList.add("modelModal3")
    var idEditar = id.parentNode.children[1].innerHTML.split(" ")[1]
    localStorage.setItem('idservico', JSON.stringify({ "id": idEditar }));
}


function editar() {
    var editDescricao = document.querySelector('#editDescricao');

    const date = new Date();
    let ISO = date.toISOString();

    let id = JSON.parse(localStorage.getItem('idservico'));

    let dados = {
        motoristaId: Number(id.id),
        data_retorno: ISO,
        descricao: editDescricao.value,
    }

    if (dados.descricao && dados.motoristaId && dados.data_retorno !== "" || null) {

        let token = JSON.parse(localStorage.getItem('user'));

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: token.token
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/servicos/', options)
            .then(res => {
                if (res.status === 200) {
                    alert('SERVIÇO ALTERADO COM SUCESSO')
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