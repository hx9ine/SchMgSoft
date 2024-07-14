// Bar Chart
const barChart = document.getElementById('barChart');
let myBarChart;

// Create Gradient based on light & dark mode
const createBarChartGradient = () => {
  const ctx = barChart.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  if (document.body.classList.contains('dark-mode')) {
    gradient.addColorStop(0, '#ffd791');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
  } else {
    gradient.addColorStop(0, '#ffd791');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
  }
  return gradient;
};

// Create the chart
const createBarChart = () => {
  const gradient = createBarChartGradient();
  myBarChart = new Chart(barChart, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'No. of Students',
          data: [12, 19, 13, 11, 17, 9],
          borderWidth: 0,
          fill: true,
          backgroundColor: gradient,
          borderRadius: 7, // Apply a uniform border radius to all corners
          borderSkipped: 'bottom', // Skip the bottom border to create a rounded top effect
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
          color: '#d48600',
          align: 'bottom',
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
            color: '#d48600',
          },
        },
        y: {
          display: false,
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  });
};

const updateBarChartGradient = () => {
  const gradient = createBarChartGradient();
  myBarChart.data.datasets[0].backgroundColor = gradient;
  myBarChart.update();
};

// Initialize the chart
document.addEventListener('DOMContentLoaded', createBarChart);
