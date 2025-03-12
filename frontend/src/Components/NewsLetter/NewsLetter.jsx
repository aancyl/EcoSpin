import React, { useState } from "react";
import './NewsLetter.css';

const NewsLetter = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); 
            } else {
                alert(data.error); 
            }
        } catch (error) {
            console.error("Error during newsletter registration:", error);
            alert("An error occurred during newsletter registration. Please try again later.");
        }
    };

    return (
        <div className="newsletter">
            <script src='https://kit.fontawesome.com/a076d05399.js' crossOrigin='anonymous'></script>
            <h1>Exclusive Offers?</h1>
            <form onSubmit={handleSubmit}>
                <div className="register">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit"><i className='fas fa-angle-right'></i></button>
                </div>
            </form>
        </div>
    );
};

export default NewsLetter;