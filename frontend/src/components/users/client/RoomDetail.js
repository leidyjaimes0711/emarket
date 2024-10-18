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

                        {room.images && room.images.length > 0 ? (
                            <div className={`image-grid image-grid-${room.images.length}`}>
                                {room.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`image-item ${
                                            index === 0 ? 'large-image' : 'small-image'
                                        }`}
                                    >
                                        <img
                                            src={`data:image/jpeg;base64,${image.data}`}
                                            alt={`Imagen ${index + 1}`}
                                            className={`room-image ${
                                                index === 0 ? 'room-image-large' : 'room-image-small'
                                            }`}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No hay imágenes disponibles</p>
                        )}
                    </div>
                )
            )}
        </div>
    );
};

export default RoomDetail;
