var weatherAPIkey = "840819e30adace1a99c607cc7e47419d"

var cityNameEl = document.getElementById('city-name')

var cityInput = document.getElementById('city-input')

var searchBtnEl = document.getElementById("search-btn")



var testQuery = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=840819e30adace1a99c607cc7e47419d"

// url query to search a city using API key
// var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + weatherAPIkey




searchBtnEl.addEventListener('click', function() {

var myKey = "840819e30adace1a99c607cc7e47419d"
// API works when key is set locally not globally
var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + myKey

    if (cityInput.value === null) {
        return
    }
    else {
        fetch(cityQuery)
        .then(response => response.json())
  .then(data => console.log(data))
    }
}


)



// MAKE THE KEY INTO IT'S OWN FUNCTION????


// fetch(cityQuery)

// to do
// unit conversion
// 5 day forecast
// pull data from api call