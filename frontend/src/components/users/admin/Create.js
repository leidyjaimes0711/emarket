import React, { useState } from 'react';
import '../../../styles/AddProduct.css';

const Create = () => {

    //constantes para almacenar cada uno de los datos recibidos
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    //funcion para guardar los datos al dar click al boton guardar
    const addRoomForm = async (e) => {
        e.preventDefault();

        // Validar que los campos del formulario no estén vacíos
        if (!name || !description ) {
            setError('Todos los campos son obligatorios');
            return;
        }

        //generar un objeto que contenga la estructura de datos ingresados en el formulario
        const RoomData = {name, description };


        //hacer petición al backend

        try {
            const response = await fetch('http://localhost:8080/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(RoomData),
            });

            if (response.ok) {
                alert('Habitación agregada con éxito');
                setName('');
                setDescription('');

            } else {
                const result = await response.json();
                setError(result.message || 'Error al agregar la habitación');
            }
        } catch (error) {
            console.error('Error al crear el registro', error);
            setError('Ocurrió un error al conectar con el servidor');
        }
    };

    return (
        <form onSubmit={addRoomForm}>
            <h2>Agregar Habitación</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
            />
            <button type="submit">Agregar habitación</button>
        </form>



    );
};

export default Create;
