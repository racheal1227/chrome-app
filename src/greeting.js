const login = document.querySelector('.login');
const loginForm = document.querySelector('.login__form');
const loginInput = document.querySelector('.login__form input');
const hello = document.querySelector('.hello span:nth-child(1)');
const clock = document.querySelector('.clock span:nth-child(1)');

/* localStorage에 유저가 저장되어 있는지 체크 */
const CheckUser = () => {
  if (!localStorage.getItem('username')) {
    login.classList.remove('d-none');
  } else {
    greeting();
  }
};

/* 시간에 따라 사용자에게 인사 */
const greeting = () => {
  const timesOfDay = ['morning', 'afternoon', 'evening', 'night'];
  const now = new Date();
  const nowHour = now.getHours();

  let timeIndex;
  if (nowHour >= 6 && nowHour < 12) {
    timeIndex = 0;
  } else if (nowHour >= 12 && nowHour < 18) {
    timeIndex = 1;
  } else if (nowHour >= 18 && nowHour < 26) {
    timeIndex = 2;
  } else {
    timeIndex = 3;
  }

  hello.innerText = `Good ${timesOfDay[timeIndex]}, ${localStorage.getItem('username')}!`;
};

/* localStorage에 username 저장 */
const handleLoginSubmit = event => {
  event.preventDefault();
  const username = loginInput.value;
  localStorage.setItem('username', username);
  login.classList.add('d-none');
  greeting();
};

/* 현재 시간 */
const handleClock = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');
  clock.innerText = `${hour}:${minute}:${second}`;
};

/* Add Event Listener */
loginForm.addEventListener('submit', handleLoginSubmit);

/* Running */
CheckUser();
handleClock();
setInterval(handleClock, 1000);
