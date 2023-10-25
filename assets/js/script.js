var submitBtn = document.getElementById('submit-btn')

function getParams() {
  var query = document.getElementById('floatingTextarea').value
  searchApi(query)
}

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
    });
}

submitBtn.addEventListener('click', getParams);




