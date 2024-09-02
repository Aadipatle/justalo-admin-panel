import React, { useEffect, useState } from 'react';
import './EmpList.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Emplist() {
    const [data, setData] = useState([
        {
            id: 1,
            FullName: "John Doe",
            PhoneNumber: "123-456-7890",
            Ticket: 5,
            TotalAmt: "56.75",
            BusNumber: "Mumbai",
            Status: "Active",
            Email: "johndoe@example.com",
            Verified: true
        },
        {
            id: 2,
            FullName: "Jane Smith",
            PhoneNumber: "234-567-8901",
            Ticket: 8,
            TotalAmt: "78.50",
            BusNumber: "Wardha",
            Status: "Active",
            Email: "janesmith@example.com",
            Verified: false
        },
        {
            id: 3,
            FullName: "Alice Johnson",
            PhoneNumber: "345-678-9012",
            Ticket: 1,
            TotalAmt: "45.25",
            BusNumber: "Bhopal",
            Status: "Blocked",
            Email: "alicejohnson@example.com",
            Verified: true
        },
        {
            id: 4,
            FullName: "Bob Brown",
            PhoneNumber: "456-789-0123",
            Ticket: 3,
            TotalAmt: "65.00",
            BusNumber: "Ujjain",
            Status: "Active",
            Email: "bobbrown@example.com",
            Verified: true
        },
        {
            id: 5,
            FullName: "Charlie Davis",
            PhoneNumber: "567-890-1234",
            Ticket: 9,
            TotalAmt: "89.99",
            BusNumber: "Chandrapur",
            Status: "Active",
            Email: "charliedavis@example.com",
            Verified: false
        },
        {
            id: 6,
            FullName: "Emily White",
            PhoneNumber: "678-901-2345",
            Ticket: 1,
            TotalAmt: "72.30",
            BusNumber: "Amravati",
            Status: "Active",
            Email: "emilywhite@example.com",
            Verified: true
        },
        {
            id: 7,
            FullName: "David Green",
            PhoneNumber: "789-012-3456",
            Ticket: 5,
            TotalAmt: "50.50",
            BusNumber: "Indore",
            Status: "Blocked",
            Email: "davidgreen@example.com",
            Verified: false
        },
        {
            id: 8,
            FullName: "Sophia Brown",
            PhoneNumber: "890-123-4567",
            Ticket: 7,
            TotalAmt: "82.75",
            BusNumber: "Balaghat",
            Status: "Blocked",
            Email: "sophiabrown@example.com",
            Verified: true
        },
        {
            id: 9,
            FullName: "Michael Scott",
            PhoneNumber: "901-234-5678",
            Ticket: 0,
            TotalAmt: "65.89",
            BusNumber: "Raipur",
            Status: "Active",
            Email: "michaelscott@example.com",
            Verified: true
        },
        {
            id: 10,
            FullName: "Olivia Johnson",
            PhoneNumber: "012-345-6789",
            Ticket: 1,
            TotalAmt: "94.20",
            BusNumber: "Nagpur",
            Status: "Active",
            Email: "oliviajohnson@example.com",
            Verified: false
        }
    ] || []);
    let navigate=useNavigate()

    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             let url = 'http://localhost:8080/allcustomers';
    //             let response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             let emp = await response.json();
    //             setData(emp);
    //             console.log(emp)
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     getData();
    // }, []);
    // console.log(data)
    // function view(id) {
    //     console.log(id)
    // }

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
                                <th>Ticket</th>
                                <th>Total Amt.</th>
                                <th>Location</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <Link to={`/users/${item.id}`}>
                                    {item.FullName}
                                </Link>
                                    <td>{item.PhoneNumber}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Ticket}</td>
                                    <td>{item.TotalAmt}</td>
                                    <td>{item.BusNumber}</td>
                                    <td>{item.Status}</td>

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
