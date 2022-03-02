import './style.css';
import header from './header';
import middle from './current';
import bottom from './forcast';

const showWeatherData = (() => {
  // Captilizing the first letters of weather description
  const captilizeFirstLetter = (str) => {
    const splitStr = str.split(' ');
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  const showCurrentWeather = (currentWeather) => {
    console.log(currentWeather);

    const degreeSign = document.createElement('span');
    degreeSign.textContent = 'o';
    degreeSign.classList.add('degreeSign');

    middle.tempDiv.textContent = currentWeather.temp;
    middle.tempDiv.appendChild(degreeSign);

    const celciusSign = document.createElement('span');
    celciusSign.textContent = 'C';

    middle.tempDiv.appendChild(celciusSign);

    middle.locationName.textContent = currentWeather.state === undefined ? `${currentWeather.name}, ${currentWeather.country}` : `${currentWeather.name}, ${currentWeather.state}, ${currentWeather.country}`;
    middle.descriptionDiv.textContent = captilizeFirstLetter(currentWeather.weather);
    middle.humidity.textContent = `Humdidity: ${currentWeather.humidity}`;
  };

  const showForcast = (forcast) => {
    for (let i = 0; i < 7; i++) {
      const card = document.querySelector(`div[data-key='${i}']`).children;
      // Setting up date
      card[0].textContent = `${forcast[i].date.getDate()}/${forcast[i].date.getMonth() + 1}`;
      // Setting up icon
      card[1].children[0].src = `http://openweathermap.org/img/wn/${forcast[i].icon}.png`;
      // Setting up weather description
      card[1].children[1].textContent = captilizeFirstLetter(forcast[i].weather);
      // Setting up minimum temperature
      card[2].children[0].textContent = forcast[i].min_temp;
      // Setting up maximum tempreature
      card[2].children[1].textContent = forcast[i].max_temp;
    }

    console.log(forcast);
  };

  return {
    showCurrentWeather,
    showForcast,
  };
})();

// <------------------------------------------------------------------->

const handleWeatherData = (() => {
  // Get location data (longitude, latitude)
  const getLocationData = async (forSearch = false, locationName = 'jammu') => {
    try {
      const getLocation = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=bcf7688293b759e1f0b6de280b9a00c5`, { mode: 'cors' });
      const parsedData = await getLocation.json();
      console.log(parsedData);

      if (forSearch) {
        showSearchOptions(parsedData);
      } else {
        const locationData = {
          lat: parsedData[0].lat,
          lon: parsedData[0].lon,
          name: parsedData[0].name,
          state: parsedData[0].state,
          country: parsedData[0].country,
        };

        // Get weather data depending upon the longitude and latitude
        getWeatherData(locationData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Variable to store search results
  let options;
  const returnOptions = () => options;

  const removeSearchOptions = () => {
    options = [];

    while (header.searchOptions.firstChild) {
      header.searchOptions.removeChild(header.searchOptions.lastChild);
    }
  };

  const clearSearchBar = () => {
    header.searchBar.value = '';
  };

  const showSearchOptions = (locationData) => {
    removeSearchOptions();

    for (let i = 0; i < locationData.length; i++) {
      returnOptions()[i] = {
        name: locationData[i].name,
        state: locationData[i].state,
        country: locationData[i].country,
      };
    }

    console.log(options);

    for (let i = 0; i < options.length; i++) {
      const option = document.createElement('div');

      option.setAttribute('data-index', i);
      option.classList.add('searchOption');
      option.textContent = options[i].state === undefined ? `${options[i].name},${options[i].country}` : `${options[i].name},${options[i].state},${options[i].country}`;

      // Whenever a search option is clicked show weather, remove the list and clear the search bar
      option.addEventListener('click', (e) => {
        getLocationData(false, returnOptions()[+e.target.getAttribute('data-index')].name);
        removeSearchOptions();
        clearSearchBar();
      });

      header.searchOptions.appendChild(option);
    }
  };

  // <------------------------------------------------------------->

  const getWeatherData = async (locationData) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=bcf7688293b759e1f0b6de280b9a00c5`, { mode: 'cors' });
      const parsedData = await response.json();
      console.log(parsedData);
      // Get the data required from all the weather data we got from the request
      getRequiredData(parsedData, locationData);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequiredData = (weatherData, locationData) => {
    // Store current weather data
    const currentWeather = {
      date: new Date((+weatherData.current.dt) * 1000),
      name: locationData.name,
      state: locationData.state,
      country: locationData.country,
      temp: weatherData.current.temp,
      humidity: weatherData.current.humidity,
      weather: weatherData.current.weather[0].description,
      icon: weatherData.current.weather[0].icon,
    };

    // Store forcast data
    const sevenDayForcast = [];
    let i = 0;
    weatherData.daily.forEach((day) => {
      sevenDayForcast[i] = {
        date: new Date((+day.dt) * 1000),
        max_temp: day.temp.max,
        min_temp: day.temp.min,
        weather: day.weather[0].description,
        icon: day.weather[0].icon,
      };
      i++;
    });
    console.log(currentWeather);
    console.log(sevenDayForcast);

    showWeatherData.showCurrentWeather(currentWeather);
    showWeatherData.showForcast(sevenDayForcast);
  };

  // Event listeners
  header.searchBtn.addEventListener('click', () => {
    getLocationData(false, header.searchBar.value);
    clearSearchBar();
    removeSearchOptions();
  });

  // Listening for user to press enter when focus is on the search bar
  header.searchBar.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      getLocationData(false, header.searchBar.value);
      removeSearchOptions();
      clearSearchBar();
    }
  });

  // Listen for keypresses in the search bar
  header.searchBar.addEventListener('keyup', (e) => {
    // If the any key other than enter is pressed and the search bar isn't empty
    if (e.code !== 'Enter' && header.searchBar.value !== '') {
      getLocationData(true, header.searchBar.value);
    } else if (header.searchBar.value === '') {
      // If search bar is empty remove all search options
      removeSearchOptions();
    }
  });

  getLocationData(false);
})();
