var ListView = require('./views/listView');

var app = function(){
  var url = "http://localhost:3000/list";
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
  var quoteString = this.responseText;
  var quotes = JSON.parse(quoteString);
  var ui = new QuoteView(quotes);
};


window.addEventListener('load', app);