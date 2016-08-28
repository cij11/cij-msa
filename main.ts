var textInput : string;

class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return this.greeting;
    }
};

var greeter = new Greeter("Hello, user! Using typescript and jquery");    
$("#heading1").text(greeter.greet());

$("#button1").on("click", function(){
    sendAjaxRequest1();
});

$("#button2").on("click", function(){
    sendAjaxRequest2();
});

$("#button3").on("click", function(){
    sendAjaxRequest3();
});

$("#button4").on("click", function(){
    sendAjaxWeatherRequestByCity(textInput);
});

$("#button5").on("click", function(){
    sendAjaxWeatherRequestIP();
});

function sendAjaxRequest1() {
$.getJSON( "http://api.fixer.io/latest", function( data ) {
    var NZrate : string;
    NZrate = data.rates.NZD;

  alert(NZrate);
});
}

function sendAjaxRequest2(){
$.getJSON( "http://api.fixer.io/latest", function( data ) {
    var USrate : string;
    USrate = data.rates.USD;

  alert(USrate);
});
}

function sendAjaxRequest3(){
$.ajax({
    dataType : "json",
    url: "http://api.fixer.io/latest",
    success : function (data){
        var AUrate : string;
        AUrate = data.rates.AUD;
        alert(AUrate);
    }
});
}

function sendAjaxWeatherRequest(){
  $.ajax({
  url : "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/conditions/q/NZ/Christchurch.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
}

function sendAjaxWeatherRequestByCity(city : String){
  $.ajax({
  url : "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/conditions/q/NZ/" + city + ".json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
}

function sendAjaxWeatherRequestByCountryCity(country : String, city : String){
  $.ajax({
  url : "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/conditions/q/" + country + "/" + city + ".json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
}

function sendAjaxWeatherRequestLatLong(){
  $.ajax({
  url : "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/q/37.776289,-122.395234.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  alert("Current temperature in " + location + " is: " + temp_f);
  }
  });
}

function sendAjaxWeatherRequestIP(){
    $.ajax({
  url : "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/q/autoip.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var cityString = parsed_json['location']['city'];
  var countryString = parsed_json['location']['country'];
  //alert("Current location is " + cityString + ", " + countryString);

  sendAjaxWeatherRequestByCountryCity(countryString, cityString);
  }
  });
}



/*function sendAjaxRequest() {
    alert("Ajax sending...");
$.getJSON( "http://api.open-notify.org/iss-now.json", function( data ) {
  alert("Ajax iss get succeeded");
});
}*/

//  $("#demo").text("Button clicked");


function othername() {
    textInput = document.getElementById("userInput").value;
    sendAjaxWeatherRequestByCity(textInput);
}

