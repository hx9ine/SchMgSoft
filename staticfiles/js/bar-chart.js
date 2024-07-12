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
        data: [12, 19, 13, 11, 12, 9],
        borderWidth: 0,
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
    },
    scales: {
      x: {
        display: true, // Hide the x-axis labels
        grid: {
          display: false,
        },
      },
      y: {
        display: false, // Hide the y-axis labels
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  },
});
