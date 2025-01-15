import React from 'react'
import './Footer.css'
import { assets } from '../../assets/food del assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
           <img src={assets.logo} alt="" />
           <p>Thank you for choosing us for your food delivery needs. We’re committed to bringing you the freshest, most delicious meals with convenience and care. Your satisfaction is our priority!</p>
           <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
           </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Contact Us</h2>
            <ul>
                <li>+91-244-253-1825</li>
                <li>foodDel@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright {new Date().getFullYear()}© All Rights Reserved</p>
    </div>
  )
}

export default Footer
