import React from 'react';

/**
 * Componente optimizado para exportar a PDF
 * Diseño limpio y profesional para impresión
 */
const PDFPreview = ({ itinerary, isVisible = false }) => {
  if (!itinerary) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const pdfStyles = {
    container: {
      position: isVisible ? 'static' : 'absolute',
      left: isVisible ? 'auto' : '-9999px',
      top: isVisible ? 'auto' : '-9999px',
      width: '210mm', // A4 width
      minHeight: '297mm', // A4 height
      padding: '20mm',
      backgroundColor: 'white',
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      lineHeight: '1.4',
      color: '#333',
      boxSizing: 'border-box'
    },
    header: {
      borderBottom: '3px solid #38B2AC',
      paddingBottom: '15px',
      marginBottom: '30px'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#38B2AC',
      margin: '0 0 10px 0'
    },
    subtitle: {
      fontSize: '14px',
      color: '#666',
      margin: '0'
    },
    section: {
      marginBottom: '25px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2D3748',
      marginBottom: '15px',
      borderBottom: '1px solid #E2E8F0',
      paddingBottom: '5px'
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginBottom: '20px'
    },
    infoItem: {
      marginBottom: '8px'
    },
    label: {
      fontWeight: 'bold',
      color: '#4A5568'
    },
    dayCard: {
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '20px',
      pageBreakInside: 'avoid'
    },
    dayHeader: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2D3748',
      marginBottom: '15px',
      padding: '8px 12px',
      backgroundColor: '#F7FAFC',
      borderRadius: '4px'
    },
    timeSlot: {
      marginBottom: '12px',
      paddingLeft: '15px'
    },
    timePeriod: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#38B2AC',
      marginBottom: '5px'
    },
    activityName: {
      fontSize: '13px',
      fontWeight: 'bold',
      marginBottom: '3px'
    },
    activityDescription: {
      fontSize: '11px',
      color: '#666',
      lineHeight: '1.3'
    },
    accommodationSection: {
      backgroundColor: '#F7FAFC',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '20px'
    },
    costsSection: {
      backgroundColor: '#FFF5F5',
      padding: '15px',
      borderRadius: '8px',
      border: '1px solid #FED7D7'
    },
    costItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px'
    },
    totalCost: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#C53030',
      borderTop: '1px solid #E2E8F0',
      paddingTop: '10px',
      marginTop: '10px'
    },
    footer: {
      borderTop: '1px solid #E2E8F0',
      paddingTop: '15px',
      marginTop: '40px',
      textAlign: 'center',
      fontSize: '10px',
      color: '#A0AEC0'
    }
  };

  return (
    <div id="pdf-content" style={pdfStyles.container}>
      {/* Header */}
      <div style={pdfStyles.header}>
        <h1 style={pdfStyles.title}>Mi Itinerario de Viaje</h1>
        <p style={pdfStyles.subtitle}>
          Generado el {new Date().toLocaleDateString('es-ES')} | Travel Guide Premium
        </p>
      </div>

      {/* Información del viaje */}
      <div style={pdfStyles.section}>
        <h2 style={pdfStyles.sectionTitle}>Información del Viaje</h2>
        <div style={pdfStyles.infoGrid}>
          <div>
            <div style={pdfStyles.infoItem}>
              <span style={pdfStyles.label}>Destino: </span>
              {itinerary.tripInfo.destination}
            </div>
            <div style={pdfStyles.infoItem}>
              <span style={pdfStyles.label}>Tipo de viaje: </span>
              {itinerary.tripInfo.tripType.name}
            </div>
            <div style={pdfStyles.infoItem}>
              <span style={pdfStyles.label}>Viajeros: </span>
              {itinerary.tripInfo.travelers} {itinerary.tripInfo.travelers === 1 ? 'persona' : 'personas'}
            </div>
          </div>
          <div>
            <div style={pdfStyles.infoItem}>
              <span style={pdfStyles.label}>Fecha inicio: </span>
              {formatDate(itinerary.tripInfo.startDate)}
            </div>
            <div style={pdfStyles.infoItem}>
              <span style={pdfStyles.label}>Fecha fin: </span>
              {formatDate(itinerary.tripInfo.endDate)}
            </div>
            <div style={pdfStyles.infoItem}>
              <span style={pdfStyles.label}>Duración: </span>
              {itinerary.tripInfo.duration} {itinerary.tripInfo.duration === 1 ? 'día' : 'días'}
            </div>
          </div>
        </div>
      </div>

      {/* Itinerario día por día */}
      <div style={pdfStyles.section}>
        <h2 style={pdfStyles.sectionTitle}>Itinerario Detallado</h2>
        {itinerary.dailyItinerary.map((day, index) => (
          <div key={day.day} style={pdfStyles.dayCard}>
            <div style={pdfStyles.dayHeader}>
              Día {day.day}
            </div>
            
            {/* Mañana */}
            {day.morning && (
              <div style={pdfStyles.timeSlot}>
                <div style={pdfStyles.timePeriod}>🌅 Mañana</div>
                <div style={pdfStyles.activityName}>{day.morning.name}</div>
                <div style={pdfStyles.activityDescription}>{day.morning.description}</div>
              </div>
            )}

            {/* Tarde */}
            {day.afternoon && (
              <div style={pdfStyles.timeSlot}>
                <div style={pdfStyles.timePeriod}>☀️ Tarde</div>
                <div style={pdfStyles.activityName}>{day.afternoon.name}</div>
                <div style={pdfStyles.activityDescription}>{day.afternoon.description}</div>
              </div>
            )}

            {/* Noche */}
            {day.evening && (
              <div style={pdfStyles.timeSlot}>
                <div style={pdfStyles.timePeriod}>🌙 Noche</div>
                <div style={pdfStyles.activityName}>{day.evening.name}</div>
                <div style={pdfStyles.activityDescription}>{day.evening.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Alojamiento */}
      <div style={pdfStyles.section}>
        <h2 style={pdfStyles.sectionTitle}>Alojamiento</h2>
        <div style={pdfStyles.accommodationSection}>
          <div style={pdfStyles.infoItem}>
            <span style={pdfStyles.label}>Recomendado: </span>
            {itinerary.accommodation.recommended}
          </div>
          <div style={pdfStyles.infoItem}>
            <span style={pdfStyles.label}>Categoría: </span>
            {itinerary.tripInfo.budget.label}
          </div>
          {itinerary.accommodation.options.length > 1 && (
            <div style={pdfStyles.infoItem}>
              <span style={pdfStyles.label}>Otras opciones: </span>
              {itinerary.accommodation.options
                .filter(option => option !== itinerary.accommodation.recommended)
                .slice(0, 3)
                .join(', ')}
            </div>
          )}
        </div>
      </div>

      {/* Costos */}
      <div style={pdfStyles.section}>
        <h2 style={pdfStyles.sectionTitle}>Resumen de Costos</h2>
        <div style={pdfStyles.costsSection}>
          <div style={pdfStyles.costItem}>
            <span>Actividades:</span>
            <span>${itinerary.estimatedCosts.activities.toLocaleString()} USD</span>
          </div>
          <div style={pdfStyles.costItem}>
            <span>Alojamiento:</span>
            <span>${itinerary.estimatedCosts.accommodation.toLocaleString()} USD</span>
          </div>
          <div style={pdfStyles.costItem}>
            <span>Transporte:</span>
            <span>${itinerary.estimatedCosts.transport.toLocaleString()} USD</span>
          </div>
          <div style={pdfStyles.costItem}>
            <span>Comidas:</span>
            <span>${itinerary.estimatedCosts.food.toLocaleString()} USD</span>
          </div>
          <div style={{...pdfStyles.costItem, ...pdfStyles.totalCost}}>
            <span>Total:</span>
            <span>${itinerary.estimatedCosts.total.toLocaleString()} USD</span>
          </div>
          <div style={pdfStyles.costItem}>
            <span>Por persona:</span>
            <span>${itinerary.estimatedCosts.perPerson.toLocaleString()} USD</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={pdfStyles.footer}>
        <p>
          Este itinerario ha sido generado por Travel Guide - Tu planificador de viajes premium
        </p>
        <p>
          Para más información y nuevos itinerarios, visita nuestro sitio web
        </p>
      </div>
    </div>
  );
};

export default PDFPreview; 