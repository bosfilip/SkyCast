const cityBut = document.querySelector('#cityBut');
const apiKey = "02d142c9c813666fb42479e9631860fa";

window.addEventListener('load', async () => {
    const defaultCity = "Warsaw";
    const data = await getApiData(defaultCity);
    dataPlacer(data);
});

cityBut.addEventListener('click', async event =>{
    event.preventDefault();
    const city = document.querySelector('#cityIn').value;
    if (city.length > 0){
        data = await getApiData(city);
        dataPlacer(data)
    }
    else{
        alert('City input cant be empty')
    }

})

async function getApiData(city){
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const apiForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const responseWeather = await fetch(apiWeatherUrl);
    const responseForecast = await fetch(apiForecastUrl)
    const weatherData = await responseWeather.json();
    const forecastData = await responseForecast.json();
    return {weatherData, forecastData}
}

function dataPlacer(data){
    const {name: city,
           main: {temp,feels_like,humidity},
           wind: {speed: windSpeed}
          } = data.weatherData
    console.log(data.weatherData)
    forecast = {}
    let cardId = 0
    console.log(data.weatherData)

    for (let i=0; i<6; i++){
        cardId += 1 
        const forecastItem = data.forecastData.list[i]
        const {dt_txt,
               main: {temp_min,
                      temp_max},
               weather: 
                     {0:{id,
                         description}}} = forecastItem
        const dt_txtParts = dt_txt.split(' ');
        card = {
            time: dt_txtParts[1],
            tempMinCard: temp_min,
            tempMaxCard: temp_max,
            weatherIdCard: id,
            weatherDescriptionCard: description
        };
        forecast[cardId] = card;
    }

    const today = new Date();
    const formatedDate = today.toLocaleDateString();
    const formatedTime = today.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const todaySpan = `${formatedDate} | ${formatedTime}`;

    document.querySelector('#cityP').textContent = city;
    document.querySelector('#dateP').textContent = todaySpan; 
    document.querySelector('#temp').textContent = temp.toFixed(1);
    document.querySelector('#weatherP').textContent = forecast[1].weatherDescriptionCard;
    document.querySelector('#feelsLike').textContent = `Feels like: ${feels_like}°C`;
    document.querySelector('#humidity').textContent = `Humidity: ${humidity}%`;
    document.querySelector('#windSpeed').textContent = `Wind: ${windSpeed} km/h`;

    for (let i = 1; i <= 6; i++){
        const hourCard = document.querySelector(`#hourCard${i}`);
        const tempCard = document.querySelector(`#tempCard${i}`);
        const weatherCard = document.querySelector(`#weatherCard${i}`);
        const imgCard = document.querySelector(`#imgCard${i}`);
        const f = forecast[i];
        if (hourCard && tempCard && weatherCard && imgCard && f){
            hourCard.textContent = f.time;
            tempCard.textContent = `${f.tempMinCard.toFixed(1)}°C - ${f.tempMaxCard.toFixed(1)}°C`;
            weatherCard.textContent = f.weatherDescriptionCard;
            let icon = "/weatherIcons/sun.png";
            if (f.weatherIdCard >= 200 && f.weatherIdCard < 600) icon = "/weatherIcons/rain.png";
            else if (f.weatherIdCard >= 600 && f.weatherIdCard < 700) icon = "/weatherIcons/snow.png";
            else if (f.weatherIdCard >= 700 && f.weatherIdCard < 800) icon = "/weatherIcons/fog.png";
            else if (f.weatherIdCard === 800) icon = "/weatherIcons/sun.png";
            else if (f.weatherIdCard > 800) icon = "/weatherIcons/cloudy.png";
            imgCard.src = icon;
        }
    }
}
