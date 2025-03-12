import React, { useState } from "react";
import './AdminSignup.css';
import Hide from "../../assets/hide.png";
import Show from "../../assets/show.png";

const AdminSignup = () => {
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordColor, setPasswordColor] = useState("");
    const [error, setError] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const signUp = async () => {

        if (!formData.name || !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");

        console.log("Sign Up function executed", formData);
        try {
            if (formData.password !== formData.confirmPassword) {
                setError("Passwords do not match.");
                return;
            }

            const response = await fetch('http://localhost:4000/adminsignup', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                alert("Admin account created successfully!");
            } else {
                setError(responseData.error);
            }
        } catch (error) {
            console.error("Error occurred during admin sign up:", error);
            setError("An error occurred during admin sign up. Please try again later.");
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setFormData({ ...formData, password });
      
        const strength = calculatePasswordStrength(password);
        setPasswordStrength(strength);
        setPasswordColor(getPasswordColor(strength));
    };

    const calculatePasswordStrength = (password) => {
        let strength = 0;

        // Check length
        if (password.length >= 8) {
            strength += 1;
        }
        // Check for uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        // Check for lowercase letters
        if (/[a-z]/.test(password)) {
            strength += 1;
        }
        // Check for numbers
        if (/\d/.test(password)) {
            strength += 1;
        }
        // Check for special characters
        if (/[^A-Za-z0-9]/.test(password)) {
            strength += 1;
        }
        if (/[/^\s+$/]/.test(password)){
            strength += 2;
        }
        // Assign a strength label based on the calculated score
        if (strength <= 2) {
            return "Weak";
        } else if (strength <= 3) {
            return "Medium";
        } else {
            return "Strong";
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    };

    const getPasswordColor = (strength) => {
        switch (strength) {
            case "Weak":
                return "red";
            case "Medium":
                return "orange";
            case "Strong":
                return "green";
            default:
                return "black";
        }
    };

    return (
        <div className="adminsignup">
            <div className="adminsignup-container">
                <h1>New Admin</h1>
                <div className="adminsignup-fields">
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                        type="text" 
                        placeholder="User Name" 
                    />
                    
                    {/* {passwordStrength && (
                            <div  className="password-strength-indicator" style={{ color: passwordColor }}>
                                {passwordStrength}
                            </div>
                            )} */}
                            


                    <div className="password-container">
                            
                        <input 
                            name="password" 
                            value={formData.password} 
                            onChange={handlePasswordChange} 
                            type={passwordVisible ? "text" : "password"} 
                            placeholder="Password" 
                            style={{ border: `2px solid ${passwordColor}`}}
                        />
                        <button onClick={togglePasswordVisibility}>
                            {passwordVisible ? <img src={Show} alt="Show" /> : <img src={Hide} alt="Hide" />} Password
                        </button>
                    </div>
                    
                    <input 
                        name="confirmPassword" 
                        value={formData.confirmPassword} 
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                        type="password" 
                        placeholder="Confirm Password" 
                    />
                    

                    
                </div>
                <button onClick={signUp}>Create Admin</button>
                {error && <div className="invalid-inputs" style={{ color: "red"}}>{error}</div>}
            </div>
        </div>
    );
}

export default AdminSignup;
