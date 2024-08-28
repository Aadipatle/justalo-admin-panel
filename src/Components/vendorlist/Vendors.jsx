import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Vendors() {
    const [data, setData] = useState([]);
    let navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            try {
                let url = 'http://68.183.87.102:8080/AllVendor';
                let response = await fetch(url);
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
    }, []);
 
    return (
        <>
            <h1>Users List</h1>
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
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <Link to={`/vendors/${item.id}`}>
                                        {item.username}
                                    </Link>
                                    <td>{item.phone_number}</td>
                                    <td>{item.email}</td>
                                    <td>{item.organization_name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.verification_status ===true ? '☑' :'❌'}</td>

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
