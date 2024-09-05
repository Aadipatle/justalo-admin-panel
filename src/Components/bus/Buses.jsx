import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusesByVendor, unverifyBus, verifyBus } from '../../app/reducers/VendorSlice';

function Buses() { 
    const { userId } = useParams();
    const dispatch = useDispatch();
    const {buses} = useSelector((state) => state.vendors);
    const status = useSelector((state) => state.vendors.status);
    const error = useSelector((state) => state.vendors.error);

    useEffect(() => {    
            dispatch(fetchBusesByVendor(userId));
    }, [dispatch, userId]);

    const handleVerify = (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(verifyBus({ busId: id, verified: newStatus }));
    };
    const handleunVerify = (id, currentStatus) => {
        const newStatus = !currentStatus;
        dispatch(unverifyBus({ busId: id, verified: newStatus }));
    };
console.log(buses)
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
                                {buses.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to={`/vendors/${item.id}`}>
                                                {item.bus_number}
                                            </Link>
                                        </td>
                                        <td>{item.chassis_num}</td>
                                        <td>{item.insurance_no}</td>
                                        <td>{item.no_of_row}</td>
                                        <td>{item.layout}</td>
                                        <td>{item.verified ? '☑' : '❌'}</td>
                                        <td>{
                                            item.verified ? <button style={{width:'90px'}} onClick={() => handleunVerify(item.id, false)}>unverify</button> :<button style={{width:'90px'}} onClick={() => handleVerify(item.id, true)}>verify</button>
                                        }
                                            
                                            
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
