import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HomePage from './landing-page/home/HomePage';
 import {BrowserRouter,Routes,Route} from "react-router-dom";
 import PricingPage from './landing-page/pricing/PricingPage';
 import AboutPage from './landing-page/about/AboutPage';
 import ProductsPage from './landing-page/products/ProductsPage';
 import Signup from './landing-page/singup/Singup';
 import Login from './landing-page/login/Login';
 import SupportPage from './landing-page/support/SupportPage';
 import PageNotFound from './landing-page/PageNotFound/PageNotFound';
import Navbar from './Navbar';
import Footer from './Footer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<HomePage/>}></Route>
    <Route path="Signup" element={<Signup/> }></Route>
    <Route path="Login" element={<Login/>}></Route>
    <Route path="AboutPage" element={<AboutPage/>}></Route>
    <Route path="Products" element={<ProductsPage/>}></Route>
    <Route path="Pricing" element={<PricingPage/>}></Route>
    <Route path="Support" element={<SupportPage/>}></Route>
    <Route path="*" element={<PageNotFound/>}></Route>
   </Routes>
   <Footer/>
   </BrowserRouter>
);
