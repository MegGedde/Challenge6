var cityNameEl = document.querySelector('#cityname')
var cityDisplayEl = document.querySelector('.cityBox')
var forecastEl = document.querySelector('.forecast')
var submitBtn = document.querySelector('.submitBtn')
var cityDate = document.querySelector('.city-title')

var submitHandler = function() {
    //get value from input 
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
    cityDate.textContent = cityNameEl.value
    //get current weather for city entered

    

}

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

