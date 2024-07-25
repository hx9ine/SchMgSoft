document.addEventListener('DOMContentLoaded', function () {
  const confirmationDialog = document.getElementById('confirmation');
  const confirmationCloseBtn = document.getElementById('close-btn'); // Use getElementById instead of querySelector

  if (confirmationCloseBtn) {
    confirmationCloseBtn.addEventListener('click', () => {
      confirmationDialog.classList.remove('show');
    });
  }
});
