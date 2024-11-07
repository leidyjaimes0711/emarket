import React from 'react';
import '../../styles/Footer.css';
import logo from '../../assets/logo.png'; // Subes un nivel con ../ y entras en assets

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-content">
                <img src={logo} alt="Logo de la tienda"/>
                <span className="footer-text">© {new Date().getFullYear()} Mason's. Todos los derechos reservados.</span>
            </div>
        </footer>
    );
};

export default Footer;
