const container = document.querySelector(".container");
const search = document.querySelector(".search-box");
const weather = document.querySelector(".weather");
const details = document.querySelector(".weather-detail");
const error = document.querySelector(".not-found");

search.addEventListener('click', ()  => {
    const APIkey = 'ad26fb20c12243d4d38357ea00175ff5';
    const city = document.querySelector(".search-box input").value;
    if(city == "")
        return ;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {
        if(json.cod == "404")
        {
            container.style.height = "500px";
            weather.classList.remove("active");
            details.classList.remove("active");
            error.classList.add("active");
            return ;
        }
        container.style.height = "500px";
        weather.classList.add("active");
        details.classList.add("active");
        error.classList.remove("active");
        const image = document.querySelector(".information img");
        const temp = document.querySelector(".information .temperature");
        const des = document.querySelector(".information .description");
        const humidity = document.querySelector(".weather-detail .humidity span");
        const wind = document.querySelector(".weather-detail .wind span");
        const backgound = document.querySelector("body");
        switch(json.weather[0].main)
        {
            case "Clear":
                image.src = "Images/clear.png";
                backgound.style.background = "url('Images/blue sky.jpg')";
                break;
            case "Cloud":
                image.src = "Images.cloud.png";
                backgound.style.background = "url('Images/cloudy sky.jpg')";
                break;
            case 'Haze':
                image.src = "Images/mist.png"
                backgound.style.background = "url('Images/mist weather.jpg')";
                break;
            case 'Mist':
                image.src = "Images/mist.png"
                backgound.style.background = "url('Images/mist weather.jpg')";
                break;
            case 'Rain':
                image.src = "Images/rain.png";
                backgound.style.background = "url('Images/rainy weather.jpg')";
                break;
            case "Snow":
                image.src = "Images/snow.png";
                backgound.style.background = "url('Images/snow weather.jpg')";
                break;
            default:
                image.src = "Images/cloud.png";
                backgound.style.background = "url('Images/blue sky.jpg')";
        }
        temp.innerHTML = `${parseInt(json.main.temp)}<sup>°C</sup>`;
        des.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;
    });
});
