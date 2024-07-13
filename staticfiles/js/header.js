const profileIcon = document.getElementById('profile');
const profileModal = document.getElementById('profile-modal');

profileIcon.addEventListener('click', () => {
  profileModal.classList.toggle('active');
});
