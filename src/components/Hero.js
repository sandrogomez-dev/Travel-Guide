import React, { useState, useEffect } from 'react';

/**
 * Componente Hero - La primera impresión que cautiva
 * Diseño premium con animaciones y efectos visuales modernos
 */
const Hero = ({ onStartPlanning }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Imágenes de fondo que rotan
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Santorini, Grecia',
      description: 'Donde los sueños azules se encuentran con el mar'
    },
    {
      url: 'https://images.unsplash.com/photo-1502780402662-acc01917286e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Kyoto, Japón',
      description: 'Tradición milenaria en cada rincón'
    },
    {
      url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'París, Francia',
      description: 'La ciudad del amor y los sueños'
    },
    {
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Bali, Indonesia',
      description: 'Paraíso tropical donde el alma descansa'
    },
    {
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      location: 'Machu Picchu, Perú',
      description: 'Donde la historia vive en las nubes'
    }
  ];

  // Estadísticas impresionantes
  const stats = [
    { number: '2M+', label: 'Viajeros Felices', icon: '😊' },
    { number: '195', label: 'Países Cubiertos', icon: '🌍' },
    { number: '50K+', label: 'Itinerarios Creados', icon: '📋' },
    { number: '4.9★', label: 'Valoración Promedio', icon: '⭐' }
  ];

  // Efectos de entrada
  useEffect(() => {
    setIsVisible(true);
    
    // Cambio automático de imágenes
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="hero-container">
      {/* Fondo con imágenes rotativas */}
      <div className="hero-background">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Contenido principal */}
      <div className={`hero-content ${isVisible ? 'animate-fade-in' : ''}`}>
        <div className="container-premium">
          <div className="hero-main">
            {/* Título principal con efecto gradiente */}
            <div className="hero-title-container">
              <h1 className="text-display-xl gradient-text animate-slide-up">
                Crea Viajes
              </h1>
              <h1 className="text-display-xl text-white animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Extraordinarios
              </h1>
              <div className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <p className="text-body-lg">
                  Inteligencia artificial que diseña itinerarios únicos, 
                  perfectamente adaptados a tus sueños de viaje
                </p>
              </div>
            </div>

            {/* Información de ubicación actual */}
            <div className="hero-location animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="location-indicator">
                <span className="location-icon">📍</span>
                <span className="location-text">
                  {heroImages[currentImageIndex].location}
                </span>
              </div>
              <p className="location-description">
                {heroImages[currentImageIndex].description}
              </p>
            </div>

            {/* Botón principal con efectos premium */}
            <div className="hero-cta animate-bounce-in" style={{ animationDelay: '0.8s' }}>
              <button 
                className="btn-premium btn-gradient-sunset btn-hero"
                onClick={onStartPlanning}
              >
                <span className="btn-icon">✨</span>
                Planificar Mi Aventura
                <span className="btn-arrow">→</span>
              </button>
              
              <div className="hero-trust">
                <div className="trust-avatars">
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <div className="avatar-more">+2M</div>
                </div>
                <p className="trust-text">
                  Únete a millones de viajeros que ya confían en nosotros
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas impresionantes */}
          <div className="hero-stats animate-fade-in" style={{ animationDelay: '1s' }}>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-card hover-lift"
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de imagen */}
      <div className="hero-indicators">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="floating-elements">
        <div className="float-element float-1 animate-float">✈️</div>
        <div className="float-element float-2 animate-float" style={{ animationDelay: '1s' }}>🗺️</div>
        <div className="float-element float-3 animate-float" style={{ animationDelay: '2s' }}>🎒</div>
        <div className="float-element float-4 animate-float" style={{ animationDelay: '0.5s' }}>📸</div>
      </div>
    </div>
  );
};

export default Hero; 