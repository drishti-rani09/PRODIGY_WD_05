const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");
const weatherCondition = document.getElementById("weather-condition");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");


async function getWeather(city) {

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
    }

const { latitude, longitude, name, country } = geoData.results[0];

const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

const weatherResponse = await fetch(weatherUrl);
const weatherData = await weatherResponse.json();

cityName.textContent = `${name}, ${country}`;

temperature.textContent =
    `${weatherData.current.temperature_2m}°C`;

humidity.textContent =
    `${weatherData.current.relative_humidity_2m}%`;

windSpeed.textContent =
    `${weatherData.current.wind_speed_10m} km/h`;

    const weatherCode = weatherData.current.weather_code;
    if(weatherCode === 0){
        weatherIcon.textContent = "☀️";
    }
    else if(weatherCode <= 3){
        weatherIcon.textContent ="🌤️";
    }
    else if(weatherCode <= 48){
        weatherIcon.textContent ="🌫️";
    }
    else if(weatherCode <= 67){
        weatherIcon.textContent ="🌧️";
    }
    else if(weatherCode <= 77){
        weatherIcon.textContent="❄️";
    }
    else{
        weatherIcon.textContent ="⛈️";
    }
   

if (weatherCode === 0) {
    weatherCondition.textContent = "Clear Sky";
} else if (weatherCode <= 3) {
    weatherCondition.textContent = "Partly Cloudy";
} else if (weatherCode <= 48) {
    weatherCondition.textContent = "Foggy";
} else if (weatherCode <= 67) {
    weatherCondition.textContent = "Rainy";
} else if (weatherCode <= 77) {
    weatherCondition.textContent = "Snowy";
} else {
    weatherCondition.textContent = "Thunderstorm";
}
}
async function searchWeather(){
    const city= cityInput.value.trim();
    console.log("searched city:",city);
    if(city === ""){
        errorMessage.textContent = "Please Enter a city name";
        return;
    }
    errorMessage.textContent = "";
    loadingMessage.textContent = "Loading...";
    try{
        await getWeather(city);
    }
    catch(error){
        errorMessage.textContent = error.message;
    }
    finally{
        loadingMessage.textContent = "";
    }
}
searchBtn.addEventListener("click",searchWeather);
cityInput.addEventListener("keydown",function(event){
    if(event.key === "Enter"){
        searchWeather();
    }
});
getWeather("Bengaluru");