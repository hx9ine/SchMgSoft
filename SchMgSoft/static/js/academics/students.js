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
});
