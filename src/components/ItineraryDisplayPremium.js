import React, { useState, useEffect } from 'react';
import { usePDFExport } from '../hooks/usePDFExport';
import PDFPreview from './PDFPreview';

/**
 * Visualización de Itinerarios Premium - Rediseño completo
 * Una experiencia visual excepcional para mostrar los itinerarios
 */
const ItineraryDisplayPremium = ({ 
  itinerary, 
  isGenerating, 
  generationError, 
  onSave, 
  onNewItinerary, 
  onGenerateNew 
}) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [customName, setCustomName] = useState('');
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [showPDFOptions, setShowPDFOptions] = useState(false);

  // Hook para exportación PDF
  const { isExporting, exportError, exportToPDF, exportCustomPDF } = usePDFExport();

  // Efectos de animación progresiva
  useEffect(() => {
    if (itinerary && !isGenerating) {
      const timer = setInterval(() => {
        setAnimationStep(prev => {
          if (prev < 5) return prev + 1;
          clearInterval(timer);
          return prev;
        });
      }, 300);
      return () => clearInterval(timer);
    }
  }, [itinerary, isGenerating]);

  // Manejar exportación PDF
  const handlePDFExport = async (type = 'custom') => {
    if (!itinerary) return;
    
    try {
      const filename = `itinerario-${itinerary.tripInfo.destination.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}`;
      
      if (type === 'custom') {
        await exportCustomPDF(itinerary, filename);
      } else {
        await exportToPDF('pdf-content', filename);
      }
      
      setShowPDFOptions(false);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
    }
  };

  // Si está generando, mostrar animación de carga premium
  if (isGenerating) {
    return (
      <div className="itinerary-loading">
        <div className="loading-background">
          <div className="bg-pattern"></div>
        </div>
        
        <div className="loading-content animate-fade-in">
          <div className="loading-icon-container">
            <div className="loading-globe">🌍</div>
            <div className="loading-pulse"></div>
          </div>
          
          <h2 className="text-display-sm gradient-text">
            Creando tu experiencia perfecta
          </h2>
          
          <div className="loading-steps">
            <div className="loading-step active">
              <div className="step-dot"></div>
              <span>Analizando preferencias</span>
            </div>
            <div className="loading-step active">
              <div className="step-dot"></div>
              <span>Seleccionando actividades</span>
            </div>
            <div className="loading-step active">
              <div className="step-dot"></div>
              <span>Optimizando itinerario</span>
            </div>
            <div className="loading-step">
              <div className="step-dot"></div>
              <span>Finalizando detalles</span>
            </div>
          </div>

          <div className="loading-progress">
            <div className="progress-bar-loading">
              <div className="progress-fill-loading"></div>
            </div>
            <p className="loading-text">
              Esto puede tomar unos momentos mientras creamos algo increíble...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Si hay error, mostrarlo con estilo
  if (generationError) {
    return (
      <div className="itinerary-error">
        <div className="error-background">
          <div className="bg-pattern"></div>
        </div>
        
        <div className="error-content animate-bounce-in">
          <div className="error-icon">😔</div>
          <h2 className="text-heading-xl">¡Ups! Algo salió mal</h2>
          <p className="error-message">{generationError}</p>
          
          <div className="error-actions">
            <button 
              className="btn-premium btn-gradient-sunset"
              onClick={onGenerateNew}
            >
              <span>🔄</span>
              Intentar de nuevo
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Si no hay itinerario, no mostrar nada
  if (!itinerary) {
    return null;
  }

  const { tripInfo, dailyItinerary, accommodation, estimatedCosts } = itinerary;

  // Formatear fecha
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Obtener gradiente por tipo de actividad
  const getActivityGradient = (cost) => {
    const gradients = {
      low: 'var(--gradient-forest)',
      medium: 'var(--gradient-ocean)',
      high: 'var(--gradient-sunset)',
      luxury: 'var(--gradient-cosmic)'
    };
    return gradients[cost] || 'var(--gradient-primary)';
  };

  // Manejar guardado
  const handleSave = () => {
    const name = customName.trim() || `Viaje a ${tripInfo.destination}`;
    if (onSave) {
      onSave(itinerary, name);
      setShowSaveModal(false);
      setCustomName('');
    }
  };

  return (
    <div className="itinerary-display-premium">
      <div className="display-background">
        <div className="bg-pattern"></div>
      </div>

      <div className="container-premium">
        
        {/* Header de Éxito */}
        <div className={`success-header ${animationStep >= 1 ? 'animate-slide-up' : ''}`}>
          <div className="success-icon">✨</div>
          <h1 className="text-display-md gradient-text">
            ¡Tu Aventura Está Lista!
          </h1>
          <p className="success-subtitle">
            Hemos creado el itinerario perfecto para {tripInfo.destination}
          </p>
        </div>

        {/* Resumen Principal */}
        <div className={`trip-summary-card ${animationStep >= 2 ? 'animate-scale-in' : ''}`}>
          <div className="summary-background">
            <div className="summary-pattern"></div>
          </div>
          
          <div className="summary-content">
            <div className="trip-header">
              <div className="trip-icon">{tripInfo.tripType.icon}</div>
              <div className="trip-details">
                <h2 className="trip-destination">{tripInfo.destination}</h2>
                <p className="trip-type">{tripInfo.tripType.name}</p>
                <div className="trip-dates">
                  📅 {formatDate(tripInfo.startDate)} - {formatDate(tripInfo.endDate)}
                </div>
              </div>
            </div>

            <div className="trip-stats">
              <div className="stat-item">
                <div className="stat-icon">⏱️</div>
                <div className="stat-value">{tripInfo.duration}</div>
                <div className="stat-label">{tripInfo.duration === 1 ? 'día' : 'días'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">👥</div>
                <div className="stat-value">{tripInfo.travelers}</div>
                <div className="stat-label">{tripInfo.travelers === 1 ? 'viajero' : 'viajeros'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">💰</div>
                <div className="stat-value">${estimatedCosts.perPerson.toLocaleString()}</div>
                <div className="stat-label">por persona</div>
              </div>
            </div>
          </div>
        </div>

        {/* Itinerario Día por Día */}
        <div className={`daily-itinerary ${animationStep >= 3 ? 'animate-fade-in' : ''}`}>
          <h3 className="section-title">
            <span className="title-icon">📋</span>
            Tu Itinerario Detallado
          </h3>
          
          <div className="days-container">
            {dailyItinerary.map((day, index) => (
              <div 
                key={day.day} 
                className="day-card hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="day-header">
                  <div className="day-number">
                    <span>Día</span>
                    <strong>{day.day}</strong>
                  </div>
                  <div className="day-activities-count">
                    {[day.morning, day.afternoon, day.evening].filter(Boolean).length} actividades
                  </div>
                </div>

                <div className="day-timeline">
                  {/* Mañana */}
                  <div className="timeline-slot">
                    <div className="time-indicator morning">
                      <span className="time-icon">🌅</span>
                      <span className="time-label">Mañana</span>
                    </div>
                    {day.morning ? (
                      <div 
                        className="activity-card"
                        style={{ background: getActivityGradient(day.morning.cost) }}
                      >
                        <h4 className="activity-name">{day.morning.name}</h4>
                        <p className="activity-description">{day.morning.description}</p>
                        <div className="activity-meta">
                          <span className="activity-duration">⏱️ {day.morning.duration}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-slot">Tiempo libre</div>
                    )}
                  </div>

                  {/* Tarde */}
                  <div className="timeline-slot">
                    <div className="time-indicator afternoon">
                      <span className="time-icon">☀️</span>
                      <span className="time-label">Tarde</span>
                    </div>
                    {day.afternoon ? (
                      <div 
                        className="activity-card"
                        style={{ background: getActivityGradient(day.afternoon.cost) }}
                      >
                        <h4 className="activity-name">{day.afternoon.name}</h4>
                        <p className="activity-description">{day.afternoon.description}</p>
                        <div className="activity-meta">
                          <span className="activity-duration">⏱️ {day.afternoon.duration}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-slot">Tiempo libre</div>
                    )}
                  </div>

                  {/* Noche */}
                  <div className="timeline-slot">
                    <div className="time-indicator evening">
                      <span className="time-icon">🌙</span>
                      <span className="time-label">Noche</span>
                    </div>
                    {day.evening ? (
                      <div 
                        className="activity-card"
                        style={{ background: getActivityGradient(day.evening.cost) }}
                      >
                        <h4 className="activity-name">{day.evening.name}</h4>
                        <p className="activity-description">{day.evening.description}</p>
                        <div className="activity-meta">
                          <span className="activity-duration">⏱️ {day.evening.duration}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-slot">Tiempo libre</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Información Adicional */}
        <div className={`additional-info ${animationStep >= 4 ? 'animate-slide-up' : ''}`}>
          <div className="info-grid">
            
            {/* Alojamiento */}
            <div className="info-card accommodation-card">
              <div className="card-header">
                <span className="card-icon">🏨</span>
                <h4>Alojamiento Recomendado</h4>
              </div>
              <div className="card-content">
                <div className="recommended-accommodation">
                  <strong>{accommodation.recommended}</strong>
                  <span className="accommodation-category">{tripInfo.budget.label}</span>
                </div>
                <div className="other-options">
                  <p>Otras opciones:</p>
                  <div className="options-list">
                    {accommodation.options
                      .filter(option => option !== accommodation.recommended)
                      .slice(0, 3)
                      .map((option, index) => (
                        <span key={index} className="option-tag">{option}</span>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Costos */}
            <div className="info-card costs-card">
              <div className="card-header">
                <span className="card-icon">💳</span>
                <h4>Resumen de Costos</h4>
              </div>
              <div className="card-content">
                <div className="cost-highlight">
                  <div className="total-cost">
                    <span className="cost-label">Total estimado</span>
                    <span className="cost-value">${estimatedCosts.total.toLocaleString()}</span>
                  </div>
                  <div className="per-person-cost">
                    ${estimatedCosts.perPerson.toLocaleString()} por persona
                  </div>
                </div>
                
                <button 
                  className="breakdown-toggle"
                  onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                >
                  {showCostBreakdown ? 'Ocultar' : 'Ver'} desglose detallado
                </button>

                {showCostBreakdown && (
                  <div className="cost-breakdown animate-scale-in">
                    <div className="breakdown-item">
                      <span>Actividades</span>
                      <span>${estimatedCosts.activities.toLocaleString()}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Alojamiento</span>
                      <span>${estimatedCosts.accommodation.toLocaleString()}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Transporte</span>
                      <span>${estimatedCosts.transport.toLocaleString()}</span>
                    </div>
                    <div className="breakdown-item">
                      <span>Comidas</span>
                      <span>${estimatedCosts.food.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className={`actions-section ${animationStep >= 5 ? 'animate-bounce-in' : ''}`}>
          <div className="primary-actions">
            <button 
              className="btn-premium btn-gradient-sunset btn-large"
              onClick={() => setShowSaveModal(true)}
            >
              <span>💾</span>
              Guardar Mi Itinerario
            </button>

            <button 
              className="btn-premium btn-gradient-forest btn-large"
              onClick={() => setShowPDFOptions(true)}
              disabled={isExporting}
            >
              {isExporting ? (
                <>
                  <div className="loading-spinner-small"></div>
                  Generando PDF...
                </>
              ) : (
                <>
                  <span>📄</span>
                  Exportar PDF
                </>
              )}
            </button>
          </div>
          
          <div className="secondary-actions">
            <button 
              className="btn-premium btn-secondary"
              onClick={onGenerateNew}
            >
              <span>🔄</span>
              Generar Nuevo
            </button>
            <button 
              className="btn-premium btn-secondary"
              onClick={onNewItinerary}
            >
              <span>✈️</span>
              Planear Otro Viaje
            </button>
          </div>

          {exportError && (
            <div className="export-error">
              ⚠️ {exportError}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Guardado */}
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>💾 Guardar Itinerario</h3>
              <button 
                className="modal-close"
                onClick={() => setShowSaveModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="input-group">
                <label className="input-label">Nombre del itinerario</label>
                <input
                  type="text"
                  className="input-premium"
                  placeholder={`Viaje a ${tripInfo.destination}`}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  maxLength={50}
                />
                <small className="input-help">
                  Deja vacío para usar el nombre automático
                </small>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-premium btn-secondary"
                onClick={() => setShowSaveModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="btn-premium btn-gradient-sunset"
                onClick={handleSave}
              >
                💾 Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Opciones PDF */}
      {showPDFOptions && (
        <div className="modal-overlay" onClick={() => setShowPDFOptions(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📄 Exportar a PDF</h3>
              <button 
                className="modal-close"
                onClick={() => setShowPDFOptions(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">
                Elige el formato de exportación que prefieras:
              </p>
              
              <div className="pdf-options">
                <button 
                  className="pdf-option-card"
                  onClick={() => handlePDFExport('custom')}
                  disabled={isExporting}
                >
                  <div className="option-icon">📋</div>
                  <div className="option-content">
                    <h4>PDF Optimizado</h4>
                    <p>Diseño limpio y profesional, perfecto para imprimir</p>
                  </div>
                </button>

                <button 
                  className="pdf-option-card"
                  onClick={() => handlePDFExport('visual')}
                  disabled={isExporting}
                >
                  <div className="option-icon">🎨</div>
                  <div className="option-content">
                    <h4>PDF Visual</h4>
                    <p>Captura exacta de la vista premium con todos los estilos</p>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn-premium btn-secondary"
                onClick={() => setShowPDFOptions(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Componente PDF (oculto) */}
      <PDFPreview itinerary={itinerary} isVisible={false} />
    </div>
  );
};

export default ItineraryDisplayPremium; 