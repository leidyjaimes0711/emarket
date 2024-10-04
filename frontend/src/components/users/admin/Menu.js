import '../../../styles/AdminPanel.css';
import {useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import Create from "./Create.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../../home/Header.js";
import Body from "../../home/Body.js";
import LoginPanel from "../../login/LoginPanel.js";
import Footer from "../../home/Footer.js";
import SubMenu from "./SubMenu.js";


const Menu = () => {
    // Estado para controlar si el componente se muestra o no
    const [showSubMenu, setShowSubMenu] = useState(false);

    // Función que alterna el estado del componente
    const toggleSubMenuComponent = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <div className="menu">

            <h2>Menu</h2>

            <div className="admin-options">
                <button className="btn" >Gestionar Reservas</button>
                <button className="btn" >Gestionar Usuarios</button>
                <button className="btn"  onClick={toggleSubMenuComponent}>
                    {showSubMenu ? '' : ''} Gestionar habitaciones
                </button>
                {showSubMenu && <SubMenu />}
            </div>

            <div className="body-admin-options">

            </div>
        </div>
    );
};

export default Menu;
