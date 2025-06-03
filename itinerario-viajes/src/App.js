import React, { useState } from 'react';

// Importar todos los estilos premium
import './styles/theme.css';
import './styles/hero.css';
import './styles/form-premium.css';
import './styles/itinerary-premium.css';

// Importar componentes premium
import Hero from './components/Hero';
import TravelFormPremium from './components/TravelFormPremium';
import ItineraryDisplayPremium from './components/ItineraryDisplayPremium';

// Importar hooks (usando exportaciones nombradas)
import { useTravelForm } from './hooks/useTravelForm';
import { useItinerary } from './hooks/useItinerary';

/**
 * Aplicación Principal - Travel Itinerary Premium
 * Una obra de arte visual moderna para planificación de viajes
 */
function App() {
  const [currentView, setCurrentView] = useState('hero'); // 'hero', 'form', 'itinerary'

  // Formulario de viajes
  const {
    formData,
    errors,
    isSubmitting,
    submitMessage,
    tripTypes,
    handleInputChange,
    resetForm,
    hasChanges,
    isFormComplete
  } = useTravelForm();

  // Generación de itinerarios
  const {
    currentItinerary: itinerary,
    isGenerating,
    generationError,
    generateItinerary,
    saveItinerary,
    clearCurrentItinerary: clearItinerary
  } = useItinerary();

  // Manejar envío del formulario con transición a vista de itinerario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Cambiar a vista de itinerario antes de generar
    setCurrentView('itinerary');
    
    // Generar el itinerario
    const success = await generateItinerary(formData);
    
    if (!success) {
      // Si hay error, permanecer en la vista de itinerario para mostrar el error
      console.log('Error al generar itinerario');
    }
  };

  // Manejar inicio de planificación desde Hero
  const handleStartPlanning = () => {
    setCurrentView('form');
  };

  // Manejar creación de nuevo itinerario
  const handleNewItinerary = () => {
    clearItinerary();
    resetForm();
    setCurrentView('hero');
  };

  // Manejar generación de nuevo itinerario con mismos datos
  const handleGenerateNew = () => {
    if (formData && isFormComplete) {
      generateItinerary(formData);
    }
  };

  // Manejar guardado de itinerario
  const handleSaveItinerary = (itineraryData, customName) => {
    saveItinerary(itineraryData, customName);
  };

  // Renderizar vista actual
  const renderCurrentView = () => {
    switch (currentView) {
      case 'hero':
        return (
          <Hero onStartPlanning={handleStartPlanning} />
        );
      
      case 'form':
        return (
          <TravelFormPremium
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            tripTypes={tripTypes}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            hasChanges={hasChanges}
            isFormComplete={isFormComplete}
          />
        );
      
      case 'itinerary':
        return (
          <ItineraryDisplayPremium
            itinerary={itinerary}
            isGenerating={isGenerating}
            generationError={generationError}
            onSave={handleSaveItinerary}
            onNewItinerary={handleNewItinerary}
            onGenerateNew={handleGenerateNew}
          />
        );
      
      default:
        return <Hero onStartPlanning={handleStartPlanning} />;
    }
  };

  return (
    <div className="App">
      {renderCurrentView()}
      
      {/* Elementos decorativos globales */}
      <div className="app-decorations">
        {/* Partículas flotantes sutiles */}
        <div className="particle particle-1">✨</div>
        <div className="particle particle-2">🌟</div>
        <div className="particle particle-3">💫</div>
      </div>
      
      {/* Estilos inline para elementos decorativos */}
      <style jsx>{`
        .app-decorations {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        
        .particle {
          position: absolute;
          font-size: 1.5rem;
          opacity: 0.3;
          animation: float-particle 10s ease-in-out infinite;
        }
        
        .particle-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .particle-2 {
          top: 60%;
          right: 15%;
          animation-delay: 3s;
        }
        
        .particle-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: 6s;
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px) rotate(90deg);
            opacity: 0.6;
          }
          50% {
            transform: translate(-10px, -60px) rotate(180deg);
            opacity: 0.4;
          }
          75% {
            transform: translate(-30px, -30px) rotate(270deg);
            opacity: 0.5;
          }
        }
        
        @media (max-width: 768px) {
          .app-decorations {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export default App;