import React, { useState } from 'react';
import '../../../styles/Create.css';
const Create = () => {
    // Constantes para almacenar los datos del formulario
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);  // Nueva constante para las imágenes
    const [error, setError] = useState('');

    // Función para manejar la selección de imágenes
    const handleImageChange = (e) => {
        setImages(e.target.files);  // Almacena las imágenes seleccionadas en el estado
    };

    // Función para guardar los datos al dar click al botón guardar
    const addRoomForm = async (e) => {
        e.preventDefault();

        // Validar que los campos del formulario no estén vacíos
        if (!name || !description) {
            setError('Todos los campos son obligatorios');
            return;
        }

        // Crear un FormData para enviar los datos del formulario y las imágenes
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);

        // Agregar todas las imágenes seleccionadas al FormData
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        // Hacer la petición al backend
        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'POST',
                body: formData,  // Enviar el FormData en lugar de JSON
            });

            if (response.ok) {
                alert('Habitación agregada con éxito');
                setName('');
                setDescription('');
                setImages([]);  // Limpiar imágenes después de subir
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
            <input
                type="file"
                multiple  // Permitir subir múltiples imágenes
                onChange={handleImageChange}  // Llamar a la función cuando se seleccionan imágenes
            />
            <button type="submit">Agregar habitación</button>
        </form>
    );
};

export default Create;
