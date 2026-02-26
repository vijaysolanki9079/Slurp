import React from 'react';
import "./Header.css";
import banner1Real from '../../assets/imgs/banner.png';

export const Header = () => {
  return (
    <div className="header">
      <div className="header-bg">
        <img src={banner1Real} alt="Premium Banner" height="100%" />
      </div>
    </div>
  );
}
