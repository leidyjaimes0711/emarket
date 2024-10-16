import React, {useState} from 'react';
import Create from "./Create.js";
import Read from "./Read.js";
import '../../../styles/SubMenu.css';

const SubMenu = () => {

    // Estado único para controlar cuál componente se muestra
    const [activeComponent, setActiveComponent] = useState(null);

    // Función para alternar el estado del componente activo
    const showComponent = (componentName) => {
        if (activeComponent === componentName) {
            setActiveComponent(null);  // Si ya está activo, oculta el componente
        } else {
            setActiveComponent(componentName);  // Si no está activo, muestra el componente seleccionado
        }
    };
    return (
        <div className="submenu">
            <div className="admin-options">
                <button className="btn" onClick={() => showComponent('create')}>
                    Crear habitación
                </button>
                <button className="btn" onClick={() => showComponent('list')}>
                    Mostrar todas
                </button>

            </div>

            {/* Renderizar el componente según el valor de activeComponent */}
            {activeComponent === 'create' && <Create />}
            {activeComponent === 'list' && <Read />}
            <div className="body-admin-options"></div>
        </div>
    );
};
export default SubMenu;
