import React from 'react';
import '../../styles/Header.css';
import logo from '../../assets/logo.png'; // Subes un nivel con ../ y entras en assets
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/loginPanel');
    };
    return (
        <header className="header">
            <div className="header__logo">
                <img src= {logo}  alt="Logo de la tienda" />
                <h1>Team Rocket</h1>
            </div>
            <nav className="header__nav">
                <button className="btn">Crear cuenta</button>
                <button className="btn" onClick={handleLoginClick} > Iniciar sesión</button>
            </nav>
        </header>
    );
};

export default Header;

