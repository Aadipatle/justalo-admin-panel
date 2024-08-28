import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Vendor() {
    const [vendor, setVendor] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const { vendorId } = useParams();

    useEffect(() => {
        async function getData() {
            try {
                let url = 'http://68.183.87.102:8080/AllVendor';
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let emp = await response.json();
                setVendor(emp);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getData();
    }, []);
    useEffect(() => {
        async function getDriver() {
            try {
                let url = `http://68.183.87.102:8080/AllDriverByPerticularVendor/${vendorId}`;
                let response = await fetch(url);
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
    
    let newVendor = vendor.filter((e) => e.id === parseInt(vendorId));

    return (
        <>
            <div className="userwrapper">
                <div className="bus-card">
                    <div className="card-content">
                        {newVendor.length > 0 ? (
                            <>
                            <h3>{newVendor[0].username}</h3>
                            <img src={newVendor[0].profile_img} alt="" width={'150px'} />
                            </>
                            
                        ) : (
                            <p>No vendor found</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Vendor;
