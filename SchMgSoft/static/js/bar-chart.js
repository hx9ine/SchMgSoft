// Bar Chart
const barChart = document.getElementById('barChart');

// Create a linear gradient
var gradient = barChart.getContext('2d').createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#8bea98');
gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');

new Chart(barChart, {
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
        color: '#2bc542',
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
          color: '#2bc542',
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
