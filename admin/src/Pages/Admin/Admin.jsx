import React from "react";
import './Admin.css';
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import AdminLogin from '../../Components/AdminLogin/AdminLogin';
import AdminSignup from '../../Components/AdminSignup/AdminSignup';
import Rivews from '../../Components/Rivews/Rivews';
import AllOrders from '../../Components/ListOrders/Orders';
const Admin = () => {
    return (
        <div className="admin">
            <Sidebar />
            <Routes>
                <Route path="/" element={<AdminLogin />} /> 
                <Route path="/adminsignup" element={<AdminSignup/>}/>
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/listproduct' element={<ListProduct />} />
                <Route path='/rivews' element={<Rivews/>}/>
                <Route path='/orders' element={<AllOrders/>}/>
            </Routes>
        </div>
    )
}

export default Admin;
