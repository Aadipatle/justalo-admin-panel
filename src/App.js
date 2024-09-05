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
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from './app/reducers/VendorSlice';
import BankDetailsForm from './Components/bankDetails/BankDetailsForm';
import PaymentDetails from './Components/bankDetails/BankDetailsPage';

function App() {
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
            <Route path="" element={<Dashboard  />} />
            <Route path="users" element={<EmpList />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="vendors/:vendorId" element={<Vendor />} />
            <Route path="users/:userId" element={<User />} />
            <Route path="city" element={<CityForm />} />
            <Route path="citylist" element={<CityList />} />
            <Route path="driver/:userId" element={<Driver />} />
            <Route path="singledriver/:userId" element={<SingleDriver />} />
            <Route path="bus/:userId" element={<Buses />} />
            <Route path="rentvehicles" element={<RentVehicle />} />
            <Route path="tickets" element={<TicketPage />} />
            <Route path="paymenthistory" element={<PaymentHistoryPage />} />
            <Route path="addbankdetails" element={<BankDetailsForm />} />
            <Route path="bankdetailspage" element={<PaymentDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
