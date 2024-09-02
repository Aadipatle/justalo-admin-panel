import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Buses() {
    const [data, setData] = useState([]);
    let {userId}=useParams()

    useEffect(() => {
        async function getData() {
          try {
            let url = `http://68.183.87.102:8080/getAllBusByPerticularVendor/${userId}`;
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

    console.log(data)
    const handleVerify = async (id, status) => {
        try {
            let url = `http://68.183.87.102:8080/verifiedBus/${id}`;
            let token = sessionStorage.getItem('token');

            let response = await fetch(url, {
                method: 'PUT',
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
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                   <td> <Link to={`/vendors/${item.id}`}>
                                        {item.bus_number}
                                    </Link>
                                    </td>
                                    <td>{item.chassis_num}</td>
                                    <td>{item.insurance_no}</td>
                                    <td>{item.no_of_row}</td>
                                    <td>{item.layout}</td>
                                    <td>{item.verified ? '☑' :'❌'}</td>
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


export default Buses;
