const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_KEY = '2781fdabd3f202fbd904b289dca533a0'; 

async function fetchWeatherData(cityName) {
  const urlWeatherByCity = `${WEATHER_API_URL}/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;

  try {
    const response = await fetch(urlWeatherByCity);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

async function fetchWeather() {
  const cityInput = document.getElementById('city-input').value;
  const weatherInfoElement = document.getElementById('weather-info');

  try {
    const weatherData = await fetchWeatherData(cityInput);
    if (weatherData) {
      weatherInfoElement.innerHTML = `
        <h2>Weather in ${weatherData.name}</h2>
        <p>Temperature: ${weatherData.main.temp} °C</p>
        <p>Pressure: ${weatherData.main.pressure} hPa</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
        <p>Wind Direction: ${weatherData.wind.deg}°</p>
        <p>Cloudiness: ${weatherData.clouds.all}%</p>
        <p>Sunrise: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
        <p>Weather Condition: ${weatherData.weather[0].main}</p>`;
        
    } else {
      weatherInfoElement.innerHTML = `<p>No weather data available for ${cityInput}</p>`;
    }
  } catch (error) {
    console.error('Error:', error);
    weatherInfoElement.innerHTML = `<p>Error fetching weather data.</p>`;
  }
}

document.getElementById('fetch-button').addEventListener('click', fetchWeather);
