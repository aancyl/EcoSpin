import React, { useEffect, useState } from "react";
import './RelatedProducts.css';
import Item from "../Item/Item";

const RelatedProducts = () => {
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => {
                // Choose 4 random products from the fetched data
                const randomIndices = getRandomIndices(data.length, 4);
                const selectedProducts = randomIndices.map(index => data[index]);
                setRandomProducts(selectedProducts);
            })
            .catch((error) => console.error('Error fetching random products:', error));
    }, []);

    // Function to generate random unique indices
    const getRandomIndices = (max, count) => {
        const indices = [];
        while (indices.length < count) {
            const randomIndex = Math.floor(Math.random() * max);
            if (!indices.includes(randomIndex)) {
                indices.push(randomIndex);
            }
        }
        return indices;
    };

    return (
        <div className="popular">
            <div className="heading">
                <p className="title">Related</p>
                <h1>Products</h1>
            </div>
            <div className="popular-item">

                {randomProducts.map((product, index) => (
                    <Item
                        key={index}
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        new_price={product.new_price}
                        old_price={product.old_price}
                    />
                ))}
            </div>

            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Vujahday+Script&display=swap');
                `}
            </style>
        </div>
    );
}

export default RelatedProducts;
