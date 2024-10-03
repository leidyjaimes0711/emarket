import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/home/Header.js';
import Footer from './components/home/Footer.js';
import Body from './components/home/Body.js';
import AdminPanel from "./components/login/AdminPanel.js";  // El panel de administración
import '../src/Home.css';
import AddProduct from "./components/AddProduct.js";
import {useState} from "react";
import React from 'react';
import LoginPanel from "./components/login/LoginPanel.js";

function Home() {const [products, setProducts] = useState([]);

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/adminPanel" element={<AdminPanel />} />
                    <Route path="/add-product" element={<AddProduct />} />
                    <Route path="/loginPanel" element={<LoginPanel />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default Home;


