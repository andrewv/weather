var Location = {}; //global object

$(document).ready(function() { 

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
		
		
	function displayError(error) {
		var errors = { 
			1: 'Permission denied',
			2: 'Position unavailable',
			3: 'Request timeout'
			};
		alert("Error: " + errors[error.code]);
		}
 
		function displayPosition(position) {
			Location.latitude = position.coords.latitude;
			Location.longitude = position.coords.longitude;   
			var forecastAPI = "eb7c3e22432c13886bbc7894291be3bb" 
			var JSONURL = "https://api.forecast.io/forecast/" + forecastAPI + "/" + Location.latitude + "," + Location.longitude;
			console.log(JSONURL);
	
	
    $('#getLocation').on('click', function(){
        $.ajax({
           url: JSONURL, //URL of JSON
           data: {'units':'si'}, // to add at end of URL
           dataType: "jsonp", //Data type (JSONP)
           jsonp : "callback", //Calls the function
           jsonpCallback: "parseData", //name of function
           success: function(data){
               parseData(data); //runs this function
			   }
		});
		});
    
    function parseData(rtdata){
        var userHeight = ($('#userHeight').val()); 
		var userWeight = ($('#userWeight').val()); 
		var userBMI = userWeight/((userHeight/100)^2)
			console.log("User BMI" + userBMI);
		var userBMIOffset = (25 - userBMI)/5; //user BMI offset .. positive values underweight, negative values overweight
			console.log("user bmi offset " + userBMIOffset);
					
				/***GETS USER GENDER ***/
				if (document.getElementById('userGender').value == "male") {
					var userGender = "0"
						console.log("male");
				} else {
				if (document.getElementById('userGender').value == "female") {
					var userGender = "1.5" //gender temperature offset
						console.log("Female");
					}
				}
		
				/***GETS AGE ***/
				var userAge = ($("#userAge").val());
					console.log("age is" + userAge);
					
				document.getElementById('replaceInfo').innerHTML = "<h2>Loading</h2>";
	
				/***TEMPERATURE NOW ***/
	
				var currentTemp = rtdata["currently"]["temperature"];
					console.log("Current Temperature " + currentTemp);
				var currentWind = rtdata["currently"]["windSpeed"];
					console.log("Current Wind " + currentWind);
				var currentRH = rtdata["currently"]["humidity"];
					console.log("Current RH " + currentRH);
				/**Finds water vapour pressure from relative humidity and current temperature**/
				var currentVapourPressure = currentRH * 6.105 * (Math.E^((17.27*currentTemp)/(237.7+currentTemp)));
					console.log("vapour " + currentVapourPressure);
				/**Finds apparent 'feels like' temperature' from the above data**/
				var currentApparentTemp = (currentTemp + (0.33 * currentVapourPressure) - (0.70 * currentWind) - 4);
					console.log("Apparent Temperature " + currentApparentTemp);
		
				/*** ADJUSTING APPARENT TEMPERATURE ACCORDING TO BODY BASED ON VERY LOOSE UNSCIENTIFIC OBSERVATIONS ***/
		
				var userApparentTemp = currentApparentTemp - userGender; //makes it colder for women
					console.log("after gender" + userApparentTemp);

				userApparentTemp = userApparentTemp - userBMIOffset; //higher BMI retains temperatures more
					console.log("after BMI" + userApparentTemp);
			
				var roundedUserApparentTemp = Math.round(userApparentTemp * 10)/10;
				
				//**RAIN
				
				var precipType = rtdata["currently"]["precipType"];
				console.log(rtdata["currently"]["precipIntensity"]);
				console.log(precipType);
				
				if (rtdata["currently"]["precipIntensity"] == 0) {
					var precipIntensity = 0
				} else {
					var precipProbability  = rtdata["currently"]["precipType"];
				}
				
				if (rtdata["currently"]["precipIntensity"] <0.1) {
					var precipIntensity = "lightly"
				} else {
					if (rtdata["currently"]["precipIntensity"] <0.4) {
						var precipIntensity = "moderately"
					} else {
						if (rtdata["currently"]["precipIntensity"] >0.4) {
							var precipIntensity = "heavily"
							}
					}
				}
				

				
				
				
				//*** CLOTHING *** Name of item, CLO value, Layer value //
				var maleClothing = [
				[["T-Shirt"],0.09,1],
				[["Light short sleeve shirt"],0.14,1],
				[["Light long sleeve shirt"],0.22,1],
				[["Heavy short sleeve shirt"],0.25,1],
				[["Heavy long sleeve shirt"],0.29,1],
				[["Light sweater"],0.20,2],
				[["Heavy sweater"],0.37,2],
				[["Light jacket"],0.22,3],
				[["Heavy jacket"],0.49,3]
				];
				
				var targetCLOValue = -(0.04*userApparentTemp)+1.13
				
				console.log(targetCLOValue);
				
		
				
				
				
				//*HTML EDITING
				
				document.getElementById('replaceInfo').innerHTML = ""; //removes info
				$("#replaceInfo").html("<h2>The temperature is " + currentTemp + "C</h2><br><h2>For you, it feels like " + (roundedUserApparentTemp) + "C</h2>");
				
				
				
			}	

    }
    
});	//closes doc.ready