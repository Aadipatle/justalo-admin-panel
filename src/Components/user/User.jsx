import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import './User.css'
function User() {
    const [data, setData] = useState([
        {
            id: 1,
            FullName: "John Doe",
            PhoneNumber: "123-456-7890",
            Ticket: 345,
            TotalAmt: "56.75",
            BusNumber: "Bus-101",
            Status: "Active",
            Email: "johndoe@example.com",
            Verified: true
        },
        {
            id: 2,
            FullName: "Jane Smith",
            PhoneNumber: "234-567-8901",
            Ticket: 678,
            TotalAmt: "78.50",
            BusNumber: "Bus-202",
            Status: "Pending",
            Email: "janesmith@example.com",
            Verified: false
        },
        {
            id: 3,
            FullName: "Alice Johnson",
            PhoneNumber: "345-678-9012",
            Ticket: 123,
            TotalAmt: "45.25",
            BusNumber: "Bus-303",
            Status: "Cancelled",
            Email: "alicejohnson@example.com",
            Verified: true
        },
        {
            id: 4,
            FullName: "Bob Brown",
            PhoneNumber: "456-789-0123",
            Ticket: 789,
            TotalAmt: "65.00",
            BusNumber: "Bus-404",
            Status: "Active",
            Email: "bobbrown@example.com",
            Verified: true
        },
        {
            id: 5,
            FullName: "Charlie Davis",
            PhoneNumber: "567-890-1234",
            Ticket: 456,
            TotalAmt: "89.99",
            BusNumber: "Bus-505",
            Status: "Pending",
            Email: "charliedavis@example.com",
            Verified: false
        },
        {
            id: 6,
            FullName: "Emily White",
            PhoneNumber: "678-901-2345",
            Ticket: 890,
            TotalAmt: "72.30",
            BusNumber: "Bus-606",
            Status: "Active",
            Email: "emilywhite@example.com",
            Verified: true
        },
        {
            id: 7,
            FullName: "David Green",
            PhoneNumber: "789-012-3456",
            Ticket: 234,
            TotalAmt: "50.50",
            BusNumber: "Bus-707",
            Status: "Cancelled",
            Email: "davidgreen@example.com",
            Verified: false
        },
        {
            id: 8,
            FullName: "Sophia Brown",
            PhoneNumber: "890-123-4567",
            Ticket: 901,
            TotalAmt: "82.75",
            BusNumber: "Bus-808",
            Status: "Pending",
            Email: "sophiabrown@example.com",
            Verified: true
        },
        {
            id: 9,
            FullName: "Michael Scott",
            PhoneNumber: "901-234-5678",
            Ticket: 567,
            TotalAmt: "65.89",
            BusNumber: "Bus-909",
            Status: "Active",
            Email: "michaelscott@example.com",
            Verified: true
        },
        {
            id: 10,
            FullName: "Olivia Johnson",
            PhoneNumber: "012-345-6789",
            Ticket: 123,
            TotalAmt: "94.20",
            BusNumber: "Bus-010",
            Status: "Pending",
            Email: "oliviajohnson@example.com",
            Verified: false
        }
    ] || []);
    // const [add,setAdd]= useState(1)
    // const [min,setMin]= useState(50)
    // function addn(){
    //   setAdd(add+1)
    // }
    // let ml = useMemo(function mul(){
    //   console.log('fjdfdfdf')
    //   return add*10
    // },[add])

    // function minn(){
    //   setMin(min-1)
    // }
    // {ml}
    // <button onClick={()=>addn()}>add</button> {add} <br />
    // {min}
    // <button onClick={()=>minn()}>min</button>

    let params = useParams()
    let newuser = data.filter((e) => e.id == params.userId)


    return (
        <>


            <div className="userwrapper">
            <h2>user information</h2>
                <div className="bus-card1">
                    <div className="card-content">
                        <h3>{newuser[0].FullName}</h3>
                        <p><strong>Phone Number:</strong> {newuser[0].PhoneNumber}</p>
                        <p><strong>Email:</strong> {newuser[0].Email}</p>
                        <p><strong>Varified:</strong> {newuser[0].Verified ? "✔" : '❌'}</p>
                        <p><strong>Status:</strong> {newuser[0].Status}</p>
                    </div>
                </div>
                <h2>user action</h2>
                <div className="bus-card2">
                   
                        <button>Send Email</button>
                        <button>Send Whatsapp</button>
                        <button>Varified</button>
                </div>
            </div>

        </>
    )
}

export default User