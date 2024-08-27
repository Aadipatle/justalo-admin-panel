import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './Pages/admin/Admin';
import Dashboard from './Components/dashboard/Dashboard';
import EmpList from './Components/userslist/EmpList';
import ScrollToTop from './Scroll';
import User from './Components/user/User';
 
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Admin />} path='/admin/' >
            <Route element={<Dashboard />} path='' />
            <Route element={<EmpList />} path='users' />
            <Route element={<User />} path='users/:userId' />
            <Route element={<h1>Welcome </h1>} path='vendors' />
            <Route element={<h1>Welcome </h1>} path='tickets' />
          </Route>
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
