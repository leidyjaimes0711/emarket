import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import AdminPanel from "./components/AdminPanel";  // El panel de administración
import './App.css';
import AddProduct from "./components/AddProduct.js";
import {useState} from "react";

let basePackages;


function App() {
    const [products, setProducts] = useState([]);

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Body products={products} />} /> {/* Página principal */}
                    <Route path="/admin" element={<AdminPanel />} /> {/* Ruta para el panel de administración */}
                </Routes>
                <AddProduct />
                <Footer />
            </div>
        </Router>
    );
}

export default App;


