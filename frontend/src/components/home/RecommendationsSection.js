import React, { useState, useEffect } from 'react';

const RecommendationsSection = () => {

    const [recommendations, setRecommendations] = useState([]);// Estado para almacenar los productos (habitaciones en este caso)
    const [error, setError] = useState('');

    // Función para obtener las habitaciones desde el backend
    const fetchRecommendations = async () => {
        try {
            const response = await fetch('http://localhost:8080/rooms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                const randomRecommendations = getRandomRecommendations(data, 10);  // Seleccionamos 10 habitaciones aleatorias
                setRecommendations(randomRecommendations);  // Guardamos las habitaciones seleccionadas en el estado
            } else {
                console.error('Error al obtener las habitaciones');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

    // Función para seleccionar N recomendaciones aleatorias sin repetir
    const getRandomRecommendations = (recommendations, count) => {
        // Barajamos el array de habitaciones
        const shuffled = recommendations.sort(() => 0.5 - Math.random());
        // Tomamos los primeros 'count' elementos
        return shuffled.slice(0, count);
    };

    // Hacer la solicitud al cargar el componente
    useEffect(() => {
        fetchRecommendations();
    }, []); // [] asegura que esto solo se ejecute una vez al cargar el componente

    return (
        <section className="recommendations-section">
            <h2>Recomendaciones</h2>
            <div className="product-grid">
                {recommendations.length > 0 ? (
                    recommendations.map((recommendation) => (
                        <div key={recommendation.id} className="product-card">
                            <img
                                src={`/images/${recommendation.imageUrl}`} alt={"imagen"}
                            />
                            <h3>{recommendation.name}</h3>
                        </div>
                    ))
                ) : (
                    <p>No hay recomendaciones disponibles</p> // Mensaje en caso de que no haya productos
                )}
            </div>
        </section>
    );
};

export default RecommendationsSection;
