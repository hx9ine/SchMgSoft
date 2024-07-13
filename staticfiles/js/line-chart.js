// Line Chart
const lineChart = document.getElementById('lineChart');

// Create a linear gradient
var gradient = lineChart.getContext('2d').createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#8bea98');
gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');

new Chart(lineChart, {
  type: 'line',
  data: {
    labels: [
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
    ],
    datasets: [
      {
        label: 'Total Students',
        data: [2, 3, 5, 3, 6, 4, 5, 2, 4, 7],
        borderWidth: 2,
        borderColor: '#2bc542',
        tension: 0,
        fill: true,
        backgroundColor: gradient,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        color: '#2bc542',
        align: 'top',
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: '#2bc542',
        },
      },
      y: {
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  },
  plugins: [ChartDataLabels],
});
