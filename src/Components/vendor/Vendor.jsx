import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriversByVendor, fetchBusesByVendor, fetchVendors } from '../../app/reducers/VendorSlice';
import './Vendor.css';

function Vendor() {
    const { vendorId } = useParams();
    const dispatch = useDispatch();
    const { data, drivers, buses } = useSelector((state) => state.vendors);

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);


    useEffect(() => {
        dispatch(fetchDriversByVendor(vendorId));
        dispatch(fetchBusesByVendor(vendorId));
    }, [dispatch, vendorId]);

    let newVendor = data.filter((e) => e.id === parseInt(vendorId));

    return (
        <>
            <div className="userwrapper">
                <div className="bus-card">
                    <div className="card-content">
                        {newVendor.map((e) => (
                            <div key={e.id}>
                                <h1>Vendor Details</h1>
                                <h1>{e.username}</h1>
                                <img src={e.profile_img} alt="vendor-image" width={'180px'} />
                                <p><strong>Organization:</strong> {e.organization_name}</p>
                                <p><strong>Contact:</strong> {e.phone_number}</p>
                                <p><strong>Email:</strong> {e.email}</p>
                                <p><strong>Address:</strong> {e.address}</p>
                                <div className="docs">
                                    <img src={e.doc1} alt="doc1" width={'180px'} height={'150px'} />
                                    <img src={e.doc2} alt="doc2" width={'180px'} height={'150px'} />
                                </div>
                                <div className="driver">
                                    <h5>Drivers {drivers.length}</h5>
                                    <Link to={`/driver/${e.id}`}>View Drivers</Link>
                                </div>
                                <br /> 
                                <div className="driver1">
                                    <h5>Buses {buses.length}</h5>
                                    <Link to={`/bus/${e.id}`}>View Buses</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vendor;
