function displayTemp(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let weahterDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  weahterDescription.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = response.data.wind.speed;
}
let apiKey = "810af8c18eeb9te5oaa24fe22fec331a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=paris&key=${apiKey}`;

axios.get(apiUrl).then(displayTemp);
