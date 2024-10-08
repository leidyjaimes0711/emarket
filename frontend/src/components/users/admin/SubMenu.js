import '../../../styles/AdminPanel.css';
import React, {useState} from 'react';
import Create from "./Create.js";
import Read from "./Read.js";


const SubMenu = () => {
    // Estado para controlar si el componente se muestra o no
    const [showAddRoom, setShowAddRoom] = useState(false);

    // Estado para controlar si el componente se muestra o no
    const [showRooms, setShowRooms] = useState(false);


    // Función que alterna el estado del componente
    const toggleAddRoomComponent = () => {
        setShowAddRoom(!showAddRoom);
    };
    // Función que alterna el estado del componente
    const toggleShowRoomsComponent = () => {
        setShowRooms(!showRooms);
    };

    return (
        <div className="submenu">

            <h2>Submenu</h2>

            <div className="admin-options">
                <button className="btn" onClick={toggleAddRoomComponent}>
                    {showAddRoom ? '' : ''} Crear
                </button>
                <button className="btn">Editar</button>
                <button className="btn" onClick={toggleShowRoomsComponent}>{
                    showRooms ? '' : ''} Listar
                </button>
                <button className="btn">Eliminar</button>

                {showAddRoom && <Create/>}
                {showRooms&& <Read/>}
            </div>

            <div className="body-admin-options">

            </div>
        </div>
    );
};

export default SubMenu;
