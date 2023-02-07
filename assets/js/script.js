//OpenWeather API Key
var apiKey = "e8aaf923823c9eadac675eff44b465cd";

var currentWeatherEl = document.querySelector('#result-text');
var currentWeatherContent = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var requestURL;
var weatherData;

var searchParameters = '&units=imperial&speed=imperial';

function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.log('need search value')
        return
    }

    queryString = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&appid=' + apiKey + searchParameters;
    console.log(queryString);

    retrieveWeatherData(queryString);

}

function retrieveWeatherData(queryString) {
    fetch(queryString)
        .then(function (response) {
            console.log(response);
            if (response.status !== 200) {
                console.log(response.status);
            }
            return response.json();
        })
        .then(function (data){
            console.log(data);
            weatherData = data;
            displayResults();
        })
}

function displayResults() {
    console.log(weatherData);
    currentWeatherEl.textContent = 'in ' + weatherData.city.name + ', ' + weatherData.city.country;

    //displays current weather
    currentWeatherContent.textContent = 'Feels Like ' + weatherData.list[0].main.feels_like + '°F';
    // var currentIcon = document.querySelector('current-icon').textContent = weatherData.weather[0].icon;
    // var currentIconCode = weatherData.weather[0].icon;
    // var iconURL = 'https://openweathermap.org/img/w/' + currentIconCode + '.png'
    // var currentIcon = document.querySelector('current-icon').innerHTML = <img iconURL></img>;
    var currentTempMax = document.querySelector('#current-temp-max').textContent = 'Max Temp: ' + weatherData.list[0].main.temp_max + '°F';
    var currentTempMin = document.querySelector('#current-temp-min').textContent = 'Min Temp: ' + weatherData.list[0].main.temp_min + '°F';
    var currentWind = document.querySelector('#current-wind').textContent = 'Wind Speed: ' + weatherData.list[0].wind.speed + ' mph';
    var currentHumid = document.querySelector('#current-humid').textContent = 'Humidity: ' + weatherData.list[0].main.humidity + '%';

    //displays 5-day forecast
    //Day 1
    var day1Date = document.querySelector('#date1').textContent = weatherData.list[1].dt_txt;
    
    var day1Icon;
    var day1Temp = document.querySelector('#temp1').textContent = 'Temp: ' + weatherData.list[1].main.temp + '°F';
    var day1Wind = document.querySelector('#date1').textContent = weatherData.list[1].wind.speed;
    var day1Humid = document.querySelector('#date1').textContent = weatherData.list[1].main.humidity;

    //Day 2


    //Day 3


    //Day 4


    //Day 5
    
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);