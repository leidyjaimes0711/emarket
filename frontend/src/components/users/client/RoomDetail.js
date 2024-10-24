import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import '../../../styles/RoomDetail.css';

const RoomDetail = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/rooms/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setRoom(data);
                } else {
                    setError('Error al obtener los detalles de la habitación');
                }
            } catch (error) {
                console.error('Error al obtener detalles de la habitación', error);
                setError('Ocurrió un error al conectar con el servidor');
            }
        };

        fetchRoomDetails();
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!room) {
        return <p>Cargando detalles de la habitación...</p>;
    }

    return (
        <div>
            <h2 className="room-title">{room.name}</h2>
            <p className="room-description">{room.description}</p>
            {room.images && room.images.length > 0 ? (
                <div className="images-container">
                    {room.images.map((image, index) => (
                        <img
                            key={index}
                            src={`data:image/jpeg;base64,${image.data}`}
                            alt={`Imagen ${index + 1} de la habitación`}
                        />
                    ))}
                </div>
            ) : (
                <p>No hay imágenes disponibles</p>
            )}

            {/* Flecha para cerrar la ventana */}
            <button className="back-button" onClick={() => window.close()}>
                ← Atrás
            </button>
        </div>
    );
};

export default RoomDetail;

