const AIP_KEY = '';

const onGeoOk = position => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  const url = '';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weather = document.querySelector('.weather span:first-child');
      const city = document.querySelector('.weather span:last-child');
      city.innerText = data.name;
      weather.innerText = data.weather[0].main; // description
    });
};
const onGeoError = () => {};

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
