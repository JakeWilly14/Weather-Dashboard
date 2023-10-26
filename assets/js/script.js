var submitBtn = document.getElementById('submit-btn');
var cityHistory = document.getElementById('recent-list');
// function that takes users input from search city text area 
// then sends the query value to the searchApi function
function getParams() {
  var query = document.getElementById('floatingTextarea').value
  searchApi(query);
}

// returns query data depending on parameter value
// then creates button for past searches
function searchApi(query) {
  var apiQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=&limit=1&appid=35d2279adb1f47e2cecb828267198a11';

  if (query) {
    apiQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + query + '&limit=1&appid=35d2279adb1f47e2cecb828267198a11';
  }

  fetch(apiQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.city.name);
      localStorage.setItem('cityName', data.city.name); 

      var resultHistory = document.createElement('button');
      resultHistory.setAttribute('id', 'recent-city');
      resultHistory.classList.add("list-group-item", "bg-dark", "text-light", "m-1", "rounded");
      
      resultHistory.innerText = data.city.name;
      cityHistory.appendChild(resultHistory);
    });
  
}

submitBtn.addEventListener('click', getParams);




