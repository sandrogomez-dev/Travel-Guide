/**
 * Constantes para la aplicación de planificación de viajes
 * Centraliza todos los valores constantes para mejor mantenimiento
 */

// Opciones para tipos de viaje
export const TRIP_TYPES = [
  { value: '', label: 'Selecciona el tipo de viaje' },
  { value: 'aventura', label: '🏔️ Aventura y Naturaleza' },
  { value: 'cultural', label: '🏛️ Cultural e Historia' },
  { value: 'relajacion', label: '🏖️ Relajación y Playa' },
  { value: 'gastronomico', label: '🍽️ Gastronómico' },
  { value: 'familiar', label: '👨‍👩‍👧‍👦 Familiar' },
  { value: 'romantico', label: '💕 Romántico' },
  { value: 'negocios', label: '💼 Negocios' }
];

// Límites de validación
export const VALIDATION_LIMITS = {
  DESTINATION: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100
  },
  BUDGET: {
    MIN: 50,
    MAX: 100000
  },
  TRAVELERS: {
    MIN: 1,
    MAX: 20
  },
  TRIP_DURATION: {
    MAX_DAYS: 365
  }
};

// Mensajes de error
export const ERROR_MESSAGES = {
  DESTINATION: {
    REQUIRED: 'El destino es obligatorio',
    MIN_LENGTH: `El destino debe tener al menos ${VALIDATION_LIMITS.DESTINATION.MIN_LENGTH} caracteres`,
    MAX_LENGTH: `El destino no puede exceder ${VALIDATION_LIMITS.DESTINATION.MAX_LENGTH} caracteres`
  },
  START_DATE: {
    REQUIRED: 'La fecha de inicio es obligatoria',
    PAST_DATE: 'La fecha de inicio no puede ser en el pasado'
  },
  END_DATE: {
    REQUIRED: 'La fecha de fin es obligatoria',
    BEFORE_START: 'La fecha de fin debe ser posterior a la de inicio',
    TOO_LONG: `El viaje no puede durar más de ${VALIDATION_LIMITS.TRIP_DURATION.MAX_DAYS} días`
  },
  TRIP_TYPE: {
    REQUIRED: 'Selecciona un tipo de viaje'
  },
  BUDGET: {
    REQUIRED: 'Ingresa un presupuesto válido',
    MIN: `El presupuesto mínimo es $${VALIDATION_LIMITS.BUDGET.MIN} USD`,
    MAX: `El presupuesto máximo es $${VALIDATION_LIMITS.BUDGET.MAX.toLocaleString()} USD`
  },
  TRAVELERS: {
    REQUIRED: 'Debe haber al menos 1 viajero',
    MIN: `Debe haber al menos ${VALIDATION_LIMITS.TRAVELERS.MIN} viajero`,
    MAX: `Máximo ${VALIDATION_LIMITS.TRAVELERS.MAX} viajeros permitidos`
  }
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  ITINERARY_GENERATED: '¡Itinerario generado exitosamente! 🎉',
  FORM_SAVED: '✅ Formulario guardado correctamente'
};

// Mensajes de información
export const INFO_MESSAGES = {
  DURATION_AUTO_CALCULATED: 'Calculado automáticamente',
  DURATION_WILL_CALCULATE: 'Se calculará al seleccionar fechas',
  BUDGET_INCLUDES: 'Incluye alojamiento, comida, transporte y actividades',
  FORM_TIP: '💡 Tip: Completa todos los campos para obtener el mejor itinerario personalizado',
  NO_CHANGES_TO_CLEAR: 'No hay cambios para limpiar',
  CLEAR_FORM: 'Limpiar formulario'
};

// Estados iniciales
export const INITIAL_FORM_STATE = {
  destination: '',
  startDate: '',
  endDate: '',
  duration: '',
  tripType: '',
  budget: '',
  travelers: 1
};

// Configuración de la aplicación
export const APP_CONFIG = {
  FORM_SUBMISSION_DELAY: 1500, // ms para simular procesamiento
  MAX_RETRIES: 3,
  TIMEOUT: 10000 // 10 segundos
};

// Claves para localStorage (para futuro uso)
export const STORAGE_KEYS = {
  DRAFT_FORM: 'travel_form_draft',
  SAVED_ITINERARIES: 'saved_itineraries',
  USER_PREFERENCES: 'user_preferences'
}; 