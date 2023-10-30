function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayTemp(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#city");
  let weahterDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  weahterDescription.innerHTML = response.data.condition.description;
  windSpeed.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.time)}</div>

              <img class="forecast-icon" src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png" alt="paynj" />
              <div class="forecast-temp">
                <span class="forecast-temp-max"> ${Math.round(
                  forecastDay.temperature.maximum
                )}° </span>
                <span class="forecast-temp-min"> ${Math.round(
                  forecastDay.temperature.minimum
                )}° </span>
              </div>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function search(city) {
  let apiKey = "810af8c18eeb9te5oaa24fe22fec331a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  let apiUrlF = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
  axios.get(apiUrlF).then(displayForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
search("milan");
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
