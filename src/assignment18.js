const time = document.querySelector('#time');

const getClock = () => {
  const now = new Date();
  const eve = new Date('2022-12-24 00:00');

  let monthDiff = eve.getMonth() - now.getMonth();
  let dayDiff = eve.getDate() - now.getDate();
  let hourDiff = eve.getHours() - now.getHours();
  let minDiff = eve.getMinutes() - now.getMinutes();
  let secDiff = eve.getSeconds() - now.getSeconds();

  if (hourDiff < 0) {
    dayDiff = dayDiff - 1;
    hourDiff = hourDiff + 24;
  }
  if (minDiff < 0) {
    hourDiff = hourDiff - 1;
    minDiff = minDiff + 60;
  }
  if (secDiff < 0) {
    minDiff = minDiff - 1;
    secDiff = secDiff + 60;
  }

  dayDiff = String(monthDiff * 30 + dayDiff).padStart(2, '0');
  hourDiff = String(hourDiff).padStart(2, '0');
  minDiff = String(minDiff).padStart(2, '0');
  secDiff = String(secDiff).padStart(2, '0');

  time.innerText = `${dayDiff}d ${hourDiff}h ${minDiff}m ${secDiff}s`;
};

getClock();
setInterval(getClock, 1000);
