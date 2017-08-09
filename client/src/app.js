var ListView = require('./views/listView');
var allCountries = [];

var app = function(){
  var url = "https://restcountries.eu/rest/v2/all";
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status != 200) return;
  var jsonString = this.responseText;
  var bucketList = JSON.parse(jsonString);
  allCountries = bucketList;

  var selectedCountry = JSON.parse(localStorage.getItem("Select Country"));
  var bucket = new ListView(selectedCountry);

  var button = document.getElementById("add-country");
  button.addEventListener('click', bucket);


  var regionSelect = document.getElementById("region-select");
  regionSelect.addEventListener('change', populateSelect);
  var select = document.getElementById("country-select");
  select.addEventListener('change', showCountry);
};

var populateList = function(countries){
  var ul = document.getElementById('country-list');
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
  countries.forEach(function(country){
    var name = document.createElement('li');
    var flag = document.createElement('li');
    var population = document.createElement('li');
    var capital = document.createElement('li');

    name.innerText = "Name: " + country.name;
    population.innerText = "Population: " + country.population;
    capital.innerText = "Capital City: " + country.capital;
    var img = document.createElement('img');
    img.src = country.flag;
    img.style.height = '200px';
    flag.appendChild(img);   
    
    ul.appendChild(name);
    ul.appendChild(flag);
    ul.appendChild(population);
    ul.appendChild(capital);
  })

  var jsonCountry= JSON.stringify(countries);
  localStorage.setItem("Select Country", jsonCountry);
}

var populateSelect = function(){
  var region = this.value;
  var regionCountries = allCountries.filter(function(country){
    return country.region === region;
  })
  var select = document.getElementById("country-select");

  var length = select.options.length;
     for(var i = length - 1 ; i >= 1 ; i--)
     {
         select.remove(i);
     }

  regionCountries.forEach(function(country){
    var option = document.createElement('option');
    option.innerText = country.name;
    select.appendChild(option);
  })
}

var showCountry = function(){
  var selected = this.value;
  var selectObj = allCountries.filter(function(country){
    return country.name === selected;
  })
  populateList(selectObj);
}

window.addEventListener('load', app);