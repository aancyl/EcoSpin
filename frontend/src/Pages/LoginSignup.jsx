import React, { useState } from "react";
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        email:""
    })

    const changeHandler = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }


    const login = async() =>{
        console.log("Login function executed", formData);
        let responseData;
        try {
            const response = await fetch('https://ecospin-ecommerce-backend.onrender.com/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json', // Corrected typo here
                },
                body: JSON.stringify(formData),
            });
            responseData = await response.json(); // Directly await for JSON parsing
    
            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.errors);
            }
        } catch (error) {
            console.error("Error occurred during signup:", error);
            // Handle error appropriately
            alert("An error occurred during signup. Please try again later.");
        }
    }

    const signup = async () => {
        console.log("Signup function executed", formData);
        let responseData;
        try {
            const response = await fetch('https://ecospin-ecommerce-backend.onrender.com/signup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json', // Corrected typo here
                },
                body: JSON.stringify(formData),
            });
            responseData = await response.json(); // Directly await for JSON parsing
    
            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.errors);
            }
        } catch (error) {
            console.error("Error occurred during signup:", error);
            // Handle error appropriately
            alert("An error occurred during signup. Please try again later.");
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Name" />:<></>}
                    
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                    
                </div>
                <button onClick={()=>{state === "Login"?login(): signup()}}>
                    {state === "Login" ? "Login" : "Sign Up"}
                </button>
                {state==="Sign Up"
                ?<p className="loginsignup-login">
                    Have an Account ? <span onClick={()=>{setState("Login")}}> Login</span >
                </p>:<p className="loginsignup-login">
                    Create an Account ? <span onClick={()=>{setState("Sign Up")}}> Click here</span >
                </p>}
                
            </div>
        </div>
    );
}

export default LoginSignup;
