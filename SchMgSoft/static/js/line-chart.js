// Line Chart
const lineChart = document.getElementById('lineChart');
let myLineChart;

// Create Gradient based on light & dark mode
const createLineChartGradient = () => {
  const ctx = lineChart.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  if (document.body.classList.contains('dark-mode')) {
    gradient.addColorStop(0, '#ada6ff');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
  } else {
    gradient.addColorStop(0, '#ada6ff');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
  }
  return gradient;
};

// Create the chart
const createLineChart = () => {
  const gradient = createLineChartGradient();
  myLineChart = new Chart(lineChart, {
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
          borderColor: '#7063ff',
          tension: 0.3,
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
          color: '#7063ff',
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
            color: '#7063ff',
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
};

const updateLineChartGradient = () => {
  const gradient = createLineChartGradient();
  myLineChart.data.datasets[0].backgroundColor = gradient;
  myLineChart.update();
};

// Initialize the chart
document.addEventListener('DOMContentLoaded', createLineChart);
