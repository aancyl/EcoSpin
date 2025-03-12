import React, { useContext, useRef, useState } from "react";
import './Navbar.css';
import logo from '../Assets/logo.png';
import nav_dropdown from '../Assets/dropdown_icon.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <Link to='/'> <img src={logo} alt="" /></Link>
            </div>
            <ul ref={menuRef} className="nav-menu">

                {/* Creating the links to the webiste and also linking the webpage to the webaddress */}
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>SHOP</Link></li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>MEN</Link></li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>WOMEN</Link></li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>KIDS</Link></li>
                <li onClick={() => { setMenu("aboutus") }}><Link style={{ textDecoration: 'none' }} to='/aboutus'>ABOUT US</Link></li>
            </ul>
            <div className="nav-login-cart">
                
                {/* Check for auth token in the local storage if it is present then it truns into logout and if not then log in */}
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>Log Out</button>
                    ) : (
                    <Link to='/login'><button>LOG IN</button></Link>
                    )}
                <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>

            <style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Vujahday+Script&display=swap')
</style>
        </div>
    )
}

export default Navbar;
