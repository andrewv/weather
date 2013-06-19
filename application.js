$(document).ready(function() {

$('#getLocation').on('click',function(){ 
var latitude = "-33";
var longitude = "151";
	var forecastAPI = "eb7c3e22432c13886bbc7894291be3bb" //API key for forecast.io
		var JSONURL = "https://api.forecast.io/forecast/" + forecastAPI + "/" + latitude + "," + longitude + "?units=si";
		
	$.getJSON(JSONURL, function(jsonData) { //Function to grab the JSON DATA
		var todayTempMin = (jsonData["daily"]["data"][0]["temperatureMin"]);
		console.log(jsonData["daily"]["data"][0]["temperatureMin"]);
		console.log("Minimum temperature " + todayTempMin);
		var todayRain = (jsonData["daily"]["data"][0]["precipIntensity"]);
		console.log(jsonData["daily"]["data"][0]["time"]);
		var todayHumidity = (jsonData["daily"]["data"]["humidity"]);
		$("#titleDiv").html(jsonData["daily"]["precipIntensity"]);
    });
});
		
		

/*** $('#getLocation').on('click',function(){ 

        if (geo_position_js.init()) {
            geo_position_js.getCurrentPosition(show_map, handle_error);
        }

    });
    function show_map(position) {
        var latitude = position.coords.latitude; //gets latitude
        var longitude = position.coords.longitude; //gets longitude
        console.log(latitude);
        console.log(longitude);
		
		var forecastAPI = "eb7c3e22432c13886bbc7894291be3bb" //API key for forecast.io
		var JSONURL = "https://api.forecast.io/forecast/" + forecastAPI + "/" + latitude + "," + longitude;
		
		$.getJSON(JSONURL,function(result){
			$.each(result, function(i, field){
				$("div").append(field + " ");
				});
				});
		


    }
    function handle_error(err) {
        alert(err.code);
        if (err.code == 1) {
            // user said no!
        }
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(show_map, handle_error);
    } else {
        error('not supported');
    } ***/
  
});

	
