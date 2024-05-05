var apiURL = 'https://api.open-meteo.com/v1/forecast?latitude=40.754&longitude=-73.766&current=temperature_2m,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York'

/* Accessing API */
function getWeather(){
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
            console.log(data)
            setCurrentWeather(parseCurrentWeather(data));
            setDailyWeather(parseDailyWeather(data));
    })
    .catch(err => {
        alert(err);
    })
}

/* Parsing functions */
function parseCurrentWeather({current, daily}){
    const{ 
        temperature_2m: currentTemp, 
        wind_speed_10m: windSpeed,
        weather_code: iconCode,
    } = current
    const{
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
    } = daily
    return{
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        windSpeed: Math.round(windSpeed),
        iconCode,
    }
}
function parseDailyWeather({daily}){
    let highTemp = daily.temperature_2m_max;
    for(let i = 0 ; i < highTemp.length ; i++){
        highTemp[i] = Math.round(highTemp[i]);
    }
    return{
        timestamp: daily.time,
        iconCode: daily.weather_code,
        hightemp: highTemp,
    }
}

/* Setting functions to update html values */
function setCurrentWeather({currentTemp, highTemp, lowTemp, windSpeed, iconCode}){
    document.getElementsByClassName("today_icon")[0].src = iconToUrl(iconCode)

    document.getElementsByClassName("today_temp")[0].textContent = currentTemp;
    document.getElementsByClassName("today_high")[0].textContent = highTemp;
    document.getElementsByClassName("today_low")[0].textContent = lowTemp;
    document.getElementsByClassName("today_wind")[0].textContent = windSpeed;
}
function setDailyWeather({iconCode, hightemp}){
    let dayIcon = document.getElementsByClassName("day_icon")
    let dayTemp = document.getElementsByClassName("day_box_temp")
    let dayWeek = document.getElementsByClassName("day_box_day")
    const date = new Date();
    let day = date.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(let i = 0 ; i < dayIcon.length ; i++){
        dayIcon[i].src = iconToUrl(iconCode[i])
        dayTemp[i].textContent = hightemp[i]
        dayWeek[i].textContent = daysOfWeek[(day+i)%8]
    }
}

/* Translate iconCode to image urls */
//using map instead of if statements for ease of coding and expansion
const Icon_Map = new Map();
addMapping( [0,1] , "sun")
addMapping( [2] , "cloud_sun")
addMapping( [3,45,48] , "cloud")
//addMapping( [45,48] , "smog")
addMapping( [51,53,55,56,57,61,63,65,80,81,82] , "rain")
addMapping( [71,73,75,77,85,86] , "snow")
addMapping( [95,96,99] , "rain_bolt")
function addMapping(values, icon){
    values.forEach(value => {
        Icon_Map.set(value, icon)
    })
}
function iconToUrl(iconCode){
    return `./weatherIcons/${Icon_Map.get(iconCode)}.svg`
}

getWeather();
