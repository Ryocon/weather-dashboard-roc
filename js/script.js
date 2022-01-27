var weatherAPIkey = "840819e30adace1a99c607cc7e47419d"

var cityNameEl = document.getElementById('city-name')


var cityInput = document.getElementById('city-input').value





// url query to search a city using API key
var cityQuery = "api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + weatherAPIkey


fetch(cityQuery)

// to do
// unit conversion
// 5 day forecast
// pull data from api call