let now = new Date();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let time = hour + ":" + minutes;

document.querySelector("#time").innerHTML = time;

document.querySelector(".current-day").innerHTML = day;

function showCity(event) {
  event.preventDefault();
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = hour + ":" + minutes;
  document.querySelector("#time").innerHTML = time;

  let city = document.querySelector("#search-input").value;
  document.querySelector("h1").innerHTML = city;

  function displayWeather(response) {
    document.querySelector(".current-temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    document.getElementById("celsius").style.fontSize = "1.5em";
    document.getElementById("fahrenheit").style.fontSize = "1em";

    function showFahrenheit(event) {
      event.preventDefault();
      document.querySelector(".current-temperature").innerHTML = Math.round(
        (response.data.main.temp * 9) / 5 + 32
      );
      document.getElementById("celsius").style.fontSize = "1em";
      document.getElementById("fahrenheit").style.fontSize = "1.5em";
    }
    document
      .querySelector(".fahrenheit")
      .addEventListener("click", showFahrenheit);

    function showCelsius(event) {
      event.preventDefault();
      document.querySelector(".current-temperature").innerHTML = Math.round(
        response.data.main.temp
      );
      document.getElementById("celsius").style.fontSize = "1.5em";
      document.getElementById("fahrenheit").style.fontSize = "1em";
    }
    document.querySelector(".celsius").addEventListener("click", showCelsius);
  }

  let apiKey = "c30b70227281106a3ea7b3125756ea7f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}
let search = document.querySelector("form");
search.addEventListener("submit", showCity);

function showCurrentLocation(event) {
  event.preventDefault();
  function showPosition(position) {
    let apiKey = "c30b70227281106a3ea7b3125756ea7f";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayLocation);
  }

  navigator.geolocation.getCurrentPosition(showPosition);

  function displayLocation(response) {
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector(".current-temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    document.getElementById("celsius").style.fontSize = "1.5em";
    document.getElementById("fahrenheit").style.fontSize = "1em";

    function showFahrenheit(event) {
      event.preventDefault();
      document.querySelector(".current-temperature").innerHTML = Math.round(
        (response.data.main.temp * 9) / 5 + 32
      );
      document.getElementById("celsius").style.fontSize = "1em";
      document.getElementById("fahrenheit").style.fontSize = "1.5em";
    }
    document
      .querySelector(".fahrenheit")
      .addEventListener("click", showFahrenheit);

    function showCelsius(event) {
      event.preventDefault();
      document.querySelector(".current-temperature").innerHTML = Math.round(
        response.data.main.temp
      );
      document.getElementById("celsius").style.fontSize = "1.5em";
      document.getElementById("fahrenheit").style.fontSize = "1em";
    }
    document.querySelector(".celsius").addEventListener("click", showCelsius);
  }
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", showCurrentLocation);
