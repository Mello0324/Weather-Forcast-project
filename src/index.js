function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let CityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElemet = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    CityElement.innerHTML = response.data.city;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`
    timeElement.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElemet.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
     
}
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
      let day = days[date.getday()];
    
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

    return `${day} ${hours}:${minutes}`;
  }

function searchCity (city) {
    let apiKey = "8db2acdt108befcaed4d3o9902ea6bf1";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
 event.preventDefault();
 let searchInput = document.querySelector("#search-form-input");
 

 searchCity(searchInput.value);
}
 
function displayForecast() {
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
    `
    <div class= "weather-forecast-day">
    <div class = "weather-forecast-date">${day}</div>
    <div class = "weather-forecast-icon">🌥</div>
    <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
     <strong>15°C</strong>
     </div>
     <div class="weather-forecast-temperature">8°C</div>
     </div>
     </div>
    `; 
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
  
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit)


displayForecast();