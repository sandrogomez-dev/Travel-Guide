import React, { useState } from 'react';
import { Card, Button, Row, Col, Badge, Accordion, Alert, Modal, Form } from 'react-bootstrap';

/**
 * Componente para mostrar itinerarios generados
 * Presenta la información de manera clara y organizada
 */
const ItineraryDisplay = ({ 
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

  // Si está generando, mostrar spinner
  if (isGenerating) {
    return (
      <div className="container py-4">
        <Card className="shadow-lg border-0 text-center">
          <Card.Body className="py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Generando...</span>
            </div>
            <h4 className="text-primary">🧭 Creando tu itinerario perfecto</h4>
            <p className="text-muted">
              Estamos seleccionando las mejores actividades para tu viaje...
            </p>
          </Card.Body>
        </Card>
      </div>
    );
  }

  // Si hay error, mostrarlo
  if (generationError) {
    return (
      <div className="container py-4">
        <Alert variant="danger" className="text-center">
          <h5>❌ {generationError}</h5>
          <Button variant="outline-danger" onClick={onGenerateNew} className="mt-2">
            Intentar de nuevo
          </Button>
        </Alert>
      </div>
    );
  }

  // Si no hay itinerario, no mostrar nada
  if (!itinerary) {
    return null;
  }

  const { tripInfo, dailyItinerary, accommodation, estimatedCosts, summary } = itinerary;

  /**
   * Formatear fecha para mostrar
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  /**
   * Obtener color de badge por tipo de actividad
   */
  const getCostBadgeVariant = (cost) => {
    const variants = {
      low: 'success',
      medium: 'warning',
      high: 'info',
      luxury: 'danger'
    };
    return variants[cost] || 'secondary';
  };

  /**
   * Obtener etiqueta de costo
   */
  const getCostLabel = (cost) => {
    const labels = {
      low: 'Económico',
      medium: 'Moderado',
      high: 'Confortable',
      luxury: 'Lujo'
    };
    return labels[cost] || cost;
  };

  /**
   * Manejar guardado de itinerario
   */
  const handleSave = () => {
    const name = customName.trim() || `Viaje a ${tripInfo.destination}`;
    if (onSave) {
      onSave(itinerary, name);
      setShowSaveModal(false);
      setCustomName('');
    }
  };

  /**
   * Renderizar actividad individual
   */
  const renderActivity = (activity, timeOfDay) => {
    if (!activity) {
      return (
        <div className="text-muted text-center py-3">
          <small>Tiempo libre</small>
        </div>
      );
    }

    const timeIcons = {
      morning: '🌅',
      afternoon: '☀️',
      evening: '🌙'
    };

    return (
      <Card className="mb-2 border-0 bg-light">
        <Card.Body className="py-3">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <h6 className="mb-1 text-primary">
                {timeIcons[timeOfDay]} {activity.name}
              </h6>
              <p className="mb-2 text-muted small">{activity.description}</p>
              <div className="d-flex align-items-center gap-2">
                <Badge bg={getCostBadgeVariant(activity.cost)} className="me-2">
                  {getCostLabel(activity.cost)}
                </Badge>
                <small className="text-muted">
                  ⏱️ {activity.duration}
                </small>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div className="container py-4">
      {/* Header del Itinerario */}
      <Card className="shadow-lg border-0 mb-4">
        <Card.Header className="bg-success text-white text-center py-3">
          <h2 className="mb-0">
            ✅ ¡Tu Itinerario está Listo!
          </h2>
          <p className="mb-0 mt-2">
            {tripInfo.tripType.icon} {tripInfo.destination} • {tripInfo.duration} {tripInfo.duration === 1 ? 'día' : 'días'}
          </p>
        </Card.Header>

        <Card.Body className="p-4">
          {/* Información Principal */}
          <Row className="mb-4">
            <Col md={6}>
              <h5 className="text-primary mb-3">📋 Detalles del Viaje</h5>
              <div className="bg-light p-3 rounded">
                <p className="mb-2"><strong>🎯 Destino:</strong> {tripInfo.destination}</p>
                <p className="mb-2"><strong>📅 Fechas:</strong> {formatDate(tripInfo.startDate)} - {formatDate(tripInfo.endDate)}</p>
                <p className="mb-2"><strong>⏱️ Duración:</strong> {tripInfo.duration} {tripInfo.duration === 1 ? 'día' : 'días'}</p>
                <p className="mb-2"><strong>👥 Viajeros:</strong> {tripInfo.travelers} {tripInfo.travelers === 1 ? 'persona' : 'personas'}</p>
                <p className="mb-0">
                  <strong>🎨 Tipo:</strong> {tripInfo.tripType.name}
                  <Badge bg="primary" className="ms-2">{tripInfo.budget.label}</Badge>
                </p>
              </div>
            </Col>

            <Col md={6}>
              <h5 className="text-primary mb-3">💰 Resumen de Costos</h5>
              <div className="bg-light p-3 rounded">
                <div className="d-flex justify-content-between mb-2">
                  <span>Total estimado:</span>
                  <strong className="text-success">${estimatedCosts.total.toLocaleString()} USD</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Por persona:</span>
                  <span>${estimatedCosts.perPerson.toLocaleString()} USD</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Presupuesto asignado:</span>
                  <span>${tripInfo.budget.amount.toLocaleString()} USD</span>
                </div>
                <hr className="my-2" />
                <Button 
                  variant="outline-info" 
                  size="sm" 
                  onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                  className="w-100"
                >
                  {showCostBreakdown ? 'Ocultar' : 'Ver'} desglose detallado
                </Button>
                
                {showCostBreakdown && (
                  <div className="mt-3 pt-2 border-top">
                    <small>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Actividades:</span>
                        <span>${estimatedCosts.activities.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Alojamiento:</span>
                        <span>${estimatedCosts.accommodation.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>Transporte:</span>
                        <span>${estimatedCosts.transport.toLocaleString()}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Comidas:</span>
                        <span>${estimatedCosts.food.toLocaleString()}</span>
                      </div>
                    </small>
                  </div>
                )}
              </div>
            </Col>
          </Row>

          {/* Highlights del Itinerario */}
          <div className="mb-4">
            <h5 className="text-primary mb-3">✨ Highlights de tu Viaje</h5>
            <Row>
              {summary.highlights.map((highlight, index) => (
                <Col md={6} key={index} className="mb-2">
                  <div className="d-flex align-items-center">
                    <span className="me-2">•</span>
                    <span>{highlight}</span>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Card.Body>
      </Card>

      {/* Itinerario Día por Día */}
      <Card className="shadow-lg border-0 mb-4">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">📅 Itinerario Día por Día</h4>
        </Card.Header>
        <Card.Body className="p-0">
          <Accordion defaultActiveKey="0">
            {dailyItinerary.map((day, index) => (
              <Accordion.Item eventKey={index.toString()} key={day.day}>
                <Accordion.Header>
                  <strong>Día {day.day}</strong>
                  <span className="ms-2 text-muted">
                    • {[day.morning, day.afternoon, day.evening].filter(Boolean).length} actividades
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col lg={4} className="mb-3">
                      <h6 className="text-primary border-bottom pb-2">🌅 Mañana</h6>
                      {renderActivity(day.morning, 'morning')}
                    </Col>
                    <Col lg={4} className="mb-3">
                      <h6 className="text-primary border-bottom pb-2">☀️ Tarde</h6>
                      {renderActivity(day.afternoon, 'afternoon')}
                    </Col>
                    <Col lg={4} className="mb-3">
                      <h6 className="text-primary border-bottom pb-2">🌙 Noche</h6>
                      {renderActivity(day.evening, 'evening')}
                    </Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card.Body>
      </Card>

      {/* Alojamiento Recomendado */}
      <Card className="shadow-lg border-0 mb-4">
        <Card.Header className="bg-info text-white">
          <h5 className="mb-0">🏨 Alojamiento Recomendado</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <h6 className="text-primary">Opción destacada:</h6>
            <p className="mb-2">{accommodation.recommended}</p>
            <Badge bg={getCostBadgeVariant(tripInfo.budget.category)}>
              Categoría {tripInfo.budget.label}
            </Badge>
          </div>
          <div>
            <h6 className="text-primary">Otras opciones disponibles:</h6>
            <div className="d-flex flex-wrap gap-2">
              {accommodation.options.filter(option => option !== accommodation.recommended).map((option, index) => (
                <Badge key={index} bg="light" text="dark" className="px-2 py-1">
                  {option}
                </Badge>
              ))}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Botones de Acción */}
      <Card className="shadow-lg border-0">
        <Card.Body className="text-center">
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
            <Button 
              variant="success" 
              size="lg" 
              onClick={() => setShowSaveModal(true)}
              className="px-4"
            >
              💾 Guardar Itinerario
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg" 
              onClick={onGenerateNew}
              className="px-4"
            >
              🔄 Generar Nuevo
            </Button>
            <Button 
              variant="outline-secondary" 
              size="lg" 
              onClick={onNewItinerary}
              className="px-4"
            >
              📝 Nuevo Viaje
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal para Guardar */}
      <Modal show={showSaveModal} onHide={() => setShowSaveModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>💾 Guardar Itinerario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre del itinerario</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Viaje a ${tripInfo.destination}`}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                maxLength={50}
              />
              <Form.Text className="text-muted">
                Deja vacío para usar el nombre automático
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSaveModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSave}>
            💾 Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItineraryDisplay; 