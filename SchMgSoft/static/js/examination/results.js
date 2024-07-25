document.addEventListener('DOMContentLoaded', function () {
  const sessionFilter = document.getElementById('session');
  const classFilter = document.getElementById('class');
  const tableBody = document.getElementById('results-table-body');

  function filterStudents() {
    const sessionValue = sessionFilter.value;
    const classValue = classFilter.value;
    const rows = tableBody.getElementsByTagName('tr');

    for (let row of rows) {
      const rowSession = row.getAttribute('data-session');
      const rowClass = row.getAttribute('data-class');

      if (
        (sessionValue === rowSession || sessionValue === '') &&
        (classValue === rowClass || classValue === '')
      ) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  }

  sessionFilter.addEventListener('change', filterStudents);
  classFilter.addEventListener('change', filterStudents);

  // Initialize the table with default filter values
  filterStudents();
});
