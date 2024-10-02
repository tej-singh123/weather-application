let cityName = document.querySelector(".weather-city");
let dateTime = document.querySelector(".weather-date-time");
let w_forecast = document.querySelector(".weather-forecast");
let w_temperature = document.querySelector(".weather-temperature");
let w_icon = document.querySelector(".weather-icon");
let w_minTem = document.querySelector(".weather-min");
let w_maxTem = document.querySelector(".weather-max");


let w_feelslike = document.querySelector(".weather-feelslike");
let w_humidity = document.querySelector(".weather-humidity");
let w_wind = document.querySelector(".weather-wind");
let w_pressure = document.querySelector(".weather-pressure");

let citySearch = document.querySelector(".weather-search");


// to get the actual country name
const getCountryName = (code)=>{
    return  new Intl.DisplayNames([code],{type:"region"}).of(code);
};

// to get the ddate and time 
const getDateTime = (dt)=>{
  
const curdate = new Date(dt*1000);
console.log(curdate);

const option  = {
    weekday:"long",
    year:"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
};

const formatter  = new Intl.DateTimeFormat("en-US",option);
console.log(formatter);
return formatter.format(curdate);
};

  let city = "pune";
//   search functionalty
citySearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = document.querySelector(".city-name");
    console.log(cityName.value);
    city = cityName.value;
    getWeatherData();
    cityName.value = ""; 
})


const getWeatherData = async()=>{

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5b20207940d05edef1a8e0343bac0305`;
    try{
       const res  = await fetch(weatherUrl);
       const data = await res.json();
       console.log(data);

    const {main,name,weather,wind,sys,dt} = data; 

    cityName.innerHTML = ` ${name},${getCountryName(sys.country)}`;

    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML =  ` <img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    w_temperature.innerHTML =`${Math.round(main.temp -273.15)}&#176<sup>c</sup>`;
    w_minTem.innerHTML = `Min:${main.temp_min.toFixed()}&#176`;
    w_maxTem.innerHTML = `Min:${main.temp_max.toFixed()}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_feelslike.innerHTML = `${main.feels_like.toFixed()}&#176`;

    }catch(error){
        console.log(error)
    }
};


document.body.addEventListener('load',getWeatherData());