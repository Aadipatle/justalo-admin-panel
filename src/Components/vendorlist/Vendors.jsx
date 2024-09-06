import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors, verifyVendor } from '../../app/reducers/VendorSlice';
import { Link } from 'react-router-dom';

function Vendors() {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(state => state.vendors);
    
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    const handleVerify = (id, status) => {
        dispatch(verifyVendor({ id, status }));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter vendors based on the search query
    const getFilteredVendors = () => {
        return data.filter((vendor) => 
            vendor.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredVendors = getFilteredVendors();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
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
                                <th>Organization</th>
                                <th>Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVendors.length > 0 ? (
                                filteredVendors.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/vendors/${item.id}`}>
                                                {item.username}
                                            </Link>
                                        </td>
                                        <td>{item.phone_number}</td>
                                        <td>{item.email}</td>
                                        <td>{item.organization_name}</td>
                                        <td>{item.address}</td>
                                        <td>{item.verification_status ? '☑' : '❌'}</td>
                                        <td>
                                            <button onClick={() => handleVerify(item.id, true)}>Verify</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No vendors found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Vendors;
