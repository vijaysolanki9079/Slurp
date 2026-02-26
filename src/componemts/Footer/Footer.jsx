import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <div className='footer-content'>
        <div className="footer-content-left">
          <div className="logo-container">
            <img src={assets.logo} alt="Slurp Kitchen Logo" />
          </div>
          <p>The art of fine dining, delivered. We bring the world's most exquisite flavors directly to your sanctuary, crafted with passion and served with excellence. Join our culinary community and experience the Slurp philosophy.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@slurpkitchen.com</li>
          </ul>
        </div>
      </div>

      <hr />
      <p className="footer-copyright">Copyright 2026 © SlurpKitchen.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer;