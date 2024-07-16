document.addEventListener('DOMContentLoaded', function () {
  // Add Student Form Modal
  const addStudentFormBtn = document.getElementById('add-student-form-btn');
  const modalContainer = document.querySelector('.modal-container');

  addStudentFormBtn.addEventListener('click', () => {
    showModal();
  });

  // Show modal
  const showModal = () => modalContainer.classList.add('active');

  // Students List Table
  const actionBtns = document.querySelectorAll('.action-btn');

  actionBtns.forEach(actionBtn => {
    const dialog = actionBtn.querySelector('.dialog');

    actionBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      dialog.classList.toggle('show');
    });

    document.addEventListener('click', function () {
      dialog.classList.remove('show');
    });

    dialog.addEventListener('click', function (event) {
      event.stopPropagation();
    });
  });

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
});
