import React from "react";
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_video from '../Assets/hero_video.mp4';

const Hero = () => {
    return (
        <div className="hero">
            <video src={hero_video} autoPlay loop muted></video>
            <div className="hero-text">
                <h1>EcoSpin</h1>
                <div>
                <p>Sustainability Meets Adventure !</p>
                </div>
                
            </div>

            <style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Vujahday+Script&display=swap')
</style>
</div>
    )
}

export default Hero


// 34.37