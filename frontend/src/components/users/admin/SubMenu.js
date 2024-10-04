import '../../../styles/AdminPanel.css';
import React, {useState} from 'react';
import Create from "./Create.js";



const SubMenu = () => {
    // Estado para controlar si el componente se muestra o no
    const [showAddRoom, setShowAddRoom] = useState(false);

    // Función que alterna el estado del componente
    const toggleAddRoomComponent = () => {
        setShowAddRoom(!showAddRoom);
    };

    return (
        <div className="submenu">

            <h2>Submenu</h2>

            <div className="admin-options">
                <button className="btn" onClick={toggleAddRoomComponent}>
                    {showAddRoom ? '' : ''} Crear
                </button>

                <button className="btn">Editar</button>
                <button className="btn">Listar</button>
                <button className="btn">Eliminar</button>

                {showAddRoom && <Create/>}
            </div>

            <div className="body-admin-options">

            </div>
        </div>
    );
};

export default SubMenu;
