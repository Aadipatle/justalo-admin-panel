import React, { useEffect } from 'react'
import './Dashboard.css'

import { FaUsers, FaIndianRupeeSign, FaTicketSimple, FaCar, FaTable } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVehicles } from '../../app/reducers/vehicleSlice';
import { fetchVendors } from '../../app/reducers/VendorSlice';

function Dashboard(){
  let navigate = useNavigate()
  const dispatch = useDispatch();


  const { vehicles } = useSelector((state) => state.vehicles);
  const { data } = useSelector(state => state.vendors);

  useEffect(() => {
     
          dispatch(fetchVehicles());
      
      dispatch(fetchVendors());
  }, [dispatch]);

  return (
    <>
      <div className="dashbord">
        <h1 className='h1'>Dashboard</h1>
        <div className="admin-hospital">
          <div className="requests">
            <div className="request">
              <h4>Total Users</h4>
              <h6 className='a'>200</h6>
              <button onClick={() => navigate('users')}>view➡</button>
              <FaUsers className='img' />
            </div>
            <div className="request">
              <h4>Total Vendors</h4>
              <h6 className='a'>{data.length}</h6>
              <button onClick={() => navigate('vendors')}>view➡</button>
              <FaHospitalUser className='img' />
            </div>
            <div className="request">
              <h4>Total Tickets</h4>
              <h6 className='a'>3</h6>
              <button onClick={() => navigate('tickets')}>view➡</button>
              <FaTicketSimple className='img' />
            </div>
          </div>
        </div>
        <div className="admin-hospital">
          <div className="requests">
            <div className="request request1">
              <h4>Total Revenue</h4>
              <h6 className='a'>500000.00</h6>
              <button onClick={() => navigate('paymenthistory')}>view➡</button>
              <FaIndianRupeeSign className='img' />
            </div>
            <div className="request request1">
              <h4>Rent Vehicles</h4>
              <h6 className='a'>{vehicles.length}</h6>
              <button onClick={() => navigate('rentvehicles')}>view➡</button>
              <FaUsers className='img' />
            </div>
            
          </div>
        </div>
        <div className="admin-hospital">
          <div className="requests">
            <div className="request">
              <h4>AC Vehicle</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
              <FaCar className='img' />
            </div>
            <div className="request">
              <h4>Non-AC Vehicle</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
              <FaCar className='img' />
            </div>
            <div className="request">
              <h4>Total Counter</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
              <FaTable className='img' />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard