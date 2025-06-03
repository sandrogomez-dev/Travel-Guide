import React, { useState, useEffect } from 'react';

/**
 * Formulario de Viajes Premium - Rediseño completo
 * Una obra de arte visual con componentes modernos
 */
const TravelFormPremium = ({
  formData,
  errors,
  isSubmitting,
  submitMessage,
  tripTypes,
  handleInputChange,
  handleSubmit,
  resetForm,
  hasChanges,
  isFormComplete
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [focusedField, setFocusedField] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const totalSteps = 4;

  // Iconos y gradientes por tipo de viaje
  const tripTypeVisuals = {
    aventura: { 
      icon: '🏔️', 
      gradient: 'var(--gradient-forest)',
      description: 'Adrenalina y naturaleza salvaje'
    },
    cultural: { 
      icon: '🏛️', 
      gradient: 'var(--gradient-gold)',
      description: 'Historia y tradiciones milenarias'
    },
    relajacion: { 
      icon: '🏖️', 
      gradient: 'var(--gradient-ocean)',
      description: 'Tranquilidad y bienestar'
    },
    gastronomico: { 
      icon: '🍽️', 
      gradient: 'var(--gradient-sunset)',
      description: 'Sabores y experiencias culinarias'
    },
    familiar: { 
      icon: '👨‍👩‍👧‍👦', 
      gradient: 'var(--gradient-cosmic)',
      description: 'Diversión para toda la familia'
    },
    romantico: { 
      icon: '💕', 
      gradient: 'var(--gradient-sunset)',
      description: 'Momentos íntimos e inolvidables'
    },
    negocios: { 
      icon: '💼', 
      gradient: 'var(--gradient-dark)',
      description: 'Productividad y networking'
    }
  };

  // Verificar completitud de pasos
  useEffect(() => {
    const newCompletedSteps = new Set();
    
    // Paso 1: Destino
    if (formData.destination.trim()) newCompletedSteps.add(1);
    
    // Paso 2: Fechas
    if (formData.startDate && formData.endDate) newCompletedSteps.add(2);
    
    // Paso 3: Preferencias
    if (formData.tripType && formData.travelers) newCompletedSteps.add(3);
    
    // Paso 4: Presupuesto
    if (formData.budget) newCompletedSteps.add(4);
    
    setCompletedSteps(newCompletedSteps);
  }, [formData]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getBudgetCategory = (amount) => {
    if (amount <= 500) return { label: 'Económico', color: 'var(--success)' };
    if (amount <= 1500) return { label: 'Moderado', color: 'var(--warning)' };
    if (amount <= 5000) return { label: 'Confortable', color: 'var(--info)' };
    return { label: 'Lujo', color: 'var(--error)' };
  };

  return (
    <div className="travel-form-premium">
      <div className="form-background">
        <div className="bg-pattern"></div>
      </div>

      <div className="container-premium">
        <div className="form-container animate-fade-in">
          
          {/* Header del formulario */}
          <div className="form-header">
            <div className="form-title">
              <h1 className="text-display-md gradient-text">
                Diseña tu Viaje Perfecto
              </h1>
              <p className="text-body-lg">
                Cuéntanos tus sueños y crearemos la experiencia ideal
              </p>
            </div>

            {/* Progress Bar Premium */}
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
              
              <div className="progress-steps">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div 
                    key={i + 1} 
                    className={`progress-step ${
                      i + 1 === currentStep ? 'active' : 
                      completedSteps.has(i + 1) ? 'completed' : ''
                    }`}
                    onClick={() => setCurrentStep(i + 1)}
                  >
                    <div className="step-indicator">
                      {completedSteps.has(i + 1) ? '✓' : i + 1}
                    </div>
                    <span className="step-label">
                      {['Destino', 'Fechas', 'Preferencias', 'Presupuesto'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mensaje de estado */}
          {submitMessage && (
            <div className={`alert-premium ${submitMessage.includes('Error') ? 'alert-error' : 'alert-success'}`}>
              <div className="alert-icon">
                {submitMessage.includes('Error') ? '⚠️' : '✅'}
              </div>
              <div className="alert-content">
                {submitMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-steps">
            
            {/* PASO 1: DESTINO */}
            {currentStep === 1 && (
              <div className="form-step animate-slide-up">
                <div className="step-content">
                  <div className="step-icon">🎯</div>
                  <h2 className="text-heading-xl">¿A dónde sueñas viajar?</h2>
                  <p className="step-description">
                    El mundo es tu destino. Cuéntanos qué lugar ha capturado tu imaginación.
                  </p>

                  <div className="input-group-premium">
                    <div className={`input-wrapper ${focusedField === 'destination' ? 'focused' : ''} ${errors.destination ? 'error' : ''}`}>
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('destination')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Escribe tu destino soñado..."
                        className="input-premium-custom"
                        maxLength={100}
                      />
                      <div className="input-underline"></div>
                      <div className="character-count">
                        {formData.destination.length}/100
                      </div>
                    </div>
                    {errors.destination && (
                      <div className="error-message animate-fade-in">
                        {errors.destination}
                      </div>
                    )}
                  </div>

                  <div className="popular-destinations">
                    <p className="destinations-label">Destinos populares:</p>
                    <div className="destinations-grid">
                      {['París, Francia', 'Tokio, Japón', 'Santorini, Grecia', 'Bali, Indonesia', 'Nueva York, EUA', 'Machu Picchu, Perú'].map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          className="destination-chip hover-lift"
                          onClick={() => handleInputChange({ target: { name: 'destination', value: dest } })}
                        >
                          {dest}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PASO 2: FECHAS */}
            {currentStep === 2 && (
              <div className="form-step animate-slide-up">
                <div className="step-content">
                  <div className="step-icon">📅</div>
                  <h2 className="text-heading-xl">¿Cuándo quieres viajar?</h2>
                  <p className="step-description">
                    Elige las fechas perfectas para tu aventura.
                  </p>

                  <div className="dates-container">
                    <div className="date-group">
                      <label className="date-label">Fecha de inicio</label>
                      <div className={`input-wrapper ${errors.startDate ? 'error' : ''}`}>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="input-premium-custom date-input"
                        />
                        <div className="input-underline"></div>
                      </div>
                      {errors.startDate && (
                        <div className="error-message">{errors.startDate}</div>
                      )}
                    </div>

                    <div className="date-separator">
                      <div className="separator-line"></div>
                      <div className="separator-icon">✈️</div>
                    </div>

                    <div className="date-group">
                      <label className="date-label">Fecha de fin</label>
                      <div className={`input-wrapper ${errors.endDate ? 'error' : ''}`}>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          min={formData.startDate || new Date().toISOString().split('T')[0]}
                          className="input-premium-custom date-input"
                        />
                        <div className="input-underline"></div>
                      </div>
                      {errors.endDate && (
                        <div className="error-message">{errors.endDate}</div>
                      )}
                    </div>
                  </div>

                  {formData.startDate && formData.endDate && (
                    <div className="duration-display animate-scale-in">
                      <div className="duration-card">
                        <div className="duration-icon">⏱️</div>
                        <div className="duration-info">
                          <span className="duration-number">{formData.duration}</span>
                          <span className="duration-label">
                            {formData.duration === 1 ? 'día' : 'días'} de aventura
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PASO 3: PREFERENCIAS */}
            {currentStep === 3 && (
              <div className="form-step animate-slide-up">
                <div className="step-content">
                  <div className="step-icon">🎨</div>
                  <h2 className="text-heading-xl">¿Qué tipo de experiencia buscas?</h2>
                  <p className="step-description">
                    Cada viaje es único. Cuéntanos qué te emociona más.
                  </p>

                  <div className="trip-types-grid">
                    {tripTypes.filter(type => type.value).map((type) => {
                      const visual = tripTypeVisuals[type.value] || { icon: '🌟', gradient: 'var(--gradient-primary)' };
                      return (
                        <div
                          key={type.value}
                          className={`trip-type-card ${formData.tripType === type.value ? 'selected' : ''} hover-lift`}
                          onClick={() => handleInputChange({ target: { name: 'tripType', value: type.value } })}
                          style={{ '--card-gradient': visual.gradient }}
                        >
                          <div className="trip-type-icon">{visual.icon}</div>
                          <h3 className="trip-type-title">{type.label}</h3>
                          <p className="trip-type-description">{visual.description}</p>
                          <div className="selection-indicator">
                            {formData.tripType === type.value && <span>✓</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {errors.tripType && (
                    <div className="error-message text-center">{errors.tripType}</div>
                  )}

                  <div className="travelers-section">
                    <label className="travelers-label">¿Cuántos viajeros serán?</label>
                    <div className={`travelers-input ${errors.travelers ? 'error' : ''}`}>
                      <button
                        type="button"
                        className="travelers-btn"
                        onClick={() => handleInputChange({ 
                          target: { name: 'travelers', value: Math.max(1, (formData.travelers || 1) - 1) }
                        })}
                        disabled={formData.travelers <= 1}
                      >
                        -
                      </button>
                      <div className="travelers-display">
                        <span className="travelers-number">{formData.travelers || 1}</span>
                        <span className="travelers-text">
                          {(formData.travelers || 1) === 1 ? 'viajero' : 'viajeros'}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="travelers-btn"
                        onClick={() => handleInputChange({ 
                          target: { name: 'travelers', value: Math.min(20, (formData.travelers || 1) + 1) }
                        })}
                        disabled={formData.travelers >= 20}
                      >
                        +
                      </button>
                    </div>
                    {errors.travelers && (
                      <div className="error-message">{errors.travelers}</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* PASO 4: PRESUPUESTO */}
            {currentStep === 4 && (
              <div className="form-step animate-slide-up">
                <div className="step-content">
                  <div className="step-icon">💰</div>
                  <h2 className="text-heading-xl">¿Cuál es tu presupuesto?</h2>
                  <p className="step-description">
                    Cada presupuesto puede crear experiencias increíbles.
                  </p>

                  <div className="budget-section">
                    <div className={`budget-input-wrapper ${errors.budget ? 'error' : ''}`}>
                      <div className="budget-input">
                        <span className="currency-symbol">$</span>
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          placeholder="0"
                          min="50"
                          max="100000"
                          step="1"
                          className="budget-input-field"
                        />
                        <span className="currency-label">USD</span>
                      </div>
                      <div className="input-underline"></div>
                    </div>

                    {formData.budget && (
                      <div className="budget-category animate-scale-in">
                        <div 
                          className="category-indicator"
                          style={{ color: getBudgetCategory(formData.budget).color }}
                        >
                          {getBudgetCategory(formData.budget).label}
                        </div>
                      </div>
                    )}

                    {errors.budget && (
                      <div className="error-message">{errors.budget}</div>
                    )}

                    <div className="budget-presets">
                      <p className="presets-label">Rangos sugeridos:</p>
                      <div className="presets-grid">
                        {[
                          { amount: 300, label: 'Económico', range: '$50 - $500' },
                          { amount: 1000, label: 'Moderado', range: '$500 - $1,500' },
                          { amount: 3000, label: 'Confortable', range: '$1,500 - $5,000' },
                          { amount: 8000, label: 'Lujo', range: '$5,000+' }
                        ].map((preset) => (
                          <button
                            key={preset.amount}
                            type="button"
                            className={`budget-preset ${formData.budget === preset.amount ? 'selected' : ''}`}
                            onClick={() => handleInputChange({ target: { name: 'budget', value: preset.amount } })}
                          >
                            <div className="preset-label">{preset.label}</div>
                            <div className="preset-range">{preset.range}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navegación */}
            <div className="form-navigation">
              <div className="nav-buttons">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="btn-premium btn-secondary nav-btn"
                    onClick={prevStep}
                  >
                    ← Anterior
                  </button>
                )}

                <div className="nav-spacer"></div>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    className="btn-premium btn-gradient-ocean nav-btn"
                    onClick={nextStep}
                    disabled={!completedSteps.has(currentStep)}
                  >
                    Siguiente →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-premium btn-gradient-sunset nav-btn submit-btn"
                    disabled={isSubmitting || !isFormComplete}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        Creando magia...
                      </>
                    ) : (
                      <>
                        ✨ Crear mi itinerario
                      </>
                    )}
                  </button>
                )}
              </div>

              {hasChanges && (
                <button
                  type="button"
                  className="reset-btn"
                  onClick={resetForm}
                  disabled={isSubmitting}
                >
                  🔄 Empezar de nuevo
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TravelFormPremium; 