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
            let token = sessionStorage.getItem('token') 
    
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
    }, []);

    const handleVerify = async (id, status) => {
        try {
            let url = `http://68.183.87.102:8080/markVerified/${id}`;
            let token = sessionStorage.getItem('token');

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ verification_status: status }) 
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let updatedData = await response.json();

            setData(prevData => prevData.map(item =>
                item.id === id ? { ...item, verification_status: updatedData.verification_status } : item
            ));
        } catch (error) {
            console.error('Error verifying data:', error);
        }
    };
 
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
                                   <td> <Link to={`/vendors/${item.id}`}>
                                        {item.username}
                                    </Link>
                                    </td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.email}</td>
                                    <td>{item.organization_name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.verification_status ? '☑' :'❌'}</td>
                                    <td> <button onClick={() => handleVerify(item.id, true)}>Verify</button>
                                 </td>

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
