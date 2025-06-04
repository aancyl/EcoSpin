import React, { useEffect, useState } from "react";
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
    const [newCollection, setNewCollection] = useState([]);

    useEffect(() => {
        fetch('https://ecospin-ecommerce-backend.onrender.com/newcollections')
            .then((response) => response.json())
            .then((data) => setNewCollection(data));
    }, []);

    return (
        <div className="popular"> 
            <p className="title">New</p>
            <h1>Arrivals</h1>
            <div className="popular-item">
                {newCollection.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
            
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Vujahday+Script&display=swap');
                `}
            </style>
        </div>
    );
};

export default NewCollections;
