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
	let iconElement = document.querySelector("#icon");
	let icon = responce.data.weather[0].icon;
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${icon}@2x.png`
	);
	ctemp = responce.data.main.temp;
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
	temperatureElement.innerHTML =Math.round(ctemp);
}

let ftemp = document.querySelector("#ftemp");
ftemp.addEventListener("click", convertionF);

let ctemp = document.querySelector("#ctemp");
ctemp.addEventListener("click", convertionC);
