import React from "react";
import './Breadcrum.css';
import { Link } from "react-router-dom"; 
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
    const { product } = props;

    // check if product is present, if present get the product category and product name.
    if (!product || !product.category || !product.name) {
        return null; 
    }

    console.log('Product:', product);
    
    return (
        <div className="breadcrum">
            <Link style={{ textDecoration: 'none', color: 'black'}} to='/'>Shop</Link>
            <img src={arrow_icon} alt="" /> 
            <Link style={{ textDecoration: 'none', color: 'black'}} to={`/${product.category}s`}>{product.category}</Link>            
            <img src={arrow_icon} alt="" /> 
            {product.name}
        </div>
    );
};

export default Breadcrum;
