import { useState } from 'react';
import {
  TRIP_TYPES,
  VALIDATION_LIMITS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  INITIAL_FORM_STATE,
  APP_CONFIG
} from '../utils/constants';

/**
 * Hook personalizado para manejar la lógica del formulario de viajes
 * Siguiendo principios de separación de responsabilidades
 */
export const useTravelForm = () => {
  // Estados del hook
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Manejar cambios en los inputs del formulario
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Calcular duración automáticamente si hay fechas
    if (name === 'startDate' || name === 'endDate') {
      calculateDuration(
        name === 'startDate' ? value : formData.startDate, 
        name === 'endDate' ? value : formData.endDate
      );
    }
  };

  /**
   * Calcular duración entre fechas automáticamente
   */
  const calculateDuration = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      setFormData(prev => ({
        ...prev,
        duration: diffDays
      }));
    }
  };

  /**
   * Validaciones del formulario
   * Retorna true si el formulario es válido
   */
  const validateForm = () => {
    const newErrors = {};

    // Validar destino
    if (!formData.destination.trim()) {
      newErrors.destination = ERROR_MESSAGES.DESTINATION.REQUIRED;
    } else if (formData.destination.trim().length < VALIDATION_LIMITS.DESTINATION.MIN_LENGTH) {
      newErrors.destination = ERROR_MESSAGES.DESTINATION.MIN_LENGTH;
    } else if (formData.destination.trim().length > VALIDATION_LIMITS.DESTINATION.MAX_LENGTH) {
      newErrors.destination = ERROR_MESSAGES.DESTINATION.MAX_LENGTH;
    }

    // Validar fechas
    if (!formData.startDate) {
      newErrors.startDate = ERROR_MESSAGES.START_DATE.REQUIRED;
    }

    if (!formData.endDate) {
      newErrors.endDate = ERROR_MESSAGES.END_DATE.REQUIRED;
    }

    // Validaciones adicionales de fechas
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (start < today) {
        newErrors.startDate = ERROR_MESSAGES.START_DATE.PAST_DATE;
      }

      if (end < start) {
        newErrors.endDate = ERROR_MESSAGES.END_DATE.BEFORE_START;
      }

      // Validar que el viaje no sea demasiado largo
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > VALIDATION_LIMITS.TRIP_DURATION.MAX_DAYS) {
        newErrors.endDate = ERROR_MESSAGES.END_DATE.TOO_LONG;
      }
    }

    // Validar tipo de viaje
    if (!formData.tripType) {
      newErrors.tripType = ERROR_MESSAGES.TRIP_TYPE.REQUIRED;
    }

    // Validar presupuesto
    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = ERROR_MESSAGES.BUDGET.REQUIRED;
    } else if (formData.budget < VALIDATION_LIMITS.BUDGET.MIN) {
      newErrors.budget = ERROR_MESSAGES.BUDGET.MIN;
    } else if (formData.budget > VALIDATION_LIMITS.BUDGET.MAX) {
      newErrors.budget = ERROR_MESSAGES.BUDGET.MAX;
    }

    // Validar número de viajeros
    if (!formData.travelers || formData.travelers < VALIDATION_LIMITS.TRAVELERS.MIN) {
      newErrors.travelers = ERROR_MESSAGES.TRAVELERS.MIN;
    } else if (formData.travelers > VALIDATION_LIMITS.TRAVELERS.MAX) {
      newErrors.travelers = ERROR_MESSAGES.TRAVELERS.MAX;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Manejar envío del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitMessage('');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simular procesamiento del formulario
      await new Promise(resolve => setTimeout(resolve, APP_CONFIG.FORM_SUBMISSION_DELAY));
      
      // Log para desarrollo
      console.log('Datos del viaje:', {
        ...formData,
        budget: `$${formData.budget} USD`,
        travelers: `${formData.travelers} ${formData.travelers === 1 ? 'persona' : 'personas'}`,
        tripTypeLabel: TRIP_TYPES.find(type => type.value === formData.tripType)?.label
      });
      
      setSubmitMessage(SUCCESS_MESSAGES.ITINERARY_GENERATED);
      
      // Aquí podrías llamar a una función callback para manejar los datos
      // onSubmitSuccess?.(formData);
      
    } catch (error) {
      console.error('Error al generar itinerario:', error);
      setSubmitMessage('Error al generar el itinerario. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Resetear formulario a estado inicial
   */
  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setSubmitMessage('');
  };

  /**
   * Obtener resumen del formulario para confirmación
   */
  const getFormSummary = () => {
    if (!formData.destination) return null;

    return {
      destination: formData.destination,
      dates: formData.startDate && formData.endDate 
        ? `${formData.startDate} - ${formData.endDate}` 
        : null,
      duration: formData.duration ? `${formData.duration} días` : null,
      tripType: TRIP_TYPES.find(type => type.value === formData.tripType)?.label || null,
      budget: formData.budget ? `$${formData.budget} USD` : null,
      travelers: formData.travelers ? `${formData.travelers} ${formData.travelers === 1 ? 'persona' : 'personas'}` : null
    };
  };

  /**
   * Verificar si el formulario tiene cambios
   */
  const hasChanges = JSON.stringify(formData) !== JSON.stringify(INITIAL_FORM_STATE);

  /**
   * Verificar si el formulario está completo
   */
  const isFormComplete = Boolean(
    formData.destination.trim() &&
    formData.startDate &&
    formData.endDate &&
    formData.tripType &&
    formData.budget &&
    formData.travelers
  );

  // Retornar todas las funciones y estados necesarios
  return {
    // Estados
    formData,
    errors,
    isSubmitting,
    submitMessage,
    tripTypes: TRIP_TYPES,
    
    // Funciones
    handleInputChange,
    handleSubmit,
    resetForm,
    validateForm,
    getFormSummary,
    
    // Utilidades
    isFormValid: Object.keys(errors).length === 0 && isFormComplete,
    hasChanges,
    isFormComplete
  };
}; 