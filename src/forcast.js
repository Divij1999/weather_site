const bottom = (() => {
  const forcast = document.createElement('div');
  forcast.classList.add('forcast');
  for (let i = 0; i < 7; i++) {
    const dayCard = document.createElement('div');
    dayCard.setAttribute('data-key', i);

    dayCard.classList.add('forcastDayCard');

    const date = document.createElement('div');
    date.classList.add('forcastDate');

    const weatherDescription = document.createElement('div');
    weatherDescription.classList.add('forcastWeatherDescription');

    const weatherIcon = new Image();
    weatherIcon.classList.add('forcastWeatherIcon');

    const weather = document.createElement('div');
    weather.classList.add('forcastWeather');

    weather.appendChild(weatherIcon);
    weather.appendChild(weatherDescription);

    const minTemp = document.createElement('div');
    const maxTemp = document.createElement('div');

    const temp = document.createElement('div');
    temp.classList.add('forcastTemp');

    temp.appendChild(minTemp);
    temp.appendChild(maxTemp);

    dayCard.appendChild(date);
    dayCard.appendChild(weather);
    dayCard.appendChild(temp);

    forcast.appendChild(dayCard);
  }

  const body = document.querySelector('body');

  body.appendChild(forcast);
})();

export default bottom;
