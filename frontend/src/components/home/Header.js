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
                <a href="/">
                    <img src={logo} alt="Logo de la tienda"/>
                    <h3>Estancia perfecta a un clic</h3>
                </a>
            </div>
            <nav className="header__nav">
                <button className="btn">Crear cuenta</button>
                <button className="btn" onClick={handleLoginClick} > Iniciar sesión</button>
            </nav>
        </header>
    );
};

export default Header;

