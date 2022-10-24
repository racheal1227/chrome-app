const API_KEY = '44a8b066cdfaa0baa166d00702558d50';

const city = document.querySelector('.weather span:nth-child(1)');
const weather = document.querySelector('.weather span:nth-child(2)');

const onGeoOk = position => {
  console.log('🚀 ~ file: weather.js ~ line 4 ~ onGeoOk ~ position', position);
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main} ${Math.floor(data.main.temp)}℃`;
    });
};
const onGeoError = message => {
  city.innerText = '날씨고장🌀';
  console.error(message);
};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
