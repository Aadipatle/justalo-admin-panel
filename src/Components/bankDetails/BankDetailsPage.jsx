import React, { useEffect, useState } from 'react';

const PaymentDetails = () => {
    const [paymentDetails, setPaymentDetails] = useState([]);

    useEffect(() => {
        async function getPaymentDetails() {
            try {
                let url = 'http://68.183.87.102:8080/paymentDetails';
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
    
                let data = await response.json();
                setPaymentDetails(data);
            } catch (error) {
                console.error('Error fetching payment details:', error);
            }
        }

        getPaymentDetails();
    }, []);

    return (
        <div className="container">
        <div className="table-container">
      
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Account No</th>
                        <th>Bank Name</th>
                        <th>Account Holder Name</th>
                        <th>IFSC Code</th>
                        <th>Branch Name</th>
                        <th>Vendor Name</th>
                    </tr>
                </thead>
                <tbody>
                    {paymentDetails.map((detail, index) => (
                        <tr key={index}>
                            <td>{detail.id}</td>
                            <td>{detail.accountNo}</td>
                            <td>{detail.bankName}</td>
                            <td>{detail.accountHolderName}</td>
                            <td>{detail.IFSC_Code}</td>
                            <td>{detail.Branch_Name}</td>
                            <td>{detail.vendor_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default PaymentDetails;
