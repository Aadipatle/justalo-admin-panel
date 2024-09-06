import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityList } from '../../app/reducers/citySlice';
import './CityList.css';

function CityList() {
  const dispatch = useDispatch();
  const { cities, status, error } = useSelector((state) => state.city);

  const [activeCityIndex, setActiveCityIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCityList());
    }
  }, [dispatch, status]);

  const toggleCity = (index) => {
    setActiveCityIndex(index === activeCityIndex ? null : index);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredCities = () => {
    return cities.filter(city =>
      city.cityname.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const filteredCities = getFilteredCities();

  return (
    <div className="container">
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city by name..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* City List */}
      {filteredCities.length === 0 ? (
        <p>No cities found.</p>
      ) : (
        filteredCities.map((city, cityIndex) => (
          <div key={cityIndex} className="city">
            <div className="city-header" onClick={() => toggleCity(cityIndex)}>
              <h2>City: {city.cityname}</h2>
              <p>Longitude: {city.longitude}</p>
              <p>Latitude: {city.latitude}</p>
            </div>
            {activeCityIndex === cityIndex && (
              <div className="boarding-points">
                <h3>Boarding Points:</h3>
                {city.boardingPoints.map((point, pointIndex) => (
                  <div key={pointIndex} className="boarding-point">
                    <h4>{point.name}</h4>
                    <p>Longitude: {point.longitude}</p>
                    <p>Latitude: {point.latitude}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default CityList;
