import React from "react";
import './CSS/About.css';

const About = () => {
    return (
       <div className="about">
            <div className="about-title">
                <h1>About Us</h1>
            </div>
            <div className="about-text">
                <div className="section">
                    <h2>Our Story</h2>
                    <p>
                        Welcome to EcoSpin, where we're committed to revolutionizing the way you experience cycling. We believe in sustainable mobility and the power of bicycles to transform both individuals and communities.
                    </p>
                    <p>
                        EcoSpin was born out of a shared passion for cycling and environmental sustainability. Founded in 2010 by a group of avid cyclists and eco-conscious individuals, we set out with a mission to provide high-quality bicycles that not only enhance your riding experience but also minimize our carbon footprint.
                    </p>
                </div>
    
                <div className="section">
                    <h2>Our Mission</h2>
                    <p>
                        At EcoSpin, we're on a mission to promote eco-friendly transportation solutions that benefit both people and the planet. We strive to inspire individuals to embrace cycling as a mode of transportation, recreation, and exercise, while also contributing to the preservation of the environment.
                    </p>
                </div>
                <div className="section">
                    <h2>Our Commitment to Sustainability</h2>
                    <p>
                        Sustainability is at the core of everything we do. From sourcing eco-friendly materials to minimizing waste in our production processes, we're dedicated to reducing our environmental impact. Our bicycles are designed with sustainability in mind, using innovative technologies and materials to create durable, energy-efficient, and low-emission rides.
                    </p>
                </div>
                <div className="section">
                    <h2>Our Products</h2>
                    <p>
                        EcoSpin offers a diverse range of bicycles, from sleek urban commuters to rugged mountain bikes, all crafted with sustainability and performance in mind. Each bike is carefully designed and tested to ensure optimal comfort, safety, and efficiency. Whether you're navigating city streets or exploring off-road trails, our bikes are built to withstand the demands of your journey.
                    </p>
                </div>
                <div className="section">
                    <h2>Our Community</h2>
                    <p>
                        At EcoSpin, we believe in the power of community. We're proud to support and collaborate with local cycling clubs, environmental organizations, and advocacy groups to promote cycling culture and sustainable living. Join us in our mission to pedal towards a greener, healthier future.
                    </p>
                </div>
            </div>
       </div>
    )
}

export default About;
