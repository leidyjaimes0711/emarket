import React, { useState, useEffect } from 'react';
import '../../../styles/RoomDetail.css';  // Importamos el archivo CSS para estilos

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
                        <div className="arrow" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h2 className="room-title">{room.name}</h2>
                        </div>
                        <p>{room.description}</p>
                        {room.images && room.images.length > 0 ? (
                            room.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`data:image/jpeg;base64,${image.data}`}
                                    alt={`Imagen de la habitación ${index + 1}`}
                                    width="300px"
                                    height="200px"
                                />
                            ))
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
