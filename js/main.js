var textInput;
$(document).ready(function () {
    sendAjaxWeatherRequestIP();
});
var WeatherReport = (function () {
    function WeatherReport(city, temp, pressure, humidity, speed, direction) {
        this.city = city;
        this.temp = temp;
        this.pressure = pressure;
        this.humidity = humidity;
        this.speed = speed;
        this.direction = direction;
        this.cascadeDelay = 300;
    }
    WeatherReport.prototype.updateInformationPanel = function () {
        $("#cityPara").text("City: " + this.city);
        $("#tempPara").text("Temperature: " + this.temp + " C");
        $("#pressurePara").text("Pressure: " + this.pressure + " mb");
        $("#humidityPara").text("Humidity: " + this.humidity);
        $("#windSpeedPara").text("Windspeed: " + this.speed + "km/h");
        $("#windDirectionPara").text("Wind direction: " + this.direction);
        $("#cityPara").fadeIn();
        $("#tempPara").delay(this.cascadeDelay).fadeIn();
        $("#pressurePara").delay(this.cascadeDelay * 2).fadeIn();
        $("#humidityPara").delay(this.cascadeDelay * 3).fadeIn();
        $("#windSpeedPara").delay(this.cascadeDelay * 4).fadeIn();
        $("#windDirectionPara").delay(this.cascadeDelay * 5).fadeIn();
    };
    return WeatherReport;
}());
function startLoading() {
    $("#cityPara").hide();
    $("#tempPara").hide();
    $("#pressurePara").hide();
    $("#humidityPara").hide();
    $("#windSpeedPara").hide();
    $("#windDirectionPara").hide();
    $('.spin').spin('show');
}
function stopLoading() {
    $('.spin').spin('hide');
}
$("#button1").on("click", function () {
    sendAjaxWeatherRequestIP();
});
$("#button2").on("click", function () {
    sendAjaxWeatherRequestByCity(textInput);
});
function sendAjaxWeatherRequest() {
    $.ajax({
        url: "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/conditions/q/NZ/Christchurch.json",
        dataType: "jsonp",
        success: function (parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_c = parsed_json['current_observation']['temp_c'];
            alert("Current temperature in " + location + " is: " + temp_c);
        }
    });
}
function sendAjaxWeatherRequestByCity(city) {
    $.ajax({
        url: "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/conditions/q/NZ/" + city + ".json",
        dataType: "jsonp",
        success: function (parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_c = parsed_json['current_observation']['temp_c'];
            alert("Current temperature in " + location + " is: " + temp_c);
        }
    });
}
function sendAjaxWeatherRequestByCountryCity(country, city) {
    $.ajax({
        url: "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/conditions/q/" + country + "/" + city + ".json",
        dataType: "jsonp",
        success: function (parsed_json) {
            var temp_c = parsed_json['current_observation']['temp_c'];
            var pressure_mb = parsed_json['current_observation']['pressure_mb'];
            var humidity_percent = parsed_json['current_observation']['relative_humidity'];
            var windspeed_kph = parsed_json['current_observation']['wind_kph'];
            var wind_direction = parsed_json['current_observation']['wind_dir'];
            var weatherReport = new WeatherReport(city, temp_c, pressure_mb, humidity_percent, windspeed_kph, wind_direction);
            stopLoading();
            weatherReport.updateInformationPanel();
            // alert("Current temperature in " + country + " is: " + temp_c);
        }
    });
}
function sendAjaxWeatherRequestIP() {
    startLoading();
    $.ajax({
        url: "http://api.wunderground.com/api/01f6c27699f54bb4/geolookup/q/autoip.json",
        dataType: "jsonp",
        success: function (parsed_json) {
            var cityString = parsed_json['location']['city'];
            var countryString = parsed_json['location']['country'];
            //alert("Current location is " + cityString + ", " + countryString);
            sendAjaxWeatherRequestByCountryCity(countryString, cityString);
        }
    });
}
