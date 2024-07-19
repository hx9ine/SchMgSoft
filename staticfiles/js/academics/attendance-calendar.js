document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const calendarHeader = document.getElementById('current-month-year');
  const monthSelector = document.getElementById('month');
  const popupForm = document.getElementById('popup-form');
  const selectedDateInput = document.getElementById('selected-date');
  const closeFormBtn = document.getElementById('close-form-btn');

  let currentDate = new Date();

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Populate month selector
  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = month;
    monthSelector.appendChild(option);
  });

  // Set the selector to the current month
  monthSelector.value = currentDate.getMonth();

  function renderCalendar() {
    // Clear the existing table body
    const existingTbody = calendar.querySelector('tbody');
    if (existingTbody) {
      calendar.removeChild(existingTbody);
    }

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    calendarHeader.textContent = `${months[month]} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    let dayCounter = 1;
    let tbody = document.createElement('tbody');

    for (let i = 0; i < 6; i++) {
      let tr = document.createElement('tr');

      for (let j = 0; j < 7; j++) {
        let td = document.createElement('td');

        if (i === 0 && j < firstDayOfMonth) {
          td.classList.add('inactive');
        } else if (dayCounter > lastDateOfMonth) {
          td.classList.add('inactive');
        } else {
          td.textContent = dayCounter++;
          td.addEventListener('click', () => {
            popupForm.classList.remove('hidden');
            selectedDateInput.value = `${td.textContent}-${month + 1}-${year}`;
          });
        }
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    }
    calendar.appendChild(tbody);
  }

  // Update the calendar when the month selector changes
  monthSelector.addEventListener('change', () => {
    currentDate.setMonth(monthSelector.value);
    renderCalendar();
  });

  closeFormBtn.addEventListener('click', () => {
    popupForm.classList.add('hidden');
  });

  renderCalendar();
});
