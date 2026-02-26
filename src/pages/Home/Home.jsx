import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import "./Home.css"
import { Header } from '../../componemts/Header/Header';
import ExploreMenu from '../../componemts/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../componemts/FoodDisplay/FoodDisplay';
import AppDownload from '../../componemts/AppDownload/AppDownload';

import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const { category, setCategory } = React.useContext(StoreContext);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#explore-menu') {
      const element = document.getElementById('explore-menu');
      if (element) {
        // A slight timeout ensures the element exists fully in the DOM
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0); // Scroll to top if no hash
    }
  }, [location]);

  return (
    <div className='page-transition'>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
}

export default Home