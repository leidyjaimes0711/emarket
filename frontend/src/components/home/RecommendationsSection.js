import React, { useState, useEffect } from 'react';

import '../../styles/RecommendationsSection.css';

const RecommendationsSection = () => {
    {
        const [error, setError] = useState('');
        const [rooms, setRooms] = useState([]);

        // Función para listar los datos al cargar la página
        const listRooms = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/rooms', {
                    method: 'GET'
                });
                if (response.ok) {
                    const data = await response.json();
                    const shuffledRooms = data.sort(() => 0.5 - Math.random());
                    const randomRooms = shuffledRooms.slice(0, 10);
                    setRooms(randomRooms);
                } else {
                    setError('Error al obtener la lista de habitaciones');
                }
            } catch (error) {
                console.error('Error al mostrar habitaciones', error);
                setError('Ocurrió un error al conectar con el servidor');
            }


        };

        // Usamos useEffect para llamar a la función al cargar el componente
        useEffect(() => {
            listRooms();
        }, []);  // El arreglo vacío asegura que solo se ejecute una vez cuando se carga el componente

        return (
            <div>
                <h2>Recomendaciones</h2>
                {error && <p>{error}</p>} {/* Mostrar errores si los hay */}

                {rooms.length === 0 ? (
                    <p>No hay habitaciones disponibles</p>
                ) : (
                    <div className="grid-container">
                        {rooms.map((room) => (
                            <div className="grid-item" key={room.id}>
                                <h3>{room.name}</h3>
                                <p>{room.description}</p>
                                {room.images && room.images.length > 0 ? (
                                    room.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`data:image/jpeg;base64,${image.data}`}  // Ya en base64
                                            alt={`Imagen de la habitación ${index + 1}`}
                                            width="200px"
                                            height="150px"
                                        />
                                    ))
                                ) : (
                                    <p>No hay imágenes disponibles</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );

    }

}

export default RecommendationsSection;
