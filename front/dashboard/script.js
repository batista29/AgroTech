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

}