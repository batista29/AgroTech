const urlUsuarios = 'http://localhost:3000/motorista';

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

    console.log(dados)

    if (dados.nome && dados.cnh && dados.cpf != "" || null || 0) {
        console.log("CERTO", dados)

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsIm5vbWUiOiJKQU8iLCJlbWFpbCI6Ijg5MEBnbWFpbC5jb20iLCJzZW5oYSI6IiQyYSQxMCQ0ckx4ZmdrVWxLb1hodnllSXdOc28uRGRRemZDV0dsc2dyQm96Vk9mWi5TaHhqekFHcGFuRyIsImNhcmdvIjoiR0VSRU5URSIsImlhdCI6MTY3ODE4OTAyMiwiZXhwIjoxNjc4MjI1MDIyfQ.JXTgSKifnmOAdthxN2AXrxDIVI8bYvGPsC-MylFkXV4'
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