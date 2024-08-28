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
          <Route path="" element={<Dashboard />} />
          <Route path="users" element={<EmpList />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="vendors/:vendorId" element={<Vendor/>} />
          <Route path="users/:userId" element={<User />} />
          <Route path="vendors" element={<h1>Welcome</h1>} />
          <Route path="tickets" element={<h1>Welcome</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
