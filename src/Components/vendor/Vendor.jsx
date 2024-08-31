import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Vendor.css'
import { Link } from 'react-router-dom';

function Vendor({ vendor }) {
    // const [vendor, setVendor] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [bus, setBus] = useState([]);
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

    useEffect(() => {
        async function getDriver() {
            try {
                let url = `http://68.183.87.102:8080/AllDriverByPerticularVendor/${vendorId}`;
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
                let allDriver = await response.json();
                setDrivers(allDriver);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getDriver();
    }, []);
    useEffect(() => {
        async function getDriver() {
            try {
                let url = `http://68.183.87.102:8080/getAllBusByPerticularVendor/${vendorId}`;
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
                let allDriver = await response.json();
                setBus(allDriver);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getDriver();
    }, []);
    console.log(bus)
    let newVendor = vendor.filter((e) => e.id === parseInt(vendorId));
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

                                        <img src={e.doc1} alt="dos1" width={'180px'} height={'150px'} />
                                        <img src={e.doc2} alt="docs2" width={'180px'} height={'150px'} />
                                    </div>
                                    <div className="driver">
                                    <h5>Drivers {drivers.length}</h5>
                                    <Link to={`/driver/${e.id}`}>view driver</Link>
                                </div><br />
                                    <div className="driver1">
                                    <h5>Drivers {bus.length}</h5>
                                    <Link to={`/bus/${e.id}`}>view bus</Link>
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
