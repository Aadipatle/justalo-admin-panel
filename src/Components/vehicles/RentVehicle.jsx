import React, { useState, useEffect } from 'react';

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                let url = 'http://68.183.87.102:8080/getRentdetails';
                let token = sessionStorage.getItem('token');
    
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
                setVehicles(emp);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, []);

    return (
        <div>
            <h1>Vehicle Rental Inquiry</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Name</th>
                        <th>Phone Number</th>
                        <th>Vehicles</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle, index) => (
                        <tr key={index}>
                            <td>{vehicle.date}</td>
                            <td>{vehicle.from}</td>
                            <td>{vehicle.to}</td>
                            <td>{vehicle.name}</td>
                            <td>{vehicle.phoneNumber}</td>
                            <td>
                                <ul>
                                    {vehicle.vehicles.map((v, idx) => (
                                        <li key={idx} style={{listStyle:'none'}}>
                                             {v.model} (Seat {v.make}) - Qty: {v.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VehicleTable;
