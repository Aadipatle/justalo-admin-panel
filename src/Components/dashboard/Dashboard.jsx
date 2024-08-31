import React from 'react'
import './Dashboard.css'

import { FaUsers, FaIndianRupeeSign, FaTicketSimple, FaCar, FaTable } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Dashboard({allvendor}){
  let navigate = useNavigate()

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
              <h6 className='a'>{allvendor.length}</h6>
              <button onClick={() => navigate('vendors')}>view➡</button>
              <FaHospitalUser className='img' />
            </div>
            <div className="request">
              <h4>Total Tickets</h4>
              <h6 className='a'>500</h6>
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
              <button>view➡</button>
              <FaIndianRupeeSign className='img' />
            </div>
            <div className="request request1">
              <h4>Total Users</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
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