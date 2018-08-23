const API_KEY = "91e263778af92361ac356d09d927d749";

function handleFormSubmit(event) {
  //handle submit event
  event.preventDefault();
  let city = $(`#city`).val();
  fetchCurrentWeather(city);
  fetchFiveDayForecast(city);
  fetchCreateChart(city);
  }

function fetchCurrentWeather(city) {
  //fetch current weather based on city
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(displayCurrentWeather);
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  let temp = json.main.temp + "°";
  let tempRow = document.getElementById('temp');
  tempRow.innerHTML = temp;
  
  let temp_min = json.main.temp_min + "°";
  let temp_minRow = document.getElementById("low");
  temp_minRow.innerHTML = temp_min;
  
  let temp_max = json.main.temp_max + "°";
  let temp_maxRow = document.getElementById("high");
  temp_maxRow.innerHTML = temp_max;
  
  let temp_humidity = json.main.humidity + "%";
  let temp_humidityRow = document.getElementById("humidity");
  temp_humidityRow.innerHTML = temp_humidity;
  
  let temp_clouds = json.clouds.all;
  let temp_cloudsRow = document.getElementById("cloudCover");
  temp_cloudsRow.innerHTML = temp_clouds;
  
  }

function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(displayFiveDayForecast);
}

function displayFiveDayForecast(forcastJson) {
  //render five day forecast data to the DOM using provided IDs and json from API
   forcastJson.list.forEach(function(dateTime) {
      $(`#fiveDayDateTime`).append(`<div>${dateTime.dt_txt}, ${dateTime.main.humidity}, ${dateTime.main.temp}</div>`);
    });
}

function fetchCreateChart(city) {
    fetch (`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=imperial`)
    .then(res => res.json())
    .then(createChart);
}

function createChart(forcastJson) {
  const labels = forcastJson.list.map(function(e){
    return e.dt_txt;
  });
  const data = forcastJson.list.map(function(e){
    return e.main.temp;
  });
  var ctx = document.getElementById('WeatherChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: labels,
        datasets: [{
            label: "5-Day Forcast (Temp)",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data,
        }]
    },

    // Configuration options go here
    options: {}
});
}

document.addEventListener('DOMContentLoaded', function() {
  $("form").on("submit", handleFormSubmit);
});
