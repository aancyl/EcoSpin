import React, { useEffect, useState } from "react";
import './Compliments.css';

const Compliments = () => {

    const complimentsList = [
        { compliment: "Though EcoSpin has only been around for some time now, The Indian brand has left its mark on this industry!", company: "VOGUE" },
        { compliment: "Rediscover the freedom of childhood with every ride – Cyclist's Dream bikes bring back memories and create new ones!", company: "WIRECUTTER" },
        { compliment: "Unleash your inner athlete – Cyclist's Sprint bikes combine speed, agility, and comfort for a ride that's as exhilarating as it is effortless!", company: "KHALEEJ TIMES" }
    ];
    const [currentComplimentIndex, setCurrentComplimentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentComplimentIndex(prevIndex =>
                (prevIndex + 1) % complimentsList.length
            );
        }, 5000);       

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="compliments">
            <div className="compliments-heading">
                <h5>HOT OFF THE PRESS</h5>
            </div>
            
            <div className="compliments-text">
                <h1>“{complimentsList[currentComplimentIndex].compliment}”</h1>
                
            </div>
            <div className="dot-indicators">
            <p>{complimentsList[currentComplimentIndex].company}</p>
                {complimentsList.map((_, index) => (
                    <span
                        key={index}
                        className={index === currentComplimentIndex ? "active" : ""}
                        onClick={() => setCurrentComplimentIndex(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default Compliments;
