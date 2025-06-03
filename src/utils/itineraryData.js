/**
 * Base de datos de actividades para generación de itinerarios
 * Organizada por tipo de viaje y rangos de presupuesto
 */

// Rangos de presupuesto para clasificar actividades
export const BUDGET_RANGES = {
  LOW: { min: 50, max: 500, label: 'Económico' },
  MEDIUM: { min: 501, max: 1500, label: 'Moderado' },
  HIGH: { min: 1501, max: 5000, label: 'Confortable' },
  LUXURY: { min: 5001, max: 100000, label: 'Lujo' }
};

// Actividades base por tipo de viaje
export const ACTIVITIES_BY_TYPE = {
  aventura: {
    name: 'Aventura y Naturaleza',
    icon: '🏔️',
    activities: {
      morning: [
        { name: 'Senderismo en montañas', duration: '3-4 horas', cost: 'low', description: 'Explorar senderos naturales y vistas panorámicas' },
        { name: 'Ciclismo de montaña', duration: '2-3 horas', cost: 'medium', description: 'Recorridos en bicicleta por terrenos desafiantes' },
        { name: 'Escalada en roca', duration: '4-5 horas', cost: 'high', description: 'Escalada con instructor profesional y equipo incluido' },
        { name: 'Parapente', duration: '2-3 horas', cost: 'luxury', description: 'Vuelo en parapente con instructor certificado' },
        { name: 'Rafting', duration: '3-4 horas', cost: 'medium', description: 'Descenso de rápidos con equipo profesional' }
      ],
      afternoon: [
        { name: 'Paseo en kayak', duration: '2-3 horas', cost: 'medium', description: 'Navegación en kayak por lagos o ríos tranquilos' },
        { name: 'Observación de fauna', duration: '3-4 horas', cost: 'low', description: 'Safari fotográfico para observar vida silvestre' },
        { name: 'Tirolesa', duration: '1-2 horas', cost: 'medium', description: 'Adrenalina pura deslizándose por tirolesas' },
        { name: 'Caminata nocturna', duration: '2-3 horas', cost: 'low', description: 'Exploración nocturna de la naturaleza' }
      ],
      evening: [
        { name: 'Camping bajo las estrellas', duration: 'Noche completa', cost: 'low', description: 'Acampada con vista a las estrellas' },
        { name: 'Fogata y asado', duration: '2-3 horas', cost: 'medium', description: 'Cena alrededor de una fogata en la naturaleza' },
        { name: 'Observatorio astronómico', duration: '2-3 horas', cost: 'high', description: 'Sesión de astronomía con telescopios profesionales' }
      ]
    },
    accommodation: {
      low: ['Camping', 'Hostales de montaña', 'Cabañas compartidas'],
      medium: ['Lodges ecológicos', 'Cabañas privadas', 'Hoteles rurales'],
      high: ['Resorts de aventura', 'Glamping luxury', 'Lodges premium'],
      luxury: ['Resorts 5 estrellas en naturaleza', 'Villas privadas', 'Experiencias exclusivas']
    }
  },

  cultural: {
    name: 'Cultural e Historia',
    icon: '🏛️',
    activities: {
      morning: [
        { name: 'Tour por museos principales', duration: '3-4 horas', cost: 'low', description: 'Visita a los museos más importantes de la ciudad' },
        { name: 'Recorrido arquitectónico', duration: '2-3 horas', cost: 'medium', description: 'Tour guiado por monumentos y arquitectura histórica' },
        { name: 'Clase de cocina tradicional', duration: '3-4 horas', cost: 'high', description: 'Aprende a cocinar platos típicos con chef local' },
        { name: 'Tour privado con historiador', duration: '4-5 horas', cost: 'luxury', description: 'Experiencia exclusiva con experto en historia local' }
      ],
      afternoon: [
        { name: 'Visita a mercados tradicionales', duration: '2-3 horas', cost: 'low', description: 'Exploración de mercados locales y artesanías' },
        { name: 'Tour de arte callejero', duration: '2-3 horas', cost: 'medium', description: 'Descubre el arte urbano y grafitis con significado' },
        { name: 'Taller de artesanías locales', duration: '3-4 horas', cost: 'high', description: 'Crea tus propias piezas con artesanos locales' },
        { name: 'Experiencia arqueológica', duration: '4-5 horas', cost: 'luxury', description: 'Acceso exclusivo a sitios arqueológicos' }
      ],
      evening: [
        { name: 'Espectáculo folclórico', duration: '2-3 horas', cost: 'medium', description: 'Show de danzas y música tradicional' },
        { name: 'Cena en restaurante histórico', duration: '2-3 horas', cost: 'high', description: 'Experiencia gastronómica en lugar emblemático' },
        { name: 'Opera o concierto clásico', duration: '3-4 horas', cost: 'luxury', description: 'Espectáculo en teatro histórico' }
      ]
    },
    accommodation: {
      low: ['Hostales en centro histórico', 'Pensiones familiares', 'Albergues culturales'],
      medium: ['Hoteles boutique', 'Casas coloniales', 'B&B históricos'],
      high: ['Hoteles en edificios históricos', 'Palacios convertidos', 'Hoteles de diseño'],
      luxury: ['Palacios históricos', 'Casas señoriales', 'Experiencias palaciegas']
    }
  },

  relajacion: {
    name: 'Relajación y Playa',
    icon: '🏖️',
    activities: {
      morning: [
        { name: 'Yoga en la playa', duration: '1-2 horas', cost: 'low', description: 'Sesión de yoga con vista al mar' },
        { name: 'Masaje relajante', duration: '1-2 horas', cost: 'medium', description: 'Terapia de relajación con aceites naturales' },
        { name: 'Spa de día completo', duration: '4-6 horas', cost: 'high', description: 'Tratamientos completos de relajación y belleza' },
        { name: 'Retiro de bienestar', duration: 'Día completo', cost: 'luxury', description: 'Experiencia holística de bienestar y relajación' }
      ],
      afternoon: [
        { name: 'Descanso en playa', duration: '3-4 horas', cost: 'low', description: 'Relajación en la arena con hamacas y sombrillas' },
        { name: 'Piscina infinity', duration: '2-3 horas', cost: 'medium', description: 'Relajación en piscinas con vista panorámica' },
        { name: 'Jacuzzi y sauna', duration: '2-3 horas', cost: 'high', description: 'Terapias de agua y calor' },
        { name: 'Villa privada con piscina', duration: 'Medio día', cost: 'luxury', description: 'Espacio privado exclusivo para relajación' }
      ],
      evening: [
        { name: 'Cena en la playa', duration: '2-3 horas', cost: 'medium', description: 'Cena romántica con pies en la arena' },
        { name: 'Atardecer en catamarán', duration: '2-3 horas', cost: 'high', description: 'Navegación al atardecer con cóctel incluido' },
        { name: 'Cena privada en terraza', duration: '2-3 horas', cost: 'luxury', description: 'Chef privado y vista exclusiva al mar' }
      ]
    },
    accommodation: {
      low: ['Hostales cerca de playa', 'Cabañas playeras', 'Camping frente al mar'],
      medium: ['Hoteles boutique playa', 'Resorts todo incluido', 'Bungalows privados'],
      high: ['Resorts de lujo', 'Villas con piscina', 'Spas resort'],
      luxury: ['Resorts 5 estrellas', 'Villas privadas frente al mar', 'Experiencias exclusivas']
    }
  },

  gastronomico: {
    name: 'Gastronómico',
    icon: '🍽️',
    activities: {
      morning: [
        { name: 'Tour de desayunos locales', duration: '2-3 horas', cost: 'low', description: 'Recorrido probando desayunos tradicionales' },
        { name: 'Mercado gastronómico', duration: '2-3 horas', cost: 'medium', description: 'Exploración de mercados con degustaciones' },
        { name: 'Clase magistral de cocina', duration: '4-5 horas', cost: 'high', description: 'Taller con chef reconocido' },
        { name: 'Experiencia con chef Michelin', duration: '5-6 horas', cost: 'luxury', description: 'Clase privada con chef estrella Michelin' }
      ],
      afternoon: [
        { name: 'Food truck tour', duration: '3-4 horas', cost: 'low', description: 'Recorrido por los mejores food trucks locales' },
        { name: 'Cata de vinos', duration: '2-3 horas', cost: 'medium', description: 'Degustación de vinos locales con maridaje' },
        { name: 'Restaurante con estrella', duration: '2-3 horas', cost: 'high', description: 'Almuerzo en restaurante galardonado' },
        { name: 'Cena de degustación', duration: '3-4 horas', cost: 'luxury', description: 'Menú degustación de alta cocina' }
      ],
      evening: [
        { name: 'Bar de tapas tradicional', duration: '2-3 horas', cost: 'medium', description: 'Recorrido por bares típicos locales' },
        { name: 'Cena maridaje', duration: '3-4 horas', cost: 'high', description: 'Cena con maridaje de vinos premium' },
        { name: 'Mesa del chef privada', duration: '3-4 horas', cost: 'luxury', description: 'Experiencia exclusiva en mesa del chef' }
      ]
    },
    accommodation: {
      low: ['Hostales en zona gastronómica', 'B&B con desayuno gourmet', 'Casas de comida'],
      medium: ['Hoteles gastronómicos', 'Posadas gourmet', 'Hoteles con restaurante'],
      high: ['Hoteles con chef reconocido', 'Resorts gastronómicos', 'Experiencias culinarias'],
      luxury: ['Hoteles Michelin', 'Experiencias gastronómicas exclusivas', 'Resorts de alta cocina']
    }
  },

  familiar: {
    name: 'Familiar',
    icon: '👨‍👩‍👧‍👦',
    activities: {
      morning: [
        { name: 'Parque de diversiones', duration: '4-5 horas', cost: 'medium', description: 'Día completo en parque temático familiar' },
        { name: 'Zoológico interactivo', duration: '3-4 horas', cost: 'low', description: 'Visita al zoológico con actividades para niños' },
        { name: 'Acuario gigante', duration: '2-3 horas', cost: 'medium', description: 'Exploración del mundo marino' },
        { name: 'Parque de aventuras', duration: '4-5 horas', cost: 'high', description: 'Actividades de aventura aptas para toda la familia' }
      ],
      afternoon: [
        { name: 'Playa familiar', duration: '3-4 horas', cost: 'low', description: 'Tarde de playa con actividades para niños' },
        { name: 'Mini golf', duration: '1-2 horas', cost: 'low', description: 'Diversión familiar en campo de mini golf' },
        { name: 'Karting familiar', duration: '1-2 horas', cost: 'medium', description: 'Carreras de karts para toda la familia' },
        { name: 'Parque acuático', duration: '4-5 horas', cost: 'high', description: 'Diversión acuática con toboganes y piscinas' }
      ],
      evening: [
        { name: 'Cine familiar', duration: '2-3 horas', cost: 'low', description: 'Película apta para toda la familia' },
        { name: 'Espectáculo infantil', duration: '1-2 horas', cost: 'medium', description: 'Show diseñado especialmente para niños' },
        { name: 'Cena temática familiar', duration: '2-3 horas', cost: 'high', description: 'Restaurante con entretenimiento para niños' }
      ]
    },
    accommodation: {
      low: ['Hostales familiares', 'Apartamentos con cocina', 'Campings familiares'],
      medium: ['Hoteles familiares', 'Resorts con kids club', 'Villas familiares'],
      high: ['Resorts todo incluido familiar', 'Hoteles con parque acuático', 'Villas premium'],
      luxury: ['Resorts familiares de lujo', 'Villas privadas con staff', 'Experiencias familiares exclusivas']
    }
  },

  romantico: {
    name: 'Romántico',
    icon: '💕',
    activities: {
      morning: [
        { name: 'Desayuno en la cama', duration: '1-2 horas', cost: 'medium', description: 'Desayuno servido en la habitación con vista' },
        { name: 'Paseo en globo', duration: '3-4 horas', cost: 'luxury', description: 'Vuelo romántico en globo aerostático' },
        { name: 'Spa para parejas', duration: '2-3 horas', cost: 'high', description: 'Tratamientos de relajación en pareja' },
        { name: 'Paseo a caballo', duration: '2-3 horas', cost: 'medium', description: 'Cabalgata romántica por paisajes hermosos' }
      ],
      afternoon: [
        { name: 'Picnic romántico', duration: '2-3 horas', cost: 'low', description: 'Almuerzo al aire libre en lugar pintoresco' },
        { name: 'Paseo en góndola', duration: '1-2 horas', cost: 'high', description: 'Navegación romántica en góndola o bote' },
        { name: 'Cata de vinos privada', duration: '2-3 horas', cost: 'luxury', description: 'Degustación exclusiva en viñedo' },
        { name: 'Sesión de fotos románticas', duration: '2-3 horas', cost: 'medium', description: 'Sesión fotográfica profesional en locaciones románticas' }
      ],
      evening: [
        { name: 'Cena a la luz de velas', duration: '2-3 horas', cost: 'high', description: 'Cena íntima en restaurante romántico' },
        { name: 'Atardecer en mirador', duration: '1-2 horas', cost: 'low', description: 'Vista romántica del atardecer desde punto panorámico' },
        { name: 'Espectáculo de danza', duration: '2-3 horas', cost: 'medium', description: 'Show romántico de baile o música' },
        { name: 'Cena privada en terraza', duration: '3-4 horas', cost: 'luxury', description: 'Chef privado y ambiente exclusivo' }
      ]
    },
    accommodation: {
      low: ['B&B románticos', 'Hostales con habitaciones privadas', 'Cabañas románticas'],
      medium: ['Hoteles boutique románticos', 'Posadas con encanto', 'Suites con jacuzzi'],
      high: ['Resorts románticos', 'Villas privadas', 'Hoteles con spa'],
      luxury: ['Suites presidenciales', 'Villas privadas de lujo', 'Experiencias románticas exclusivas']
    }
  },

  negocios: {
    name: 'Negocios',
    icon: '💼',
    activities: {
      morning: [
        { name: 'Sala de conferencias', duration: '4-6 horas', cost: 'medium', description: 'Espacio profesional para reuniones de negocios' },
        { name: 'Tour de distrito financiero', duration: '2-3 horas', cost: 'low', description: 'Recorrido por zona de negocios y corporativa' },
        { name: 'Networking breakfast', duration: '2-3 horas', cost: 'high', description: 'Desayuno de networking con empresarios locales' },
        { name: 'Oficina ejecutiva temporal', duration: 'Día completo', cost: 'luxury', description: 'Espacio de trabajo premium con servicios ejecutivos' }
      ],
      afternoon: [
        { name: 'Almuerzo de negocios', duration: '1-2 horas', cost: 'medium', description: 'Comida en restaurante ejecutivo' },
        { name: 'Club empresarial', duration: '2-3 horas', cost: 'high', description: 'Acceso a club exclusivo de negocios' },
        { name: 'Tour de innovación', duration: '3-4 horas', cost: 'high', description: 'Visita a centros de innovación y startups' },
        { name: 'Consultoría privada', duration: '2-4 horas', cost: 'luxury', description: 'Sesión con expertos en negocios locales' }
      ],
      evening: [
        { name: 'Evento de networking', duration: '2-3 horas', cost: 'medium', description: 'Cóctel de networking empresarial' },
        { name: 'Cena ejecutiva', duration: '2-3 horas', cost: 'high', description: 'Cena de negocios en restaurante premium' },
        { name: 'Club nocturno ejecutivo', duration: '2-3 horas', cost: 'luxury', description: 'Entretenimiento nocturno en club exclusivo' }
      ]
    },
    accommodation: {
      low: ['Hoteles de negocios básicos', 'Aparthoteles', 'Hostales ejecutivos'],
      medium: ['Hoteles ejecutivos', 'Business hotels', 'Suites ejecutivas'],
      high: ['Hoteles 5 estrellas business', 'Resorts ejecutivos', 'Suites premium'],
      luxury: ['Hoteles de lujo ejecutivos', 'Penthouses', 'Experiencias VIP']
    }
  }
};

// Funciones auxiliares para determinar categoría de presupuesto
export const getBudgetCategory = (budget) => {
  if (budget <= BUDGET_RANGES.LOW.max) return 'low';
  if (budget <= BUDGET_RANGES.MEDIUM.max) return 'medium';
  if (budget <= BUDGET_RANGES.HIGH.max) return 'high';
  return 'luxury';
};

// Obtener actividades por presupuesto
export const getActivitiesByBudget = (tripType, budgetCategory) => {
  const typeData = ACTIVITIES_BY_TYPE[tripType];
  if (!typeData) return { morning: [], afternoon: [], evening: [] };

  const filterByBudget = (activities) => {
    const budgetOrder = ['low', 'medium', 'high', 'luxury'];
    const maxBudgetIndex = budgetOrder.indexOf(budgetCategory);
    
    return activities.filter(activity => 
      budgetOrder.indexOf(activity.cost) <= maxBudgetIndex
    );
  };

  return {
    morning: filterByBudget(typeData.activities.morning),
    afternoon: filterByBudget(typeData.activities.afternoon),
    evening: filterByBudget(typeData.activities.evening)
  };
};

// Obtener opciones de alojamiento por presupuesto
export const getAccommodationByBudget = (tripType, budgetCategory) => {
  const typeData = ACTIVITIES_BY_TYPE[tripType];
  if (!typeData) return [];

  const budgetOrder = ['low', 'medium', 'high', 'luxury'];
  const maxBudgetIndex = budgetOrder.indexOf(budgetCategory);
  
  let accommodations = [];
  for (let i = 0; i <= maxBudgetIndex; i++) {
    const level = budgetOrder[i];
    if (typeData.accommodation[level]) {
      accommodations = [...accommodations, ...typeData.accommodation[level]];
    }
  }
  
  return accommodations;
}; 