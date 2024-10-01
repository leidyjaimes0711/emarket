import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2024 Mi Tienda. Todos los derechos reservados.</p>
            <div className="footer__social">
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">Twitter</a>
            </div>
        </footer>
    );
};

export default Footer;
