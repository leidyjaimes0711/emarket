import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import '../../styles/LoginPanel.css';

const LoginPanel = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const history = useNavigate ();

    const goToSection = (section) => {
        history.push(`/loginPanel/${section}`);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica básica de autenticación
        if (username === 'admin' && password === '123') {
            // Si la autenticación es correcta, puedes redirigir a otra página, como el dashboard de admin
            navigate("/adminMenu"); // Cambia '/dashboard' por la ruta que necesites
        }
        else {
            if(username === 'user' && password === '123'){
            navigate('/userPanel');
            }
            else {
                alert("credenciales erroneas");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar sesión</h2>
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
        </div>
    );
};

export default LoginPanel;