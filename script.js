const apiKey = "YOUR_API_KEY"; // <-- put your API key here
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");
const loading = document.getElementById("loading");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  weatherCard.classList.add("hidden");
  loading.style.display = "block";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    loading.style.display = "none";
  }
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("temperature").textContent = Math.round(
    data.main.temp
  );
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;

  const icon = data.weather[0].icon;
  document.getElementById(
    "weatherIcon"
  ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherCard.classList.remove("hidden");
}
