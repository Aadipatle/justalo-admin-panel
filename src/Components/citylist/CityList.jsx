import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityList } from '../../app/reducers/citySlice';
import './CityList.css';

function CityList() {
  const dispatch = useDispatch();
  const { cities, status, error } = useSelector((state) => state.city);

  const [activeCityIndex, setActiveCityIndex] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCityList());
    }
  }, [dispatch, status]);

  const toggleCity = (index) => {
    setActiveCityIndex(index === activeCityIndex ? null : index);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      {cities.map((city, cityIndex) => (
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
      ))}
    </div>
  );
}

export default CityList;
