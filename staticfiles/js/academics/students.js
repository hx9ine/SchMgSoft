const addStudentFormBtn = document.getElementById('add-student-form-btn');
const modalContainer = document.querySelector('.modal-container');

addStudentFormBtn.addEventListener('click', () => {
  modalContainer.classList.add('active');
});
