//contiene el formulario para agregar nuevos productos
import React, { useState } from 'react';
import '../styles/ProductForm.css';
import axios from 'axios'; // Usaremos Axios para hacer las solicitudes HTTP

const AddProduct = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !description || !image) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Creamos un objeto de producto con los datos del formulario
        const newProduct = {
            name,
            price,
            description,
            imageUrl: URL.createObjectURL(image) // Usamos una URL temporal para la imagen
        };

        try {
            // Enviar el producto al backend
            const response = await axios.post('http://localhost:8080/api/products', newProduct);
            console.log('Producto guardado:', response.data);

            // Limpiar el formulario
            setName('');
            setPrice('');
            setDescription('');
            setImage(null);

            // Actualizar la lista de productos
            onAddProduct(response.data);
        } catch (error) {
            console.error('Error al registrar el producto:', error);
        }
    };

    return (
        <div className="product-form-container">
            <h2>Registrar nuevo producto</h2>
            <form onSubmit={handleSubmit} className="product-form">
                <label htmlFor="name">Nombre del producto:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="price">Precio:</label>
                <input
                    type="number"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="description">Descripción:</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <label htmlFor="image">Imagen del producto:</label>
                <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <button type="submit" className="btn-submit">
                    Agregar producto
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
