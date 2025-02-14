import React, { useState, useRef } from 'react';
import '../../../styles/Create.css';
//CREA UNA HABITACIÓN
const Create = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);
    const [categories, setCategories] = useState('');
    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
        setImages(selectedFiles);
        setPreviewImages(previewURLs);
    };

    const addRoomForm = async (e) => {
        e.preventDefault();

        // Validación del formulario
        if (!name || !description || !categories) {
            setError('Todos los campos son obligatorios');
            return;
        }

        if (images.length === 0) {
            setError('Debe seleccionar al menos una imagen');
            return;
        }

        // Convertir las categorías a un array
        const categoriesArray = categories.split(',').map(cat => cat.trim());


        // Crear el FormData
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('categories', categoriesArray);
        images.forEach((image) => formData.append('images', image));

        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }

            alert('Habitación agregada con éxito');
            resetForm();

        } catch (error) {
            handleBackendError(error);
        }
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setImages([]);
        setPreviewImages([]);
        setCategories('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setError(''); // Limpiar el mensaje de error después de resetear el formulario
    };

    const handleBackendError = (error) => {
        if (error.message.includes('')) {
            setError('Lo sentimos, el nombre de la habitación ya está en uso. Por favor, elige otro.');
        } else {
        }
    };

    const handleSubmit = async (roomData) => {
        try {
            const response = await fetch('/api/rooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData),
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // Esto obtiene el mensaje de error del backend
                throw new Error(errorMessage);
            }

            const result = await response.json();
            // Mostrar el mensaje de éxito o hacer algo con la respuesta
        } catch (error) {
            // Aquí puedes mostrar el mensaje al usuario
            console.error(error.message);
            alert(`Error: ${error.message}`);
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
                multiple
                onChange={handleImageChange}
                ref={fileInputRef}
            />

            <div className="image-preview-container">
                {previewImages.length > 0 && previewImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Vista previa ${index + 1}`}
                        className="image-preview"
                        width="150px"
                        height="150px"
                    />
                ))}
            </div>

            <label>Categorías:
                <input
                    type="text"
                    placeholder="Escribe las categorías separadas por comas"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                />
            </label>

            <div>
                <p>Categorías ingresadas:</p>
                <ul>
                    {categories.split(',').map((cat, index) => (
                        <li key={index}>{cat.trim()}</li>
                    ))}
                </ul>
            </div>

            <button type="submit">Agregar habitación</button>
        </form>
    );
};

export default Create;
