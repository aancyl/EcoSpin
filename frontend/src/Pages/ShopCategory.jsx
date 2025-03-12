import React, { useContext } from "react";
import './CSS/ShopCategory.css';
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const { all_product } = useContext(ShopContext);
    console.log(props.category === Item.category);
    
    return (
        
        <div className="shop-category">
            {/* <img className='shopcategory-banner' src={props.banner} alt="" /> */}
            <div className="shopcategory-pagename">
                <p>For</p>
                <h1>{props.category === "kid" ? `${props.category}s` : props.category}</h1>
            </div>

            <div className="shopcategory-products">
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />; 
                        
                    } else {
                        return null;
                    }
                })}      
            </div>
            <style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Vujahday+Script&display=swap')
</style>
        </div>
    );
}

export default ShopCategory;
