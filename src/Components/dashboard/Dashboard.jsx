import React, { useEffect, useState } from 'react'
import './Dashboard.css'

import { FaUsers,FaIndianRupeeSign,FaTicketSimple } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
function Dashboard() {
  const [data, setData] = useState([]);
  const [dpending, setDpending] = useState([]);
  const [autho, setAutho] = useState([]);
  const [reject, setReject] = useState([]);
  let navigate=useNavigate()
  useEffect(() => {
    async function getData() {
      try {
        let url = 'http://localhost:8080/allcustomers';
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let emp = await response.json();
        setData(emp);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    let status = data.filter((e) => e.status === 'pending')
    let authorize = data.filter((e) => e.status === 'Authorized')
    let reject = data.filter((e) => e.status === 'Rejected')
    setDpending(status)
    setAutho(authorize)
    setReject(reject)
  }, [data])
  return (
    <>
      <div className="dashbord">
        <h1 className='h1'>Dashboard</h1>
        <div className="admin-hospital">
          <div className="requests">
            <div className="request">
              <h4>Total Users</h4>
              <h6 className='a'>200</h6>
              <button onClick={()=>navigate('users')}>view➡</button>
              <FaUsers className='img' />
            </div>
            <div className="request">
              <h4>Total Vendors</h4>
              <h6 className='a'>158</h6>
              <button onClick={()=>navigate('vendors')}>view➡</button>
              <FaHospitalUser className='img' />
            </div>
            <div className="request">
              <h4>Total Tickets</h4>
              <h6 className='a'>500</h6>
              <button onClick={()=>navigate('tickets')}>view➡</button>
              <FaTicketSimple className='img' />
            </div>
          </div>
        </div>
        <div className="admin-hospital">
          <div className="requests">
          <div className="request">
          <h4>Total Revenue</h4>
          <h6 className='a'>500000.00</h6>
          <button>view➡</button>
          <FaIndianRupeeSign className='img' />
        </div>
            <div className="request">
              <h4>Total Users</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
              <FaUsers className='img' />
            </div>
            <div className="request">
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
              <h4>Total Users</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
              <FaUsers className='img' />
            </div>
            <div className="request">
              <h4>Total Users</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
              <FaUsers className='img' />
            </div>
            <div className="request">
              <h4>Total Users</h4>
              <h6 className='a'>200</h6>
              <button>view➡</button>
              <FaUsers className='img' />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Dashboard