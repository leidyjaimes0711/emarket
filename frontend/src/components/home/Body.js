import React, {useEffect, useState} from 'react';
import '../../styles/Body.css';

const Body = () => {
    const [products, setProducts] = useState([]);
    // Simulamos una lista de productos
    const allProducts = [
        { id: 1, name: 'Producto 1', price: '$100', image: 'product1.jpg' },
        { id: 2, name: 'Producto 2', price: '$200', image: 'product2.jpg' },
        { id: 3, name: 'Producto 3', price: '$150', image: 'product3.jpg' },
        { id: 4, name: 'Producto 4', price: '$250', image: 'product4.jpg' },
        { id: 5, name: 'Producto 5', price: '$300', image: 'product5.jpg' },
        { id: 6, name: 'Producto 6', price: '$50', image: 'product6.jpg' },
        { id: 7, name: 'Producto 7', price: '$400', image: 'product7.jpg' },
        { id: 8, name: 'Producto 8', price: '$500', image: 'product8.jpg' },
        { id: 9, name: 'Producto 9', price: '$600', image: 'product9.jpg' },
        { id: 10, name: 'Producto 10', price: '$700', image: 'product10.jpg' },
        { id: 11, name: 'Producto 11', price: '$800', image: 'product11.jpg' },
        { id: 12, name: 'Producto 12', price: '$900', image: 'product12.jpg' },
    ];

    // Función para obtener productos aleatorios sin repetición
    const getRandomProducts = (allProducts, count) => {
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count); // Obtener una cantidad máxima de productos
    };

    // Al cargar el componente, seleccionamos productos aleatorios
    useEffect(() => {
        const randomProducts = getRandomProducts(allProducts, 10); // Muestra hasta 10 productos
        setProducts(randomProducts);
    }, []);

    return (
        <main className="body">

            <section className="search-section">
                <input type="text" className="search-bar" placeholder="Buscar productos..."/>
            </section>


            <section className="categories-section">
                <h2>Categorías</h2>
                <div className="categories">
                    <div className="category">Acción</div>
                    <div className="category">Aventura</div>
                    <div className="category">Estrategia</div>
                </div>
            </section>

            <section className="recommendations-section">
                <h2>Productos Recomendados</h2>
                <div className="room-grid">
                    {products.map((room) => (
                        <div key={room.id} className="room-card">
                            <img src={room.image} alt={room.name}/>
                            <h3>{room.name}</h3>
                            <p>{room.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Body;
