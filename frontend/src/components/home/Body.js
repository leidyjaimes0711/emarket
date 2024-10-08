import React, {useEffect, useState} from 'react';
import '../../styles/Body.css';

const Body = () => {
    const [products, setProducts] = useState([]);
    // Simulamos una lista de productos
    const allProducts = [
        { id: 1, name: 'Habitación Deluxe', image: 'pexels-photo-164595.jpeg' },
        { id: 2, name: 'Restaurante Borcelle',  image: 'pexels-photo-262047.jpeg' },
        { id: 3, name: 'Habitación Gold', image: 'pexels-photo-271618.webp' },
        { id: 4, name: 'Habitación Diamond',  image: 'pexels-photo-271624.webp' },
        { id: 5, name: 'Hotel Picadini',  image: 'pexels-photo-338504.jpeg' },
        { id: 6, name: 'Hotel Lumbard', image: 'pexels-photo-635041.jpeg' },
        { id: 7, name: 'Cabañas La Sierra',  image: 'pexels-photo-1134176.jpeg' },
        { id: 8, name: 'Cabañas Crystal', image: 'pexels-photo-1268855.webp' },
        { id: 9, name: 'La Roca Hotel', image: 'pexels-photo-1838554.webp' },
        { id: 10, name: 'Hotel Gillward',  image: 'pexels-photo-2017802.webp' },
        { id: 11, name: 'Solaire Huts',  image: 'pexels-photo-2598638.webp' },
        { id: 12, name: 'Mason Hotel',  image: 'pexels-photo-2869215.jpeg' },
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
                <input type="text" className="search-bar" placeholder="Buscar"/>
            </section>


            <section className="categories-section">
                <h2>Categorías</h2>
                <div className="categories">
                    <div className="category">
                        <img src="/images/hoteles.jpeg" alt="Hoteles"/>
                        <span>Hoteles</span>
                    </div>
                    <div className="category">
                        <img src="/images/hostales.webp" alt="Hostales"/>
                        <span>Hostales</span>
                    </div>
                    <div className="category">
                        <img src="/images/apartamentos.jpeg" alt="Apartamentos"/>
                        <span>Apartamentos</span>
                    </div>
                    <div className="category">
                        <img src="/images/byb.jpeg" alt="Bed and Breakfast"/>
                        <span>Bed and Breakfast</span>
                    </div>
                    <div className="category">
                        <img src="/images/cabañas.jpeg" alt="Cabañas"/>
                        <span>Cabañas</span>
                    </div>
                </div>
            </section>

            <section className="recommendations-section">
            <h2>Recomendaciones</h2>
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img
                                src={`/images/${product.image}`} alt={"imagen"}
                            />
                            <h3>{product.name}</h3>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Body;
