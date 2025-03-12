import React from "react";
import './Sidebar.css';
import { Link } from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

const Sidebar = () => {

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
    };

    const authToken = localStorage.getItem('auth-token');


    if (!authToken) {
        return null;
    }

    return (
        <div className="sidebar">
            <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <p>Add Product</p>
                </div>
            </Link>
            
            <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <p>Product List</p>
                </div>
            </Link>
            <Link to={'/adminsignup'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                
                    <p>Create New Admin</p>
                </div>
            </Link>
            
            <Link to={'/rivews'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <p>RivewClassification</p>
                </div>
            </Link>

            <Link to={'/orders'} style={{ textDecoration: "none" }}>
                <div className="sidebar-item">
                    <p>Orders</p>
                </div>
            </Link>

            <Link to={'/'} style={{ textDecoration: "none" }} onClick={handleLogout}>
                <button  className="sidebar-button" onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Logout</button>
            </Link>

        </div>
    );
}

export default Sidebar;