import React, {useEffect, useState} from 'react';
import '../../../styles/AddProduct.css';

const Read = () => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);

    //funcion para listar datos al dar click al boton guardar
    const ListRooms = async () => {
        //hacer petición al backend
        try {
            const response = await fetch('http://localhost:8080/rooms', {
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
        ListRooms();
    }, []);  // El arreglo vacío asegura que solo se ejecute una vez cuando se carga el componente


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
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Read;
