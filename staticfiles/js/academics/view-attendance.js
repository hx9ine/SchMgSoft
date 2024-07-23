document.addEventListener('DOMContentLoaded', function () {
  const monthSelector = document.getElementById('month');
  const yearSelector = document.getElementById('year');

  // Set the selectors to the selected month and year
  monthSelector.value = '{{ selected_month }}';
  yearSelector.value = '{{ selected_year }}';
});
