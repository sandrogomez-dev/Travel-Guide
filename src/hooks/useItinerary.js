/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import {
  ACTIVITIES_BY_TYPE,
  getBudgetCategory,
  getActivitiesByBudget,
  getAccommodationByBudget,
  BUDGET_RANGES
} from '../utils/itineraryData';
import { STORAGE_KEYS, APP_CONFIG } from '../utils/constants';

/**
 * Hook personalizado para manejar la generación y gestión de itinerarios
 * Siguiendo principios de separación de responsabilidades
 */
export const useItinerary = () => {
  // Estados del hook
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [savedItineraries, setSavedItineraries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_ITINERARIES);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading saved itineraries:', error);
      return [];
    }
  });

  /**
   * Algoritmo principal de generación de itinerarios
   * Crea un itinerario personalizado basado en los datos del formulario
   */
  const generateItinerary = useCallback(async (formData) => {
    setIsGenerating(true);
    setGenerationError('');

    try {
      // Simular tiempo de procesamiento
      await new Promise(resolve => setTimeout(resolve, APP_CONFIG.FORM_SUBMISSION_DELAY));

      const { destination, tripType, budget, duration, travelers, startDate, endDate } = formData;
      
      // Determinar categoría de presupuesto
      const budgetCategory = getBudgetCategory(parseInt(budget));
      const budgetInfo = Object.values(BUDGET_RANGES).find(range => 
        parseInt(budget) >= range.min && parseInt(budget) <= range.max
      );

      // Obtener datos del tipo de viaje
      const tripTypeData = ACTIVITIES_BY_TYPE[tripType];
      if (!tripTypeData) {
        throw new Error('Tipo de viaje no válido');
      }

      // Obtener actividades filtradas por presupuesto
      const availableActivities = getActivitiesByBudget(tripType, budgetCategory);
      
      // Obtener opciones de alojamiento
      const accommodationOptions = getAccommodationByBudget(tripType, budgetCategory);

      // Generar itinerario día por día
      const dailyItinerary = generateDailyActivities(
        parseInt(duration), 
        availableActivities, 
        parseInt(travelers)
      );

      // Calcular costos estimados
      const estimatedCosts = calculateEstimatedCosts(
        dailyItinerary, 
        accommodationOptions, 
        parseInt(duration), 
        parseInt(travelers), 
        budgetCategory
      );

      // Crear objeto de itinerario completo
      const itinerary = {
        id: generateItineraryId(),
        createdAt: new Date().toISOString(),
        formData,
        tripInfo: {
          destination,
          startDate,
          endDate,
          duration: parseInt(duration),
          travelers: parseInt(travelers),
          tripType: {
            key: tripType,
            name: tripTypeData.name,
            icon: tripTypeData.icon
          },
          budget: {
            amount: parseInt(budget),
            category: budgetCategory,
            label: budgetInfo?.label || 'Personalizado'
          }
        },
        dailyItinerary,
        accommodation: {
          options: accommodationOptions,
          recommended: accommodationOptions[Math.floor(Math.random() * accommodationOptions.length)]
        },
        estimatedCosts,
        summary: generateItinerarySummary(dailyItinerary, tripTypeData, parseInt(duration))
      };

      setCurrentItinerary(itinerary);
      return itinerary;

    } catch (error) {
      console.error('Error generating itinerary:', error);
      setGenerationError('Error al generar el itinerario. Por favor, inténtalo de nuevo.');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Generar actividades día por día
   */
  const generateDailyActivities = (duration, availableActivities, travelers) => {
    const days = [];
    
    for (let dayNumber = 1; dayNumber <= duration; dayNumber++) {
      const dayActivities = {
        day: dayNumber,
        date: null, // Se calculará después si es necesario
        morning: selectRandomActivity(availableActivities.morning),
        afternoon: selectRandomActivity(availableActivities.afternoon),
        evening: selectRandomActivity(availableActivities.evening)
      };

      // Agregar variación para días múltiples
      if (duration > 1) {
        dayActivities.morning = selectVariedActivity(availableActivities.morning, days);
        dayActivities.afternoon = selectVariedActivity(availableActivities.afternoon, days);
        dayActivities.evening = selectVariedActivity(availableActivities.evening, days);
      }

      days.push(dayActivities);
    }

    return days;
  };

  /**
   * Seleccionar actividad aleatoria
   */
  const selectRandomActivity = (activities) => {
    if (!activities || activities.length === 0) return null;
    return activities[Math.floor(Math.random() * activities.length)];
  };

  /**
   * Seleccionar actividad variada (evita repeticiones)
   */
  const selectVariedActivity = (activities, previousDays) => {
    if (!activities || activities.length === 0) return null;
    
    const usedActivities = previousDays.flatMap(day => [
      day.morning?.name,
      day.afternoon?.name,
      day.evening?.name
    ]).filter(Boolean);

    const unusedActivities = activities.filter(activity => 
      !usedActivities.includes(activity.name)
    );

    return unusedActivities.length > 0 
      ? unusedActivities[Math.floor(Math.random() * unusedActivities.length)]
      : activities[Math.floor(Math.random() * activities.length)];
  };

  /**
   * Calcular costos estimados del itinerario
   */
  const calculateEstimatedCosts = (dailyItinerary, accommodationOptions, duration, travelers, budgetCategory) => {
    const baseCosts = {
      low: { perDay: 30, accommodation: 25 },
      medium: { perDay: 75, accommodation: 80 },
      high: { perDay: 150, accommodation: 200 },
      luxury: { perDay: 400, accommodation: 500 }
    };

    const costs = baseCosts[budgetCategory] || baseCosts.medium;
    
    const activitiesCost = dailyItinerary.length * costs.perDay * travelers;
    const accommodationCost = duration * costs.accommodation;
    const transportCost = Math.min(duration * 20 * travelers, 200); // Transporte local
    const foodCost = duration * 40 * travelers; // Comidas no incluidas

    const total = activitiesCost + accommodationCost + transportCost + foodCost;

    return {
      activities: activitiesCost,
      accommodation: accommodationCost,
      transport: transportCost,
      food: foodCost,
      total,
      perPerson: Math.round(total / travelers),
      breakdown: {
        activitiesPerDay: costs.perDay,
        accommodationPerNight: costs.accommodation,
        transportPerDay: 20,
        foodPerDay: 40
      }
    };
  };

  /**
   * Generar resumen del itinerario
   */
  const generateItinerarySummary = (dailyItinerary, tripTypeData, duration) => {
    const totalActivities = dailyItinerary.reduce((count, day) => {
      return count + (day.morning ? 1 : 0) + (day.afternoon ? 1 : 0) + (day.evening ? 1 : 0);
    }, 0);

    const activityTypes = [...new Set(
      dailyItinerary.flatMap(day => [
        day.morning?.cost,
        day.afternoon?.cost,
        day.evening?.cost
      ]).filter(Boolean)
    )];

    return {
      totalDays: duration,
      totalActivities,
      activityVariety: activityTypes.length,
      highlights: [
        `${duration} ${duration === 1 ? 'día' : 'días'} de experiencias ${tripTypeData.name.toLowerCase()}`,
        `${totalActivities} actividades cuidadosamente seleccionadas`,
        `Actividades para ${activityTypes.join(', ')} presupuesto`,
        'Alojamiento recomendado incluido'
      ]
    };
  };

  /**
   * Generar ID único para el itinerario
   */
  const generateItineraryId = () => {
    return `itinerary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  /**
   * Guardar itinerario en localStorage
   */
  const saveItinerary = useCallback((itinerary, customName = null) => {
    try {
      const itineraryToSave = {
        ...itinerary,
        savedAt: new Date().toISOString(),
        customName: customName || `Viaje a ${itinerary.tripInfo.destination}`
      };

      const updatedSaved = [...savedItineraries, itineraryToSave];
      setSavedItineraries(updatedSaved);
      localStorage.setItem(STORAGE_KEYS.SAVED_ITINERARIES, JSON.stringify(updatedSaved));
      
      return true;
    } catch (error) {
      console.error('Error saving itinerary:', error);
      return false;
    }
  }, [savedItineraries]);

  /**
   * Eliminar itinerario guardado
   */
  const deleteItinerary = useCallback((itineraryId) => {
    try {
      const updatedSaved = savedItineraries.filter(item => item.id !== itineraryId);
      setSavedItineraries(updatedSaved);
      localStorage.setItem(STORAGE_KEYS.SAVED_ITINERARIES, JSON.stringify(updatedSaved));
      return true;
    } catch (error) {
      console.error('Error deleting itinerary:', error);
      return false;
    }
  }, [savedItineraries]);

  /**
   * Cargar itinerario guardado
   */
  const loadItinerary = useCallback((itineraryId) => {
    const itinerary = savedItineraries.find(item => item.id === itineraryId);
    if (itinerary) {
      setCurrentItinerary(itinerary);
      return itinerary;
    }
    return null;
  }, [savedItineraries]);

  /**
   * Limpiar itinerario actual
   */
  const clearCurrentItinerary = useCallback(() => {
    setCurrentItinerary(null);
    setGenerationError('');
  }, []);

  /**
   * Obtener estadísticas de itinerarios guardados
   */
  const getItineraryStats = useCallback(() => {
    const totalSaved = savedItineraries.length;
    const tripTypes = [...new Set(savedItineraries.map(item => item.tripInfo.tripType.key))];
    const destinations = [...new Set(savedItineraries.map(item => item.tripInfo.destination))];
    
    return {
      totalSaved,
      uniqueTripTypes: tripTypes.length,
      uniqueDestinations: destinations.length,
      mostPopularType: tripTypes.length > 0 ? tripTypes[0] : null,
      averageDuration: totalSaved > 0 
        ? Math.round(savedItineraries.reduce((sum, item) => sum + item.tripInfo.duration, 0) / totalSaved)
        : 0
    };
  }, [savedItineraries]);

  // Retornar todas las funciones y estados necesarios
  return {
    // Estados
    currentItinerary,
    isGenerating,
    generationError,
    savedItineraries,
    
    // Funciones principales
    generateItinerary,
    saveItinerary,
    deleteItinerary,
    loadItinerary,
    clearCurrentItinerary,
    
    // Utilidades
    getItineraryStats,
    hasCurrentItinerary: !!currentItinerary,
    hasSavedItineraries: savedItineraries.length > 0
  };
}; 