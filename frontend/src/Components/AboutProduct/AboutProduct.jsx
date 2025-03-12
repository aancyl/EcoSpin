import React, { useContext } from "react";
import './AboutProduct.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/cart_cross_icon.png';

import getTotalCartAmount from '../../Context/ShopContext';
const AboutProduct = () => {
    return (
        <div className="aboutproduct">
            <div className="sustainable"> Sustainable
                <div>
                <p className="description">We only use recycled
and biodegradable materials sourced in Europe</p>
                </div>
               
            </div>

            <div className="high-quality">
                High Quality
                <div>
                <p className="description">All of our frames are carefully handcrafted in Italy</p>
                </div>
               
            </div>

            <div className="innovation"> Innovation
                <div>
                <p className="description">We are dedicated to innovation with a conscience</p>
                </div>
                
            </div>
        </div>
    );
};

export default AboutProduct;
