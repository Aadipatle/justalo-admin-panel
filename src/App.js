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
import Cities from './Components/cities/Cities';
import CityForm from './Components/cities/Cities';
import CityList from './Components/citylist/CityList';
 
function App() {
  const token = sessionStorage.getItem('token');
     // <BrowserRouter>
      //   <ScrollToTop />
      //   <Routes>
      //   <Route element={<Signup />} path='/singup' />
      //   <Route element={<Login />} path='/' />
      //     <Route element={<Admin />} path='/admin/' >
      //       <Route element={<Dashboard />} path='' />
      //       <Route element={<EmpList />} path='users' />
      //       <Route element={<User />} path='users/:userId' />
      //       <Route element={<h1>Welcome </h1>} path='vendors' />
      //       <Route element={<h1>Welcome </h1>} path='tickets' />
      //     </Route>
        
      //   </Routes>
      // </BrowserRouter>


      const [data, setData] = useState([]);

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
          <Route path="" element={<Dashboard allvendor={data}/>} />
          <Route path="users" element={<EmpList />} />
          <Route path="vendors" element={<Vendors dat={data}/>} />
          <Route path="vendors/:vendorId" element={<Vendor vendor={data}/>} />
          <Route path="users/:userId" element={<User />} />
          <Route path="tickets" element={<h1>Welcome</h1>} />
          <Route path="city" element={<CityForm/>} />
          <Route path="citylist" element={<CityList/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
