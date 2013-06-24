var Location = {}; //global object

$(document).ready(function() {
	$('#getLocation').on('click',function(){ 
		if (navigator.geolocation) {
			var timeoutVal = 10 * 1000 * 1000;
				navigator.geolocation.getCurrentPosition(
				displayPosition, 
				displayError,
				{ enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
				);
		}
			else {
				alert("Geolocation is not supported by this browser");
				}
		}); 
		
	function displayError(error) {
		var errors = { 
			1: 'Permission denied',
			2: 'Position unavailable',
			3: 'Request timeout'
			};
		alert("Error: " + errors[error.code]);
		}
 
		function displayPosition(position) {
			alert("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
			Location.latitude = position.coords.latitude;
			Location.longitude = position.coords.longitude;
			var forecastAPI = "eb7c3e22432c13886bbc7894291be3bb" 
			var JSONURL = "https://api.forecast.io/forecast/" + forecastAPI + "/" + Location.latitude + "," + Location.longitude + "?units=si";
			console.log(JSONURL);
		

			$.ajax({
				url: JSONURL,
				data: {'units':'si'},
				dataType: "jsonp",
				jsonp : "callback",
				jsonpCallback: "parseData",
				success: function(data){
					parseData(data);
				}
			});
		 //closes onclick
    
    function parseData(rtdata){
		
		console.log("hello");
				
		
		
			};
		
});		
			//$.getJSON("TODAY.json", function(jsonData) {  ///**gets the JSON***
	
				/***GET USER INPUT **/
						//	}); //closes jsonDATA funciton
 

	//closes doc.ready

	
