import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinates, submitCityData, updateCityData, updateBoardingPoint, addBoardingPoint } from '../../app/reducers/citySlice';
import './City.css';

const City = () => {
  const dispatch = useDispatch();
  const { cityData } = useSelector((state) => state.city);
console.log(cityData)
// 

  const handleCityChange = async (e) => {
    const cityname = e.target.value;
    dispatch(updateCityData({ cityname }));

    if (cityname) {
      const { longitude, latitude } = await dispatch(fetchCoordinates(cityname));
      dispatch(updateCityData({ longitude, latitude }));
    }
  };

  const handleBoardingPointChange = async (index, e) => {
    const { name, value } = e.target;
    dispatch(updateBoardingPoint({ index, data: { [name]: value } }));

    if (name === 'name' && value) {
      const { longitude, latitude } = await dispatch(fetchCoordinates(value));
      dispatch(updateBoardingPoint({ index, data: { longitude, latitude } }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitCityData(cityData));
  };

  return (
    <div className='bodyy'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>City Name:</label>
          <input 
            type="text" 
            value={cityData.cityname} 
            onChange={handleCityChange} 
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input 
            type="text" 
            value={cityData.longitude} 
            readOnly 
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input 
            type="text" 
            value={cityData.latitude} 
            readOnly 
          />
        </div>
        {cityData.boardingPoints.map((point, index) => (
          <div key={index}>
            <label>Boarding Point Name:</label>
            <input 
              type="text" 
              name="name" 
              value={point.name} 
              onChange={(e) => handleBoardingPointChange(index, e)} 
            />
            <label>Longitude:</label>
            <input 
              type="text" 
              name="longitude" 
              value={point.longitude} 
              onChange={(e) => handleBoardingPointChange(index, e)} 
            />
            <label>Latitude:</label>
            <input 
              type="text" 
              name="latitude" 
              value={point.latitude} 
              onChange={(e) => handleBoardingPointChange(index, e)} 
            />
          </div>
        ))}
        <button type="button" onClick={() => dispatch(addBoardingPoint())}>Add Boarding Point</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default City;
