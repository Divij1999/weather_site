const middle = (() => {
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('currentWeatherContainer');

  const weatherDiv = document.createElement('div');
  weatherDiv.classList.add('weatherDiv');

  const tempDiv = document.createElement('div');
  tempDiv.classList.add('currentTemp');

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('weatherDesc');

  weatherDiv.appendChild(tempDiv);
  weatherDiv.appendChild(descriptionDiv);

  currentWeatherContainer.appendChild(weatherDiv);

  const body = document.querySelector('body');
  body.appendChild(currentWeatherContainer);

  return {
    tempDiv,
    descriptionDiv,
  };
})();

export default middle;
