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

        //current weather card

        //current weather variables 
        var tempData = data.main.temp
        var windData = data.wind.speed
        var humidData = data.main.humidity
        // UV Index Req !!!
        

        //get image varaible
        let icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        let iconDes = data.weather[0].description


        //2  creat our dom elements
        let card = document.createElement('div')
        let cardIcon = document.createElement('img')
        let cityEl = document.createElement('h2')
        let tempEl = document.createElement('p')
        let windEl = document.createElement('p')
        let humidEl = document.createElement('p')
        //  let uvEl
        
        
        //append to card

        // card.append(mainCard)
        cityEl.textContent = location
        tempEl.textContent = 'Current Temperature: ' + tempData + 'Celsius'
        windEl.textContent = 'Wind Speed: ' + windData + 'm/s'
        humidEl.textContent = 'Humidity: ' + humidData + '%'
        

        cardIcon.setAttribute("src", icon)
        cardIcon.setAttribute('alt', iconDes)

        // needs UV !!!
        card.append(cardIcon, cityEl, tempEl, windEl, humidEl)


        // append to html
        mainCard.innerHTML = ""
        mainCard.append(card)


        //start weather api
        let lat = data.coord.lat

        let lon = data.coord.lon


        getDailyForecast(lat, lon)









    }

    ).catch(function (err){
        console.log(err)
    })







}

// this will be for create ammend append of cards
function createForecastCards(forecast){

    // var dailyIcon = data.daily.weather.icon
    // var dailyIconDes = data.daily.weather.description
    // var dailyTempData = data.daily.temp
    // var dailyWindData = data.daily.wind_speed
    // var dailyHumidData = data.daily.humidity
    // var dailyUvIndex = data.daily.uvi

    var dailyIcon = forecast.daily.weather.icon
    var dailyIconDes = forecast.daily.weather.description
    var dailyTempData = forecast.daily.temp
    var dailyWindData = forecast.daily.wind_speed
    var dailyHumidData = forecast.daily.humidity
    var dailyUvIndexData = forecast.daily.uvi

    let dailyCard = document.createElement('div')
    let dailyCardIcon = document.createElement('img')
    let dailytTempEl = document.createElement('p')
    let dailyWindEl = document.createElement('p')
    let dailyHumidEl = document.createElement('p')
    let dailyUvEl = document.createElement('p')

    dailyCardIcon.setAttribute("src", dailyIcon)
    dailyCardIcon.setAttribute('alt', dailyIconDes)
    dailytTempEl.textContent = 'Temperature: ' + dailyTempData + 'Celsius'
    dailyWindEl.textContent = 'Wind Speed: ' + dailyWindData + 'm/s'
    dailyHumidEl.textContent = 'Humidity: ' + dailyHumidData + '%'
    dailyUvEl.textContent = 'UV Index: ' + dailyUvIndexData

    


    var uvData = forecast.daily.uvi[0]
    let uvEl = document.createElement('p')
    uvEl = 'UV Index: ' + uvData
    mainCard.append(uvEl)


}





function getDailyForecast(lat, lon){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${weatherAPIkey}`
    ).then (function (response) {
        return response.json()
    })
    .then(function (forecast){
        console.log('forecast data: ', forecast)

        //append to dom
        weatherBoxSmallEl.innerHTML = ""
    
            for(var i = 1; i < forecast.daily.length-2; i++ ){

                createForecastCards(forecast.daily[i])
            }


        }
    )

}


submitBtn.addEventListener('click', getCity)