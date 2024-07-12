import React, { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [searchedCity, setSearchedCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedCity(city);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <form onSubmit={handleSearch} className="mb-6 flex space-x-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Search
        </button>
      </form>
      {searchedCity && <WeatherDisplay city={searchedCity} />}
    </div>
  );
};

export default App;