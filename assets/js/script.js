var cityNameEl = document.querySelector('#cityname')
var cityDisplayEl = document.querySelector('.cityBox')
var forecastEl = document.querySelector('.forecast')
var submitBtn = document.querySelector('.submitBtn')
var cityDate = document.querySelector('.city-title')


var submitHandler = function() {
    var city = cityNameEl.value.trim();
    if (city) {
        getWeather(city);
        //store city in local storage and display in history list
    } else {
        alert("Please enter a city")
    }
}

var getWeather = function() {
    //Display city, date and icon
    var city = cityNameEl.value.trim();
    cityDate.textContent = cityNameEl.value + " (" + moment().format('M/D/YY') + ")"
        var key = '00e53e9dd9243b9df5f5b2fc939789ec';
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city.toLowerCase() + '&appid=' + key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            console.log(data)
            //temp
            var temp = document.createElement("p")
            temp.textContent = "";
            temp.textContent = "Temperature: " + (Math.round((data.main.temp-273.15)*9/5+32)) + " degrees farenheit" ;
            cityDisplayEl.appendChild(temp);
            //wind
            var wind = document.createElement("p")
            wind.textContent = "Wind: " + data.wind.speed + " per hour" ;
            cityDisplayEl.appendChild(wind);
            //humidity
            var humidity = document.createElement("p")
            humidity.textContent = "Humidity: " + data.main.humidity + "%" ;
            cityDisplayEl.appendChild(humidity);
            //uv index
            var uv = document.createElement("p")
            uv.textContent = "UV Index: " + data.main.temp ;
            cityDisplayEl.appendChild(uv);
        })
    }
    // fetch(apiUrl).then(function(response) {
    //   if (response.ok) {
    //     response.json().then(function(data) {
    //     displayRepos(data.items, language);
    //     });
    //   } else {
    //     alert('Error: GitHub User Not Found');
    //   }

    



var getForecast = function() {
    //get 5 day forecast
}

submitBtn.addEventListener('click', submitHandler)
// function getApi() {
//     var requestUrl = 'https://api.github.com/users?per_page=5';

//     fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         // Use the console to examine the response
//         console.log(data);
       
//         for (var i = 0; i < 6; i++)
//         var repoName = repos[i].owner.login + "/" + repos[i].name;
  
//         var userName = document.createElement('h3')
//       userName.fdsjk;l = data.(i).login
//         // append container to the dom
//         userContainer.appendChild(userName);
//         // TODO: Loop through the data and generate your HTML
//       });
//   }
//   fetchButton.addEventListener('click', getApi); {

