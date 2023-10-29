var submitBtn = document.getElementById("submit-btn");
var cityHistory = document.getElementById("recent-list");

// function that takes users input from search city text area
// then sends the query value to the searchApi function
function getParams() {
  var query = document.getElementById("floatingTextarea").value;
  searchApi(query);
}

// returns query data depending on parameter value
// then creates button for past searches
function searchApi(query) {
  var apiQueryUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=&units=imperial&limit=1&appid=35d2279adb1f47e2cecb828267198a11";

  if (query) {
    apiQueryUrl =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      query +
      "&units=imperial&limit=1&appid=35d2279adb1f47e2cecb828267198a11";
  }

  fetch(apiQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Current data on search query
      var queryData = [
        (queryName = data.city.name),
        (queryTemp = data.list[0].main.temp + "°F"),
        (queryWind = data.list[0].wind.speed + " MPH"),
        (queryHumidity = data.list[0].main.humidity + "% Humidity"),
      ];

      // 5 day forecast gets data at 12pm
      var tempArr = [
        (dayOne = data.list[4].main.temp + "°F"),
        (dayTwo = data.list[12].main.temp + "°F"),
        (dayThree = data.list[20].main.temp + "°F"),
        (dayFour = data.list[28].main.temp + "°F"),
        (dayFive = data.list[36].main.temp + "°F"),
      ];

      var windArr = [
        (dayOne = data.list[4].wind.speed + " MPH"),
        (dayTwo = data.list[12].wind.speed + " MPH"),
        (dayThree = data.list[20].wind.speed + " MPH"),
        (dayFour = data.list[28].wind.speed + " MPH"),
        (dayFive = data.list[36].wind.speed + " MPH"),
      ];

      var humidityArr = [
        (dayOne = data.list[4].main.humidity + "%"),
        (dayTwo = data.list[12].main.humidity + "%"),
        (dayThree = data.list[20].main.humidity + "%"),
        (dayFour = data.list[28].main.humidity + "%"),
        (dayFive = data.list[36].main.humidity + "%"),
      ];

      console.log(queryName);
      console.log(queryData);
      console.log(tempArr, windArr, humidityArr);
      // sets city query and data to local storagegit 
      localStorage.setItem("cityName", queryName);
      localStorage.setItem("cityData", queryData);
      // creating button elements for recently searched cities
      var resultHistory = document.createElement("button");
      resultHistory.setAttribute("id", "recent-city");
      resultHistory.classList.add(
        "list-group-item",
        "bg-dark",
        "text-light",
        "m-1",
        "rounded"
      );
      resultHistory.innerHTML = data.city.name;
      cityHistory.appendChild(resultHistory);
      // inserts current weather into HTML
      document.getElementById("current-temp").innerHTML = queryTemp;
      document.getElementById("current-wind").innerHTML = queryWind;
      document.getElementById("current-humidity").innerHTML = queryHumidity;
      document.getElementById('current-query').innerHTML = query;
      // removes display none class to current and forecast cards
      var currentDisplay = document.getElementById('query-display')
      currentDisplay.classList.remove('display')

      var forecastDisplay = document.getElementById('forecast-display')
      forecastDisplay.classList.remove('display')
      // for loop to create 5 day forecast cards
      for (var i = 0; i < tempArr.length; i++) {
        var tempForecastCard = document.createElement('div');
        var tempForecastList = document.createElement('ul');

    });
}

submitBtn.addEventListener("click", getParams);
