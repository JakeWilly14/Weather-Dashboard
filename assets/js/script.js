var submitBtn = document.getElementById("submit-btn");
var cityHistory = document.getElementById("recent-list");
var recentQueryBtn = document.getElementsByClassName('recent-btn');

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
      var forecastDates = [
        dayOne = data.list[4].dt_txt,
        dayTwo = data.list[12].dt_txt,
        dayThree = data.list[20].dt_txt,
        dayFour = data.list[28].dt_txt,
        dayFive = data.list[36].dt_txt,
      ]

      var datesInput = [
        document.getElementById('day-one'),
        document.getElementById('day-two'),
        document.getElementById('day-three'),
        document.getElementById('day-four'),
        document.getElementById('day-five'),
      ]

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

      var tempInput = [
        dayOne = document.getElementById('forecast-temp1'),
        document.getElementById('forecast-temp2'),
        document.getElementById('forecast-temp3'),
        document.getElementById('forecast-temp4'),
        document.getElementById('forecast-temp5'),
      ]

      var windArr = [
        (dayOne = data.list[4].wind.speed + " MPH"),
        (dayTwo = data.list[12].wind.speed + " MPH"),
        (dayThree = data.list[20].wind.speed + " MPH"),
        (dayFour = data.list[28].wind.speed + " MPH"),
        (dayFive = data.list[36].wind.speed + " MPH"),
      ];

      var windInput = [
        document.getElementById('forecast-wind1'),
        document.getElementById('forecast-wind2'),
        document.getElementById('forecast-wind3'),
        document.getElementById('forecast-wind4'),
        document.getElementById('forecast-wind5'),
      ]

      var humidityArr = [
        (dayOne = data.list[4].main.humidity + "% Humidity"),
        (dayTwo = data.list[12].main.humidity + "% Humidity"),
        (dayThree = data.list[20].main.humidity + "% Humidity"),
        (dayFour = data.list[28].main.humidity + "% Humidity"),
        (dayFive = data.list[36].main.humidity + "% Humidity"),
      ];

      var humidityInput = [
        document.getElementById('forecast-humidity1'),
        document.getElementById('forecast-humidity2'),
        document.getElementById('forecast-humidity3'),
        document.getElementById('forecast-humidity4'),
        document.getElementById('forecast-humidity5'),
      ]
      console.log(data.list[0]);
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
        "rounded",
        "col-md-12",
        "recent-btn"
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
      // removes display none styling from query data after function is called
      var forecastDisplay = document.getElementById('forecast-display')
      forecastDisplay.classList.remove('display')
      // display 5 day forecast in html
      datesInput[0].innerText = forecastDates[0];
      datesInput[1].innerText = forecastDates[1];
      datesInput[2].innerText = forecastDates[2];
      datesInput[3].innerText = forecastDates[3];
      datesInput[4].innerText = forecastDates[4];

      tempInput[0].innerText = tempArr[0];
      tempInput[1].innerText = tempArr[1];
      tempInput[2].innerText = tempArr[2];
      tempInput[3].innerText = tempArr[3];
      tempInput[4].innerText = tempArr[4];

      windInput[0].innerText = windArr[0];
      windInput[1].innerText = windArr[1];
      windInput[2].innerText = windArr[2];
      windInput[3].innerText = windArr[3];
      windInput[4].innerText = windArr[4];

      humidityInput[0].innerText = humidityArr[0];
      humidityInput[1].innerText = humidityArr[1];
      humidityInput[2].innerText = humidityArr[2];
      humidityInput[3].innerText = humidityArr[3];
      humidityInput[4].innerText = humidityArr[4];
    });
  }


 submitBtn.addEventListener("click", getParams);
