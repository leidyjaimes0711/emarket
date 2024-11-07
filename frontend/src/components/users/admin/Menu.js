import React, {useState} from 'react';
import SubMenu from "./SubMenu.js";
import '../../../styles/Menu.css';

const Menu = () => {
    // Estado para controlar si el componente SubMenu se muestra o no
    const [showSubMenu, setShowSubMenu] = useState(false);

    // Función que alterna el estado del componente
    const toggleSubMenuComponent = () => {
        setShowSubMenu(!showSubMenu);
    };

    return (
        <div className="menu">
            <h2>Panel de administración</h2>
            <div className="admin-options">
                <button className="btn"> Reservas</button>
                <button className="btn"> Usuarios</button>
                <button className="btn" onClick={toggleSubMenuComponent}>
                     Habitaciones
                </button>
            </div>
                {showSubMenu && <SubMenu />}
        </div>
    );
};

export default Menu;
