

fetch("https://splendid-ginger-boat.glitch.me/movies").then(resp => resp.json()).then(data=>console.log(data));

function updateLocation(longitude, latitude){
    const weatherURL = "http://api.openweathermap.org/data/2.5/forecast";
    $.get(weatherURL,{
        APPID: OPENWEATHER_KEY,
        lat: latitude,
        lon: longitude,
        units: "imperial"
    }).done(function(data){
        let day1Forecast = data.list[0];
        let day2Forecast = data.list[8];
        let day3Forecast = data.list[16];
        let day4Forecast = data.list[24];
        let day5Forecast = data.list[32];
        console.log(data);

        updateForecast("#day1", day1Forecast);
        updateForecast("#day2", day2Forecast);
        updateForecast("#day3", day3Forecast);
        updateForecast("#day4", day4Forecast);
        updateForecast("#day5", day5Forecast);

        let cityName = data.city.name
        /* POPULATES CITY NAME INTO NAVBAR BY ELEMENT ID*/
        const $cityNameElement = document.getElementById('cityName');
        $cityNameElement.innerText = `5 Day Forecast of ${cityName}`;
    });

const $element = $(elementId);
$element.html(`
		<div class="card days">
			<div class="row">
				<div class="col-6 dayName"><em>${dayName}</em></div>
				<div class="col-6 weatherPic"><img src="http://openweathermap.org/img/w/${icon}.png"/></div>
			</div>
			<div class="row dayData">
				<div class="col-3">Temp: ${forecast.main.temp}&deg;F</div>
				<div class="col-3">Rain: ${forecast.pop}%</div>
				<div class="col-3">Humidity: ${forecast.main.humidity}%</div>
				<div class="col-3">Wind: ${forecast.wind.speed} mph</div>
			</div>
		</div>
		`);