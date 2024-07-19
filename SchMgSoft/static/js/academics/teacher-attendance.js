const listViewBtn = document.getElementById('list-view-btn');
const cardViewBtn = document.getElementById('card-view-btn');

const attendanceCardContainer = document.getElementById(
  'attendance-card-container'
);

const tableContainer = document.getElementById('table-container');

listViewBtn.addEventListener('click', () => {
  cardViewBtn.classList.remove('active');
  listViewBtn.classList.add('active');
  attendanceCardContainer.classList.toggle('hide');
  tableContainer.classList.toggle('show');
});

cardViewBtn.addEventListener('click', () => {
  cardViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
  attendanceCardContainer.classList.toggle('hide');
  tableContainer.classList.toggle('show');
});
