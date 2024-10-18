import React, { useState, useEffect } from 'react';
import '../../../styles/RoomDetail.css'; // Importamos el archivo CSS para estilos

const RoomDetail = ({ roomId, onClose }) => {
    const [room, setRoom] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Función para obtener los detalles de la habitación
    const fetchRoomDetail = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                setRoom(data);
            } else {
                setError('Error al obtener los detalles de la habitación');
            }
        } catch (error) {
            console.error('Error al obtener los detalles', error);
            setError('Ocurrió un error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoomDetail();
    }, [roomId]);

    return (
        <div className="room-detail-container">
            {isLoading ? (
                <p>Cargando detalles...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                room && (
                    <div>
                        <h2 className="room-title">{room.name}</h2>
                        <p>{room.description}</p>

                        {room.images && room.images.length >= 5 ? (
                            <div className="image-grid">
                                <div className="large-image">
                                    <img
                                        src={`data:image/jpeg;base64,${room.images[0].data}`}
                                        alt="Imagen principal de la habitación"
                                        className="room-image-large"
                                    />
                                </div>
                                <div className="small-images">
                                    {room.images.slice(1, 5).map((image, index) => (
                                        <img
                                            key={index}
                                            src={`data:image/jpeg;base64,${image.data}`}
                                            alt={`Imagen adicional ${index + 1}`}
                                            className="room-image-small"
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <p>No hay suficientes imágenes disponibles</p>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default RoomDetail;
