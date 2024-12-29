import '../../styles/RecommendationsSection.css';
import React, { useState, useEffect } from 'react';

const RecommendationsSection = ({ currentPage: initialPage }) => {
    const [error, setError] = useState('');
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage || 1);
    const roomsPerPage = 10; // Define el número de habitaciones por página

    const openRoomDetailsInNewTab = (roomId) => {
        const newTabUrl = `/room/${roomId}`;
        window.open(newTabUrl, '_blank');
    };

    const listRooms = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/rooms', {
                method: 'GET'
            });
            if (response.ok) {
                const data = await response.json();
                // Mezcla las habitaciones una vez al obtener los datos
                const shuffledRooms = data.sort(() => 0.5 - Math.random());
                setRooms(shuffledRooms);
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

    // Calcular el subconjunto de habitaciones para la página actual
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    const roomsToDisplay = rooms.slice(startIndex, endIndex);

    // Calcular el número total de páginas
    const totalPages = Math.ceil(rooms.length / roomsPerPage);

    const goToPage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPagination = () => {
        const pagesToShow = 5; // Número de páginas visibles a la vez
        const half = Math.floor(pagesToShow / 2);
        let startPage = Math.max(currentPage - half, 1);
        let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

        if (endPage - startPage + 1 < pagesToShow) {
            startPage = Math.max(endPage - pagesToShow + 1, 1);
        }

        const pageNumbers = [];
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return (
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                >
                    ‹‹
                </button>
                <button
                    className="pagination-button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ‹
                </button>

                {startPage > 1 && (
                    <span className="pagination-ellipsis">...</span>
                )}

                {pageNumbers.map((page) => (
                    <button
                        key={page}
                        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                        onClick={() => goToPage(page)}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <span className="pagination-ellipsis">...</span>
                )}

                <button
                    className="pagination-button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                   ›
                </button>
                <button
                    className="pagination-button"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    ››
                </button>

            </div>
        );
    };

    return (
        <div>
            <h2>Recomendaciones</h2>
            {error && <p>{error}</p>}

            {roomsToDisplay.length === 0 ? (
                <p>No hay habitaciones disponibles</p>
            ) : (
                <div>
                    <div className="grid-container">
                        {roomsToDisplay.map((room) => (
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

                                <button className="see-more-button" onClick={() => openRoomDetailsInNewTab(room.id)}>
                                    Ver más
                                </button>
                            </div>
                        ))}
                    </div>

                    {renderPagination()}
                </div>
            )}
        </div>
    );
};

export default RecommendationsSection;


