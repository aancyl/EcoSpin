import React, { useState } from "react";
import './AdminLogin.css';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const signIn = async () => {
        console.log("Log In function executed", formData);
        let responseData;
        try {
            const response = await fetch('https://ecospin-ecommerce-backend.onrender.com/adminlogin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                alert("Successfully Signed in !");
                window.location.reload();
            } else {
                alert(responseData.error);
            }
        } catch (error) {
            console.error("Error occurred during sign in:", error);
            alert("An error occurred during sign in. Please try again later.");
        }
    };

    return (
        <div className="adminlogin">
            <div className="adminlogin-container">
                <h1>Admin Login</h1>
                <div className="adminlogin-fields">
                    <input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder="User Name" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={signIn}>Login</button>
            </div>
        </div>
    );
}

export default AdminLogin;
