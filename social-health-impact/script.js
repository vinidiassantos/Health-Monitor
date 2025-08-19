// 🔹 Alternância entre gráficos
function mostrarGrafico(tipo) {
  document.getElementById('chart').style.display = tipo === 'ibge' ? 'block' : 'none';
  document.getElementById('chart2').style.display = tipo === 'indicadores' ? 'block' : 'none';
}

// 🔹 Exportar gráfico como imagem
function exportarGrafico() {
  const canvas = document.querySelector('canvas[style*="block"]');
  const link = document.createElement('a');
  link.download = 'grafico.png';
  link.href = canvas.toDataURL();
  link.click();
}

// 🔹 Gráfico 1 — Código IBGE por Estado
fetch('/api/estados')
  .then(response => response.json())
  .then(data => {
    const estados = data.map(item => item.nome);
    const codigos = data.map(item => item.id);

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: estados,
        datasets: [{
          label: 'Código IBGE por Estado',
          data: codigos,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error('Erro ao carregar dados IBGE:', error));

// 🔹 Gráfico 2 — Indicadores de Saúde Pública
fetch('/api/indicadores')
  .then(response => response.json())
  .then(data => {
    const estados = data.map(item => item.estado);
    const investimento = data.map(item => item.investimento_milhoes);
    const natalidade = data.map(item => item.natalidade);
    const mortalidade = data.map(item => item.mortalidade);
    const cobertura = data.map(item => item.cobertura_sus);

    // Preenche o dropdown de estados
    const select = document.getElementById('estadoSelect');
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.estado;
      option.textContent = item.estado;
      select.appendChild(option);
    });

    // Atualiza o gráfico com base no filtro
    select.addEventListener('change', () => {
      const estadoSelecionado = select.value;
      const filtrado = estadoSelecionado === 'todos'
        ? data
        : data.filter(item => item.estado === estadoSelecionado);

      atualizarGraficoIndicadores(filtrado);
    });

    // Cria o gráfico inicial com todos os dados
    atualizarGraficoIndicadores(data);
  })
  .catch(error => console.error('Erro ao carregar indicadores de saúde:', error));

// 🔹 Função para atualizar gráfico de indicadores
function atualizarGraficoIndicadores(data) {
  const estados = data.map(item => item.estado);
  const investimento = data.map(item => item.investimento_milhoes);
  const natalidade = data.map(item => item.natalidade);
  const mortalidade = data.map(item => item.mortalidade);
  const cobertura = data.map(item => item.cobertura_sus);

  const ctx2 = document.getElementById('chart2').getContext('2d');

  // Destroi gráfico anterior se existir
  if (window.indicadoresChart) {
    window.indicadoresChart.destroy();
  }

  window.indicadoresChart = new Chart(ctx2, {
    type: 'radar',
    data: {
      labels: estados,
