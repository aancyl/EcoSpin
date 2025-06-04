import React, { useState, useEffect } from 'react';
import './AddReview.css';


// Getting all the product details
const AddReview = ({ all_product, product }) => {
    const [productId, setProductId] = useState(null);
    const [formData, setFormData] = useState({
        productId: '',
        username: '',
        rating: '',
        comment: ''
    });

    useEffect(() => {
        if (all_product && product) {
            const foundProduct = all_product.find(item => item.id === product.id);
            if (foundProduct) {
                setProductId(foundProduct._id);
            }
        }
    }, [all_product, product]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!productId) {
                console.error("Product ID is null. Cannot submit review.");
                return;
            }

            const reviewData = {
                productId: productId,
                username: formData.username,
                rating: formData.rating,
                comment: formData.comment
            };

            window.location.replace("/mens");

            const response = await fetch('https://ecospin-ecommerce-backend.onrender.com/addreview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message); // Display success message
            } else {
                alert(data.error); // Display error message
            }

        } catch (error) {
            console.error("Error adding review:", error);
            alert("Review Added!");
        }
    };

    const handleChange = (e) => {
        let { name, value } = e.target;

        // Ensure rating does not exceed 5 and is at least 1
        if (name === "rating") {
            value = Math.max(1, Math.min(value, 5));
        }

        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // look for auth token in the localsorage 
    const authToken = localStorage.getItem('auth-token');

    if (!authToken) {
        return null; // In the absens of the auth token, the AddReview component should not be displayed
    }

    return (
        <div className="add-review">
            <div className="add-review-container">
                <h1>Add Review</h1>
                <div className="add-review-form">
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                    <input type="number" name="rating" placeholder="Rating" min="1" max="5" onChange={handleChange} />
                    <input type="text" name="comment" placeholder="Comment" onChange={handleChange} />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
