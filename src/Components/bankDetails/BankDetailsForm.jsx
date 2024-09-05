import React, { useState, useEffect } from 'react';

const BankDetailsForm = () => {
    const [bankDetails, setBankDetails] = useState({
        accountNo: '',
        bankName: '',
        accountHolderName: '',
        IFSC_Code: '',
        Branch_Name: '',
        vendor_name: ''
    });
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        async function fetchVendors() {
            try {
                const response = await fetch('http://68.183.87.102:8080/AllVendor', {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                    }
                });
                const data = await response.json();
                setVendors(data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        }
        fetchVendors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankDetails({ ...bankDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://68.183.87.102:8080/paymentDetailsAdd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify(bankDetails),
            });
            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            console.log('Data submitted successfully');
            setBankDetails({
                accountNo: '',
                bankName: '',
                accountHolderName: '',
                IFSC_Code: '',
                Branch_Name: '',
                vendor_name: ''
            });
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div className='bodyy'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Account Number:</label>
                    <input 
                        type="text" 
                        name="accountNo" 
                        value={bankDetails.accountNo} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Bank Name:</label>
                    <input 
                        type="text" 
                        name="bankName" 
                        value={bankDetails.bankName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Account Holder Name:</label>
                    <input 
                        type="text" 
                        name="accountHolderName" 
                        value={bankDetails.accountHolderName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>IFSC Code:</label>
                    <input 
                        type="text" 
                        name="IFSC_Code" 
                        value={bankDetails.IFSC_Code} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Branch Name:</label>
                    <input 
                        type="text" 
                        name="Branch_Name" 
                        value={bankDetails.Branch_Name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Vendor Name:</label>
                    <select 
                        name="vendor_name" 
                        value={bankDetails.vendor_name} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Vendor</option>
                        {vendors.map((vendor, index) => (
                            <option key={index} value={vendor.name}>
                                {vendor.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BankDetailsForm;
