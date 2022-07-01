let now = new Date();

let days = [
	"#",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];
let date = document.querySelector("#datetime");
date.innerHTML = `${days[now.getDay()]}  ${now.getHours()}:${now.getMinutes()}`;

function displayTemperature(response) {
	let temperatureElement = document.querySelector("#temp");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = response.data.name;
	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.weather[0].description;
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = response.data.main.humidity;
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = Math.round(response.data.wind.speed);
	let iconElement = document.querySelector("#icon");
	let icon = response.data.weather[0].icon;
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${icon}@2x.png`
	);
	ctemp = response.data.main.temp;
	getForecast(response.data.coord);
}

function search(city) {
	let apiKey = "4be4c5e07e7604cd26d0eb3ec1d11faf";
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#cityInput");
	search(cityInputElement.value);
}
let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

search("Paris");

///convert

function convertionF(event) {
	event.preventDefault();
	let fahrenheitTemperature = Math.round((ctemp * 9) / 5 + 32);
	let temperatureElement = document.querySelector("#temp");
	temperatureElement.innerHTML = fahrenheitTemperature;
}
function convertionC(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temp");
	temperatureElement.innerHTML = Math.round(ctemp);
}

let ftemp = document.querySelector("#ftemp");
ftemp.addEventListener("click", convertionF);

let ctemp = document.querySelector("#ctemp");
ctemp.addEventListener("click", convertionC);

///forecast

function formatDay(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	return days[day];
}

function displayForecast(response) {
	let forecast = response.data.daily;
	let forecastElement = document.querySelector("#forecast");

	let forecastHTML = `<div class="row">`;

	forecast.forEach(function (forecastDay, index) {
		if (index <6 ){

		
		forecastHTML =
			forecastHTML +
			`<div class="col-2">

							<div class="weatherForecastdate">
								${formatDay(forecastDay.dt)}
							</div>
							
		<img src="http://openweathermap.org/img/wn/${
			forecastDay.weather[0].icon
		}@2x.png"
								class="imageForecast" alt="partly_cloudy" id="icon" width="36">
							<div class="weatherForecastTemp">
								<span class="weatherForecastTemp-max">
									${Math.round(forecastDay.temp.max)}°
								</span>
								<span class="weatherForecastTemp-min">
								${Math.round(forecastDay.temp.min)}°
								</span>
								</div>
								</div>
								
							`;  }
	});
	forecastHTML = forecastHTML + `</div>`;

	forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "4be4c5e07e7604cd26d0eb3ec1d11faf";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}

displayForecast();
