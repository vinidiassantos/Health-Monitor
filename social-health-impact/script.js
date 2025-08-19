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

// 🔹 Gráfico 2 — Indicadores de Saúde Pública por Estado
fetch('/api/indicadores')
  .then(response => response.json())
  .then(data => {
    const estados = data.map(item => item.estado);
    const investimento = data.map(item => item.investimento_milhoes);
    const natalidade = data.map(item => item.natalidade);
    const mortalidade = data.map(item => item.mortalidade);
    const cobertura = data.map(item => item.cobertura_sus);

    const ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
      type: 'radar',
      data: {
        labels: estados,
        datasets: [
          {
            label: 'Investimento em Saúde (R$ milhões)',
            data: investimento,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Natalidade (por mil hab.)',
            data: natalidade,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Mortalidade (por mil hab.)',
            data: mortalidade,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          },
          {
            label: 'Cobertura SUS (%)',
            data: cobertura,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error('Erro ao carregar indicadores de saúde:', error));
