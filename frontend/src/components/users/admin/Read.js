import React, {useEffect, useState} from 'react';
import '../../../styles/Read.css';


const Read = () => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);

    //funcion para listar datos al dar click al boton guardar
    // Función para listar los datos al cargar la página
    const listRooms = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);  // Verifica si los datos están llegando
                setRooms(data);
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

    // Función para convertir la imagen en byte[] a Base64
    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <div>
            <h2>Lista de Habitaciones</h2>
            {error && <p>{error}</p>} {/* Mostrar errores si los hay */}

            {rooms.length === 0 ? (
                <p>No hay habitaciones disponibles</p>
            ) : (
                <ul>
                    {rooms.map((room) => (
                        <li key={room.id}>
                            <h3>{room.name}</h3>
                            <p>{room.description}</p>
                            {room.image && (
                                <img
                                    src={`data:image/jpeg;base64,${arrayBufferToBase64(room.image)}`}
                                    alt="Imagen de la habitación"
                                    width="200px"
                                    height="150px"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Read;