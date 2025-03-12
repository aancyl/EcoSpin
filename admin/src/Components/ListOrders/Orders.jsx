import React, { useEffect, useState } from 'react';
import './Orders.css';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [showOnlyIncomplete, setShowOnlyIncomplete] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:4000/allorders');
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                console.error("Failed to fetch orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleShowIncomplete = () => {
        setShowOnlyIncomplete(true);
        setShowCompleted(false);
    };

    const handleShowCompleted = () => {
        setShowOnlyIncomplete(false);
        setShowCompleted(true);
    };

    const handleShowAllOrders = () => {
        setShowOnlyIncomplete(false);
        setShowCompleted(false);
    };

    const handleMarkCompleted = async (orderId) => {
        try {
            await fetch(`http://localhost:4000/markcompleted/${orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed: true })
            });
            fetchOrders();
        } catch (error) {
            console.error("Error marking order as completed:", error);
        }
    };

    return (
        <div className="order-page">
            <h1>All Orders</h1>
            <div className="filter-buttons">
                <button onClick={handleShowIncomplete}>Incomplete</button>
                <button onClick={handleShowCompleted}>Completed</button>
                <button onClick={handleShowAllOrders}>All</button>
            </div>
            <div className="order-list">
                {orders.map((order, index) => {
                    if ((!showOnlyIncomplete || !order.completed) && (!showCompleted || order.completed)) {
                        return (
                            <div key={index} className="order-item">
                                <h1>Order #{index + 1}</h1>
                                <p>Total Amount: {order.totalAmount}</p>
                                <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                                <p>Email: {order.email}</p>
                                <p>Address: {order.address}</p>
                                <p>Payment Details:</p>
                                <ul>
                                    <li>Card Holder: {order.paymentDetails.cardHolder}</li>
                                    <li>Card Number: {order.paymentDetails.cardNumber}</li>
                                    <li>CVV: {order.paymentDetails.cvv}</li>
                                    <li>Expiration: {new Date(order.paymentDetails.expiration).toLocaleString()}</li>
                                    <li>Postal Code: {order.paymentDetails.postalCode}</li>
                                </ul>
                                {!order.completed && (
                                    <button onClick={() => handleMarkCompleted(order._id)}>Mark Completed</button>
                                )}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default OrderPage;
