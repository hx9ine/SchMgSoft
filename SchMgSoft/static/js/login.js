const passwordViewToggler = document.getElementById('password-view-toggler');

passwordViewToggler.addEventListener('click', togglePasswordView);

function togglePasswordView() {
  const password = document.getElementById('password');
  passwordViewToggler.classList.toggle('show');
  if (password.type === 'password') {
    password.type = 'text';
    password.textContent = 'Hide';
  } else {
    password.type = 'password';
    password.textContent = 'Show';
  }
}
