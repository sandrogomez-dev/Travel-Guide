import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TravelForm from './components/TravelForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import { useTravelForm } from './hooks/useTravelForm';

/**
 * Componente principal de la aplicación
 * Integra el formulario de viajes y la visualización de itinerarios
 */
function App() {
  // Usar el hook integrado que maneja tanto formulario como itinerarios
  const {
    // Estados del formulario
    formData,
    errors,
    isSubmitting,
    submitMessage,
    tripTypes,
    
    // Estados del itinerario
    currentItinerary,
    isGenerating,
    generationError,
    
    // Funciones del formulario
    handleInputChange,
    handleSubmit,
    resetForm,
    hasChanges,
    isFormComplete,
    
    // Funciones del itinerario
    regenerateItinerary,
    handleSaveItinerary,
    createNewItinerary,
    
    // Estado de la aplicación
    hasItinerary
  } = useTravelForm();

  return (
    <div className="bg-light min-vh-100">
      {/* Mostrar formulario solo si no hay itinerario generado */}
      {!hasItinerary && (
        <TravelForm 
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting || isGenerating}
          submitMessage={submitMessage}
          tripTypes={tripTypes}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          hasChanges={hasChanges}
          isFormComplete={isFormComplete}
        />
      )}

      {/* Mostrar itinerario cuando esté disponible o se esté generando */}
      {(hasItinerary || isGenerating || generationError) && (
        <ItineraryDisplay
          itinerary={currentItinerary}
          isGenerating={isGenerating}
          generationError={generationError}
          onSave={handleSaveItinerary}
          onNewItinerary={createNewItinerary}
          onGenerateNew={regenerateItinerary}
        />
      )}
    </div>
  );
}

export default App;