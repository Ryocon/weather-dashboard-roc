var weatherAPIkey = "840819e30adace1a99c607cc7e47419d"

var submitEl = document.getElementById("city-input")

var submitBtn = document.getElementById('search-btn')

var mainCard = document.getElementById('main-weather')

var weatherBoxSmallEl = document.getElementById('weather-box-small')


function getCity(location){

    // locaton = document.getElementById('city-input').value;
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
        cityEl.textContent = submitEl.value
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


        // getDailyForecast(lat, lon)









    }

    ).catch(function (err){
        console.log(err)
    })







}

// this will be for create ammend append of cards
function createForecastCards(forecast){

}





function getDailyForecast(lat, lon){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${weatherAPIkey}`
    ).then(res.json)
    .then(function (data){
        console.log('forecast data: ', data)



        //append to dom
        weatherBoxSmallEl.innerHTML = ""
    
            for(var i = 1; i < data.daily.length-2; i++ ){

                createForecastCards(data.daily[i])
            }


        }
    )

}


submitBtn.addEventListener('click', getCity)