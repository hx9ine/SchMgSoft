document.addEventListener('DOMContentLoaded', function () {
  const calendar = document
    .getElementById('calendar')
    .getElementsByTagName('tbody')[0];
  const calendarContainer = document.getElementById('calendar-container');
  const yearSelector = document.getElementById('year-selector');
  const monthSelector = document.getElementById('month-selector');
  const fromDateBtn = document.getElementById('from-btn');
  const toDateBtn = document.getElementById('to-btn');
  const durationBtnSpan = document.querySelector('#duration span');
  const fromDateSpan = document.querySelector('#from-btn span');
  const toDateSpan = document.querySelector('#to-btn span');
  const fromDateInput = document.querySelector('#from-btn input');
  const toDateInput = document.querySelector('#to-btn input');
  const form = document.getElementById('leave-application-form');
  const messageDiv = document.getElementById('message');
  const hiddenMessageInput = document.getElementById('hidden-message');

  const today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();

  let startDate = null;
  let endDate = null;
  let selectingFor = null;

  // Populate year selector with a range of years
  for (let year = currentYear - 10; year <= currentYear + 10; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option);
  }

  yearSelector.value = currentYear;
  monthSelector.value = currentMonth;

  function renderCalendar(year, month) {
    calendar.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('tr');

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement('td');
        const cellSpan = document.createElement('span');
        cellSpan.classList.add('cell-span');

        if (i === 0 && j < firstDay) {
          cellSpan.textContent = '';
          cell.classList.add('empty-cell');
        } else if (date > daysInMonth) {
          cellSpan.textContent = '';
          cell.classList.add('empty-cell');
        } else {
          cellSpan.textContent = date;
          const cellDate = new Date(year, month, date);

          if (isSameDate(cellDate, startDate)) {
            cellSpan.classList.add('start-date');
          } else if (isSameDate(cellDate, endDate)) {
            cellSpan.classList.add('end-date');
          }

          cell.addEventListener('click', function () {
            selectDate(cellDate);
          });
          date++;
        }

        cell.appendChild(cellSpan);
        row.appendChild(cell);
      }

      calendar.appendChild(row);

      if (date > daysInMonth) {
        break;
      }
    }
  }

  function selectDate(date) {
    if (selectingFor === 'start') {
      startDate = date;
      endDate = null;
    } else if (selectingFor === 'end') {
      if (!startDate) {
        startDate = date;
      } else {
        endDate = date > startDate ? date : startDate;
        startDate = date < startDate ? date : startDate;
      }
    }
    updateSelectedRange();
    renderCalendar(currentYear, currentMonth);
    calendarContainer.style.display = 'none';
    selectingFor = null;
  }

  function updateSelectedRange() {
    if (startDate && endDate) {
      fromDateSpan.textContent = `${startDate.toDateString()}`;
      toDateSpan.textContent = `${endDate.toDateString()}`;
      fromDateInput.value = `${startDate.toISOString().split('T')[0]}`;
      toDateInput.value = `${endDate.toISOString().split('T')[0]}`;
      const duration =
        Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      durationBtnSpan.textContent = `${duration} days`;
    } else if (startDate) {
      fromDateSpan.textContent = `${startDate.toDateString()}`;
      fromDateInput.value = `${startDate.toISOString().split('T')[0]}`;
      toDateSpan.textContent = 'None';
      durationBtnSpan.textContent = `0 days`;
    } else {
      fromDateSpan.textContent = 'None';
      toDateSpan.textContent = 'None';
      durationBtnSpan.textContent = `0 days`;
    }
  }

  function isSameDate(date1, date2) {
    return (
      date1 &&
      date2 &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  fromDateBtn.addEventListener('click', function () {
    selectingFor = 'start';
    calendarContainer.style.display = 'block';
  });

  toDateBtn.addEventListener('click', function () {
    selectingFor = 'end';
    calendarContainer.style.display = 'block';
  });

  yearSelector.addEventListener('change', function () {
    currentYear = parseInt(this.value, 10);
    renderCalendar(currentYear, currentMonth);
  });

  monthSelector.addEventListener('change', function () {
    currentMonth = parseInt(this.value, 10);
    renderCalendar(currentYear, currentMonth);
  });

  renderCalendar(currentYear, currentMonth);

  // Form submission
  form.addEventListener('submit', event => {
    // Extract plain text from the contenteditable div
    hiddenMessageInput.value = messageDiv.innerText.trim();
  });
});
