//OpenWeather API Key
var apiKey = "e8aaf923823c9eadac675eff44b465cd";

var currentWeatherEl = document.querySelector('#result-text');
var currentWeatherContent = document.querySelector('#result-content');
var requestURL;
var searchFormEl = document.querySelector('#search-form');

var searchParameters = '&units=imperial&speed=imperial';

function handleSearchFormSubmit(event) {
    event.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.log('need search value')
        return
    }

    queryString = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInputVal + '&appid=' + apiKey + searchParameters;
    console.log(queryString);

    retrieveWeatherData(queryString);

    // displayResults(queryString);
    // currentWeatherEl.siblings().text('Pacifica');
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
            // displayResults(data);
        })
}

// function displayResults() {
//     console.log()
    

// }

searchFormEl.addEventListener('submit', handleSearchFormSubmit);