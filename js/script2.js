var weatherAPIkey = "840819e30adace1a99c607cc7e47419d"

var locationEl = document.getElementById("city-input")

var submitBtn = document.getElementById('search-btn')

var mainCardEl = document.getElementById('main-weather')

var weatherBoxSmallEl = document.getElementById('weather-box-small')

var searchHistory = document.getElementById('search-history')

// makes the page bug out!?
// var location = document.getElementById('city-input').value

// prevSearch = undefined

// works
function searchHistorySet(location) {
   
    location = document.getElementById('city-input').value

    // localStorage.setItem('prev-city', JSON.stringify(location))
    localStorage.setItem('prev-city', location)

}

// needs work
function searchHistoryGet() {
    
    return localStorage.getItem('prev-city')
    
}

function searchHistoryAppend() {



    prevSearch = searchHistoryGet()

    if (prevSearch !== null) {
        prevBtn = document.createElement('button')
        prevBtn.setAttribute('class', 'p-3 mb-2 bg-warning text-dark')
        prevBtn.textContent = prevSearch

        searchHistory.append(prevBtn)
        // return
    } else {
        console.log('Nothing searched')
    }


}

searchHistoryAppend()

prevBtn.addEventListener('click', function() {


    var prevSearchLocation = localStorage.getItem('prev-city')

    console.log(prevSearchLocation)

    prevSearchCity()
}
)


function prevSearchCity(prevSearchLocation){
    // to find city to search
    var prevSearchLocation = localStorage.getItem('prev-city')

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${prevSearchLocation}&units=metric&appid=${weatherAPIkey}`
    )
    .then(function (response){
     return response.json()
    })
    .then(function (data){

        console.log("weather data: ", data);

        let lat = data.coord.lat

        let lon = data.coord.lon

        getDailyForecast(lat, lon)
        getCurrentForecast(lat, lon)
        // searchHistorySet(location)
        
    }

    ).catch(function (err){
        console.log(err)
    })

}

debugger

function getCity(location){
    // to find city to search
    location = document.getElementById('city-input').value

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${weatherAPIkey}`
    )
    .then(function (response){
     return response.json()
    })
    .then(function (data){

        console.log("weather data: ", data);

        let lat = data.coord.lat

        let lon = data.coord.lon

        getDailyForecast(lat, lon)
        getCurrentForecast(lat, lon)
        searchHistorySet(location)
        
    }

    ).catch(function (err){
        console.log(err)
    })

}




// IS THE URLQUERY THE ISSUE ???
function getCurrentForecast(lat, lon) {      
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${weatherAPIkey}`
    ).then (function (response) {
        return response.json()
    })
    .then(function (data){
        console.log('Current data: ', data)

        mainCardEl.innerHTML = ""
        let currentData = data.current
        createMainCard(currentData)
        }

    )

} 


// creating main card
function createMainCard(currentData) {

    var mainIcon = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`
    var mainIconDes = currentData.weather[0].description
    var mainTime = new Date(currentData.dt * 1000)
    var mainTimeConv = mainTime.toDateString()
    var mainTempData = currentData.temp
    var mainWindData = currentData.wind_speed
    var mainHumidData = currentData.humidity
    var mainUvIndexData = currentData.uvi

    

    let mainCard = document.createElement('div')
    let mainCardIcon = document.createElement('img')
    let mainTimeEl = document.createElement('p')
    let mainTempEl = document.createElement('p')
    let mainWindEl = document.createElement('p')
    let mainHumidEl = document.createElement('p')
    let mainUvEl = document.createElement('p')

    if (mainUvIndexData <= 2) {
        mainUvEl.setAttribute('class', 'uvGreen')
    } else if (mainUvIndexData > 2 && mainUvIndexData <= 5) {
        mainUvEl.setAttribute('class', 'uvYellow') 
    } else if (mainUvIndexData > 5 && mainUvIndexData <= 7) {
        mainUvEl.setAttribute('class', 'uvOrange')
    } else {
        mainUvEl.setAttribute('class', 'uvRed')
    }
    

    mainCardIcon.setAttribute("src", mainIcon)
    mainCardIcon.setAttribute('alt', mainIconDes)
    mainTimeEl.textContent = mainTimeConv
    mainTempEl.textContent = 'Temperature: ' + mainTempData + ' Celsius'
    mainWindEl.textContent = 'Wind Speed: ' + mainWindData + ' m/s'
    mainHumidEl.textContent = 'Humidity: ' + mainHumidData + '%'
    mainUvEl = 'UV Index: ' + mainUvIndexData
    
    

    
     
    
    // this doesn't work yet
    mainCard.append(mainCardIcon, mainTimeEl, mainTempEl, mainWindEl, mainHumidEl, mainUvEl)
    mainCardEl.append(mainCard)
}


// working from lat and lon
function getDailyForecast(lat, lon){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${weatherAPIkey}`
    ).then (function (response) {
        return response.json()
    })
    .then(function (data){
        console.log('Forecast data: ', data)

        //append to dom
        weatherBoxSmallEl.innerHTML = ""

            let dailyForecasts = data.daily
            for(var i = 1; i < dailyForecasts.length-2; i++) {

                createForecastCards(dailyForecasts[i])
            }


        }
    )

}

// this will be for create ammend append of cards
function createForecastCards(dailyForecasts){


    var dailyIcon = `https://openweathermap.org/img/w/${dailyForecasts.weather[0].icon}.png`
    var dailyIconDes = dailyForecasts.weather[0].description
    var dailyTime = new Date(dailyForecasts.dt * 1000)
    var dailyTimeConv = dailyTime.toDateString()
    var dailyTempData = dailyForecasts.temp.day
    var dailyWindData = dailyForecasts.wind_speed
    var dailyHumidData = dailyForecasts.humidity
    var dailyUvIndexData = dailyForecasts.uvi

    let dailyCard = document.createElement('div')
    let dailyCardIcon = document.createElement('img')
    let dailyTimeEl = document.createElement('p')
    let dailytTempEl = document.createElement('p')
    let dailyWindEl = document.createElement('p')
    let dailyHumidEl = document.createElement('p')
    let dailyUvEl = document.createElement('p')

    if (dailyUvIndexData <= 2) {
        dailyUvEl.setAttribute('class', 'uvGreen')
    } else if (dailyUvIndexData > 2 && dailyUvIndexData <= 5) {
        dailyUvEl.setAttribute('class', 'uvYellow') 
    } else if (dailyUvIndexData > 5 && dailyUvIndexData <= 7) {
        dailyUvEl.setAttribute('class', 'uvOrange')
    } else {
        dailyUvEl.setAttribute('class', 'uvRed')
    }


    dailyCardIcon.setAttribute("src", dailyIcon)
    dailyCardIcon.setAttribute('alt', dailyIconDes)
    dailyTimeEl.textContent = dailyTimeConv
    dailytTempEl.textContent = 'Temperature: ' + dailyTempData + ' Celsius'
    dailyWindEl.textContent = 'Wind Speed: ' + dailyWindData + ' m/s'
    dailyHumidEl.textContent = 'Humidity: ' + dailyHumidData + '%'
    dailyUvEl.textContent = 'UV Index: ' + dailyUvIndexData

    
    dailyCard.append(dailyCardIcon, dailyTimeEl, dailytTempEl, dailyWindEl, dailyHumidEl, dailyUvEl)
    weatherBoxSmallEl.append(dailyCard)


}



submitBtn.addEventListener('click', getCity)

