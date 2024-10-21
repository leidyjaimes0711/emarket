import React, { useEffect, useRef, useState } from 'react';
import '../../../styles/Read.css';

const Read = () => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);
    const [editingRoom, setEditingRoom] = useState(null);
    const [originalName, setOriginalName] = useState(''); // Guardamos el nombre original
    const [newImages, setNewImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const previewURLs = selectedFiles.map((file) => URL.createObjectURL(file));
        setNewImages((prevImages) => [...prevImages, ...selectedFiles]);
        setPreviewImages((prevPreviews) => [...prevPreviews, ...previewURLs]);
    };

    const removeImage = (index) => {
        setNewImages(newImages.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    const removeExistingImage = (imageId) => {
        setEditingRoom({
            ...editingRoom,
            images: editingRoom.images.filter((image) => image.id !== imageId),
        });
    };

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
        setOriginalName(room.name); // Guardamos el nombre original cuando iniciamos la edición
        setPreviewImages([]); // Limpia las vistas previas
        setNewImages([]); // Limpia las nuevas imágenes
    };

    const saveEditRoom = async (room) => {
        const formData = new FormData();

        if (newImages.length > 0) {
            newImages.forEach((image) => {
                formData.append('images', image);
            });
        }

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
                <ul>
                    {rooms.map((room) => (
                        <li key={room.id}>
                            <h3>{room.name}</h3>
                            <p>{room.description}</p>
                            {room.images && room.images.length > 0 ? (
                                room.images.map((image, index) => (
                                    <div key={index}>
                                        <img
                                            src={`data:image/jpeg;base64,${image.data}`}
                                            alt={`Imagen de la habitación ${index + 1}`}
                                            width="200px"
                                            height="150px"
                                        />
                                    </div>
                                ))
                            ) : (
                                <p>No hay imágenes disponibles</p>
                            )}
                            <button onClick={() => handleEdit(room)}>Editar</button>
                            <button onClick={() => deleteRoom(room.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}

            {editingRoom && (
                <div className="edit-form">
                    {/* Usa el nombre original de `editingRoom` en el título sin que cambie */}
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

                        <button type="submit">Guardar habitación</button>
                        <button type="button" onClick={() => setEditingRoom(null)}>Cancelar</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Read;