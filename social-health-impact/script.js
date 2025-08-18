// Exemplo: dados simulados de ansiedade vs. tempo de tela
const data = [
  { screenTime: 2, anxietyLevel: 3 },
  { screenTime: 4, anxietyLevel: 5 },
  { screenTime: 6, anxietyLevel: 7 },
  { screenTime: 8, anxietyLevel: 9 }
];

const trace = {
  x: data.map(d => d.screenTime),
  y: data.map(d => d.anxietyLevel),
  mode: 'markers+lines',
  type: 'scatter',
  marker: { color: 'blue' },
  name: 'Anxiety vs. Screen Time'
};

const layout = {
  title: 'Anxiety Level vs. Screen Time',
  xaxis: { title: 'Screen Time (hours/day)' },
  yaxis: { title: 'Anxiety Level (scale 1–10)' }
};

Plotly.newPlot('chart', [trace], layout);
