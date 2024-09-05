import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../../app/reducers/vehicleSlice';

const VehicleTable = () => {
    const dispatch = useDispatch();
    const { vehicles, status, error } = useSelector((state) => state.vehicles);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchVehicles());
        }
    }, [dispatch, status]);

    return (
        <div className='container'>
            <h1>Vehicle Rental Inquiry</h1>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <table className='container1'>
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
                    <tbody className='tbody'>
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
            )}
        </div>
    );
};

export default VehicleTable;
