import React, { useEffect, useState } from 'react'
import './Admin.css'
import logo from '../../Assets/admin/justalo.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { FaHeart, FaHospital, FaUser } from 'react-icons/fa'


function Admin() {
    const [icon, setIcon] = useState(false)
    const [payment, setPayment] = useState(false)
    const [boarding, setBoarding] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);
    function onPay(req) {
        if (req === 'payment') {
            setPayment(!payment)
        } else if (req === 'boarding') {
            setBoarding(!boarding)
        }


    }
    return (
        <>
            <header className='admin-header'>
                <div className="header-icon">
                    <img src={logo} alt="" />
                    <h2><span>Ab Safar Me,</span>  No Suffer</h2>
                </div>

            </header>
            <hr />
            <aside>
                <div className="hidden" onClick={() => {
                    setIcon(!icon)
                }}>⛔</div>
                <div className='sidebar'>
                    <div className="items">
                        <div className="dash">
                            <Link to='/'><button>Dashboard</button></Link>

                        </div>
                        <div className="category">
                            <Link to=''>Tatal Users</Link>
                            <hr />
                            <Link to=''>Total Vendor</Link>
                            <Link to=''>Total Revenue</Link>
                            <Link to=''>Total Tickets</Link>
                            <Link onClick={() => onPay('payment')} >Payment Settelment</Link>
                            {
                                payment && (<>
                                    <Link to=''>Pending</Link>
                                    <Link to=''>Complate</Link>
                                </>
                                )
                            }
                            <hr />
                            <Link onClick={() => onPay('boarding')}>Bording Points</Link>
                            {
                                boarding && (<>
                                    <Link to='/city'>Add Boarding Points</Link>
                                    <Link to='/citylist'>Boarding Points List</Link>
                                </>
                                )
                            }

                        </div>

                    </div>
                </div>
                {
                    icon &&
                    <div className="items1">
                        <div className="dash">
                            <Link to='/admin'><button>Dashboard</button></Link>

                        </div>
                        <hr />
                        <div className="hospital">
                            <h5><FaHospital /> Hospital</h5>
                            <Link to='hospitalform' onClick={() => {
                                setIcon(!icon)
                            }}>Add Hospital</Link>
                            <Link to='hospital' onClick={() => {
                                setIcon(!icon)
                            }}>Hospital List</Link>
                            <Link to='hospital' onClick={() => {
                                setIcon(!icon)
                            }}>Hospital Claim</Link>
                            <Link to='hospitalpay' onClick={() => {
                                setIcon(!icon)
                            }}>Hospital Payments</Link>
                        </div>
                        <hr />
                        <div className="health">
                            <h5><FaHeart /> Health Checkup</h5>
                            <Link to='hospital' onClick={() => {
                                setIcon(!icon)
                            }}>Health List</Link>
                        </div>
                        <hr />
                        <div className="admin-customers">
                            <h5><FaUser /> Customers</h5>
                            <Link to='empform' onClick={() => {
                                setIcon(!icon)
                            }}>Add Benificiary</Link>
                            <Link to='empform' onClick={() => {
                                setIcon(!icon)
                            }}>Add Family Members</Link>
                            <Link to='hospital' onClick={() => {
                                setIcon(!icon)
                            }}>Customers List</Link>
                        </div>
                    </div>
                }
                <section>
                    <Outlet />
                </section>
            </aside>
        </>
    )
}

export default Admin