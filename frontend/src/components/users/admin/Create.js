import React, { useState } from 'react';
import '../../../styles/AddProduct.css';

const Create = ({ onRoomAdded }) => {

    //constantes para almacenar cada uno de los datos recibidos
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    //funcion para guardar los datos al dar click al boton guardar
    const addRoomButton = async (e) => {
        e.preventDefault();

        // Validar que los campos del formulario no estén vacíos
        if (!name || !description || !image) {
            setError('Todos los campos son obligatorios');

            return;
        }

        //generar un objeto qe contenga la estructura de datos ingresados en el formulario
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'POST',
                body: formData,//la estructura de datos que generé, se va a cargar en la db
            });

            if (response.ok) {
                alert('Producto agregado con éxito');
                setName('');//se limpian los campos
                setDescription('');
                setImage('');
                setError('');
                onRoomAdded();  // Notifica al componente padre para actualizar la lista de productos
            } else {
                const result = await response.json();
                setError(result.message);
            }
        } catch (error) {
            console.error('Error al crear el registro', error); // Imprime el error en la consola

            setError('Ocurrió un error al crear el registro');

        }
    };

    return (
        <form className="add-room-form" onSubmit={addRoomButton}>
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
            <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Url de la imagen"
            />
            <button type="submit">Agregar habitación</button>
        </form>



    );
};

export default Create;
