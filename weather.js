const locationElement = document.getElementById("location");
const temperatureElement = document.getElementById("temperature");
const conditionElement = document.getElementById("condition");
const unitToggle = document.getElementById("unitToggle");
const backgroundElement = document.getElementById("background");

// Function to get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeather(latitude, longitude);
            },
            function (error) {
                console.log('Error:', error.message);
            }
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

// Function to fetch weather data from API
function getWeather(latitude, longitude) {
    const apiUrl = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to fetch weather data.');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error:', error.message);
        });
}

// Function to display weather data
function displayWeather(data) {
    const location = data.name + ", " + data.sys.country;
    const temperature = data.main.temp;
    const condition = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    locationElement.textContent = location;
    temperatureElement.textContent = temperature.toFixed(1) + " °C";
    conditionElement.textContent = condition;

    // Update background image based on weather condition
    updateBackground(iconCode);
}

// Function to update background image based on weather condition
function updateBackground(iconCode) {
    const imageUrl = `https://weather-proxy.freecodecamp.rocks/api/img/w/${iconCode}.png`;
    backgroundElement.style.backgroundImage = `url(${imageUrl})`;
}

// Event listener for unit toggle
unitToggle.addEventListener("change", function () {
    if (unitToggle.checked) {
        temperatureElement.textContent = (parseFloat(temperatureElement.textContent) * 1.8 + 32).toFixed(1) + " °F";
    } else {
        temperatureElement.textContent = ((parseFloat(temperatureElement.textContent) - 32) / 1.8).toFixed(1) + " °C";
    }
});

// Get user's location and fetch weather data
getLocation();

