import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/pexels-sl-wong-338694-1023953.jpg'; 

const API_KEY = '6c2733b5b160708d3d5efd37557dd6e5';

const hourlyForecast = [
  { time: 'Now', temp: 27, icon: '☀️' },
  { time: '2 AM', temp: 29, icon: '☀️' },
  { time: '3 AM', temp: 28, icon: '☀️' },
  { time: '4 AM', temp: 28, icon: '☀️' },
  { time: '5 AM', temp: 27, icon: '☀️' },
  { time: '6 AM', temp: 27, icon: '☀️' },
  { time: '7 AM', temp: 28, icon: '☀️' },
  { time: '8 AM', temp: 29, icon: '☀️' },
  { time: '9 AM', temp: 30, icon: '☀️' },
  { time: '10 AM', temp: 30, icon: '☀️' },
];

function WeatherDisplay({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      fetchWeather();
    }
  }, [city]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data. Please check the city name and try again.');
      setWeather(null);
    }
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!weather) return null;

  const iconCode = weather.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const feelsLike = Math.round(weather.main.feels_like);
  const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-20 mx-4 my-8 max-w-4xl flex flex-col md:flex-row"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="md:w-1/2 flex flex-col justify-between">
        <div className="p-4 border rounded-2xl bg-orange-100 flex flex-col items-center h-full">
          <p className="text-xl font-medium mb-4 text-orange-500">Today</p>
          <div className="flex justify-center items-center mb-4 relative">
            <img src={iconUrl} alt={weather.weather[0].description} className="w-16 h-16 mr-4" />
            <div className="flex items-baseline relative">
              <p className="text-7xl font-bold text-orange-500">{Math.round(weather.main.temp)}</p>
              <span className="text-3xl text-orange-500 absolute top-0 right-0 -mt-6">°</span>
            </div>
          </div>
          <p className="text-2xl mb-4 text-orange-500">{weather.weather[0].main}</p>
          <p className="text-sm mb-4 text-orange-500">{weather.name}, {weather.sys.country}</p>
          <p className="text-sm mb-4 text-orange-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-sm text-orange-500">
            Feels like: {feelsLike}°C | Sunset: {sunsetTime}
          </p>
        </div>
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0 md:pl-6">
        <div className="p-2 border rounded-md bg-orange-100">
          <div className="flex flex-col">
            <div className="flex justify-around mt-6 pb-2 md:mt-0 border-b-2  border-orange-500">
              {hourlyForecast.slice(1, 5).map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="font-medium text-orange-500">{item.time}</p>
                  <div className="flex items-center">
                    <p className="mr-1 text-orange-500">{item.temp}°</p>
                    <p className="mr-1">{item.icon}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-around mt-6 pt-2 md:mt-0">
              {hourlyForecast.slice(6).map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <p className="font-medium text-orange-500">{item.time}</p>
                  <div className="flex items-center">
                    <p className="mr-1 text-orange-500">{item.temp}°</p>
                    <p>{item.icon}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 text-center md:text-left">
          <p className="text-2xl font-bold pt-4 mb-2 text-orange-500">Random Text</p>
          <p className="text-sm text-orange-500">
            Improve him believe opinion offered met and end cheered forbade. Friendly as stronger
            speedly by recurred. Son interest wandered sir addition end say. Manners beloved affixed
            picture men ask.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
