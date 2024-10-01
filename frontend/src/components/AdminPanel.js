import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detectar si la pantalla es menor a 768px (típico de móviles)
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Ejecutar la función al cargar la página
        handleResize();

        // Agregar un listener para detectar cambios de tamaño en la ventana
        window.addEventListener('resize', handleResize);

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isMobile) {
        return (
            <div className="admin-panel-unavailable">
                <h2>Panel de administración no disponible en dispositivos móviles</h2>
                <p>Accede desde un dispositivo con una pantalla más grande.</p>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <h2>Panel de Administración</h2>
            <div className="admin-options">
                <button className="admin-btn">Gestión de Productos</button>
                <button className="admin-btn">Gestión de Usuarios</button>
                <button className="admin-btn">Revisar Ventas</button>
                <button className="admin-btn">Configuración General</button>
            </div>
        </div>
    );
};

export default AdminPanel;
