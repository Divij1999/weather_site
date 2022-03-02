const middle = (() => {
  const currentWeatherContainer = document.createElement('div');
  currentWeatherContainer.classList.add('currentWeatherContainer');

  const weatherDiv = document.createElement('div');
  weatherDiv.classList.add('weatherDiv');

  const tempDiv = document.createElement('div');
  tempDiv.classList.add('currentTemp');

  const locationName = document.createElement('div');
  locationName.classList.add('locationName');

  const humidity = document.createElement('div');
  humidity.classList.add('currentHumidity');

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('weatherDesc');

  weatherDiv.appendChild(tempDiv);
  weatherDiv.appendChild(locationName);
  weatherDiv.appendChild(descriptionDiv);
  weatherDiv.appendChild(humidity);

  currentWeatherContainer.appendChild(weatherDiv);

  const body = document.querySelector('body');
  body.appendChild(currentWeatherContainer);

  return {
    tempDiv,
    descriptionDiv,
    locationName,
    humidity,
  };
})();

export default middle;
