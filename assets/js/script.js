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
    "https://api.openweathermap.org/data/2.5/forecast?q=&units=imperial&limit=1&appid=35d2279adb1f47e2cecb828267198a11";

  if (query) {
    apiQueryUrl =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
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
        (dayOne = dayjs(data.list[4].dt_txt).format("MM/DD/YYYY")),
        (dayTwo = dayjs(data.list[12].dt_txt).format("MM/DD/YYYY")),
        (dayThree = dayjs(data.list[20].dt_txt).format("MM/DD/YYYY")),
        (dayFour = dayjs(data.list[28].dt_txt).format("MM/DD/YYYY")),
        (dayFive = dayjs(data.list[36].dt_txt).format("MM/DD/YYYY")),
      ];

      var datesInput = [
        document.getElementById("day-one"),
        document.getElementById("day-two"),
        document.getElementById("day-three"),
        document.getElementById("day-four"),
        document.getElementById("day-five"),
      ];

      var queryData = [
        (queryName = data.city.name),
        (queryTemp = "Temp: " + data.list[0].main.temp + "°F"),
        (queryWind = "Wind: " + data.list[0].wind.speed + " MPH"),
        (queryHumidity = "Humidity: " + data.list[0].main.humidity + "%"),
      ];

      // 5 day forecast gets data at 12pm
      var tempArr = [
        (dayOne = "Temp: " + data.list[4].main.temp + "°F"),
        (dayTwo = "Temp: " + data.list[12].main.temp + "°F"),
        (dayThree = "Temp: " + data.list[20].main.temp + "°F"),
        (dayFour = "Temp: " + data.list[28].main.temp + "°F"),
        (dayFive = "Temp: " + data.list[36].main.temp + "°F"),
      ];

      var tempInput = [
        (dayOne = document.getElementById("forecast-temp1")),
        document.getElementById("forecast-temp2"),
        document.getElementById("forecast-temp3"),
        document.getElementById("forecast-temp4"),
        document.getElementById("forecast-temp5"),
      ];

      var windArr = [
        (dayOne = "Wind: " + data.list[4].wind.speed + " MPH"),
        (dayTwo = "Wind: " + data.list[12].wind.speed + " MPH"),
        (dayThree = "Wind: " + data.list[20].wind.speed + " MPH"),
        (dayFour = "Wind: " + data.list[28].wind.speed + " MPH"),
        (dayFive = "Wind: " + data.list[36].wind.speed + " MPH"),
      ];

      var windInput = [
        document.getElementById("forecast-wind1"),
        document.getElementById("forecast-wind2"),
        document.getElementById("forecast-wind3"),
        document.getElementById("forecast-wind4"),
        document.getElementById("forecast-wind5"),
      ];

      var humidityArr = [
        (dayOne = "Humidity " + data.list[4].main.humidity + "%"),
        (dayTwo = "Humidity " + data.list[12].main.humidity + "%"),
        (dayThree = "Humidity " + data.list[20].main.humidity + "%"),
        (dayFour = "Humidity " + data.list[28].main.humidity + "%"),
        (dayFive = "Humidity " + data.list[36].main.humidity + "%"),
      ];

      var humidityInput = [
        document.getElementById("forecast-humidity1"),
        document.getElementById("forecast-humidity2"),
        document.getElementById("forecast-humidity3"),
        document.getElementById("forecast-humidity4"),
        document.getElementById("forecast-humidity5"),
      ];

      // sets city query and data to local storage
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
        "recent-btn"
      );
      resultHistory.innerHTML = data.city.name;
      cityHistory.appendChild(resultHistory);
      // inserts current weather into HTML
      document.getElementById("current-temp").innerHTML = queryTemp;
      document.getElementById("current-wind").innerHTML = queryWind;
      document.getElementById("current-humidity").innerHTML = queryHumidity;
      document.getElementById("current-query").innerHTML = query;
      // removes display none class to current and forecast cards
      var currentDisplay = document.getElementById("query-display");
      currentDisplay.classList.remove("display");
      // removes display none styling from query data after function is called
      var forecastDisplay = document.getElementById("forecast-display");
      forecastDisplay.classList.remove("display");
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

function searchHistory() {
  var recentSearchValue = document.getElementById("recent-city").value;
  var apiQueryUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    recentSearchValue +
    "&units=imperial&limit=1&appid=35d2279adb1f47e2cecb828267198a11";

  searchApi(apiQueryUrl);
}

submitBtn.addEventListener("click", getParams);
