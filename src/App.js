import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './Pages/admin/Admin';
import Dashboard from './Components/dashboard/Dashboard';
import EmpList from './Components/userslist/EmpList';
import ScrollToTop from './Scroll';
import User from './Components/user/User';
import Signup from './Pages/singup/Singup';
import Login from './Pages/login/Login';
import PrivateRoute from './Components/protected/Private';
import Vendors from './Components/vendorlist/Vendors';
import Vendor from './Components/vendor/Vendor';
import { useEffect, useState } from 'react';
import CityForm from './Components/cities/Cities';
import CityList from './Components/citylist/CityList';
import Driver from './Components/driver/Driver';
import Buses from './Components/bus/Buses';
import SingleDriver from './Components/driver/SingleDriver';
import RentVehicle from './Components/vehicles/RentVehicle';
import TicketPage from './Components/tickets/TicketPage';
import PaymentHistoryPage from './Components/paymentHistory/PaymentHistory';
 
function App() {
  const token = sessionStorage.getItem('token');

      const [data, setData] = useState([]);
      const [rent, setRent] = useState([]);

    useEffect(() => {
        async function getData() {
          try {
            let url = 'http://68.183.87.102:8080/AllVendor';
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
    
            let emp = await response.json();
            setData(emp);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }
        getData();
    }, []);
    useEffect(() => {
        async function getData() {
          try {
            let url = 'http://68.183.87.102:8080/getRentdetails';
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
    
            let emp = await response.json();
            setRent(emp);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }
        getData();
    }, []);

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Dashboard allvendor={data} rent={rent}/>} />
          <Route path="users" element={<EmpList />} />
          <Route path="vendors" element={<Vendors dat={data}/>} />
          <Route path="vendors/:vendorId" element={<Vendor vendor={data}/>} />
          <Route path="users/:userId" element={<User />} />
          <Route path="city" element={<CityForm/>} />
          <Route path="citylist" element={<CityList/>} />
          <Route path="driver/:userId" element={<Driver/>} />
          <Route path="singledriver/:userId" element={<SingleDriver/>} />
          <Route path="bus/:userId" element={<Buses/>} />
          <Route path="rentvehicles" element={<RentVehicle />} />
          <Route path="tickets" element={<TicketPage />} />
          <Route path="paymenthistory" element={<PaymentHistoryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
