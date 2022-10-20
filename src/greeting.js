const welcome = document.querySelector('.welcome');
const login = document.querySelector('.login');
const loginForm = document.querySelector('.login__form');
const loginInput = document.querySelector('.login__form input');
const hello = document.querySelector('.hello');
const helloUser = document.querySelector('.hello__user');
const helloEdit = document.querySelector('.hello__edit');
const clock = document.querySelector('.clock span:nth-child(1)');

/* localStorage에 유저가 저장되어 있는지 체크 */
const CheckUser = () => {
  if (!localStorage.getItem('username')) {
    login.classList.remove('d-none');
    welcome.classList.add('d-none');
  } else {
    greeting();
  }
};

/* 시간에 따라 사용자에게 인사 */
const greeting = () => {
  const timesOfDay = ['좋은 아침이에요', '좋은 하루 되세요', '좋은 저녁입니다', '좋은 꿈 꾸세요'];
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

  helloUser.innerText = `${localStorage.getItem('username')}님, ${timesOfDay[timeIndex]}`;
};

/* localStorage에 username 저장 */
const handleLoginSubmit = () => {
  const username = loginInput.value;
  localStorage.setItem('username', username);
  login.classList.add('d-none');
  welcome.classList.remove('d-none');
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

/* 이름 수정 */
const handleEdit = event => {
  event.preventDefault();
  loginInput.value = localStorage.getItem('username');
  localStorage.removeItem('username');
  welcome.classList.add('d-none');
  login.classList.remove('d-none');
  loginInput.focus();
};

/* Add Event Listener */
loginForm.addEventListener('submit', handleLoginSubmit);
helloEdit.addEventListener('click', handleEdit);
hello.addEventListener('mouseover', () => {
  helloEdit.classList.remove('v-hidden');
});
hello.addEventListener('mouseleave', () => {
  helloEdit.classList.add('v-hidden');
});

/* Running */
CheckUser();
handleClock();
setInterval(handleClock, 1000);
