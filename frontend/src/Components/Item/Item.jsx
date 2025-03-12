import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import './Item.css';

const Item = (props) => {
    return (
        <div className='item'>
            <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)}src={props.image} alt="" />
            </Link>
            <p>{props.name}</p>

            <div className="item-prices">
                <div className="item-price-new">
                    {props.new_price} AED
                </div>
                <div className="item-price-old">
                    {props.old_price} AED
                </div>
            </div>
        </div>
    )
}

export default Item;
