// create a funciton that, on click, will retrieve user input, call weatherAPI and return weather details for given date

// on click
$("#gw-btn").on('click',(function(){
	// capture user input and save as cityName
    var cityName = $("#user-input").val()
	
	// show the todaycard and print current date
    $("#today-card").show();
    $("#current-day").text(moment().format('MMMM Do, YYYY'));
	
	// fetch necessary data from open weather API
	fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=0f7a14279d2aa10b4c3e156acc3140a9")
		.then(response => response.json())
		.then(response => {
			
			// declare variables for weather values obtained from repsonse
			var locationName = response.name
			var temp = response.main.temp
			var humidity = response.main.humidity
			var windSpeed = response.wind.speed
			
			// lat and lon will be used to pull from open weather UV API
			var lat = response.coord.lat
			var lon = response.coord.lon

			// declare variable for weather condition icon
			var weatherImg = response.weather[0].icon
			
			// set icon url variable and concat with above variable
			var iconurl = "http://openweathermap.org/img/w/" + weatherImg + ".png";
			
			// print values to 'todaycard'
			$('#wicon').attr('src', iconurl,).width(125);
			$("#city-name").text(locationName);
			$("#temperature").text(temp);
			$("#humidity").text(humidity);
			$("#wind-speed").text(windSpeed);


			// console.log(locationName)
			// console.log(temp)
			// console.log(conditions)
			// console.log(humidity)
			// console.log(windSpeed)
			// console.log(weatherImg)
			// console.log(lat)
			// console.log(lon)

			// fetch UV-index from coresponding API using latitude and longitude obtained from previous call
			
			fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + lat +"&lon=" + lon + "&appid=0f7a14279d2aa10b4c3e156acc3140a9")
			.then(response => response.json())
			.then(response => {
				var uvIndex = response.value

				// print UV-index to card
				$("#uv-index").text(uvIndex);

				// set conditions for UV background color
				if (uvIndex >= 11) {
					$("#uv-index").css("background-color", "purple");
				} else if (uvIndex >= 8 && uvIndex <= 10) {
						$("#uv-index").css("background-color", "red");
				} else if (uvIndex >= 6 && uvIndex <= 7) {
						$("#uv-index").css("background-color", "orange");
				} else if (uvIndex >= 3 && uvIndex <= 5) {
						$("#uv-index").css("background-color", "yellow");
				} else {
						$("#uv-index").css("background-color", "green");
				}

				// console.log(uvIndex)
				
			})
		})
	
}));




// OpenWeatherAPIkey
// "0f7a14279d2aa10b4c3e156acc3140a9"
