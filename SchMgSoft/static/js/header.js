const profileIcon = document.getElementById('profile');
const profileModal = document.getElementById('profile-modal');

// Toggle the 'active' class when the profileIcon is clicked
profileIcon.addEventListener('click', e => {
  e.stopPropagation();
  profileModal.classList.toggle('active');
});

// Prevent clicks inside profileModal from propagating to the document
profileModal.addEventListener('click', e => {
  e.stopPropagation();
});

// Handle clicks on the document
document.addEventListener('click', e => {
  if (
    e.clientX < profileModal.getBoundingClientRect().left ||
    e.clientX > profileModal.getBoundingClientRect().right ||
    e.clientY < profileModal.getBoundingClientRect().top ||
    e.clientY > profileModal.getBoundingClientRect().bottom
  ) {
    profileModal.classList.remove('active');
  }
});
