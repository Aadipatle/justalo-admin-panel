import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusesByVendor, unverifyBus, verifyBus } from '../../app/reducers/VendorSlice';

function Buses() {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { buses } = useSelector((state) => state.vendors);
    const status = useSelector((state) => state.vendors.status);
    const error = useSelector((state) => state.vendors.error);

    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        dispatch(fetchBusesByVendor(userId));
    }, [dispatch, userId]);

    const handleVerify = (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(verifyBus({ busId: id, verified: newStatus }));
    };

    const handleUnverify = (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(unverifyBus({ busId: id, verified: newStatus }));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter and sort buses: verified buses first, then unverified ones
    const getFilteredAndSortedBuses = () => {
        return buses
            .filter((bus) =>
                bus.bus_number.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) => b.verified - a.verified); // Sort by verification status (true first)
    };

    const filteredBuses = getFilteredAndSortedBuses();

    return (
        <>
            <div className="container">
                {/* Search Bar */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search by bus number..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr No</th>
                                <th>Bus Number</th>
                                <th>Chassis Number</th>
                                <th>Insurance Number</th>
                                <th>No. Of Row</th>
                                <th>Layout</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBuses.length > 0 ? (
                                filteredBuses.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/vendors/${item.id}`}>
                                                {item.bus_number}
                                            </Link>
                                        </td>
                                        <td>{item.chassis_num}</td>
                                        <td>{item.insurance_no}</td>
                                        <td>{item.no_of_row}</td>
                                        <td>{item.layout}</td>
                                        <td>{item.verified ? '☑' : '❌'}</td>
                                        <td>
                                            {item.verified ? (
                                                <button
                                                    style={{ width: '90px' }}
                                                    onClick={() => handleUnverify(item.id, item.verified)}
                                                >
                                                    Unverify
                                                </button>
                                            ) : (
                                                <button
                                                    style={{ width: '90px' }}
                                                    onClick={() => handleVerify(item.id, item.verified)}
                                                >
                                                    Verify
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No buses found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Buses;
