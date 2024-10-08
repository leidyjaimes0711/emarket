import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/home/Header.js';
import Footer from './components/home/Footer.js';
import Body from './components/home/Body.js';
import Menu from "./components/users/admin/Menu.js";  // El panel de administración
import '../src/Home.css';
import Create from "./components/users/admin/Create.js";
import React from 'react';
import LoginPanel from "./components/login/LoginPanel.js";
import Banner from './components/home/Banner.js';
function Home() {

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Banner />
                                <Body />
                            </>
                        }/>
                    <Route path="/" element={<Body />} />
                    <Route path="/adminPanel" element={<Menu />} />
                    <Route path="/addRoom" element={<Create />} />
                    <Route path="/loginPanel" element={<LoginPanel />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default Home;


