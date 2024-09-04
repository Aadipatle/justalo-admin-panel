import React, { useState } from 'react';
import './City.css'
const App = () => {
    const [cityData, setCityData] = useState({
        cityname: '',
        longitude: '',
        latitude: '',
        boardingPoints: [
            { name: '', longitude: '', latitude: '' }
        ]
    });

    const handleCityChange = async (e) => {
        const cityname = e.target.value;
        setCityData({ ...cityData, cityname });
        
        if (cityname) {
            const { longitude, latitude } = await fetchCoordinates(cityname);
            setCityData(prevState => ({
                ...prevState,
                longitude,
                latitude
            }));
        }
    };

    const handleBoardingPointChange = async (index, e) => {
        const { name, value } = e.target;
        const newBoardingPoints = [...cityData.boardingPoints];
        newBoardingPoints[index][name] = value;

        if (name === 'name' && value) {
            const { longitude, latitude } = await fetchCoordinates(value);
            newBoardingPoints[index].longitude = longitude;
            newBoardingPoints[index].latitude = latitude;
        }

        setCityData({ ...cityData, boardingPoints: newBoardingPoints });
    };

    const addBoardingPoint = () => {
        setCityData({
            ...cityData,
            boardingPoints: [...cityData.boardingPoints, { name: '', longitude: '', latitude: '' }]
        });
    };
    let token = sessionStorage.getItem('token') 
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://68.183.87.102:8080/addcity&bordingpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cityData),
        });

        if (response.ok) {
            console.log('City data saved successfully');
        } else {
            console.error('Failed to save city data');
        }
        setCityData({
            cityname: '',
            longitude: '',
            latitude: '',
            boardingPoints: [
                { name: '', longitude: '', latitude: '' }
            ]
        });
    };

    const fetchCoordinates = async (locationName) => {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json`;
    
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            
            if (data.length > 0) {
                const { lon, lat } = data[0];
                return { longitude: lon, latitude: lat };
            }
            
            console.warn('No coordinates found for the given location.');
            return { longitude: '', latitude: '' };
    
        } catch (error) {
            console.error('An error occurred while fetching coordinates:', error);
            return { longitude: '', latitude: '' };
        }
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
                <button type="button" onClick={addBoardingPoint}>Add Boarding Point</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
