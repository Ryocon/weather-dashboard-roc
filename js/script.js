var weatherAPIkey = "840819e30adace1a99c607cc7e47419d"

var cityNameEl = document.getElementById('city-name-main')

var dateMainEl = document.getElementById('date-main')
var tempMainEl = document.getElementById('temp-main')
var windMainEl = document.getElementById('wind-main')
var humidityMainEl = document.getElementById('humidity-main')
var UVMainEl = document.getElementById('uv-index-main')






var cityInput = document.getElementById('city-input')

var searchBtnEl = document.getElementById("search-btn")






// ADD MOMENT JS!!!!


var testQuery = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=840819e30adace1a99c607cc7e47419d"

// url query to search a city using API key
// var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + weatherAPIkey




searchBtnEl.addEventListener('click', function() {

var myKey = "840819e30adace1a99c607cc7e47419d"
// API works when key is set locally not globally
var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&units=metric&appid=" + myKey

    if (cityInput.value === null) {
        return
    }
    else {
        
        fetch(cityQuery)
        .then(response => response.json())
        .then(function (data){

            cityNameEl.innerHTML = cityInput.value

            var tempData = data.main.temp
          
            tempMainEl.innerText = "Temp: " + tempData + " Celsius"

            var windData = data.wind.speed

            windMainEl.innerText = "Wind Speed: " + windData + " m/s"

            var humidData = data.main.humidity

            humidityMainEl.innerText = "Humidity: " + humidData + "%"

            // var uvData = 

        }) 



        }
        
    }



// dateMainEl.innerHTML = data. moment needed !!!




// end of if statament 

// end of event function
)





// function fetchData() {
//     var myKey = "840819e30adace1a99c607cc7e47419d"
    
//     var cityQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value + "&appid=" + myKey
    
//     fetch(cityQuery)
//     .then(response => response.json())
//     .then(data => console.log(data))
    
// }

// MAKE THE KEY INTO IT'S OWN FUNCTION????


// fetch(cityQuery)

// to do
// unit conversion
// 5 day forecast
// pull data from api call