import './style.css';
import header from './header';
import middle from './current';
import bottom from './forcast';

const handleWeatherData = (() => {
  let requiredWeatherData;
  const getLocationData = async (locationName = 'jammu') => {
    try {
      const getLocation = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=1&appid=bcf7688293b759e1f0b6de280b9a00c5`, { mode: 'cors' });
      const parsedData = await getLocation.json();
      const locationData = {
        lat: parsedData[0].lat,
        lon: parsedData[0].lon,
        state: parsedData[0].state,
        country: parsedData[0].country,
      };
      console.log(parsedData);
      getWeatherData(locationData);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeatherData = async (locationData) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${locationData.lat}&lon=${locationData.lon}&units=metric&appid=bcf7688293b759e1f0b6de280b9a00c5`, { mode: 'cors' });
      const parsedData = await response.json();
      console.log(parsedData);
      requiredWeatherData = getRequiredData(parsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const getRequiredData = (data) => {
    const currentWeather = {
      date: new Date((+data.current.dt) * 1000),
      temp: data.current.temp,
      humidity: data.current.humidity,
      weather: data.current.weather[0].description,
      icon: data.current.weather[0].icon,
    };

    const sevenDayForcast = [];
    let i = 0;
    data.daily.forEach((day) => {
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

    return {
      currentWeather,
      sevenDayForcast,
    };
  };

  const returnData = () => requiredWeatherData;

  header.searchBtn.addEventListener('click', () => {
    getLocationData(header.searchBar.value);
  });

  header.searchBar.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      getLocationData(header.searchBar.value);
    }
  });

  getLocationData('jammu');
  return {
    returnData,
  };
})();

const showWeatherData = (() => {
  const showCurrentWeather = () => {
    const { currentWeather } = handleWeatherData.returnData();
    console.log(currentWeather);
    middle.tempDiv.textContent = `${currentWeather.temp} C`;
    middle.descriptionDiv.textContent = `${currentWeather.weather}`;
  };

  const showForcast = () => {
    const forcast = [...handleWeatherData.returnData().sevenDayForcast];

    for (let i = 0; i < 7; i++) {
      const card = document.querySelector(`div[data-key='${i}']`).children;
      card[0].textContent = `${forcast[i].date.getDate()}/${forcast[i].date.getMonth()}`;
      card[1].children[0].src = `http://openweathermap.org/img/wn/${forcast[i].icon}.png`;
      card[1].children[1].textContent = forcast[i].weather;
      card[2].textContent = `${forcast[i].min_temp}-${forcast[i].max_temp}`;
    }

    console.log(forcast);
  };

  header.searchBtn.addEventListener('click', () => {
    showCurrentWeather();
    showForcast();
  });

  header.searchBar.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      showCurrentWeather();
      showForcast();
    }
  });
})();
