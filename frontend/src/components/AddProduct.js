import React, { useState } from 'react';
import '../styles/AddProduct.css';

const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar que los campos no estén vacíos
        if (!name || !description || !image) {
            setError('Todos los campos son obligatorios');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:8080/api/products', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Producto agregado con éxito');
                setName('');
                setDescription('');
                setImage(null);
                setError('');
                onProductAdded();  // Notifica al componente padre para actualizar la lista de productos
            } else {
                const result = await response.json();
                setError(result.message);
            }
        } catch (error) {
            setError('Ocurrió un error al agregar el producto');
        }
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h2>Agregar Producto</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del producto"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del producto"
            />
            <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Agregar producto</button>
        </form>
    );
};

export default AddProduct;
