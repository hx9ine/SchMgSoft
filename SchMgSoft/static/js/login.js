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

// Light Mode || Dark Mode
const body = document.body;

let isSystemDefault = true;

const updateMode = (mode, isSystemDefault) => {
  body.classList.toggle('dark-mode', mode === 'dark-mode');
};

const toggleMode = (mode, isSystemDefault) => {
  if (mode === 'system-default') {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    mode = isDarkMode ? 'dark-mode' : 'light-mode';
  }
  updateMode(mode, isSystemDefault);
};

// Initial mode setup
const isDarkMode =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
toggleMode(isDarkMode ? 'dark-mode' : 'light-mode', true);
