function carregar() {

  const options1 = { method: 'GET' };
  fetch('http://localhost:3000/servicos', options1)
    .then(response => response.json())
    .then(res => {
      const dados = []; // array para armazenar os dados de cada serviço

      res.forEach(servico => {
        const dataRetornoNull = servico.data_retorno === null ? 1 : 0;
        const dataRetornoNotNull = servico.data_retorno !== null ? 1 : 0;
        dados.push({ dataRetornoNull, dataRetornoNotNull }); // adicionar os dados ao array
      });

      // somar os dados de todos os serviços
      const totalDataRetornoNull = dados.reduce((acc, cur) => acc + cur.dataRetornoNull, 0);
      const totalDataRetornoNotNull = dados.reduce((acc, cur) => acc + cur.dataRetornoNotNull, 0);

      // calcular as porcentagens
      const total = totalDataRetornoNull + totalDataRetornoNotNull;
      const porcentagemDataRetornoNull = ((totalDataRetornoNull / total) * 100).toFixed(2);
      const porcentagemDataRetornoNotNull = ((totalDataRetornoNotNull / total) * 100).toFixed(2);

      // criar o gráfico de pizza
      const optionsChart = {
        responsive: true,
      };

      const config = {
        type: 'pie',
        data: {
          labels: ['Serviço em andamento (%)', 'Serviço concluido (%)'],
          datasets: [{
            data: [porcentagemDataRetornoNull, porcentagemDataRetornoNotNull],
            backgroundColor: ['#006400', '#90ee90'],
            hoverBackgroundColor: ['#006400', '#90ee90'],
            borderColor: ['black'],
          }]
        },
        optionsChart: optionsChart
      };

      const myChart1 = new Chart(
        document.getElementById('myChart1'),
        config
      );
    })

  //manutencao
  const options2 = { method: 'GET' };
  fetch('http://localhost:3000/manutencao', options2)
    .then(response => response.json())
    .then(res => {
      const dados = []; // array para armazenar os dados de cada manutenção

      res.forEach(servico => {
        const dataFimNull = servico.data_fim === null ? 1 : 0;
        const dataFimNotNull = servico.data_fim !== null ? 1 : 0;
        dados.push({ dataFimNull, dataFimNotNull }); // adicionar os dados ao array
      });

      // somar os dados de todos os serviços
      const totalDataFimNull = dados.reduce((acc, cur) => acc + cur.dataFimNull, 0);
      const totalDataFimNotNull = dados.reduce((acc, cur) => acc + cur.dataFimNotNull, 0);

      // calcular as porcentagens
      const total = totalDataFimNull + totalDataFimNotNull;
      const porcentagemDataFimNull = ((totalDataFimNull / total) * 100).toFixed(2);
      const porcentagemDataFimNotNull = ((totalDataFimNotNull / total) * 100).toFixed(2);

      // criar o gráfico de pizza
      const optionsChart2 = {
        responsive: true
      };

      const config = {
        type: 'pie',
        data: {
          labels: ['Manutenções em andamento (%)', 'Manutenções concluidas (%)'],
          datasets: [{
            data: [porcentagemDataFimNull, porcentagemDataFimNotNull],
            backgroundColor: ['#00008b', '#add8e6'],
            hoverBackgroundColor: ['#00008b', '#add8e6'],
            borderColor: ['black']
          }]
        },
        optionsChart2: optionsChart2
      };

      const myChart2 = new Chart(
        document.getElementById('myChart2'),
        config
      );
    })

  const optionsServicos = { method: 'GET' };

  const principalSuperior = document.querySelector('.readServicosMain');
  const listaRead = document.querySelector('.superior');
  const listaServicos = document.querySelector('.readServicos');

  fetch("http://localhost:3000/servicos", optionsServicos)
    .then(response => response.json())
    .then(res => {
      res.forEach(dados => {

        console.log(dados)
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

  const principalSuperiorManutencoes = document.querySelector('.readManutencoesMain');
  const listaReadManutencoes = document.querySelector('.superiorManutencoes');
  const listaManutencoes = document.querySelector('.readManutencoes');

  const optionsManutencao = { method: 'GET' };

  fetch("http://localhost:3000/manutencao", optionsManutencao)
    .then(response => response.json())
    .then(res => {
      res.forEach(dados2 => {
        console.log(dados2)

        let tabela = listaReadManutencoes.cloneNode(true)
        tabela.classList.remove("model2")
        tabela.querySelector('#idManutencao').innerHTML = 'ID: ' + dados2.id
        tabela.querySelector('#descricaoManutencao').innerHTML = 'Descrição: ' + dados2.descricao
        tabela.querySelector('#valor').innerHTML = 'Valor: ' + dados2.valor

        var dateInicio = new Date(dados2.data_inicio);
        let dataInicioFormatada = dateInicio.toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        });

        var dateFim = new Date(dados2.data_fim);
        let dataFimFormatada = dateFim.toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        });

        tabela.querySelector('#data-inicio').innerHTML = 'Data-inicio: ' + dataInicioFormatada
        if (dados2.data_fim == null) {
          tabela.querySelector('#data-fim').innerHTML = 'Data- fim: Ainda em execução.'
        } else {
          tabela.querySelector('#data-fim').innerHTML = 'Data-fim: ' + dataFimFormatada
        }
        principalSuperiorManutencoes.appendChild(tabela)
      });
    })
}