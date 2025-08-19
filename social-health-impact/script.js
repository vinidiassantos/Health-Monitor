fetch('/api/dados')
  .then(response => response.json())
  .then(data => {
    const estados = data.map(item => item.uf);
    const natalidade = data.map(item => item.natalidade_total); // ajuste conforme o nome da coluna

    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: estados,
        datasets: [{
          label: 'Natalidade',
          data: natalidade,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
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
  .catch(error => console.error('Erro ao carregar dados:', error));
