import '../styles/AdminPanel.css';
import {useNavigate } from 'react-router-dom';
import React from 'react';

const AdminPanel = () => {


    const history = useNavigate ();

    const goToSection = (section) => {
        history.push(`/admin/${section}`);
    };

    return (
        <div className="admin-panel">
            <h2>Panel de Administración</h2>
            <div className="admin-options">
                <button onClick={() => goToSection('hotels')}>Gestionar Hoteles</button>
                <button onClick={() => goToSection('rooms')}>Gestionar Habitaciones</button>
                <button onClick={() => goToSection('reservations')}>Gestionar Reservas</button>
                <button onClick={() => goToSection('users')}>Gestionar Usuarios</button>
            </div>
        </div>
    );
};

export default AdminPanel;
