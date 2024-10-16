import React, {useEffect, useState} from 'react';
import '../../../styles/Read.css';
const Read = () => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null); // Estado para la habitación que se va a editar


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


    // Función para eliminar una habitación
    const deleteRoom = async (roomId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setRooms(rooms.filter(room => room.id !== roomId));  // Actualiza la lista después de eliminar
            } else {
                setError('Error al eliminar la habitación');
            }
        } catch (error) {
            console.error('Error al eliminar la habitación', error);
            setError('Ocurrió un error al conectar con el servidor');
        }
    };


    // Función para manejar la edición de una habitación
    const handleEdit = (room) => {
        setEditingRoom(room);  // Establece la habitación que será editada
    };

    // Función para enviar los datos editados
    const saveEditRoom = async (room) => {
        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${room.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(room)
            });
            if (response.ok) {
                listRooms();  // Actualiza la lista después de editar
                setEditingRoom(null);  // Cierra el formulario de edición
            } else {
                setError('Error al guardar los cambios');
            }
        } catch (error) {
            console.error('Error al guardar los cambios', error);
            setError('Ocurrió un error al conectar con el servidor');
        }
    };

    // Usamos useEffect para llamar a la función al cargar el componente
    useEffect(() => {
        listRooms();
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
                            <button onClick={() => handleEdit(room)}>Editar</button> {/* Botón de editar */}
                            <button onClick={() => deleteRoom(room.id)}>Eliminar</button> {/* Botón eliminar */}
                        </li>
                    ))}
                </ul>
            )}

            {editingRoom && (
                <div className="edit-form">
                    <h3>Editando Habitación: {editingRoom.name}</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        saveEditRoom(editingRoom);
                    }}>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                value={editingRoom.name}
                                onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                            />
                        </label>
                        <label>
                            Descripción:
                            <input
                                type="text"
                                value={editingRoom.description}
                                onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                            />
                        </label>
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={() => setEditingRoom(null)}>Cancelar</button>
                    </form>
                </div>
            )}





        </div>
    );
};

export default Read;
