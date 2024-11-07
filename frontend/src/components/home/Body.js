import React, { useState } from 'react';
import '../../styles/Body.css';
import RecommendationsSection from './RecommendationsSection.js';

const Body = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 4; // Cambia este valor según el total de páginas

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <main className="body">
            <section className="search-section">
                <input type="text" className="search-bar" placeholder="Buscar"/>
            </section>

            <section className="categories-section">
                <h2>Categorías</h2>
                <div className="categories">
                    <div className="category">
                        <img src="/images/hoteles.jpeg" alt="Hoteles"/>
                        <span>Hoteles</span>
                    </div>
                    <div className="category">
                        <img src="/images/hostales.webp" alt="Hostales"/>
                        <span>Hostales</span>
                    </div>
                    <div className="category">
                        <img src="/images/apartamentos.jpeg" alt="Apartamentos"/>
                        <span>Apartamentos</span>
                    </div>
                    <div className="category">
                        <img src="/images/byb.jpeg" alt="Bed and Breakfast"/>
                        <span>Bed and Breakfast</span>
                    </div>
                    <div className="category">
                        <img src="/images/cabañas.jpeg" alt="Cabañas"/>
                        <span>Cabañas</span>
                    </div>
                </div>
            </section>

            <RecommendationsSection currentPage={currentPage} />

            <div className="pagination">
                {/* Botón de Inicio */}
                <button onClick={goToFirstPage} disabled={currentPage === 1}>
                    Inicio
                </button>

                {/* Botón de flecha izquierda */}
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    &lt;
                </button>

                {/* Números de página */}
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}

                {/* Botón de flecha derecha */}
                <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    &gt;
                </button>

                {/* Botón de Fin */}
                <button onClick={goToLastPage} disabled={currentPage === totalPages}>
                    Fin
                </button>
            </div>
        </main>
    );
};

export default Body;
