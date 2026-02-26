import React, { useState } from 'react';
import { Navbar } from './componemts/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/LandingPage';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import { Cart } from './pages/Cart/Cart';
import Footer from './componemts/Footer/Footer';
import LoginPopup from './componemts/LoginPopup/LoginPopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyOrders from './pages/MyOrders/MyOrders';
import { useLocation } from 'react-router-dom';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const location = useLocation();
  const isOverlayPage = location.pathname === '/' || location.pathname === '/menu';

  // ✅ Only show atmosphere on landing page
  const showAtmosphere = location.pathname === '/';

  return (
    <>
      {/* ── Only renders on '/' route ── */}
      {showAtmosphere && (
        <>
          <div className="atm-blob atm-blob--1" aria-hidden="true" />
          <div className="atm-blob atm-blob--2" aria-hidden="true" />
          <div className="atm-blob atm-blob--3" aria-hidden="true" />
          <div className="atm-vignette" aria-hidden="true" />
          <div className="atm-scanlines" aria-hidden="true" />
        </>
      )}

      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}

      <div className={`app ${isOverlayPage ? 'landing-app' : ''}`}>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/menu' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;