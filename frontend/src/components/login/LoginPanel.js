import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginPanel.css';

const LoginPanel = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detectar si el usuario está en un dispositivo móvil
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Evitar el submit en dispositivos móviles
        if (isMobile) {
            alert("El panel no está disponible en dispositivos móviles");
            return;
        }

        // Lógica básica de autenticación
        if (username === 'admin' && password === '123') {
            navigate("/adminMenu");
        } else if (username === 'user' && password === '123') {
            navigate('/userPanel');
        } else {
            alert("Credenciales erróneas");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
            {isMobile ? (
                <p>El panel no está disponible en dispositivos móviles</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Iniciar sesión</button>
                </form>
            )}
        </div>
    );
};

export default LoginPanel;
