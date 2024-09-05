import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors, verifyVendor } from '../../app/reducers/VendorSlice';
import { Link } from 'react-router-dom';

function Vendors() {
    const dispatch = useDispatch();
    const { data, status, error } = useSelector(state => state.vendors);

    useEffect(() => {
        dispatch(fetchVendors());
    }, [dispatch]);

    const handleVerify = (id, status) => {
        dispatch(verifyVendor({ id, status }));
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="container">
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
                            {data.map((item, index) => (
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
                                    <td><button onClick={() => handleVerify(item.id, true)}>Verify</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Vendors;
