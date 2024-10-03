import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Body from './components/Body.js';
import AdminPanel from "./components/AdminPanel.js";  // El panel de administración
import './App.css';
import AddProduct from "./components/AddProduct.js";
import {useState} from "react";


function App() {
    const [products, setProducts] = useState([]);

    return (

            <div className="App">
                <Header />
                <Body />
                <AddProduct />
                <AdminPanel />
                <Footer />
            </div>

    );
}

export default App;


