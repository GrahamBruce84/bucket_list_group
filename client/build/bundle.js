/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var ListView = __webpack_require__(1);
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

  var button = document.getElementById("add-country");
  // button.addEventListener('click', function(){});

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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var ListView = function(listItems){
  this.render(listItems);
}

ListView.prototype = {
  render: function(listItems){
    console.log(listItems);
    listItems.forEach( function(item){
      var li = document.createElement('li');
      var text = document.createElement('p');
      var ul = document.getElementById('bucket-list');
      text.innerText = item.name;
      li.appendChild(text);
      ul.appendChild(li);
    })
  }
}

module.exports = ListView;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map