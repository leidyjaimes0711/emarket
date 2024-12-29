import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/home/Header.js';
import Footer from './components/home/Footer.js';
import Body from './components/home/Body.js';
import Menu from "./components/users/admin/Menu.js";  // El panel de administración
import '../src/Home.css';
import Create from "./components/users/admin/Create.js";
import React from 'react';
import LoginPanel from "./components/login/LoginPanel.js";
import RoomDetail from "./components/users/client/RoomDetail.js";
import RecommendationsSection from "./components/home/RecommendationsSection.js";
function Home() {

    return (
        <Router>
            <div className="app">
                <Header /> {/* El header se mostrará en todas las páginas */}
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/addRoom" element={<Create />} />
                    <Route path="/loginPanel" element={<LoginPanel />} />
                    <Route path="/adminMenu" element={<Menu />} />
                    <Route path="/" element={<RecommendationsSection />} />
                    <Route path="/room/:id" element={<RoomDetail />} />
                </Routes>
                <Footer />{/* El footer se mostrará en todas las páginas */}
            </div>
        </Router>
    );
}

export default Home;


