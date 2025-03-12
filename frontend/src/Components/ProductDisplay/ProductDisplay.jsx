import React, { useContext, useRef, useState, useEffect } from "react";
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const imgRef = useRef(null);

    // A collection of product Desciptions
    const [descriptions, setDescriptions] = useState([
        "Crafting bespoke, made-to-order bicycles is a meticulous process that fuses technical prowess with artistic vision. Beginning with a client consultation, the artisan carefully designs the bicycle, considering the rider's preferences and purpose. In a well-equipped workshop, the frame takes shape, with materials such as steel, titanium, or carbon fiber meticulously assembled through welding or brazing. The artisan pays keen attention to detail, ensuring precision in frame alignment and component assembly. Aesthetic customization, including personalized paint jobs, adds a unique touch. Rigorous quality control guarantees the bicycle's performance and durability. This artisanal endeavor extends beyond construction, encompassing personalized customer service and marketing efforts to establish a distinct presence in the niche market of handcrafted, tailor-made bicycles.",
        "Sustainable Cycles for Your Sustainable Lifestyle. Explore our bespoke bicycles, crafted with eco-friendly materials and tailored to your preferences. Each EcoSpin creation is a testament to our commitment to sustainability and quality. From the frame to the components, every detail is thoughtfully considered, ensuring a ride that's not only smooth and stylish but also environmentally responsible. Whether you're commuting through the city streets or exploring rugged terrains, our bicycles offer both performance and conscience. Join us in shaping a greener future, one pedal at a time, with EcoSpin.",
        "Discover handcrafted bicycles designed for eco-conscious riders seeking style, performance, and planet-friendly choices. At EcoSpin, we believe in harmonizing with nature while embracing innovation and design. Our artisanal bicycles are meticulously crafted using sustainable materials and manufacturing processes, minimizing environmental impact without compromising on quality or aesthetics. With a focus on both form and function, each EcoSpin bicycle is a blend of beauty and performance, perfect for those who appreciate the finer details of cycling. Experience the synergy of nature and motion with EcoSpin, and ride with purpose.",
        "Ride Green, Ride Unique. Experience the fusion of craftsmanship and sustainability with our custom-made bicycles, built just for you. At EcoSpin, we celebrate individuality and environmental consciousness in every ride. Our personalized bicycles are crafted with care and precision, reflecting your unique style and preferences while prioritizing eco-friendly materials and practices. From the initial consultation to the final assembly, our team of artisans ensures that each EcoSpin bicycle is a reflection of your personality and values. Join the movement towards greener transportation and personalized cycling experiences with EcoSpin.",
        "Crafting Your Cycling Story, One Eco-Friendly Ride at a Time. Explore our collection of personalized bicycles, designed to enhance your journey while reducing your carbon footprint. At EcoSpin, we believe that every ride tells a story – a story of adventure, sustainability, and personal expression. Our curated collection of bespoke bicycles offers a range of options to suit your riding style and environmental ethos. Whether you're navigating city streets or tackling rugged trails, EcoSpin bicycles are your companions in eco-friendly exploration. Start crafting your cycling story today with EcoSpin, where every ride is a step towards a greener future.",
        "Pedal with Purpose. Choose from our range of artisanal bicycles, each meticulously crafted with sustainability in mind, for a ride that's as unique as you are. At EcoSpin, we're passionate about creating bicycles that not only perform exceptionally but also make a positive impact on the planet. With our dedication to sustainable practices and innovative design, EcoSpin offers a range of options to suit every rider's needs and values. Whether you're commuting, touring, or racing, EcoSpin bicycles deliver on both style and sustainability. Join us in pedaling towards a brighter, greener future with EcoSpin."
    ]);
    const [currentDescription, setCurrentDescription] = useState('');

    useEffect(() => {
        // Randomly select a description when component mounts
        shiftDescription();
    }, []);

    const shiftDescription = () => {
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        setCurrentDescription(descriptions[randomIndex]);
    };


    // Method to create the product image zoom
    const handleMouseMove = (e) => {
        const img = imgRef.current;
        const boundingBox = img.getBoundingClientRect();
        const offsetX = e.clientX - boundingBox.left;
        const offsetY = e.clientY - boundingBox.top;

        const percentageX = (offsetX / boundingBox.width) * 100;
        const percentageY = (offsetY / boundingBox.height) * 100;

        img.style.transformOrigin = `${percentageX}% ${percentageY}%`;
    };

    const handleMouseLeave = () => {
        const img = imgRef.current;
        img.style.transformOrigin = 'center center';
    };


    // Add the product to Cart when clicked add to cart only if the user is loggedin
    const handleAddToCart = () => {
        const authToken = localStorage.getItem('auth-token');
        if (!authToken) {
            alert("Please Login to add Items to cart.");
            // Redirect to login page
            window.location.href = "/login";
            return;
        }
        addToCart(product.id);
    };

    return (
        <div className="productdisplay">
            <img
                ref={imgRef}
                src={product.image}
                alt=""
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="product-display-img"
            />
            
            <div className="productdisplay-right">
                
                <h1>{product.name} </h1>
                
                <div className="productdisplay_right_prices">
                    <div className="productdisplay-right-cost">
                        <div className="productdisplay-right-price-old">
                            {product.old_price} AED
                        </div>
                        <div className="productdisplay-right-price-new">
                            {product.new_price} AED
                        </div>
                    </div>
                    
                    <div className="productdisplay-right-description">
                        <h4>Description: </h4>
                        <p>{currentDescription}</p>
                    
                    </div>
                    
                    <div className="productdisplay-addtocart">
                        <button onClick={handleAddToCart}>ADD TO CART</button>
                    </div>

                    <div className="productdisplay-right-category">
                        <span>Category: </span> {product.category}
                        <span>Tags:</span> {product.category}, Cycle, Handmade, Made to Order
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;
