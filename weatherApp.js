const cityBut = document.querySelector('#cityBut');
const apiKey = "02d142c9c813666fb42479e9631860fa";

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
           wind: windSpeed,

    } = data.weatherData
    const {} = data.forecastData
    console.log(data.forecastData)
}
