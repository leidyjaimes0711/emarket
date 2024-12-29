import React, {useEffect, useState} from 'react';
import '../../styles/Body.css';
import RecommendationsSection from './RecommendationsSection.js';

const Body = () => {

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

            <RecommendationsSection />

        </main>
    );
};

export default Body;
