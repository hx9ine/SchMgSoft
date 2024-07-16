const addStudentFormBtn = document.getElementById('add-student-form-btn');
const modalContainer = document.querySelector('.modal-container');

addStudentFormBtn.addEventListener('click', () => {
  showModal();
});

// Show modal
const showModal = () => modalContainer.classList.add('active');
