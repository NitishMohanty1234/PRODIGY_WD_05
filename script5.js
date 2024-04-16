const locationForm = document.getElementById('locationForm');
const locationInput = document.getElementById('location');
const weatherDisplay = document.getElementById('weather');

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value;
  getWeather(location);
});

async function getWeather(location) {
  const apiKey = "fc906af703e039fd609150bc41a74ad7";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (response.ok) {
      const weatherInfo = `
        <p>Location: ${data.name}, ${data.sys.country}</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
      `;
      weatherDisplay.innerHTML = weatherInfo;
    } else {
      weatherDisplay.textContent = 'Error fetching weather data';
    }
  } catch (error) {
    weatherDisplay.textContent = 'Error fetching weather data';
  }
}
