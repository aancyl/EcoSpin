import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';  // Corrected import
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';  
import Payment from './Pages/Payment';
import Footer from './Components/Footer/Footer';
import LoginSignup from './Pages/LoginSignup';
import men_banner from '../src/Components/Assets/banner_mens.png';
import women_banner from '../src/Components/Assets/banner_women.png';
import kids_banner from '../src/Components/Assets/banner_kids.png';
import AboutUs from './Pages/About.jsx';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    fetch('https://ecospin-ecommerce-backend.onrender.com/api/ping')
      .then(res => res.json())
      .then(data => console.log('Backend connected:', data))
      .catch(err => console.error('Backend connection failed:', err));
  }, []);
  
  return (
    <div>
      <BrowserRouter>
        <Navbar />
          <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid" />} />
          <Route path='/aboutus' element={<AboutUs/>} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
