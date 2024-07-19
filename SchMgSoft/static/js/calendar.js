document.addEventListener('DOMContentLoaded', () => {
  const calendar = document.getElementById('calendar');
  const calendarHeader = document.getElementById('current-month-year');
  const prevYearBtn = document.getElementById('prev-year');
  const nextYearBtn = document.getElementById('next-year');
  const prevMonthBtn = document.getElementById('prev-month');
  const nextMonthBtn = document.getElementById('next-month');
  const popupForm = document.getElementById('popup-form');
  const selectedDateInput = document.getElementById('selected-date');
  const closeFormBtn = document.getElementById('close-form');

  let currentDate = new Date();

  function renderCalendar() {
    // Clear the existing table body
    const existingTbody = calendar.querySelector('tbody');
    if (existingTbody) {
      calendar.removeChild(existingTbody);
    }

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    calendarHeader.textContent = `${currentDate.toLocaleString('default', {
      month: 'long',
    })} ${year}`;

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

  prevYearBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() - 1);
    renderCalendar();
  });

  nextYearBtn.addEventListener('click', () => {
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    renderCalendar();
  });

  prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  closeFormBtn.addEventListener('click', () => {
    popupForm.classList.add('hidden');
  });

  renderCalendar();
});
