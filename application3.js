var Location = {}; //global object

$(document).ready(function() {    
	var forecastAPI = "eb7c3e22432c13886bbc7894291be3bb" 
	var JSONURL = "https://api.forecast.io/forecast/" + forecastAPI + "/" + 34.056281 + "," + -78.890304;
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
				if (document.getElementById('userMale').checked) {
					var userGender = "0"
						console.log("male");
				} else {
				if (document.getElementById('userFemale').checked) {
					var userGender = "1.5" //gender temperature offset
						console.log("Female");
					}
				}
		
				/***GETS AGE ***/
				var userAge = ($("#userAge").val());
					console.log("age is" + userAge);
	
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

				$("#resultDiv").html("<p>" + (roundedUserApparentTemp) + "C</p>");
				
				
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

    }
    
});	//closes doc.ready