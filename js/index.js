var tempF

function getWeather(lat, lon) {
	var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=14fd0e638627080972ee8d823b5bbb89"
	$.getJSON(weatherUrl, function(data) {
		tempF = Math.round(data.main.temp);
		$("#temp").html(tempF);
		$("#temp-unit").html("&#8457");
		$("#location").html(data.name + ", " + data.sys.country);
		$("#sky").html(data.weather[0].description);
		var weather = data.weather[0].main;
		weatherIcon(weather);
	})
}

function toggleFC() {
	var t = document.getElementById("temp").innerHTML;
	var tempUnit = document.getElementById("temp-unit").innerHTML;
	if (tempUnit == String.fromCharCode(8457) ) {
		document.getElementById("temp").innerHTML = Math.round((t - 32)/1.8);
		document.getElementById("temp-unit").innerHTML = "&#8451";
	}
	if (tempUnit == String.fromCharCode(8451) ) {
		document.getElementById("temp").innerHTML = tempF;
		document.getElementById("temp-unit").innerHTML = "&#8457";
	}
}

function weatherIcon(weather) {
	var data = document.getElementById("sky").innerHTML;
	switch(weather) {
		case "Clear":
			text = "<i class='wi wi-day-sunny'></i>";
			break;
		case "Clouds":
			text = "<i class='wi wi-cloudy'></i>";
			break;
		case "Rain":
			text = "<i class='wi wi-rain'></i>";
			break;
			case "Drizzle":
			text = "<i class='wi wi-rain-mix'></i>";
			break;
			case "Thunderstorm":
			text = "<i class='wi wi-thunderstorm'></i>";
			break;
		case "Snow":
			text = "<i class='wi wi-snow'></i>";
			break;
			case "Atmosphere":
			text = "<i class='wi wi-fog'></i>";
			break;
		default:
			text = "";
	}
	document.getElementById("weather-icon").innerHTML = text;
}

$(document).ready(function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
					var lat = position.coords.latitude;
					var lon = position.coords.longitude;
					getWeather(lat, lon);
				});
    } else { 
        console.log("Geolocation is not supported by this browser.");
    }
	$("#toggle-unit").on("click", toggleFC);
});