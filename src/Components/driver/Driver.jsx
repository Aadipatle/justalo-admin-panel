import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriversByVendor, unverifyDriver, verifyDriver } from '../../app/reducers/VendorSlice'; // Import the necessary actions

function Driver() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const {drivers} = useSelector(state => state.vendors);
    const loading = useSelector(state => state.vendors.loading);
    const error = useSelector(state => state.vendors.error);

    useEffect(() => {
        dispatch(fetchDriversByVendor(userId));
    }, [dispatch, userId]);

    const handleVerify = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(verifyDriver({ driverId: id, status: newStatus }));
    };
    const handleunVerify = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(unverifyDriver({ driverId: id, status: newStatus }));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>License Number</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/singledriver/${item.id}`}>
                                        {item.driver_name}
                                    </Link>
                                </td>
                                <td>{item.mobile_no}</td>
                                <td>{item.email}</td>
                                <td>{item.license_no}</td>
                                <td>{item.address}</td>
                                <td>{item.verification_status ? '☑' : '❌'}</td>
                                <td>{
                                    item.verification_status ?  <button style={{width:'90px'}} onClick={() => handleunVerify(item.id, item.verification_status)}>
                                    unverify
                                 </button> : <button style={{width:'90px'}} onClick={() => handleVerify(item.id, item.verification_status)}>
                                 verify
                              </button>

                                }
                                    
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Driver;
