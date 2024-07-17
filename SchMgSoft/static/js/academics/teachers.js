document.addEventListener('DOMContentLoaded', function () {
    // Add Teacher Form Modal
    const addTeacherFormBtn = document.getElementById('add-teacher-form-btn');
    const modalContainer = document.querySelector('.modal-container');
  
    addTeacherFormBtn.addEventListener('click', () => {
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
  