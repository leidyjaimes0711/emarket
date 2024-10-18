import '../../styles/RecommendationsSection.css';
import React, { useState, useEffect } from 'react';
import RoomDetail from "../users/client/RoomDetail.js";

const RecommendationsSection = () => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    // Función para alternar entre mostrar/ocultar el detalle de la habitación
    const toggleRoomDetailComponent = (roomId) => {
        if (selectedRoomId === roomId) {
            setSelectedRoomId(null); // Ocultar detalles si se hace clic en la misma habitación
        } else {
            setSelectedRoomId(roomId); // Mostrar detalles de la habitación seleccionada
        }
    };

    // Función para listar las habitaciones
    const listRooms = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // Barajar las habitaciones aleatoriamente y seleccionar las primeras 10
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

    useEffect(() => {
        listRooms();
    }, []);

    return (
        <div>
            <h2>Recomendaciones</h2>
            {error && <p>{error}</p>}

            {rooms.length === 0 ? (
                <p>No hay habitaciones disponibles</p>
            ) : (
                <div className="grid-container">
                    {rooms.map((room) => (
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
                            <button onClick={() => toggleRoomDetailComponent(room.id)}>
                                {selectedRoomId === room.id ? 'Ver menos' : 'Ver más'}
                            </button>

                            {/* Mostrar RoomDetail si la habitación está seleccionada */}
                            {selectedRoomId === room.id && (
                                <RoomDetail
                                    roomId={room.id}
                                    onClose={() => setSelectedRoomId(null)} // Función para cerrar el detalle
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendationsSection;
