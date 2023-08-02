const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', ()=> {

    const APIKey = '041166aa44564699bf3112832230704';
    const location = document.querySelector('.search-box input').value;

    if(location === '')
        return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${location}}`)
    .then(response => response.json())
    .then(json => {
        if(json.code==='404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fade');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.current.condition.text)
        {
            case 'Sunny':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Overcast':
                    image.src = 'images/cloud.png';
                    break;

                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                
                case 'Smoke':
                    image.src='images/smoke.png'

                default:
                    image.src = '404.png';
        }

        temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
        description.innerHTML = `${json.current.condition.text}`;
        humidity.innerHTML = `${json.current.humidity}%`;
        wind.innerHTML =`${parseInt(json.current.wind_kph)}Km/hr`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
        

    })

})