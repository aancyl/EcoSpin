import React from "react";
import Hero from "../Components/Hero/Hero";
import Popular from '../Components/Popular/Popular';
import Offers from "../Components/Offers/Offers";
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import ReturnPolicy from '../Components/ReturnPolicy/ReturnPolicy';
import Banner from '../Components/Banner/Banner';
import Compliments from "../Components/Compliments/Compliments";
import NewCollections from "../Components/NewCollections/NewCollections";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import AboutProduct from "../Components/AboutProduct/AboutProduct";
import AddReview from "../Components/AddReview/AddReview";
const Shop = () => {
    

    return (
        <div>
            {/* <AddReview/> */}
            <Hero/>
            <Banner/>
            <NewCollections/>
            {/* <Banner/> */}
            {/* <Offers/> */}
            <Banner/>
            <Popular/>
            <Banner/>
            {/* <AboutProduct/> */}
            <Compliments/> 
            <Banner/>  
            <NewsLetter/>
            <ReturnPolicy/> 
        </div>
    );
}

export default Shop;
