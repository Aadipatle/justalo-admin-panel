import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Driver() {
    const [data, setData] = useState([]);
    let { userId } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                let url = `http://68.183.87.102:8080/AllDriverByPerticularVendor/${userId}`;
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
                setData(emp);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, [userId]);

    const handleVerify = async (id, currentStatus) => {
        try {
            let url = `http://68.183.87.102:8080/verifieddriver/${id}`;
            let token = sessionStorage.getItem('token');
            let status = !currentStatus;  

            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ verification_status: status })
            });
console.log(response)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Update the data state with the new verification status
            setData(prevData => prevData.map(item =>
                item.id === id ? { ...item, verification_status: status } : item
            ));
        } catch (error) {
            console.error('Error verifying data:', error);
        }
    };

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
                        {data.map((item, index) => (
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
                                    <button onClick={() => handleVerify(item.id, item.verification_status)}>
                                        {item.verification_status ? 'Unverify' : 'Verify'}
                                    </button>
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
