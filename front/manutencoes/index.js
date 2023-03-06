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
                    tabela.querySelector('#data-fim').innerHTML = 'Ainda em execução.'
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

    console.log(dados)

    if (dados.descricao && dados.valor && dados.data_inicio && dados.data_fim && dados.frotaId !== "" || null) {
        console.log("CERTO", dados)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5vbWUiOiJKQU8iLCJlbWFpbCI6Ijg5MEBnbWFpbC5jb20iLCJzZW5oYSI6IiQyYSQxMCQ0ckx4ZmdrVWxLb1hodnllSXdOc28uRGRRemZDV0dsc2dyQm96Vk9mWi5TaHhqekFHcGFuRyIsImNhcmdvIjoiR0VSRU5URSIsImlhdCI6MTY3ODEwNjkxNywiZXhwIjoxNjc4MTQyOTE3fQ.5u6jxo-HsQY_TwET4o6TY1J_2zRUkZkUO3uoke7UIQ8'
            },
            body: JSON.stringify(dados)
        };

        fetch('http://localhost:3000/manutencao', options)
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