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
  .catch(error => console.error('Erro ao carregar dados:', error));
