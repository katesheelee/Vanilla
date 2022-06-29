function formatDate(timestamp) {
	let now = new Date(timestamp);
	let hours = now.getHours();
	let minutes = now.getMinutes();
	let day = now.getDay();

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
	return `${days[day]} ${hours}:${minutes}`;
}

function displayTemperature(responce) {
	let temperatureElement = document.querySelector("#temp");
	temperatureElement.innerHTML = Math.round(responce.data.main.temp);
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = responce.data.name;
	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = responce.data.weather[0].description;
	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = responce.data.main.humidity;
	let windElement = document.querySelector("#wind");
	windElement.innerHTML = Math.round(responce.data.wind.speed);
	let dateElement = document.querySelector("#date");
	dateElement.innerHTML = formatDate(responce.data.dt * 1000);
}

let apiKey = "4be4c5e07e7604cd26d0eb3ec1d11faf";
let city = "Paris";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url).then(displayTemperature);
