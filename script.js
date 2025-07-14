const planner = document.getElementById('planner');
const hours = [
  '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
];

const currentHour = new Date().getHours();

function get24Hour(hourStr) {
  const [time, period] = hourStr.split(' ');
  let hour = parseInt(time);
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour;
}

hours.forEach((label, index) => {
  const hour24 = get24Hour(label);
  const timeBlock = document.createElement('div');
  timeBlock.className = 'time-block';

  const hourDiv = document.createElement('div');
  hourDiv.className = 'hour';
  hourDiv.textContent = label;

  const textarea = document.createElement('textarea');
  textarea.value = localStorage.getItem(label) || '';

  // Time coloring
  if (hour24 < currentHour) {
    textarea.classList.add('past');
  } else if (hour24 === currentHour) {
    textarea.classList.add('present');
  } else {
    textarea.classList.add('future');
  }

  const saveBtn = document.createElement('button');
  saveBtn.className = 'saveBtn';
  saveBtn.textContent = '💾';
  saveBtn.addEventListener('click', () => {
    localStorage.setItem(label, textarea.value);
  });

  timeBlock.appendChild(hourDiv);
  timeBlock.appendChild(textarea);
  timeBlock.appendChild(saveBtn);
  planner.appendChild(timeBlock);
});