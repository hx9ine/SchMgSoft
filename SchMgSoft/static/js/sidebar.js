const menus = document.querySelectorAll('.menu');

menus.forEach(menu => {
  const menuItem = menu.querySelector('.menu-item');
  const submenu = menu.querySelector('.submenu');
  const dropdown = menu.querySelector('.dropdown');
  menuItem.addEventListener('click', () => {
    // Collapse all submenus except the one inside the clicked menu
    menus.forEach(otherMenu => {
      const otherSubmenu = otherMenu.querySelector('.submenu');
      const otherDropdown = otherMenu.querySelector('.dropdown');
      if (otherSubmenu !== submenu) {
        otherSubmenu.style.maxHeight = null;
        otherDropdown.classList.remove('expand');
      }
    });

    // Toggle expand/collapse for the clicked menu
    if (submenu.style.maxHeight) {
      submenu.style.maxHeight = null;
      dropdown.classList.remove('expand');
    } else {
      submenu.style.maxHeight = submenu.scrollHeight + 'px';
      dropdown.classList.add('expand');
    }
  });
});

// Light Mode || Dark Mode
const body = document.body;
const lightModeIcon = document.querySelector('#light-mode');
const systemDefaultModeIcon = document.querySelector('#system-default-mode');
const darkModeIcon = document.querySelector('#dark-mode');

let isSystemDefault = true;

const updateMode = (mode, isSystemDefault) => {
  body.classList.toggle('dark-mode', mode === 'dark-mode');
  lightModeIcon.classList.toggle(
    'active',
    mode === 'light-mode' && !isSystemDefault
  );
  darkModeIcon.classList.toggle(
    'active',
    mode === 'dark-mode' && !isSystemDefault
  );
  systemDefaultModeIcon.classList.toggle(
    'active',
    mode === 'system-default' || isSystemDefault
  );
  updateLineChartGradient();
  updateBarChartGradient(); // Update the chart gradient when mode changes
};

const toggleMode = (mode, isSystemDefault) => {
  if (mode === 'system-default') {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    mode = isDarkMode ? 'dark-mode' : 'light-mode';
  }
  localStorage.setItem('theme', mode); // Save the user's preference
  updateMode(mode, isSystemDefault);
};

lightModeIcon.addEventListener('click', () => toggleMode('light-mode', false));
systemDefaultModeIcon.addEventListener('click', () => {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  isSystemDefault = true;
  toggleMode(isDarkMode ? 'dark-mode' : 'light-mode', isSystemDefault);
});
darkModeIcon.addEventListener('click', () => toggleMode('dark-mode', false));

// Initial mode setup
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  toggleMode(savedTheme, false);
} else {
  const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  toggleMode(isDarkMode ? 'dark-mode' : 'light-mode', true);
}
