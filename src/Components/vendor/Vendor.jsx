import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vendor.css'

function Vendor({ vendor }) {
    // const [vendor, setVendor] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const { vendorId } = useParams();

    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             let url = 'http://68.183.87.102:8080/AllVendor';
    //             let response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             let emp = await response.json();
    //             setVendor(emp);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     getData();
    // }, []);

    // useEffect(() => {
    //     async function getDriver() {
    //         try {
    //             let url = `http://68.183.87.102:8080/AllDriverByPerticularVendor/${vendorId}`;
    //             let response = await fetch(url);
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             let allDriver = await response.json();
    //             setDrivers(allDriver);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     getDriver();
    // }, []);

    let newVendor = vendor.filter((e) => e.id === parseInt(vendorId));
    console.log(newVendor)
    return (
        <>
            <div className="userwrapper">
                <div className="bus-card">
                    <div className="card-content">
                        {
                            newVendor.map((e) => (
                                <>
                                    <h1>Vendor Details</h1>
                                    <h1>{e.username}</h1>
                                    <img src={e.profile_img} alt="vendor-image" width={'180px'} />
                                    <p><strong>Organization:</strong> {e.organization_name}</p>
                                    <p><strong>Contact:</strong> {e.phone_number}</p>
                                    <p><strong>Email:</strong> {e.email}</p>
                                    <p><strong>Address:</strong> {e.address}</p>
                                    <div className="docs">
                                        <h2>Documents</h2>
                                        <img src={e.doc1} alt="dos1" width={'280px'} height={'250px'} />
                                        <img src={e.doc2} alt="docs2" width={'280px'} height={'250px'} />
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vendor;
