import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriversByVendor, unverifyDriver, verifyDriver } from '../../app/reducers/VendorSlice';

function Driver() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { drivers } = useSelector(state => state.vendors);
    const loading = useSelector(state => state.vendors.loading);
    const error = useSelector(state => state.vendors.error);

    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        dispatch(fetchDriversByVendor(userId));
    }, [dispatch, userId]);

    const handleVerify = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(verifyDriver({ driverId: id, status: newStatus }));
    };

    const handleUnverify = async (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(unverifyDriver({ driverId: id, status: newStatus }));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter drivers based on the search query
    const getFilteredDrivers = () => {
        return drivers.filter((driver) =>
            driver.driver_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredDrivers = getFilteredDrivers();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
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
                        {filteredDrivers.length > 0 ? (
                            filteredDrivers.map((item, index) => (
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
                                    <td>
                                        {item.verification_status ? (
                                            <button
                                                style={{ width: '90px' }}
                                                onClick={() => handleUnverify(item.id, item.verification_status)}
                                            >
                                                Unverify
                                            </button>
                                        ) : (
                                            <button
                                                style={{ width: '90px' }}
                                                onClick={() => handleVerify(item.id, item.verification_status)}
                                            >
                                                Verify
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No drivers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Driver;
