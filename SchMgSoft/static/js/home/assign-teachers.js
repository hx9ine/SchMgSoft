document.addEventListener('DOMContentLoaded', function () {
  // Table
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
