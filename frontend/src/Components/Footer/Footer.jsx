import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = (props) => {
    return (
        <div className='footer'>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"></link>
           <div className="container">
            <div className="row">
                <div className="footer-col">
                    <h4>About Us</h4>
                    <ul>
                        <li><a href="#">about us</a></li>
                        <p>EcoSpin was born out of a shared passion for cycling and environmental sustainability. </p>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Online Shop</h4>
                    <ul>
                        <li><a href="/">Shop</a></li>
                        <li><a href="/mens">Men</a></li>
                        <li><a href="/womens">Women</a></li>
                        <li><a href="/kids">Kids</a></li>
                        
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow Us</h4>
                    <div class="social-links">
                    <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.twitter.com/" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
           </div>
        </div>
    )
}

export default Footer;
