import React, { useEffect, useState } from 'react';
import '../../../styles/Read.css';

const Read = () => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null);
    const [originalName, setOriginalName] = useState('');
    const [newImages, setNewImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const listRooms = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                setRooms(data);
            } else {
                setError('Error al obtener la lista de habitaciones');
            }
        } catch (error) {
            console.error('Error al mostrar habitaciones', error);
            setError('Ocurrió un error al conectar con el servidor');
        }
    };

    const deleteRoom = async (roomId) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta habitación?');
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    setRooms(rooms.filter(room => room.id !== roomId));
                } else {
                    setError('Error al eliminar la habitación');
                }
            } catch (error) {
                console.error('Error al eliminar la habitación', error);
                setError('Ocurrió un error al conectar con el servidor');
            }
        }
    };

    const handleEdit = (room) => {
        setEditingRoom(room);
        setOriginalName(room.name);
        setNewImages([]);
        setExistingImages(room.images || []); // Almacena las imágenes existentes
    };

    const handleImageChange = (e) => {
        setNewImages([...e.target.files]);
    };

    const handleDeleteExistingImage = (index) => {
        const updatedImages = existingImages.filter((_, imgIndex) => imgIndex !== index);
        setExistingImages(updatedImages); // Elimina la imagen seleccionada del estado de imágenes existentes
    };

    const saveEditRoom = async (room) => {
        const formData = new FormData();

        // Agrega imágenes nuevas al FormData
        if (newImages.length > 0) {
            newImages.forEach((image) => {
                formData.append('images', image);
            });
        }

        // Agrega las imágenes existentes (las que quedan después de la eliminación)
        formData.append('existingImages', JSON.stringify(existingImages.map(img => img.id)));

        const updatedRoom = {
            ...room,
            name: editingRoom.name,
            description: editingRoom.description,
        };

        formData.append('room', JSON.stringify(updatedRoom));

        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${room.id}`, {
                method: 'PUT',
                body: formData
            });
            if (response.ok) {
                listRooms();
                setEditingRoom(null);
            } else {
                setError('Error al guardar los cambios');
            }
        } catch (error) {
            console.error('Error al guardar los cambios', error);
            setError('Ocurrió un error al conectar con el servidor');
        }
    };

    useEffect(() => {
        listRooms();
    }, []);

    return (
        <div>
            <h2>Lista de Habitaciones</h2>
            {error && <p>{error}</p>}

            {rooms.length === 0 ? (
                <p>No hay habitaciones disponibles</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rooms.map((room) => (
                        <tr key={room.id}>
                            <td>{room.id}</td>
                            <td>{room.name}</td>
                            <td>
                                <button onClick={() => handleEdit(room)}>Editar</button>
                                <button onClick={() => deleteRoom(room.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {editingRoom && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setEditingRoom(null)}>&times;</button>
                        <h3>Editando Habitación: {originalName}</h3>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            saveEditRoom(editingRoom);
                        }}>
                            <label>Nombre:
                                <input
                                    placeholder="Nombre"
                                    type="text"
                                    value={editingRoom.name || ""}
                                    onChange={(e) => setEditingRoom({...editingRoom, name: e.target.value})}
                                />
                            </label>
                            <label>Descripción:
                                <input
                                    type="text"
                                    value={editingRoom.description || ""}
                                    onChange={(e) => setEditingRoom({...editingRoom, description: e.target.value})}
                                />
                            </label>

                            <h4>Imágenes existentes:</h4>
                            {existingImages.length > 0 ? (
                                existingImages.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={`data:image/jpeg;base64,${image.data}`}
                                            alt={`Imagen ${index + 1}`}
                                            width="100px"
                                            height="80px"
                                        />
                                        <button type="button" onClick={() => handleDeleteExistingImage(index)}>
                                            Eliminar
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}

                            <label>Agregar nuevas imágenes:
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>

                            <button type="submit">Guardar habitación</button>
                            <button type="button" onClick={() => setEditingRoom(null)}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Read;

