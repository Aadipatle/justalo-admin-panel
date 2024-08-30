import React, { useEffect, useState } from 'react'
import './CityList.css'
function CityList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
          try {
            let url = 'http://68.183.87.102:8080/getAllCities';
            let token = sessionStorage.getItem('token') 
    
            let response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'  
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            let emp = await response.json();
            setData(emp);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }
        getData();
    }, []);

    const [activeCityIndex, setActiveCityIndex] = useState(null);

    const toggleCity = (index) => {
        setActiveCityIndex(index === activeCityIndex ? null : index);
    };
  return (
    <>
    <div className="container">
            {data.map((city, cityIndex) => (
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

    </>
  )
}

export default CityList