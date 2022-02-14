// API key for Openweather
var weatherAPIkey = "840819e30adace1a99c607cc7e47419d";

// originally for to hold the value of the user input but seems to cause issues if removed so it is currently has no usage
var locationEl = document.getElementById("city-input");

// variable for the submit button
var submitBtn = document.getElementById("search-btn");

// variable to append the current/main weather card
var mainCardEl = document.getElementById("main-weather");

// variable to append forecast cards
var weatherBoxSmallEl = document.getElementById("weather-box-small");

// variable to append search history
var searchHistory = document.getElementById("search-history");

// variable for the previous search history button
var prevBtn = document.getElementById("prev-btn");

// function to set the key and value pair for local storage
function searchHistorySet(location) {
  location = document.getElementById("city-input").value;

  localStorage.setItem("prev-city", location);
}

// function that retreives data from the local storage using the prev-city as the key
function searchHistoryGet() {
  return localStorage.getItem("prev-city");
}

// function that appends local storage data to the page
// if statement is in place to make sure a blank button is not appened to the page if no data is stored
function searchHistoryAppend() {
  prevSearch = searchHistoryGet();

  if (prevSearch !== null) {
    prevBtn = document.createElement("button");
    prevBtn.removeAttribute("class", "hide");
    prevBtn.setAttribute(
      "class",
      "p-2 mb-2 btn btn-secondary btn-outline-dark text-light"
    );

    // sets the text of the button to the name of the previously searched location
    prevBtn.textContent = prevSearch;

    searchHistory.append(prevBtn);

    // return
  } else {
    console.log("Nothing searched");
  }

  // event listener is nested as prevBtn is not a global variable and causes errors if not data is in local storage
  prevBtn.addEventListener("click", function () {
    var prevSearchLocation = localStorage.getItem("prev-city");

    console.log(prevSearchLocation);

    prevSearchCity(location);
  });
}

// function call to append any previous searches to the page
searchHistoryAppend();

// function that runs the Openweather API using the previous search location
function prevSearchCity(prevSearchLocation) {
  // to find city to search
  var prevSearchLocation = localStorage.getItem("prev-city");

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${prevSearchLocation}&units=metric&appid=${weatherAPIkey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weather data: ", data);

      let lat = data.coord.lat;

      let lon = data.coord.lon;

      getDailyForecast(lat, lon);
      getCurrentForecast(lat, lon);
      searchHistorySet(location);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// function that takes user input to get the city searched location data
// this is then parsed to the onecall API to retrieve the data
function getCity(location) {
  // to find city to search
  location = document.getElementById("city-input").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${weatherAPIkey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("weather data: ", data);

      let lat = data.coord.lat;

      let lon = data.coord.lon;

      getDailyForecast(lat, lon);
      getCurrentForecast(lat, lon);
      searchHistorySet(location);
      searchHistoryAppend(location);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// using the lat and lon data from the first city search the data is then fetched and appened to the page
function getCurrentForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${weatherAPIkey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Current data: ", data);

      mainCardEl.innerHTML = "";
      let currentData = data.current;
      createMainCard(currentData);
    });
}

// creating main card
function createMainCard(currentData) {
  var mainIcon = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
  var mainIconDes = currentData.weather[0].description;
//   the time pulled from the API is in unix format but it is converted here by setting a new date, multiplying it by 1000 and using the toDateString method
  var mainTime = new Date(currentData.dt * 1000);
  var mainTimeConv = mainTime.toDateString();
  var mainTempData = currentData.temp;
  var mainWindData = currentData.wind_speed;
  var mainHumidData = currentData.humidity;
  var mainUvIndexData = currentData.uvi;

  let mainCard = document.createElement("div");
  let mainCardDesc = document.createElement("h3");
  let mainCardIcon = document.createElement("img");
  let mainTimeEl = document.createElement("p");
  let mainTempEl = document.createElement("p");
  let mainWindEl = document.createElement("p");
  let mainHumidEl = document.createElement("p");
  let mainUvEl = document.createElement("p");

  //   if statement to display the appropriate colour to the UV Index
  // NOTE the UV Index on the current.uvi seems to note display despite being listed as an option on the onecall API
  if (mainUvIndexData <= 2) {
    mainUvEl.setAttribute("class", "uvGreen");
  } else if (mainUvIndexData > 2 && mainUvIndexData <= 5) {
    mainUvEl.setAttribute("class", "uvYellow");
  } else if (mainUvIndexData > 5 && mainUvIndexData <= 7) {
    mainUvEl.setAttribute("class", "uvOrange");
  } else {
    mainUvEl.setAttribute("class", "uvRed");
  }

  mainCardDesc.textContent = "Current Weather:";
  mainCardIcon.setAttribute("src", mainIcon);
  mainCardIcon.setAttribute("alt", mainIconDes);
  mainTimeEl.textContent = mainTimeConv;
  mainTempEl.textContent = "Temperature: " + mainTempData + " Celsius";
  mainWindEl.textContent = "Wind Speed: " + mainWindData + " m/s";
  mainHumidEl.textContent = "Humidity: " + mainHumidData + "%";
  mainUvEl = "UV Index: " + mainUvIndexData;

  mainCard.setAttribute("class", "bg-primary bg-gradient p-2 m-2 rounded");

  // this doesn't work yet
  mainCard.append(
    mainCardDesc,
    mainCardIcon,
    mainTimeEl,
    mainTempEl,
    mainWindEl,
    mainHumidEl,
    mainUvEl
  );
  mainCardEl.append(mainCard);
}

// function to set the forecast cards which is fed the lat and lon data from the original getCity function search
function getDailyForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${weatherAPIkey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Forecast data: ", data);

      //append to dom
      weatherBoxSmallEl.innerHTML = "";

      // for loop used to iterate through the days, prevent duplicates of the current day and limit the selection to 5 cards
      let dailyForecasts = data.daily;
      for (var i = 1; i < dailyForecasts.length - 2; i++) {
        createForecastCards(dailyForecasts[i]);
      }
    });
}

// function to append the forecast cards using the for loop in the getDailyForecast function
function createForecastCards(dailyForecasts) {
  var dailyIcon = `https://openweathermap.org/img/w/${dailyForecasts.weather[0].icon}.png`;
  var dailyIconDes = dailyForecasts.weather[0].description;
  var dailyTime = new Date(dailyForecasts.dt * 1000);
  var dailyTimeConv = dailyTime.toDateString();
  var dailyTempData = dailyForecasts.temp.day;
  var dailyWindData = dailyForecasts.wind_speed;
  var dailyHumidData = dailyForecasts.humidity;
  var dailyUvIndexData = dailyForecasts.uvi;

  let dailyCard = document.createElement("div");
  let dailyCardDesc = document.createElement("h3");
  let dailyCardIcon = document.createElement("img");
  let dailyTimeEl = document.createElement("p");
  let dailytTempEl = document.createElement("p");
  let dailyWindEl = document.createElement("p");
  let dailyHumidEl = document.createElement("p");
  let dailyUvEl = document.createElement("p");

  if (dailyUvIndexData <= 2) {
    dailyUvEl.setAttribute("class", "uvGreen");
  } else if (dailyUvIndexData > 2 && dailyUvIndexData <= 5) {
    dailyUvEl.setAttribute("class", "uvYellow");
  } else if (dailyUvIndexData > 5 && dailyUvIndexData <= 7) {
    dailyUvEl.setAttribute("class", "uvOrange");
  } else {
    dailyUvEl.setAttribute("class", "uvRed");
  }

  dailyCardDesc.textContent = "Forecast:";
  dailyCardIcon.setAttribute("src", dailyIcon);
  dailyCardIcon.setAttribute("alt", dailyIconDes);
  dailyTimeEl.textContent = dailyTimeConv;
  dailytTempEl.textContent = "Temperature: " + dailyTempData + " Celsius";
  dailyWindEl.textContent = "Wind Speed: " + dailyWindData + " m/s";
  dailyHumidEl.textContent = "Humidity: " + dailyHumidData + "%";
  dailyUvEl.textContent = "UV Index: " + dailyUvIndexData;

  dailyCard.setAttribute("class", "bg-gradient p-2 m-2 rounded");

  dailyCard.append(
    dailyCardDesc,
    dailyCardIcon,
    dailyTimeEl,
    dailytTempEl,
    dailyWindEl,
    dailyHumidEl,
    dailyUvEl
  );
  weatherBoxSmallEl.append(dailyCard);
}

// event listener on the search button which takes the user input and runs the getCity function to pull API data and run all consecutive functions
submitBtn.addEventListener("click", getCity);
