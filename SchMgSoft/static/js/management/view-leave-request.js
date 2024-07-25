document.addEventListener('DOMContentLoaded', function () {
  const confirmationDialog = document.getElementById('confirmation');
  const confirmationCloseBtn = document.getElementById('close-btn');
  const proceedButton = confirmationDialog.querySelector('.primary');

  let currentForm = null;

  document.getElementById('decline-button').addEventListener('click', () => {
    currentForm = document.getElementById('decline-form');
    confirmationDialog.classList.add('show');
  });

  document.getElementById('approve-button').addEventListener('click', () => {
    currentForm = document.getElementById('approve-form');
    confirmationDialog.classList.add('show');
  });

  if (confirmationCloseBtn) {
    confirmationCloseBtn.addEventListener('click', () => {
      confirmationDialog.classList.remove('show');
      currentForm = null;
    });
  }

  if (proceedButton) {
    proceedButton.addEventListener('click', () => {
      if (currentForm) {
        currentForm.submit();
      }
    });
  }
});
