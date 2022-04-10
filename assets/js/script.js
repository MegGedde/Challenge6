var cityNameEl = document.querySelector('#cityname')
var cityDisplayEl = document.querySelector('.cityBox')
var forecastEl = document.querySelector('.forecast')
var submitBtn = document.querySelector('.submitBtn')
var cityDate = document.querySelector('.city-title')
var cityHistory = document.querySelector('.history')
var key = '00e53e9dd9243b9df5f5b2fc939789ec';
var dailycontainer = $(".details");


var submitHandler = function() {
        // clear any existing data
    dailycontainer.html("");
    var city = cityNameEl.value.trim();
    if (city) {
        getWeather(city);
        getForecast(city)
        //store city in local storage and display in history list
    } else {
        alert("Please enter a city")
    }
    //display cities as history buttons
    var citylist = document.createElement("button")
    citylist.textContent = city;
    citylist.classList = "p-2 bg-secondary cityname";
    cityHistory.appendChild(citylist)
    //send to local storage
    // localStorage.setItem(city)
    // //get item from storage if button clicked
    // $(".history .cityname").val(localStorage.getItem(city));
}

// var getFromStorage = function() {
//     //get item from storage if button clicked
//     $(".history .cityname").val(localStorage.getItem(city));
//     submitHandler()
// }


var getWeather = function() {
    //Display city, date and icon
    var city = cityNameEl.value.trim();
    

        var key = '00e53e9dd9243b9df5f5b2fc939789ec';
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city.toLowerCase() + '&appid=' + key)  
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            //Display city and date
            cityDate.textContent = cityNameEl.value + " (" + moment().format('M/D/YY') + ")"

            //get weather icon
            var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            $('#wicon').attr('src', iconurl);

            console.log(data)

            //temp
            var temp = document.createElement("p")
            temp.textContent = "Temperature: " + (Math.round((data.main.temp-273.15)*9/5+32)) + " degrees farenheit" ;
            dailycontainer.append(temp);
            //wind
            var wind = document.createElement("p")
            wind.textContent = "Wind: " + data.wind.speed + " per hour" ;
            dailycontainer.append(wind);
            //humidity
            var humidity = document.createElement("p")
            humidity.textContent = "Humidity: " + data.main.humidity + "%" ;
            dailycontainer.append(humidity);
            //uv index
            var uv = document.createElement("p")
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            var queryURL2 = `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${lat}&lon=${lon}`;
            $.ajax({
                url: queryURL2,
                method: "GET",
            }).then(function (res) {
                var uvI = res.value;
                $(uv).text("UV Index: " + uvI);
                if (uvI < 3) {
                    $(uv).addClass("p-1 rounded bg-success text-white");
                  } else if (uvI < 8) {
                    $(uv).addClass("p-1 rounded bg-warning text-white");
                  } else {
                    $(uv).addClass("p-1 rounded bg-danger text-white");
                  }
            })
            dailycontainer.append(uv);
        })
    }

    var getIndex = function(response) {
        // takes the json response data from the api fetch and returns the index value where the day changes
        // data is reported every 3 hours
        var idx = 0
        for (i=1;i<response.list.length;i++) {
            var currentTime = new Date(response.list[i].dt*1000);
            var lastTime = new Date(response.list[i-1].dt*1000);
            if (currentTime.getDay() != lastTime.getDay()) {
                if (i == 8) {
                    idx = 0;
                    return idx;
                } else {
                    idx = i;
                    return idx;
                };
            };
        };
    };

            var getForecast = function(cityName) {
                var forecastContainerEl = $(".day-forecast");
                // clear any existing data
                forecastContainerEl.html("");
                var city = cityNameEl.value.trim();
                var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;
            
                fetch(apiUrl).then(function(response) {
                    // dont need if response ok since already checked earlier
                    response.json().then(function(response) {
                        // build 
                        // variable to hold index of the first date change
                        var idx = getIndex(response);
                
                        for (i=0;i<5;i++) {
                            // based on the index value above, find the index value for the 5 days (add 4 so the printed data values are for the middle of the day)
                            var actualIdx = i * 8 + idx + 4;
                            if (actualIdx>39) {actualIdx = 39};
                
                            // get data from api at Unix and convert
                            var timeCodeUnix = response.list[actualIdx].dt;
                            var time = new Date(timeCodeUnix*1000).toLocaleDateString("en-US");
                            var icon = response.list[actualIdx].weather[0].icon;
                            var temp = response.list[actualIdx].main.temp;
                            var humidity = response.list[actualIdx].main.humidity;
                
                            var cardEl = $("<div>").addClass("col-2 card bg-primary pt-2");
                            var cardTitleEl = $("<h5>").addClass("card-title").text(time);
                            var divEl = $("<div>").addClass("weather-icon");
                            var cardIconEl = $("<img>").addClass("p-2").attr("src","https://openweathermap.org/img/w/" + icon + ".png");
                            var cardTempEl = $("<p>").addClass("card-text").text("Temp: " + temp + " " + String.fromCharCode(176) + "F");
                            var cardHumidityEl = $("<p>").addClass("card-text mb-2").text("Humidity: " + humidity + "%");
                
                            cardEl.append(cardTitleEl);
                            divEl.append(cardIconEl);
                            cardEl.append(divEl);
                            cardEl.append(cardTempEl);
                            cardEl.append(cardHumidityEl);
                            forecastContainerEl.append(cardEl);
                        }
                    });
                }).catch(function(error) {
                    alert("Unable to connect to OpenWeather");
                })
            };
submitBtn.addEventListener('click', submitHandler)
// cityname.addEventListener('click', getFromStorage)


