import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Body from './components/Body.js';
import AdminPanel from "./components/AdminPanel.js";  // El panel de administración
import './App.css';
import AddProduct from "./components/AddProduct.js";
import {useState} from "react";
import React from 'react';

function App() {const [products, setProducts] = useState([]);

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/add-product" element={<AddProduct />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;


