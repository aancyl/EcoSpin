// CartItems.js
import React, { useContext } from "react";
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import NewCollections from "../NewCollections/NewCollections";
import Popular from "../Popular/Popular";
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from "react-router-dom";

const CartItems = () => {

    // Getting all the details of the products cartItems .....
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    if (Object.values(cartItems).every(item => item === 0)) {
        return (
            <div className="empty-cart-message">
                
                <div className="main-message">
                    <p className="primary-text">Your Cart</p>
                        <div className="secondary-text">
                            <p >... is empty lets change that</p>
                        </div >
                </div>
                <hr />
                    <Popular/>
            </div>

            );
    }

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className="carticon-product-icon" />
                                <p>{e.name}</p>
                                <p>{e.new_price} AED</p>
                                <button className="cartitems-quantity">
                                    {cartItems[e.id]}
                                </button>
                                <p>{e.new_price * cartItems[e.id]} AED</p>
                                <img
                                    className="cartitems-remove-item"
                                    src={remove_icon}
                                    onClick={() => {
                                        removeFromCart(e.id);
                                    }}
                                    alt=""
                                />
                            </div>
                            
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Details</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>AED  {getTotalCartAmount()}</p>
                        </div>
                        
                        <div className="cartitems-total-item">
                            <p>Shipping Fee: </p>
                            <p>Free</p>
                        </div>

                        <div className="cartitems-total-item">
                            
                            <h3>Total: </h3>
                            <h3>AED {getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    
                    <button>
                        <Link to="/payment">PROCEED TO CHECKOUT</Link>
                    </button>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default CartItems;
