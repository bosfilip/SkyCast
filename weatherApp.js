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
    
    forecast = {}
    let cardId = 0

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
    console.log(forecast)
}
