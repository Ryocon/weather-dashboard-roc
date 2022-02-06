var weatherAPIkey = "840819e30adace1a99c607cc7e47419d"

var submitEl = document.getElementById("city-input")

var submitBtn = document.getElementById('search-btn')

var mainCard = document.getElementById('main-weather')

var weatherBoxSmallEl = document.getElementById('weather-box-small')



function getCity(location){
    // to find city to search
    location = document.getElementById("city-input").value

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${weatherAPIkey}`
    )
    .then(function (response){
     return response.json()
    })
    .then(function (data){

        console.log("weather data: ", data);

        // //current weather card

        // //current weather variables 
        // var tempData = data.main.temp
        // var windData = data.wind.speed
        // var humidData = data.main.humidity
        // // UV Index Req !!!
        

        // //get image varaible
        // let icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        // let iconDes = data.weather[0].description


        // //2  creat our dom elements
        // let card = document.createElement('div')
        // let cardIcon = document.createElement('img')
        // let cityEl = document.createElement('h2')
        // let tempEl = document.createElement('p')
        // let windEl = document.createElement('p')
        // let humidEl = document.createElement('p')
        // //  let uvEl
        
        
        // //append to card

        // // card.append(mainCard)
        // cityEl.textContent = location
        // tempEl.textContent = 'Current Temperature: ' + tempData + ' Celsius'
        // windEl.textContent = 'Wind Speed: ' + windData + ' m/s'
        // humidEl.textContent = 'Humidity: ' + humidData + '%'
        

        // cardIcon.setAttribute("src", icon)
        // cardIcon.setAttribute('alt', iconDes)

        // // needs UV !!!
        // card.append(cardIcon, cityEl, tempEl, windEl, humidEl)


        // // append to html
        // mainCard.innerHTML = ""
        // mainCard.append(card)


        //start weather api
        let lat = data.coord.lat

        let lon = data.coord.lon


        getDailyForecast(lat, lon)
        getCurrentForecast(lat, lon)

    }

    ).catch(function (err){
        console.log(err)
    })

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

// IS THE URLQUERY THE ISSUE ???
function getCurrentForecast(lat, lon) {      
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${weatherAPIkey}`
    ).then (function (response) {
        return response.json()
    })
    .then(function (data){
        console.log('Current data: ', data)

        mainCard.innerHTML = ""
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


    let mainCardEl = document.createElement('div')
    let mainCardIcon = document.createElement('img')
    let mainTimeEl = document.createElement('p')
    let mainTempEl = document.createElement('p')
    let mainWindEl = document.createElement('p')
    let mainHumidEl = document.createElement('p')
    let mainUvEl = document.createElement('p')


    mainCardIcon.setAttribute("src", mainIcon)
    mainCardIcon.setAttribute('alt', mainIconDes)
    mainTimeEl.textContent = mainTime
    mainTempEl.textContent = 'Temperature: ' + mainTempData + ' Celsius'
    mainWindEl.textContent = 'Wind Speed: ' + mainWindData + ' m/s'
    mainHumidEl.textContent = 'Humidity: ' + mainHumidData + '%'
    mainUvEl = 'UV Index: ' + mainUvIndexData
     
    
    // this doesn't work yet
    mainCard.append(mainCardIcon, mainTimeEl, mainTempEl, mainWindEl, mainHumidEl, mainUvEl)
    mainCardEl.append(mainCard)
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

    dailyCardIcon.setAttribute("src", dailyIcon)
    dailyCardIcon.setAttribute('alt', dailyIconDes)
    dailyTimeEl.textContent = dailyTimeConv
    dailytTempEl.textContent = 'Temperature: ' + dailyTempData + ' Celsius'
    dailyWindEl.textContent = 'Wind Speed: ' + dailyWindData + ' m/s'
    dailyHumidEl.textContent = 'Humidity: ' + dailyHumidData + '%'
    dailyUvEl.textContent = 'UV Index: ' + dailyUvIndexData

    
    dailyCard.append(dailyCardIcon, dailyTime, dailytTempEl, dailyWindEl, dailyHumidEl, dailyUvEl)
    weatherBoxSmallEl.append(dailyCard)


}



submitBtn.addEventListener('click', getCity)
