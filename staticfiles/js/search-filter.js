// Search Filter Table
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('keyup', function () {
  const filter = this.value.toLowerCase();
  const table = document.getElementById('student-table');
  const rows = table.getElementsByTagName('tr');

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    let rowVisible = false;

    for (let j = 0; j < cells.length; j++) {
      if (cells[j]) {
        const cellValue = cells[j].textContent || cells[j].innerText;
        if (cellValue.toLowerCase().includes(filter)) {
          rowVisible = true;
          break;
        }
      }
    }

    rows[i].style.display = rowVisible ? '' : 'none';
  }
});