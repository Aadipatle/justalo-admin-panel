import React, { useEffect, useState } from 'react';
import './EmpList.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Emplist() {
    const [data, setData] = useState([]);
    let navigate=useNavigate()
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch('http://68.183.87.102:8080/getAllUser', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let emp = await response.json();
                setData(emp);
                console.log(emp)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, []);
    console.log(data)
    function view(id) {
        console.log(id)
    }

    // const updateStatus = async (id, status) => {
    //     try {
    //         let url = `http://localhost:8080/customer/${id}/status`;
    //         let response = await fetch(url, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ status })
    //         });
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         let updatedCustomer = await response.json();
    //         setData(data.map(customer => customer._id === id ? updatedCustomer.data : customer));
    //     } catch (error) {
    //         console.error('Error updating status:', error);
    //     }
    // };
    // function user(id) {
    //     console.log(id)
    //     navigate(`/admin/users/${id}`);
    // }
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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <Link to={`/users/${item.id}`}>
                                    {item.email}
                                </Link>
                                    <td>{item.contactNumber}</td>
                                    <td>{item.email}</td>
                                    <td>{item.status}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}


export default Emplist;
