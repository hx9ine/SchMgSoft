document.addEventListener('DOMContentLoaded', function () {
  const date = new Date();

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const todayDate = date.getDate();
  const todayDay = date.getDay();

  const isLeapYear = year => {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  };

  const getFebDays = year => {
    return isLeapYear(year) ? 29 : 28;
  };

  const daysOfMonth = [
    31,
    getFebDays(currentYear),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  const monthNames = [
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

  const calendarMonth = document.querySelector('#month');
  const calendarYear = document.querySelector('#year');
  const datesContainer = document.querySelector('#dates');

  calendarMonth.innerHTML = monthNames[currentMonth];
  calendarYear.innerHTML = currentYear;

  const firstDayOfWeek = todayDate - todayDay;
  const lastDayOfWeek = firstDayOfWeek + 6;

  for (let i = firstDayOfWeek; i <= lastDayOfWeek; i++) {
    const dateElement = document.createElement('div');
    dateElement.className = 'date';

    const dateWrapper = document.createElement('div');
    dateWrapper.className = 'date-wrapper';

    const dateText = document.createElement('p');

    if (i > 0 && i <= daysOfMonth[currentMonth]) {
      dateText.textContent = i;
      if (i === todayDate) {
        dateWrapper.classList.add('today');
      }
    } else {
      dateText.textContent = '';
    }

    dateWrapper.appendChild(dateText);
    dateElement.appendChild(dateWrapper);
    datesContainer.appendChild(dateElement);
  }
});
