import '../../styles/RecommendationsSection.css';
import React, { useState, useEffect } from 'react';

const RecommendationsSection = ({ currentPage }) => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);
    const roomsPerPage = 10; // Define el número de habitaciones por página

    const openRoomDetailsInNewTab = (roomId) => {
        const newTabUrl = `/room/${roomId}`;
        window.open(newTabUrl, '_blank');
    };

    const listRooms = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // Mezcla las habitaciones una vez al obtener los datos
                const shuffledRooms = data.sort(() => 0.5 - Math.random());
                setRooms(shuffledRooms);
            } else {
                setError('Error al obtener la lista de habitaciones');
            }
        } catch (error) {
            console.error('Error al mostrar habitaciones', error);
            setError('Ocurrió un error al conectar con el servidor');
        }
    };

    useEffect(() => {
        listRooms();
    }, []);

    // Calcular el subconjunto de habitaciones para la página actual
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    const roomsToDisplay = rooms.slice(startIndex, endIndex);

    return (
        <div>
            <h2>Recomendaciones</h2>
            {error && <p>{error}</p>}

            {roomsToDisplay.length === 0 ? (
                <p>No hay habitaciones disponibles</p>
            ) : (
                <div className="grid-container">
                    {roomsToDisplay.map((room) => (
                        <div className="grid-item" key={room.id}>
                            <h3>{room.name}</h3>
                            <p>{room.description}</p>

                            {room.images && room.images.length > 0 ? (
                                <div className="images-container">
                                    <img
                                        src={`data:image/jpeg;base64,${room.images[0].data}`}
                                        alt={`Primera imagen de la habitación`}
                                    />
                                </div>
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}

                            <button className="see-more-button" onClick={() => openRoomDetailsInNewTab(room.id)}>
                                Ver más
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendationsSection;
