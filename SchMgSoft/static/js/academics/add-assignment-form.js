const modalContainer = document.querySelector('.modal-container');
const modalHideBtn = document.getElementById('modal-hide-btn');
const form = document.getElementById('add-assignment-form');

modalHideBtn.addEventListener('click', () => {
  form.reset();
  modalContainer.classList.remove('active');
});
