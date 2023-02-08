//OpenWeather API Key
var apiKey = "e8aaf923823c9eadac675eff44b465cd";

var currentWeatherEl = document.querySelector('#result-text');
var currentWeatherContent = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var searchContainer = document.querySelector('.search-container');
var searchList = document.querySelector('#search-list');
var previousCities = JSON.parse(localStorage.getItem('city'));
var searchInputVal = document.querySelector('#search-input');
var savedCity;
var requestURL;
var weatherData;
var forecastData;
var cityFound;

var searchParameters = '&units=imperial&speed=imperial';

//invokes init function when page loads to render past search from local storage
init();

//function that runs when user clicks search button
function handleSearchFormSubmit(event) {
    event.preventDefault();
    searchInputVal = document.querySelector('#search-input').value;
    var buttonText = searchInputVal;
    cityFound = true;

    if (!searchInputVal) {
        console.log('need search value')
        return
    }

    var currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInputVal + '&appid=' + apiKey + searchParameters;
    forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchInputVal + '&appid=' + apiKey + searchParameters;
   
    // if (!previousCities.includes(searchInputVal)) {
    //     addSearchHistory();
    // }

    // if (previousCities == null) {
    //     console.log("no stored list");
    
    // }


    addSearchHistory();
    
    retrieveWeatherData(currentWeatherURL);
    retrieveForecastData(forecastURL);


    //function that adds a city search into local storage and creates a button under search bar
    function addSearchHistory() {
        var storedCity = JSON.parse(localStorage.getItem("city"));
        var button = document.createElement("BUTTON");
        button.textContent = buttonText;
        searchList.append(button);
        if (storedCity == null) {
            storedCity = [];
            storedCity.push(buttonText);
            localStorage.setItem("city", JSON.stringify(storedCity));
        } else {
            storedCity.push(buttonText);
            localStorage.setItem("city", JSON.stringify(storedCity));
        }
        
    }

}



function retrieveWeatherData(currentWeatherURL) {
    fetch(currentWeatherURL)
        .then(function (response) {
            console.log(response);
            if (response.status !== 200) {
                // console.log(response.status);
                console.log('no city found for weather');
                return;
            }
            return response.json();
        })
        .then(function (data){
            console.log(data);
            // console.log(data.cod)
            if(data.cod == 200) {
                weatherData = data;
                displayResults();
                }

        })
        .catch(function (error) {
            console.log(error)
        })
}

function retrieveForecastData(forecastURL) {
    fetch(forecastURL)
        .then(function (response) {
            console.log(response);
            if (response.status !== 200) {
                // console.log(response.status);
                console.log('no city found for forecast');
                return;
            }
            return response.json();
        })
        .then(function (forecast){
            console.log(forecast);
            // console.log(forecast.cod)
            if (forecast.cod == 200) {
                forecastData = forecast;
                displayForecast();
            }
            
        })
        .catch(function (error) {
            console.log(error)
        })
}

function displayResults() {
    // console.log(weatherData);
    currentWeatherEl.textContent = 'in ' + weatherData.name + ', ' + weatherData.sys.country + ', on ' + dayjs().format('MMM D, YYYY');

    //displays current weather
    currentWeatherContent.textContent = weatherData.main.temp + '°F';
    // var currentIcon = document.querySelector('current-icon').textContent = weatherData.weather[0].icon;
    // var currentIconCode = weatherData.weather[0].icon;
    // var iconURL = 'https://openweathermap.org/img/w/' + currentIconCode + '.png'
    // var currentIcon = document.querySelector('current-icon').innerHTML = <img iconURL></img>;
    var currentWind = document.querySelector('#current-wind').textContent = 'Wind Speed: ' + weatherData.wind.speed + ' mph';
    var currentHumid = document.querySelector('#current-humid').textContent = 'Humidity: ' + weatherData.main.humidity + '%';

}

function displayForecast() {
//displays 5-day forecast
    //Day 1
    var day1Date = document.querySelector('#date1').textContent = dayjs(forecastData.list[4].dt_txt).format('MMM D, YYYY');
    
    var day1Icon;
    var day1Temp = document.querySelector('#temp1').textContent = 'Temp: ' + forecastData.list[4].main.temp + '°F';
    var day1Wind = document.querySelector('#wind1').textContent = 'Wind Speed: ' + forecastData.list[4].wind.speed + ' mph';
    var day1Humid = document.querySelector('#humid1').textContent = 'Humidity ' + forecastData.list[4].main.humidity + '%';

    //Day 2
    var day2Date = document.querySelector('#date2').textContent = dayjs(forecastData.list[12].dt_txt).format('MMM D, YYYY');
    
    var day2Icon;
    var day2Temp = document.querySelector('#temp2').textContent = 'Temp: ' + forecastData.list[12].main.temp + '°F';
    var day2Wind = document.querySelector('#wind2').textContent = 'Wind Speed: ' + forecastData.list[12].wind.speed + ' mph';
    var day2Humid = document.querySelector('#humid2').textContent = 'Humidity ' + forecastData.list[12].main.humidity + '%';

    //Day 3
    var day3Date = document.querySelector('#date3').textContent = dayjs(forecastData.list[20].dt_txt).format('MMM D, YYYY');
    
    var day3Icon;
    var day3Temp = document.querySelector('#temp3').textContent = 'Temp: ' + forecastData.list[20].main.temp + '°F';
    var day3Wind = document.querySelector('#wind3').textContent = 'Wind Speed: ' + forecastData.list[20].wind.speed + ' mph';
    var day3Humid = document.querySelector('#humid3').textContent = 'Humidity ' + forecastData.list[20].main.humidity + '%';

    //Day 4
    var day4Date = document.querySelector('#date4').textContent = dayjs(forecastData.list[28].dt_txt).format('MMM D, YYYY');
    
    var day4Icon;
    var day4Temp = document.querySelector('#temp4').textContent = 'Temp: ' + forecastData.list[28].main.temp + '°F';
    var day4Wind = document.querySelector('#wind4').textContent = 'Wind Speed: ' + forecastData.list[28].wind.speed + ' mph';
    var day4Humid = document.querySelector('#humid4').textContent = 'Humidity ' + forecastData.list[28].main.humidity + '%';

    //Day 5
    var day5Date = document.querySelector('#date5').textContent = dayjs(forecastData.list[36].dt_txt).format('MMM D, YYYY');
    
    var day5Icon;
    var day5Temp = document.querySelector('#temp5').textContent = 'Temp: ' + forecastData.list[36].main.temp + '°F';
    var day5Wind = document.querySelector('#wind5').textContent = 'Wind Speed: ' + forecastData.list[36].wind.speed + ' mph';
    var day5Humid = document.querySelector('#humid5').textContent = 'Humidity ' + forecastData.list[36].main.humidity + '%';
}



function renderSearchHistory() {
    console.log(previousCities);
    if (previousCities != null) {
        for (var i = 0; i < previousCities.length; i++) {
            var btn = document.createElement("BUTTON");
            btn.textContent = (previousCities[i]);
            searchList.append(btn);
        }
    }
}


function init() {
    renderSearchHistory();
    
}

function retreivePastSearch(event) {
    // console.log(event.target.innerHTML);
    savedCity = event.target.innerHTML;
    currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + savedCity + '&appid=' + apiKey + searchParameters;
    forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + savedCity + '&appid=' + apiKey + searchParameters;
    
    
    retrieveWeatherData(currentWeatherURL);
    retrieveForecastData(forecastURL);
}

//event listeners
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
searchContainer.addEventListener('click', retreivePastSearch);
