import React, { useState, useContext } from "react";
import './CSS/Payment.css';
import { ShopContext } from "../Context/ShopContext";

const Payment = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
    const [paymentInfo, setPaymentInfo] = useState({
        cardholderName: "",
        cardNumber: "",
        expiration: "",
        cvv: "",
        email: "",
        address: "",
        postalCode: ""
    });
    const [orderStatus, setOrderStatus] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    const placeOrder = async () => {
        try {
            // Validation checks
            const errors = {};
            if (!paymentInfo.cardholderName.trim()) {
                errors.cardholderName = "Cardholder name is required";
            } else if (!validateCardholderName(paymentInfo.cardholderName)) {
                errors.cardholderName = "Invalid cardholder name";
            }
            if (!paymentInfo.cardNumber.trim()) {
                errors.cardNumber = "Card number is required";
            } else if (!validateCardNumber(paymentInfo.cardNumber)) {
                errors.cardNumber = "Invalid card number";
            }
            if (!paymentInfo.expiration.trim()) {
                errors.expiration = "Expiration date is required";
            }
            if (!paymentInfo.cvv.trim()) {
                errors.cvv = "CVV is required";
            } else if (!validateCVV(paymentInfo.cvv)) {
                errors.cvv = "Invalid CVV";
            }
            if (!paymentInfo.email.trim()) {
                errors.email = "Email address is required";
            } else if (!validateEmail(paymentInfo.email)) {
                errors.email = "Invalid email address";
            }
            if (!paymentInfo.address.trim()) {
                errors.address = "Address is required";
            }
            if (!paymentInfo.postalCode.trim()) {
                errors.postalCode = "Postal code is required";
            } else if (!validatePostalCode(paymentInfo.postalCode)) {
                errors.postalCode = "Invalid postal code";
            }

            setValidationErrors(errors);

            if (Object.keys(errors).length > 0) {
                setOrderStatus("failure");
                return;
            }

            // If all validations pass, send the order data to the server
            const response = await fetch('https://ecospin-ecommerce-backend.onrender.com/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    totalAmount: getTotalCartAmount(),
                    paymentDetails: {
                        cardholderName: paymentInfo.cardholderName,
                        cardNumber: paymentInfo.cardNumber,
                        cvv: paymentInfo.cvv,
                        expiration: paymentInfo.expiration,
                        postalCode: paymentInfo.postalCode,
                    },
                    email: paymentInfo.email,
                    address: paymentInfo.address,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order. Server response not ok.');
            }

            const data = await response.json();
            if (data.success) {
                setOrderStatus("success");
            } else {
                setOrderStatus("failure");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            setOrderStatus("failure");
        }
    };

    // Validation functions
    const validateCardholderName = (name) => {
        return /^[a-zA-Z\s]*$/.test(name);
    };

    const validateCardNumber = (number) => {
        return /^\d{16}$/.test(number);
    };

    const validateCVV = (cvv) => {
        return /^\d{4}$/.test(cvv);
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePostalCode = (postalCode) => {
        return /^\d{5}$/.test(postalCode);
    };

    return (
        <div className="payment">
            <div className="payment-details">
                <h1>Payment</h1>
                <h4>Total cost: {getTotalCartAmount()}</h4>
                <div className="payment-credit-card">
                    <div className="payment-card-details">
                        <p>Cardholder Name</p>
                        <input type="text" name="cardholderName" value={paymentInfo.cardholderName} onChange={handleInputChange} />
                        {validationErrors.cardholderName && <p className="error red-text">{validationErrors.cardholderName}</p>}

                        <p>Card Number</p>
                        <input type="number" name="cardNumber" value={paymentInfo.cardNumber} onChange={handleInputChange} />
                        {validationErrors.cardNumber && <p className="error red-text">{validationErrors.cardNumber}</p>}

                        <div className="payment-Expiration-CVV">
                            <div className="expiration">
                                <p>Expiration</p>
                                <input type="date" name="expiration" value={paymentInfo.expiration} onChange={handleInputChange} />
                                {validationErrors.expiration && <p className="error red-text">{validationErrors.expiration}</p>}
                            </div>
                            <div className="cvv">
                                <p>CVV</p>
                                <input type="number" name="cvv" value={paymentInfo.cvv} onChange={handleInputChange} />
                                {validationErrors.cvv && <p className="error red-text">{validationErrors.cvv}</p>}
                            </div>
                        </div>

                        <div className="email">
                            <p>Email</p>
                            <input type="email" name="email" value={paymentInfo.email} onChange={handleInputChange} />
                            {validationErrors.email && <p className="error red-text">{validationErrors.email}</p>}
                        </div>

                        <div className="address">
                            <p>Address</p>
                            <input type="text" name="address" value={paymentInfo.address} onChange={handleInputChange} />
                            {validationErrors.address && <p className="error red-text">{validationErrors.address}</p>}
                        </div>

                        <p>Postal Code</p>
                        <input type="number" name="postalCode" value={paymentInfo.postalCode} onChange={handleInputChange} />
                        {validationErrors.postalCode && <p className="error red-text">{validationErrors.postalCode}</p>}

                        <button className="place-order-button" onClick={placeOrder}>Place Order</button>
                        {orderStatus === "success" && <p>Order placed successfully!</p>}
                        {orderStatus === "failure" && <p>Failed to place order. Please try again.</p>}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Payment;
