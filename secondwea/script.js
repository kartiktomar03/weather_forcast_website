const weatherApiKey = "230b394df3ca35819793abfe4539bbfd"; 
const googleMapsApiKey = "EMPTY"; 

// Get Weather Details
document.getElementById("city-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = document.getElementById("city").value.trim();
    if (!city) return alert("Please enter a city name");

    const weatherBody = document.getElementById("weather-body");
    try {
        // Fetch current weather and 5-day forecast
        const currentWeather = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`
        ).then((res) => res.json());

        const forecast = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${weatherApiKey}`
        ).then((res) => res.json());

        displayCurrentWeather(currentWeather);
        displayForecast(forecast);

        changeTheme(currentWeather.weather[0].main.toLowerCase(), weatherBody);
    } catch (error) {
        alert("City not found");
    }
});

// Display Current Weather
function displayCurrentWeather(data) {
    document.getElementById("current-location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("current-temp").textContent = data.main.temp;
    document.getElementById("current-humidity").textContent = data.main.humidity;
    document.getElementById("current-wind").textContent = data.wind.speed;
    document.getElementById("current-rainfall").textContent = data.rain ? data.rain["1h"] : "No rain";
    document.getElementById("current-description").textContent = data.weather[0].description;
    document.getElementById("current-weather").classList.remove("hidden");
}

// Display 5-Day Forecast
function displayForecast(data) {
    const forecastDiv = document.getElementById("forecast-cards");
    forecastDiv.innerHTML = "";
    data.list.forEach((item, index) => {
        if (index % 8 === 0) {
            const card = document.createElement("div");
            card.innerHTML = `
                <p>Date: ${item.dt_txt.split(" ")[0]}</p>
                <p>Temp: ${item.main.temp}°C</p>
                <p>Description: ${item.weather[0].description}</p>
            `;
            forecastDiv.appendChild(card);
        }
    });
    document.getElementById("forecast").classList.remove("hidden");
}


function changeTheme(weather, body) {
    body.className = ""; 
    if (weather.includes("rain")) {
        body.classList.add("rainy");
    } else if (weather.includes("cloud")) {
        body.classList.add("cloudy");
    } else if (weather.includes("clear")) {
        body.classList.add("clear");
    } else if (weather.includes("sun")) {
        body.classList.add("sunny");
    }
}


function goToRecommendations() {
    window.location.href = "recommendations.html";
}


function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
}
