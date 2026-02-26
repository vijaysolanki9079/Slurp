import React, { useState } from 'react'
import "./Home.css"
import { Header } from '../../componemts/Header/Header';
import ExploreMenu from '../../componemts/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../componemts/FoodDisplay/FoodDisplay';
import AppDownload from '../../componemts/AppDownload/AppDownload';

import { StoreContext } from '../../context/StoreContext';

const Home = () => {
  const { category, setCategory } = React.useContext(StoreContext);

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