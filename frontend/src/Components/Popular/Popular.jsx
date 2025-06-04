import React, { useEffect, useState } from "react";
import './Popular.css';
// import data_product from '../Assets/data';
import Item from '../Item/Item'; 

const Popular = () => {

    const [popularProducts, setPopularProducts] = useState([]);
    useEffect(()=>{
        fetch('https://ecospin-ecommerce-backend.onrender.com/popular')
        .then((response)=>response.json())
        .then((data)=>setPopularProducts(data))
    },[]);


    return(

        <div className="popular">
            <p className="title">Ride in</p>
            <h1>Style</h1>
            
            <div className="popular-item">
                {popularProducts.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
            <style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Vujahday+Script&display=swap')
</style>
        </div>
    )
}

export default Popular;
